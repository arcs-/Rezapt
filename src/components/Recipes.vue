<template>
  <div class="px-6 py-24 grow flex flex-col">

    <Transition name="appear" mode="out-in">
      <div v-if="!stack.length" class="text-center pt-24">
        Kei Rezäpt gfunde
      </div>
      <div
        v-else
        :ref="setupDrag"
        :key="stack.length"
        class="grow relative"
      >
        <Recipe
          v-for="(recipe, i) of stack"
          :key="recipe.title"
          :recipe="recipe"
          :style="{zIndex: stackSize - i}"
        />
      </div>
    </Transition>

  </div>
</template>

<script setup>
import {
  ref, unref, computed, onMounted, onUnmounted,
} from 'vue';
import {
  useEventListener, useStorage, useEventBus,
} from '@vueuse/core';
import Fuse from 'fuse.js';
import Hammer from 'hammerjs';
import Recipe from '@/components/Recipe.vue';
import recepieList from '@assets/recipes/main.json';

const slugify = (title) => title
  .split(' ').join('-')
  .split('&').join('und')
  .toLowerCase();

/*
  STACK
*/
const recipes = ref([]);
const currentIndex = useStorage('lastRecipe', 0);
const stackSize = computed(() => Math.min(4, recipes.value.length));
const stack = computed(() => Array(stackSize.value)
  .fill()
  .map((_, i) => recipes.value[(currentIndex.value + i) % recipes.value.length] || { title: 'ups' }));

function next() {
  currentIndex.value = (currentIndex.value + 1) % recipes.value.length;
  const current = unref(recipes)[currentIndex.value];

  window.scrollTo({ top: 0, behavior: 'smooth' });
  window.history.pushState(
    current.title,
    current.title,
    `/${slugify(current.title)}`,
  );
}

/*
  SEARCH
*/
const FUSE = new Fuse(recepieList, {
  keys: ['title', 'tags', 'ingredients'],
  minMatchCharLength: 2,
  threshold: 0.3,
});

function filter(addToHistory) {
  const cake = localStorage.getItem('cake');
  const search = localStorage.getItem('search');

  const result = search.length ? FUSE.search(search) : unref(recepieList);
  recipes.value = result
    .map((r) => (r.item ? r.item : r))
    .filter((r) => (cake === 'true' ? r.tags.includes('dessert') : !r.tags.includes('dessert')));

  currentIndex.value = currentIndex.value < recipes.value.length ? currentIndex.value : 0;

  const current = recipes.value[currentIndex.value];
  if (addToHistory && current) {
    window.history.pushState(
      current.title,
      current.title,
      `/${slugify(current.title)}`,
    );
  }
}
filter();

const bus = useEventBus('storage');
bus.on(filter);

/*
  SWIPE
*/
// https://codepen.io/RobVermeer/pen/japZpY
let hammer;
function setupDrag(el) {
  if (!el || el?.classList.contains('hammer')) return;

  el.classList.add('hammer');
  if (hammer) hammer.destroy();
  hammer = new Hammer(el, {
    touchAction: 'pan-y',
    recognizers: [
      [Hammer.Pan, { threshold: 0, direction: Hammer.DIRECTION_ALL }],
    ],
  })
    .on('pan', (event) => {
      event.preventDefault();

      if (event.deltaX === 0) return;
      if (event.center.x === 0 && event.center.y === 0) return;
      if (recipes.value.length < 2) return;

      const card = el.firstElementChild;

      card.classList.add('moving');

      const xMulti = event.deltaX * 0.03;
      const yMulti = event.deltaY / 80;
      const rotate = xMulti * yMulti;

      card.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
    })
    .on('panend', (event) => {
      const card = el.firstElementChild;
      card.classList.remove('moving');

      if (recipes.value.length < 2) return;

      const moveOutWidth = document.body.clientWidth;
      const jump = Math.abs(event.deltaX) > 200 || Math.abs(event.velocityX) > 0.5;

      if (!jump) {
        card.style.transform = '';
        return;
      }

      const endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
      const toX = event.deltaX > 0 ? endX : -endX;
      const endY = Math.abs(event.velocityY) * moveOutWidth;
      const toY = event.deltaY > 0 ? endY : -endY;
      const xMulti = event.deltaX * 0.03;
      const yMulti = event.deltaY / 80;
      const rotate = xMulti * yMulti;

      card.classList.add('removing');
      card.style.transform = `translate(${toX}px, ${toY + event.deltaY}px) rotate(${rotate}deg)`;
      setTimeout(next, 200);
      setTimeout(() => {
        card.classList.remove('removing');
        card.style.transform = '';
      }, 500);
    })
    .on('pancancel', () => {
      const card = el.firstElementChild;
      card.classList.remove('moving');
      card.style.transform = '';
    });
}
onUnmounted(() => hammer?.destroy());

/*
  SETUP
*/
onMounted(() => {
  filter();
  const initName = window.location.pathname.substring(1);
  const result = recipes.value.findIndex((r) => slugify(r.title) === initName);
  if (result >= 0) currentIndex.value = result;
});

useEventListener('popstate', (e) => {
  filter();
  const result = recipes.value.findIndex((r) => r.title === e.state);
  if (result >= 0) currentIndex.value = result;
});

</script>

<style lang="scss" scoped>
.Recipe {
  position: absolute;
  margin-bottom: 3rem;
  --shade: 0 0 0 100vmax rgba(255 251 246 / 60%);

  &:not(.moving) {
    transition: .3s ease;
    transition-property: transform, box-shadow, opacity;
  }

}
.Recipe:nth-child(1) {
  &.moving {
  //  --shade: 0 0 100vmax rgba(255 251 246 / 0);
  }
  &.removing {
    --shade: 0 0 100vmax rgba(255 251 246 / 0);
  }
}
.Recipe:nth-child(2) {
  transform: translate(-1rem, -1rem) rotate(-2deg);
}
.Recipe:nth-child(3) {
  transform: translate(1rem, -1rem) rotate(2deg);
}
.Recipe:nth-child(4) {
  opacity: 0;
}

</style>

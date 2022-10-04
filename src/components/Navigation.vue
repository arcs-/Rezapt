<template>
  <div class="absolute container px-6 left-1/2 transform -translate-x-1/2 z-10 text-right mt-4">

    <Cake v-if="!cake" class="Cake w-7 mr-4" @click="cake = !cake" />
    <CakeSolid v-else class="Cake w-7 mr-4" @click="cake = !cake" />

    <div class="search">
      <input
        v-model="search"
        type="search"
        required
        placeholder="Rüebli"
        aria-label="Suche nach Rezepten"
      >
      <Search class="icon" />
    </div>

  </div>
</template>

<script setup>
import { watch } from 'vue';
import { useEventBus, useStorage } from '@vueuse/core';

import Cake from '@images/cake.svg';
import CakeSolid from '@images/cake-solid.svg';
import Search from '@images/search.svg';

const bus = useEventBus('storage');

const cake = useStorage('cake', false);
watch(cake, () => { bus.emit('cake'); });

const search = useStorage('search', '');
watch(search, () => { bus.emit('search'); });

</script>

<style lang="scss" scoped>
.search {
  @apply inline-block relative;
  input {
    @apply w-10 px-4 py-2 rounded-full bg-sand text-black -mr-2 opacity-0;
    transition: .3s;
    &:focus,
    &:hover,
    &:valid {
      @apply w-48 opacity-100;
      outline: 1.5px solid currentColor;
    }
    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
    }
  }
  .icon {
    @apply w-6 absolute right-1 top-2;
    pointer-events: none;
  }
}

.Cake.active {
  fill: red;
}
</style>

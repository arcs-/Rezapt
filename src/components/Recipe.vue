<template>

  <div class="Recipe p-8 rounded-lg bg-white w-full">

    <h1 class="mb-6">
      {{ props.recipe.title }}
    </h1>

    <table class="w-full">
      <tbody>
        <tr v-for="ingrediant of props.recipe.ingredients" :key="ingrediant[0]">
          <td v-html="ingrediant[0]" />
          <td class="text-right" v-html="ingrediant[1]" />
        </tr>
      </tbody>
    </table>

    <p v-if="props.recipe.recipe" class="mt-8" v-html="props.recipe.recipe" />

    <div v-if="props.recipe.link" class="mt-8">
      <a :href="props.recipe.link" aria-label="Rezept" @click.stop>
        <List class="w-6 mr-2 -mt-1" /> Rezäpt
      </a>
    </div>

  </div>

</template>

<script setup>
import List from '@images/list.svg';

const props = defineProps({ recipe: Object });

</script>

<style lang="scss" scoped>

.Recipe {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25),
              0 10px 10px rgba(0,0,0,0.22),
              var(--shade, 0 0 0 0),
}

tr:not(:last-child) {
  border-bottom: 1px solid rgba(0,0,0,.1);
}

tr td {
  padding: .25rem 0;
}

</style>

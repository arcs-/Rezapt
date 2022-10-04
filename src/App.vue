<template>

  <Navigation />

  <main class="container mx-auto min-h-screen flex flex-col">
    <Recipes />
  </main>

</template>

<script setup>
import Navigation from '@/components/Navigation.vue';
import Recipes from './components/Recipes.vue';

</script>

<script setup>
import { ref } from 'vue'
import Home from './views/Home.vue'
import DishList from './views/DishList.vue'
import About from './views/About.vue'

const currentView = ref('home')
</script>

<template>
  <nav class="app-nav">
    <button :class="{ active: currentView === 'home' }" @click="currentView = 'home'">Home</button>
    <button :class="{ active: currentView === 'dishes' }" @click="currentView = 'dishes'">Dishes</button>
    <button :class="{ active: currentView === 'about' }" @click="currentView = 'about'">About</button>
  </nav>
  <Home v-if="currentView === 'home'" />
  <DishList v-else-if="currentView === 'dishes'" />
  <About v-else-if="currentView === 'about'" />
</template>

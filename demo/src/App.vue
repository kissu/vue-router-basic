<script setup>
</script>

<template>
  <nav class="app-nav">
    <router-link :to="{ name: 'home' }">Home</router-link>
    <router-link :to="{ name: 'dishes' }">Dishes</router-link>
    <router-link :to="{ name: 'about' }">About</router-link>
  </nav>
  <router-view />
</template>

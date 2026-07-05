<script setup>
</script>

<template>
  <section class="hero">
    <p class="tagline">Fresh routes, served daily</p>
    <h1>🍽️ The Router Bistro</h1>
    <p>Welcome! Browse our menu, click into a dish, and filter the table your way.</p>
    <p>
      <router-link class="cta" :to="{ name: 'dishes' }">Browse the menu →</router-link>
    </p>
  </section>
</template>

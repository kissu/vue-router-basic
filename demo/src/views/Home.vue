<script setup>
</script>

<template>
  <section>
    <h1>🍽️ The Router Bistro</h1>
    <p>Welcome! Browse our menu, click into a dish, and filter the table your way.</p>
    <p>
      <router-link :to="{ name: 'dishes' }">Browse the menu →</router-link>
    </p>
  </section>
</template>

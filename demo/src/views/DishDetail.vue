<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { dishes } from '../data/dishes'

const route = useRoute()

const dish = computed(() => dishes.find((d) => d.id === Number(route.params.id)))
</script>

<template>
  <section v-if="dish" class="dish-detail">
    <p class="emoji">{{ dish.emoji }}</p>
    <h1>{{ dish.name }}</h1>
    <p class="meta">
      <span class="badge" :class="`badge--${dish.category}`">{{ dish.category }}</span>
      <span class="price">${{ dish.price.toFixed(2) }}</span>
    </p>
    <p class="desc">{{ dish.description }}</p>
    <router-link class="back-link" :to="{ name: 'dishes' }">← Back to menu</router-link>
  </section>
  <section v-else class="not-found">
    <h1>Dish not found</h1>
    <p>There's no dish with id "{{ route.params.id }}".</p>
    <router-link class="back-link" :to="{ name: 'dishes' }">← Back to menu</router-link>
  </section>
</template>

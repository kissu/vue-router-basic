<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { dishes } from '../data/dishes'

const route = useRoute()
const router = useRouter()

const category = computed(() => route.query.category || 'all')
const sort = computed(() => route.query.sort || 'name')

function setCategory(event) {
  router.replace({ query: { ...route.query, category: event.target.value } })
}

function setSort(event) {
  router.replace({ query: { ...route.query, sort: event.target.value } })
}

const filtered = computed(() => {
  const list = category.value === 'all'
    ? dishes
    : dishes.filter((d) => d.category === category.value)

  return [...list].sort((a, b) => {
    if (sort.value === 'price') return a.price - b.price
    return a.name.localeCompare(b.name)
  })
})
</script>

<template>
  <section>
    <h1>Menu</h1>
    <div class="filters">
      <select :value="category" @change="setCategory">
        <option value="all">All categories</option>
        <option value="starter">Starter</option>
        <option value="main">Main</option>
        <option value="dessert">Dessert</option>
      </select>
      <select :value="sort" @change="setSort">
        <option value="name">Sort by name</option>
        <option value="price">Sort by price</option>
      </select>
    </div>
    <table class="dish-table">
      <thead>
        <tr>
          <th>Dish</th>
          <th>Category</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dish in filtered" :key="dish.id">
          <td>
            <router-link :to="{ name: 'dish-detail', params: { id: dish.id } }">
              {{ dish.emoji }} {{ dish.name }}
            </router-link>
          </td>
          <td><span class="badge" :class="`badge--${dish.category}`">{{ dish.category }}</span></td>
          <td>${{ dish.price.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

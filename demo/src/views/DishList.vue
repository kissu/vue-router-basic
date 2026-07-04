<script setup>
import { dishes } from '../data/dishes'
</script>

<template>
  <section>
    <h1>Menu</h1>
    <table class="dish-table">
      <thead>
        <tr>
          <th>Dish</th>
          <th>Category</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dish in dishes" :key="dish.id">
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

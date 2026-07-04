import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DishList from '../views/DishList.vue'
import DishDetail from '../views/DishDetail.vue'
import About from '../views/About.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/dishes', name: 'dishes', component: DishList },
    { path: '/dishes/:id', name: 'dish-detail', component: DishDetail },
    { path: '/about', name: 'about', component: About },
  ],
})

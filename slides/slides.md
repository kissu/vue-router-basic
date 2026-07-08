---
theme: default
title: Vue Router Basics
info: |
  ## Vue Router Basics
  Routes, params, and navigation — a hands-on 30-minute course.
class: text-center
transition: slide-left
---

# Vue Router Basics

Routes · Params · Navigation

<!-- Confirm screen share is up. Have the demo repo open in one terminal pane (pnpm dev already running) and a browser tab ready in another — you'll switch over to the browser several times today. -->

---

# Today's agenda

<v-clicks>

- Why do we even need a router?
- SPA vs MPA — two ways to serve pages
- Navigating between pages (and why Devtools matter)
- Route params — one dynamic page, many dishes
- Query params — filters and sort that survive a refresh

</v-clicks>

<!-- Keep this to ~30s, it's just a preview. -->

---

# Why do we even need a router?

Our demo app — **The Router Bistro** — has three "pages": Home, Dishes, About.

We haven't touched routing yet. So how do we show different content for each one?

<!-- Pause and ask the room how THEY'd solve this with what they already know (v-if? v-show?). Let a couple of answers land before revealing the next slide. -->

---

# The naive way: `App.vue`

```vue
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
```

This works! It's also exactly what's on the `step-1-manual-views` branch.

<style>
.slidev-layout pre { font-size: 0.8em; line-height: 1.4; }
</style>

---

# What breaks with manual swapping

<v-clicks>

- The URL **never changes** — it's always `/`
- Refresh the page → you're always back on Home
- The back/forward buttons do... nothing useful
- Can't send someone a link straight to "Dishes"
- Every new "page" means another `v-else-if` — doesn't scale

</v-clicks>

<!-- This list is the whole motivation for the rest of the course — worth lingering on for a moment. -->

---

# LIVE: manual swapping

Time to see it break in real time.

<!-- SWITCH TO BROWSER. `git checkout step-1-manual-views` (dev server keeps running, no restart needed — vue-router is already in package.json from the very first branch, it's just unimported here, mention only if someone notices). Click Home / Dishes / About and point out the URL bar never moves. Refresh mid-"Dishes" to show it resets to Home. Try the back button. -->

---
layout: center
---

# Check-in

If you had to add **10 more pages** this way, what breaks first?

<!-- ~30s pause. Nudge toward: the v-else-if chain grows forever, and every page still shares the exact same URL problem. -->

---

# Two ways to serve pages

Before we fix this with a router, it's worth naming the two models we're choosing between.

- **MPA** — Multi-Page App: every navigation is a fresh request to a server
- **SPA** — Single-Page App: one page loads once, then JavaScript takes over navigation

Vue Router is what makes the SPA model possible.

<!--

https://astro.build/

https://vuejs.org/

-->

---
layout: two-cols
---

# MPA

1. Click a link
2. Browser sends a full HTTP request
3. Server sends back a brand-new HTML page
4. Browser reloads *everything* — HTML, CSS, JS

<v-clicks>

- ✅ Simple mental model
- ✅ Great for content-heavy, mostly-static sites
- ❌ Full reload on every navigation
- ❌ More server load, more bytes over the wire

</v-clicks>

::right::

# SPA

1. Click a link
2. The router matches it **client-side**
3. Vue swaps the component in place
4. The URL updates — no reload at all

<v-clicks>

- ✅ Instant transitions, feels like an app
- ✅ No full-page reload, state can persist
- ❌ Bigger initial JS bundle
- ❌ Client-side routing to set up and maintain

</v-clicks>

<!-- Deliberately a plain two-column list rather than a diagram — sequence diagrams can be fiddly to read live. Keep the pace brisk, this is context-setting, not the main event. -->

---
layout: center
---

# Check-in

A blog with 1,000 static articles vs. a live dashboard — which model fits which, and why?

<!-- Quick, ~20s. Nudge toward: content-heavy + rarely-changing favors MPA/static generation, interactive + stateful favors SPA.

consider difference between:
- reddit (SSR) or a blog post (SSG)
- netflix or bank or twitter (SPA)

-->

---

# Enter Vue Router

It solves exactly the pain list from a few slides back:

<v-clicks>

- Maps a **URL** to a **component**
- Swaps the view **without a full reload**
- Keeps the URL **in sync** with what's on screen — so refresh, back/forward, and sharing links all just work

</v-clicks>

---

# Anatomy of a router

````md magic-move
```js
import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [],
})
```
```js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
  ],
})
```
```js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DishList from '../views/DishList.vue'
import About from '../views/About.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/dishes', name: 'dishes', component: DishList },
    { path: '/about', name: 'about', component: About },
  ],
})
```
````

`createWebHistory()` = real URLs like `/dishes`, no `#` hash.

<!-- This is the exact router/index.js on step-2-basic-routes. Click through the three stages slowly. -->

---

# `App.vue` gets simpler, not more complex

````md magic-move
```vue
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
```
```vue
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
```
````

<v-clicks>

- No more component-switching logic in `App.vue` at all
- `<router-link>` gets an active-link CSS class for free
- Back/forward "just works" — the browser's history API does the heavy lifting
- Routes can be lazy-loaded per page later, for free performance

</v-clicks>

<style>
.slidev-layout pre,
.slidev-layout .shiki-magic-move-container { font-size: 0.78em; line-height: 1.35; }
</style>

---

# LIVE: basic routing + Devtools

<!-- SWITCH TO BROWSER. `git checkout step-2-basic-routes`. Click through Home / Dishes / About, show the URL changing each time, and that back/forward now actually works. Then open Vue Devtools → Routes tab: show the registered routes and which one is currently matched. This is the payoff for "why is this better than manual swapping." -->

---

# Problem: one detail page, many dishes

We want a page per dish — but we have 8 dishes, and menus change.

Hand-writing a route for each one doesn't scale:

```js
{ path: '/dishes/1', component: Dish1 },
{ path: '/dishes/2', component: Dish2 },
// ...and so on, forever
```

<!-- Don't forget to spell out the actual benefit on the next slide — one dynamic route replacing N hardcoded ones is a genuine "aha" moment, easy to rush past. -->

---

# Dynamic segments: `:id`

````md magic-move
```js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DishList from '../views/DishList.vue'
import About from '../views/About.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/dishes', name: 'dishes', component: DishList },
    { path: '/about', name: 'about', component: About },
  ],
})
```
```js
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
```
````

One route (`/dishes/:id`) now matches `/dishes/1`, `/dishes/2`, `/dishes/anything`.

<style>
.slidev-layout pre,
.slidev-layout .shiki-magic-move-container { font-size: 0.8em; line-height: 1.4; }
</style>

---

# Reading the param: `DishDetail.vue`

```vue
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { dishes } from '../data/dishes'

const route = useRoute()

const dish = computed(() => dishes.find((d) => d.id === Number(route.params.id)))
</script>

<template>
  <section v-if="dish" class="dish-detail">
    <h1>{{ dish.name }}</h1>
    <!-- ... -->
  </section>
  <section v-else class="not-found">
    <h1>Dish not found</h1>
  </section>
</template>
```

<v-click>

Note the `Number(...)` — `route.params.id` is **always a string**, even though our dish IDs are numbers.

</v-click>

<style>
.slidev-layout pre { font-size: 0.8em; line-height: 1.4; }
</style>

---

# LIVE: click into a dish

<!-- SWITCH TO BROWSER. `git checkout step-3-route-params`. Click a dish from the menu, watch the URL become /dishes/3. Then deliberately visit /dishes/999 — the not-found fallback is a good demo beat, don't skip it. Point out the Devtools Routes tab now also shows params: { id: '3' }. -->

---
layout: center
---

# Check-in

Our dish IDs are numbers in the data file — but the URL is just text.

Is `route.params.id` a **string** or a **number**? Why does that matter for `dish.id === route.params.id`?

<!-- Plain JS runtime-type question, not about TypeScript. Answer: always a string — that's why DishDetail.vue wraps it in Number(...) before comparing. -->

---

# Problem: filters that disappear

Say we add a category filter and a sort order to the menu table.

If that state lives in a local `ref`... what happens when you:

<v-clicks>

- Refresh the page?
- Send the link to a friend?
- Hit the browser's back button?

</v-clicks>

<v-click>

All of it resets. The filter you picked is gone.

</v-click>

---

# Query params: state that lives in the URL

````md magic-move
```js
import { ref, computed } from 'vue'
import { dishes } from '../data/dishes'

const category = ref('all')
const sort = ref('name')

const filtered = computed(() => {
  const list = category.value === 'all'
    ? dishes
    : dishes.filter((d) => d.category === category.value)

  return [...list].sort((a, b) => {
    if (sort.value === 'price') return a.price - b.price
    return a.name.localeCompare(b.name)
  })
})
```
```js
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { dishes } from '../data/dishes'

const route = useRoute()
const router = useRouter()
const category = computed(() => route.query.category || 'all')
const sort = computed(() => route.query.sort || 'name')

function setCategory(e) { router.replace({ query: { ...route.query, category: e.target.value } }) }
function setSort(e) { router.replace({ query: { ...route.query, sort: e.target.value } }) }

const filtered = computed(() => {
  const list = category.value === 'all'
    ? dishes
    : dishes.filter((d) => d.category === category.value)
  return [...list].sort((a, b) => {
    if (sort.value === 'price') return a.price - b.price
    return a.name.localeCompare(b.name)
  })
})
```
````

<style>
.slidev-layout pre,
.slidev-layout .shiki-magic-move-container { font-size: 0.78em; line-height: 1.35; }
</style>

---

# Query params: what we get for free

The `filtered` logic barely changes — only *where the state lives* does.

<v-clicks>

- Shareable — the URL fully describes what you're looking at
- Bookmarkable, survives a refresh
- Back/forward move through filter changes too

</v-clicks>

<!-- Tie each of these back to the "filters that disappear" slide — this is the concrete payoff for moving state into the URL. -->

---

# LIVE: filter & sort the table

<!-- SWITCH TO BROWSER. `git checkout step-4-query-params`. Change the category and sort dropdowns, show the URL gaining ?category=&sort=. Refresh to prove the filter survives. Copy the URL into a new tab to show it's fully shareable. -->

---
layout: center
---

# Check-in

What other bit of UI state might deserve to live in the query string?

<!-- If the room is quiet: pagination page number, active tab, search box text. -->

---

# Recap

<v-clicks>

- No router → manual state, no URL, no back/forward
- Vue Router → URL-driven navigation, no full reload
- Route params (`:id`) → one route, many pages
- Query params (`route.query`) → recoverable, shareable UI state

</v-clicks>

| Branch | Covers |
|---|---|
| `step-0-foundation` | Starting point |
| `step-1-manual-views` | Why we need a router |
| `step-2-basic-routes` | Navigation, Devtools |
| `step-3-route-params` | Route params |
| `step-4-query-params` | Query params |

<!-- Optional — skip this if you're short on time, it's just the README table restated. -->

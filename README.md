# Vue Router Basics

Slides + a companion demo app for a ~30 minute Vue Router course (routes, params, navigation), aimed at students who already know Vue 3 fundamentals.

## What's inside

- **`slides/`** — a [Slidev](https://sli.dev) deck. Run it locally while presenting.
- **`demo/`** — a small Vue 3 + Vite + Vue Router app, "The Router Bistro" (a food menu). Its teaching progression is laid out as git branches (see below) so you can `git checkout` live between stages during class.

## Running the slides locally

```bash
cd slides
pnpm install
pnpm dev
```

Opens at `http://localhost:3030`. Presenter view (with your notes) is at `http://localhost:3030/presenter/`.

## Running the demo app locally

```bash
cd demo
pnpm install
pnpm dev
```

This is a **one-time** install. `vue-router` is already a dependency on every branch (including the ones that don't use it yet), so switching branches during class never requires reinstalling or restarting the dev server — a plain `git checkout step-N-...` is enough.

## Switching lecture stages during class

From the repo root:

```bash
git checkout step-0-foundation
git checkout step-1-manual-views
git checkout step-2-basic-routes
git checkout step-3-route-params
git checkout step-4-query-params
```

This only touches files under `demo/` — the running `slides` dev server in your other terminal pane is undisturbed.

| Branch | Covers | What's in `demo/` |
|---|---|---|
| `step-0-foundation` | Starting point | A single view, no multi-page concept yet |
| `step-1-manual-views` | Why we need a router | Home/Dishes/About swapped by hand via `v-if`, no router used |
| `step-2-basic-routes` | Navigation, router benefits, Vue Devtools | `vue-router` wired up, `/`, `/dishes`, `/about` |
| `step-3-route-params` | Route params | `/dishes/:id` + `DishDetail.vue` |
| `step-4-query-params` (≈ `main`) | Query params, recoverable state | Category filter + sort via `?category=&sort=` |

## Building & deploying

**`demo/` is the piece meant to actually go live** as a working example — deploy the `step-4-query-params`/`main` state.

```bash
cd demo
pnpm build   # outputs to demo/dist
```

Cloudflare Pages project settings: Root directory `demo`, build command `pnpm run build`, output directory `dist`. It's a plain static SPA (no Workers/Functions needed). Cloudflare's automatic SPA fallback handles deep links like `/dishes/3` on refresh with no extra config.

`slides/` can be deployed the same way if you want the deck online too:

```bash
cd slides
pnpm build   # outputs to slides/dist
```

Root directory `slides`, build command `pnpm run build`, output directory `dist`. **One gotcha:** Slidev's build automatically generates `dist/_redirects` with a Netlify-style `/* /index.html 200` rule. That exact rule causes an infinite-redirect deploy failure specifically on Cloudflare Pages — delete `dist/_redirects` before deploying there. Slidev's `dist/404.html` (identical to `index.html`) is fine to keep; it's what actually provides the SPA fallback on Cloudflare and elsewhere.

Neither project needs a `wrangler.toml`.

To deploy without connecting a git remote, `wrangler` works directly against a build output:

```bash
pnpm dlx wrangler pages deploy demo/dist --project-name=vue-router-basic-demo
```

## Presenter notes

Each slide in `slides.md` may end with an HTML comment (`<!-- ... -->`) — these are presenter notes: reminders for check-ins, attention prompts, and exactly when/how to switch over to the browser demo. They only show up in Slidev's presenter view, never in the exported or shared deck.

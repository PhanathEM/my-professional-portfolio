# Professional Developer Portfolio

A premium, minimal developer portfolio built with the latest stable web stack
(as of August 2026). Dark-mode-first, content-driven, fully SEO-instrumented and
accessible.

## Stack

| Area       | Choice                                                          |
| ---------- | ------------------------------------------------------------- |
| Framework  | **Nuxt 4** (`^4.5`) · Vue 3.5 · Nitro                        |
| Language   | **TypeScript 5.9** (strict, `noUncheckedIndexedAccess`)      |
| Styling    | **Tailwind CSS v4** via `@tailwindcss/vite` — token-based    |
| Content    | **Nuxt Content v3** (SQLite-backed collections)              |
| i18n       | **@nuxtjs/i18n** — EN / KM / LO, URL-prefixed, hreflang, lazy |
| Fonts      | **@nuxt/fonts** — self-hosted Inter + Noto Sans Khmer / Lao  |
| SEO        | **@nuxtjs/seo** — sitemap, robots, OG image, schema.org, link checker |
| Icons      | **Nuxt Icon** + **Lucide** (`@iconify-json/lucide`, SVG mode)|
| Animation  | **Motion for Vue** (`motion-v`) — reduced-motion aware        |
| Images     | **@nuxt/image**                                              |
| Utilities  | **VueUse**                                                    |
| Quality    | ESLint 10 (`@nuxt/eslint`) · Prettier 3                       |

## Getting started

```bash
pnpm install          # Node 22+ / pnpm 11+
cp .env.example .env   # then edit NUXT_PUBLIC_SITE_URL
pnpm dev              # http://localhost:3000
```

## Scripts

| Command           | What it does                                  |
| ----------------- | -------------------------------------------- |
| `pnpm dev`        | Dev server with HMR                          |
| `pnpm build`      | Production build (prerenders all routes)     |
| `pnpm generate`   | Full static export to `.output/public`       |
| `pnpm preview`    | Serve the built output locally               |
| `pnpm lint`       | ESLint over the whole project                |
| `pnpm format`     | Prettier write                               |
| `pnpm typecheck`  | `vue-tsc` type check                         |

## Making it yours

Structure & links live in **`app/data/`**; all display copy lives in
**`i18n/locales/`** (see _Languages_ below).

| File                     | Contents                                              |
| ------------------------ | -------------------------------------------------- |
| `app/data/profile.ts`    | Name, email, avatar, stat figures, paragraph counts |
| `app/data/projects.ts`   | Featured projects (slug, stack, links, cover)       |
| `app/data/skills.ts`     | Skill categories (id + icons) and skill names       |
| `app/data/experience.ts` | Timeline entries (work / education / project)       |
| `app/data/services.ts`   | "What I can build" cards (id + icon)                |
| `app/data/social.ts`     | GitHub / LinkedIn / email links                     |
| `app/data/navigation.ts` | Nav + footer link structure (labels are i18n keys)  |

**Hero background images** — `app/data/hero.ts` lists the images that crossfade
behind the hero (looping, slow Ken-Burns drift, parallax on scroll, under a
theme-aware scrim so the text stays readable). It ships pointing at the project
cover SVGs as placeholders. Replace them with **real screenshots of your work**
(dashboards, app UIs, deployed sites, code): drop files in
`public/images/hero/`, list them in `hero.ts`, keep 3–6, landscape ≥ 1600px.

Long-form content is Markdown in **`content/`**:

- `content/projects/<slug>.md` → rendered at `/projects/<slug>`
- `content/blog/<slug>.md` → rendered at `/blog/<slug>`

Frontmatter is validated against the schemas in `content.config.ts`.

> Values marked `[PLACEHOLDER]` in the data files and content frontmatter are
> safe defaults — replace them with your real information before publishing.
> No achievements are fabricated; the stat counts describe a learning portfolio.

## Languages

English (`/`), Khmer (`/km`) and Lao (`/lo`) via **@nuxtjs/i18n** —
URL-prefixed locales, automatic `hreflang` + per-locale canonical, lazy-loaded
messages, a cookie-persisted switcher in the navbar, and per-locale fonts
(Noto Sans Khmer / Lao load automatically for those locales).

- **UI strings** — `i18n/locales/{en,km,lo}.json`. The `km.json` / `lo.json`
  files carry a `_note`: the translations are machine-assisted and should be
  proofread by a native speaker before publishing.
- **Blog posts & case studies** stay English under every locale (Nuxt Content
  `fallbackLocale`). To translate an article, the cleanest path is a
  frontmatter `locale` field + a filtered `queryCollection`, or per-locale
  content folders — the page components already strip the locale prefix before
  the content lookup, so wiring that in is localised to `content.config.ts`
  and the two `[slug].vue` pages.
- **Add a language**: add a locale entry in `nuxt.config.ts` → `i18n.locales`,
  drop a `<code>.json` next to the others, and (if it needs a non-Latin font)
  add the family to `fonts.families` + a `:lang(<code>)` block in `main.css`.

## Design system

All colours, radii, shadows and fonts are CSS variables in
**`app/assets/css/main.css`**. To rebrand, change the `--brand-*` scale in one
place — every semantic token (`--accent`, `--bg`, `--surface`, …) derives from
it, in both light and dark themes.

## Adding a backend later

The contact form posts to `NUXT_PUBLIC_CONTACT_ENDPOINT` when set (any JSON
endpoint — a Nuxt server route, Formspree, Web3Forms, …) and simulates success
when unset. To grow into a full stack:

```
Nuxt  →  server/api/*  (Nitro)  →  PostgreSQL
```

No frontend rewrite required — `useContactForm()` already isolates the transport.

## Deployment

`pnpm generate` produces a static site in `.output/public` — deploy to any static
host (Netlify, Vercel, Cloudflare Pages, GitHub Pages). For SSR, `pnpm build`
then run `.output/server/index.mjs` on a Node host.

## A note on versions

Every dependency is the latest stable release that is **mutually compatible** as
of August 2026. One deliberate exception: TypeScript is pinned to `5.9.x` rather
than `7.0`. TypeScript never shipped a stable `6.x`, and at the time of writing
`typescript-eslint` and `vue-tsc` both refuse to run under the TS 7.0 API — so
7.0 would break `pnpm lint` and `pnpm typecheck`. 5.9 is the newest version the
whole toolchain supports. Bump it when the ecosystem catches up.

Built with Nuxt + Vue.

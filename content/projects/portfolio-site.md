---
title: This Portfolio
description: The site you're viewing — a token-driven Nuxt 4 portfolio with content-managed case studies and a full SEO setup.
summary: A deliberately small project with a high bar for craft — one design-token file drives the entire look, content lives in Markdown, and every page ships complete SEO metadata.
year: 2026
role: Designer & developer
timeline: 1 week
stack:
  - Nuxt
  - Vue
  - TypeScript
  - Tailwind CSS
  - Nuxt Content
features:
  - Centralised design tokens — recolour the whole site from one file
  - Dark / light / system theme with no flash of wrong theme
  - Content-driven blog and project case studies
  - Full SEO — sitemap, robots, Open Graph, JSON-LD, dynamic OG images
cover: /images/projects/portfolio-site.svg
repo: https://github.com/phanath/portfolio
featured: false
order: 4
---

## Overview

This portfolio is itself a project. The brief I set myself: it should look like
the work of someone who has shipped real products, be trivial to keep current,
and score well on Lighthouse without special pleading.

## Problem

Most developer portfolios rot. Content is hard-coded into components, so updates
mean editing markup; the design has no system, so a restyle is a rewrite; and
SEO is an afterthought bolted on per page.

## Solution

Three decisions address that:

1. **A single design-token file.** Every colour, radius and shadow is a CSS
   variable. Semantic tokens (`--bg`, `--surface`, `--accent`) derive from one
   brand scale, defined once for light and once for dark. Rebranding is a
   one-file change.
2. **Content, not components.** Case studies and blog posts are Markdown in
   `content/`, validated by a schema. Adding a project is adding a file.
3. **SEO as infrastructure.** The Nuxt SEO modules generate the sitemap, robots
   file, canonical URLs, Open Graph tags, per-page OG images and JSON-LD from
   page metadata — so every new page is correct by default.

## Architecture

- **Nuxt 4** in hybrid mode: the whole site prerenders to static HTML, with the
  server bundle kept ready for a future API.
- **Tailwind CSS v4** through the Vite plugin, configured entirely in CSS with
  `@theme`.
- **Nuxt Content v3** with typed collections for `blog` and `projects`.
- **Motion for Vue** for entrance and scroll-reveal animation, gated on
  `prefers-reduced-motion`.
- **@nuxtjs/seo** for sitemap, robots, schema.org, OG image and link checking.

## Challenges

The theme toggle had to avoid a flash of the wrong colour on load. The colour
mode script runs before paint and sets a class on `<html>`; every token is
defined for both states, so the first paint is already correct.

Getting scroll animations to not hurt accessibility or SEO meant rendering all
content in the initial HTML and only animating opacity/transform on top — never
gating content on JavaScript.

## What I Learned

- A design system pays off even on a one-person project the first time you want
  to change the accent colour.
- Treating content as data makes a site something you *maintain* rather than
  something you *rebuild*.
- The Nuxt SEO ecosystem removes almost all the manual metadata work — the trick
  is to feed it good page-level titles and descriptions.

## Screenshots

![Portfolio landing page](/images/projects/portfolio-site.svg)

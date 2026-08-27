---
title: How I structure a Nuxt 4 application
description: A practical folder structure for Nuxt 4 projects that scales past the tutorial stage — feature boundaries, a data layer and where types live.
date: 2026-06-18
author: Phanath
category: Nuxt
tags:
  - nuxt
  - architecture
  - typescript
draft: false
---

Nuxt gives you a lot of conventions, but it doesn't tell you how to organise the
code *inside* those conventions. Here's the structure I've landed on after a few
projects.

## Keep data out of components

The single most useful habit: put editable information in a plain `app/data/`
folder as typed modules, and import it into components. Content that changes
often — a project list, a skills matrix, profile copy — lives in one place, and
the UI just renders it.

```ts
// app/data/projects.ts
import type { Project } from '~/types'

export const projects: Project[] = [
  /* ... */
]
```

When the data outgrows a static file, each module becomes the one place you swap
in a `useFetch` call — the component contract doesn't change.

## Feature folders over type folders

Grouping by kind (`components/`, `composables/`, `utils/`) is fine until a
feature has ten files scattered across five directories. For anything
non-trivial, group by feature first and let small shared primitives live in
`ui/`.

## Let Content own long-form text

Anything with paragraphs — case studies, blog posts, docs — belongs in
`content/`, not in a `.vue` file. Nuxt Content v3 gives you a typed collection
and a SQL-backed query API, so you get the ergonomics of a CMS without running
one.

## Where types live

Domain types go in `app/types/`. Content-derived types come from
`content.config.ts`. Component prop types stay in the component. If a type is
used in three or more places, it's a domain type.

That's the whole system. It's deliberately boring, which is the point.

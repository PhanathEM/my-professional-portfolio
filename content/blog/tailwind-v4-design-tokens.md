---
title: Design tokens in Tailwind CSS v4
description: How @theme turns a handful of CSS variables into the whole utility system, and why it makes dark mode and theming almost free.
date: 2026-04-08
author: Phanath
category: Tailwind CSS
cover: /images/blog/tailwind-v4-design-tokens.svg
tags:
  - tailwind
  - css
  - design-system
draft: false
---

Tailwind v4 dropped the JavaScript config. Your theme is now CSS, and that
changes how you think about tokens.

## Variables first, utilities second

Define the raw palette as plain custom properties, then map them into
Tailwind's namespace with `@theme inline`. The `inline` keyword means the
utility references the variable rather than baking in its value, so a swap of
`--bg` at runtime updates every `bg-bg` on the page.

```css
:root {
  --bg: #ffffff;
  --text: #191919;
}
.dark {
  --bg: #0a0a0b;
  --text: #f4f4f5;
}
@theme inline {
  --color-bg: var(--bg);
  --color-text: var(--text);
}
```

## Dark mode is a variant, not a duplicate

With tokens in place, dark mode is one `@custom-variant dark (&:where(.dark, .dark *))`
and a second block of variable values. Components never mention colours by
name; they say `bg-bg text-text border-border` and the theme does the rest.

## Radius, spacing, fonts — same trick

`--radius-xs`, `--font-sans`, `--spacing` all live in the same block. A design
change is a one-line edit; you never grep for `rounded-lg` across forty files.

## What to avoid

Arbitrary values (`bg-[#f1f1f3]`) are a smell once you have tokens. If a colour
is worth using twice, give it a name.

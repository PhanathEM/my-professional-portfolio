---
title: Composables that don't leak
description: "A short checklist for Vue composables: what they own, what they return, and how they clean up after themselves."
date: 2026-05-21
author: Phanath
category: Vue
cover: /images/blog/composables-that-dont-leak.svg
tags:
  - vue
  - composables
  - patterns
draft: false
---

A composable is a function that owns some reactive state and hands back a
small API. The ones that age badly all break the same handful of rules.

## Return refs, not values

If you return `query.value` the caller gets a snapshot and loses reactivity.
Return the ref and let them unwrap it in the template. When you want to hand
back an object, `reactive()` is fine — just don't destructure it on the way out.

## Own your side effects

Anything the composable starts, it stops. Timers, `addEventListener`,
`IntersectionObserver`, websocket subscriptions — all of them get torn down in
`onScopeDispose`, not `onUnmounted`. The difference matters the moment the
composable is called outside a component, for example inside a Pinia store.

```ts
export function useInterval(fn: () => void, ms: number) {
  const id = setInterval(fn, ms)
  onScopeDispose(() => clearInterval(id))
}
```

## Take options, not booleans

`useFetchUser(id, true)` tells the reader nothing. `useFetchUser(id, { immediate: true })`
reads at the call site and can grow without breaking callers.

## Accept refs *or* values

Most arguments should go through `toValue()` so the caller can pass a plain
string today and a `computed` next week without touching the composable.

## Keep it under a screen

If a composable no longer fits on one screen it is two composables. Split by
responsibility — fetching versus filtering, state versus persistence — and
compose them in the component.

That's the whole list. None of it is clever; it just keeps the seams where you
expect them six months later.

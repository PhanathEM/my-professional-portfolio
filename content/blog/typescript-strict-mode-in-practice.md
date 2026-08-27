---
title: TypeScript strict mode, and the flags beyond it
description: Strict mode is the baseline. These are the extra compiler options that catch the bugs strict mode still lets through.
date: 2026-07-09
author: Phanath
category: TypeScript
tags:
  - typescript
  - tooling
draft: false
---

Turning on `"strict": true` is table stakes. It bundles `noImplicitAny`,
`strictNullChecks` and friends, and most projects stop there. A few more flags
are worth the friction.

## noUncheckedIndexedAccess

Without it, `arr[0]` is typed as `T` even when the array is empty. With it, you
get `T | undefined` and the compiler makes you handle the gap.

```ts
const first = items[0]
//    ^? Item | undefined
if (first) {
  // narrowed to Item
}
```

It's noisy at first. After a week you stop noticing, and you stop shipping
"cannot read properties of undefined".

## noImplicitOverride

In a class hierarchy, this forces the `override` keyword when you replace a base
method. Rename the base method later and TypeScript flags every subclass that
thought it was overriding something.

## exactOptionalPropertyTypes

Makes `{ x?: number }` mean "absent or number", not "absent or number or
undefined". It surfaces the difference between *not passing* a prop and *passing
`undefined`* — which matters more than you'd think in component APIs.

## The one social rule

Ban `any` in review, allow `unknown` freely. `unknown` forces a narrowing step;
`any` silently disables the compiler for everything it touches. When you truly
need an escape hatch, `as` a specific type and leave a comment saying why.

None of this is exotic. It's just moving errors from runtime to the editor,
which is the entire reason to use TypeScript in the first place.

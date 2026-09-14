---
title: "Nuxt server routes: validation, errors and typed responses"
description: What a well-behaved /server/api handler looks like — input validation, consistent error shapes, and types that flow back into the page.
date: 2026-04-30
author: Phanath
category: Nuxt
cover: /images/blog/nuxt-server-routes-done-right.svg
tags:
  - nuxt
  - nitro
  - api
draft: false
---

Nitro makes it very easy to write a server route. It makes it just as easy to
write a bad one. Three habits keep them honest.

## Validate at the edge

Every handler that reads a body or query goes through `readValidatedBody` or
`getValidatedQuery` with a Zod schema. Invalid input becomes a 400 before any
of your code runs, and the parsed value is fully typed from that line on.

```ts
const schema = z.object({ email: z.string().email(), name: z.string().min(1) })

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, schema.parse)
  // body is { email: string; name: string }
})
```

## One error shape

Throw `createError({ statusCode, statusMessage, data })` and nothing else. The
client always receives the same envelope, and `useFetch` surfaces it on
`error.value` without any extra plumbing. Never `return { error: '...' }` with a
200 — it hides failures from every layer above.

## Let the types flow

Whatever the handler returns is the type `useFetch('/api/...')` resolves to.
That means the response shape is a contract: change it in one place and the
pages that consume it stop compiling. Keep the return statement simple and
explicit so that contract stays readable.

## Where the logic lives

The handler itself should be thin: validate, call a function in
`server/utils/`, return. Everything testable lives in that utility, which can be
called from a cron task or a CLI script without an HTTP event in sight.

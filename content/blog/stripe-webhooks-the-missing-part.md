---
title: "Stripe webhooks: the part the tutorial skips"
description: Signature checks, idempotency and retries — the three things that separate a demo checkout from one you can run in production.
date: 2026-01-29
author: Phanath
category: Node.js
cover: /images/blog/stripe-webhooks-the-missing-part.svg
tags:
  - stripe
  - node
  - payments
draft: false
---

Checkout is the easy half. Money actually moves when Stripe calls *you*, and
that endpoint has to be more careful than anything else in the app.

## Verify the signature with the raw body

Stripe signs the exact bytes it sends. If your framework has already parsed the
JSON, the signature check fails. Read the raw body for this one route only.

```ts
export default defineEventHandler(async (event) => {
  const raw = await readRawBody(event)
  const sig = getHeader(event, 'stripe-signature')!
  const evt = stripe.webhooks.constructEvent(raw!, sig, secret)
  // ...
})
```

## Be idempotent

Stripe retries until it gets a 2xx, so you will receive the same event twice.
Store `event.id` in a table with a unique constraint and skip anything you've
already processed. Do this *before* touching orders.

## Return 200 fast, do the work after

Long handlers time out and get retried, which makes the duplicate problem
worse. Acknowledge, then queue the fulfilment work.

## Listen for the right events

`checkout.session.completed` tells you the customer finished the flow;
`payment_intent.succeeded` tells you the money landed. Fulfil on the second one
for anything that isn't instant.

## Test with the CLI

`stripe listen --forward-to localhost:3000/api/stripe` replays real events to
your machine, and `stripe trigger payment_intent.succeeded` fires one on demand.
No tunnel, no guessing.

---
title: Designing a PostgreSQL schema you won't hate in six months
description: Naming, keys, timestamps, soft deletes and the small decisions that decide whether a schema ages well.
date: 2026-08-02
author: Phanath
category: PostgreSQL
tags:
  - postgresql
  - databases
  - backend
draft: false
---

Most schema pain is self-inflicted and comes from choices made in the first
hour. A checklist I now follow.

## Naming

- `snake_case` everywhere, plural table names (`users`, `lesson_materials`).
- Foreign keys are `<singular>_id` (`user_id`), always.
- Boolean columns read as assertions: `is_active`, `has_verified_email`.

Consistency here means you can guess a column name correctly without opening the
schema.

## Keys

Use `bigint generated always as identity` for internal primary keys. If you need
an ID that's safe to expose in a URL, add a separate `public_id` (a UUID or a
short random string) rather than leaking sequential integers.

## Timestamps on every table

`created_at timestamptz not null default now()` and `updated_at timestamptz`.
Keep `updated_at` current with a trigger, not application code — the database is
the only place that sees every write.

## Soft deletes, carefully

A nullable `deleted_at timestamptz` beats a `is_deleted` boolean: you keep *when*
it happened. Add a partial index —
`create index on lessons (id) where deleted_at is null` — and wrap the
"not deleted" filter in a view so you can't forget it.

## Constraints are documentation that executes

`check (starts_at < ends_at)`, `unique (teacher_id, starts_at)`, `not null` by
default. Every constraint you add is a class of bad data that can never reach a
bug report.

## Migrations

Plain SQL files, numbered, forward-only, checked into the repo and run in CI
against a throwaway database. No ORM auto-sync — you want to review the exact DDL
that will hit production.

None of this is clever. It's just the set of defaults that consistently produces
a schema I'm still happy to work in months later.

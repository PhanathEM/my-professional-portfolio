---
title: Learning Platform
description: A cross-border learning platform connecting students and teachers, with timezone-aware scheduling, lesson materials and progress tracking.
summary: A modern learning platform designed to connect students and teachers from different countries — built end to end with Nuxt, a typed server API and PostgreSQL.
year: 2024
role: Solo full-stack developer
timeline: 10 weeks
stack:
  - Nuxt
  - Vue
  - TypeScript
  - Tailwind CSS
  - Node.js
  - PostgreSQL
features:
  - Role-based accounts for students, teachers and admins
  - Timezone-aware lesson scheduling
  - Lesson materials and submission workflow
  - Progress dashboard with weekly summaries
cover: /images/projects/learning-platform.svg
repo: https://github.com/phanath/learning-platform
demo: https://learning-platform.phanath.dev
featured: true
order: 1
---

## Overview

The Learning Platform is a study project I took on to practise building a real,
multi-role product rather than another to-do app. The goal was a place where a
student in one country could find a teacher in another, book recurring lessons,
exchange materials, and see their progress over time.

I owned every layer: the data model, the API, authentication, the scheduling
logic and the full Nuxt frontend.

## Problem

Booking lessons across timezones is deceptively hard. A "Tuesday 4pm" slot means
different things to the two people involved, recurring lessons drift when either
side changes their working hours, and teachers need a clear view of their week
without doing mental arithmetic.

On top of that, three roles — student, teacher, admin — each need a different
view of the same underlying data, which usually turns into tangled conditionals
if it isn't designed for up front.

## Solution

Every time value is stored in UTC and rendered in the viewer's timezone, which
is captured on sign-up and adjustable in settings. Availability is modelled as
weekly rules plus explicit exceptions, so a teacher defines their schedule once
and overrides individual days as needed.

The three roles are separated at the routing layer with per-role layouts and a
single server-side permission helper, so a component never has to ask "what kind
of user is this?".

## Architecture

- **Frontend** — Nuxt with route-level code splitting; role-specific dashboards
  under `/app/(student|teacher|admin)`.
- **API** — Nitro server routes grouped by resource, each validating input with a
  shared schema and returning typed responses.
- **Database** — PostgreSQL with a normalised schema: `users`, `availability_rules`,
  `availability_exceptions`, `lessons`, `lesson_materials`, `submissions`.
- **Scheduling** — a pure module that takes availability rules + existing lessons
  and returns bookable slots for a given date range and timezone. It has no
  framework dependencies, which made it straightforward to test in isolation.

## Challenges

The recurring-lesson logic went through three rewrites. The version that stuck
treats a recurring lesson as a template that *generates* concrete lesson rows a
few weeks ahead, rather than trying to compute occurrences on the fly at read
time. Reads became trivial; the cost moved to a small scheduled job.

The second challenge was keeping the progress dashboard fast. The naive query
joined five tables per student; replacing it with a weekly rollup table updated
on lesson completion brought the page from ~800ms to under 50ms.

## What I Learned

- Model time explicitly. "Store UTC, render local" is easy to say and easy to get
  wrong in a dozen small places — a single `formatInZone` helper used everywhere
  is worth the discipline.
- Precomputing beats clever queries for anything a user waits on.
- Designing roles into the route structure keeps permission logic out of
  components, where it tends to rot.

## Screenshots

> Screenshots are placeholders in this portfolio build. Replace the images in
> `/public/images/projects/` with real captures from your deployment.

![Teacher weekly schedule view](/images/projects/learning-platform.svg)

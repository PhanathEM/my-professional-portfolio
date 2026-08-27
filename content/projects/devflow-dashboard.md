---
title: DevFlow — Admin Dashboard
description: An internal operations dashboard for content, users and reporting, built on a fully typed Nuxt server API with role-based access control.
summary: A professional admin dashboard — composable data tables, granular permissions, an audit trail and scheduled reports — built to be dropped into any Nuxt product.
year: 2025
role: Solo full-stack developer
timeline: 6 weeks
stack:
  - Nuxt
  - TypeScript
  - Nitro
  - PostgreSQL
  - Tailwind CSS
features:
  - Composable data table with server-side sort, filter and pagination
  - Granular role-based access control
  - Audit log of every mutation
  - CSV export and scheduled email digests
cover: /images/projects/devflow-dashboard.svg
repo: https://github.com/phanath/devflow
featured: true
order: 2
---

## Overview

DevFlow is a reusable admin layer for internal tools. I kept seeing the same
requirements on small projects — a table you can sort and filter, some CRUD
forms, "who changed this?", and a way to export data — so I built a clean
version once, with the intent of reusing it.

## Problem

Admin panels tend to start simple and rot fast. The data table gets copy-pasted
and diverges, permission checks get sprinkled through components, and there's no
record of who did what when something goes wrong.

## Solution

The centrepiece is a single `<DataTable>` component driven entirely by a
server-side query descriptor: columns, sort, filters and pagination are all
serialised to the URL, so a filtered view is shareable and survives a refresh.

Permissions are defined as a flat map of `resource:action` strings. A server
helper resolves the current user's grants once per request; the client mirrors
the same map to hide controls the user can't use, but the server is the source
of truth.

Every write goes through a small `mutate()` wrapper that records the actor, the
resource, a diff and a timestamp into an `audit_log` table.

## Architecture

- **UI** — Nuxt with a dedicated `dashboard` layout; feature folders each own
  their pages, composables and table config.
- **API** — Nitro routes following `routes → service → repository`. Services hold
  business rules; repositories are the only place SQL lives.
- **Auth** — session cookies, CSRF protection on mutations, permission map loaded
  from the database and cached per request.
- **Reporting** — a scheduled task builds CSV digests and hands them to an email
  provider through a thin adapter interface.

## Challenges

Getting the data-table query contract right took iteration. The trap is letting
the client send raw SQL fragments; instead filters are a typed union
(`equals`, `contains`, `in`, `between`, `dateRange`) that the repository layer
translates to parameterised SQL, so the surface stays safe and predictable.

## What I Learned

- A well-designed generic component pays for itself by the third screen — but
  only if its contract is strict. Loose props are how generics become
  unmaintainable.
- Audit logging is far easier to add as a wrapper on day one than to retrofit.
- Putting query state in the URL is a small decision with a big usability payoff.

## Screenshots

> Placeholder imagery — swap in real screenshots from your build.

![DevFlow users table with filters applied](/images/projects/devflow-dashboard.svg)

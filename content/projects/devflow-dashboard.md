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
demo: https://devflow.phanath.dev
featured: true
order: 2
---

## Overview

DevFlow is a reusable admin layer for internal tools. I kept seeing the same
requirements on small projects — a table you can sort and filter, some CRUD
forms, "who changed this?", and a way to export data — so I built a clean
version once, with the intent of reusing it.

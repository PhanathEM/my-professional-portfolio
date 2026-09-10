---
title: Task Manager REST API
description: A scalable REST API for team task management — projects, tasks, comments and activity feeds — with layered architecture, validation and OpenAPI docs.
summary: A backend-focused build — a clean, well-tested REST API for team task management with JWT auth, Zod validation and a Dockerised local stack.
year: 2025
role: Backend developer
timeline: 4 weeks
stack:
  - Node.js
  - Express
  - TypeScript
  - PostgreSQL
  - Docker
features:
  - Layered architecture (routes → services → repositories)
  - Zod request validation and typed responses
  - JWT auth with refresh tokens
  - Dockerised local stack + CI test suite
cover: /images/projects/task-manager-api.svg
repo: https://github.com/phanath/task-manager-api
demo: https://task-manager-api.phanath.dev/docs
featured: true
order: 3
---

## Overview

This project was deliberately backend-only: no UI, just a REST API I could hold
to a higher standard on structure, validation and testing. It covers the core of
a task tool — organisations, projects, tasks, comments and an activity feed.

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
featured: true
order: 3
---

## Overview

This project was deliberately backend-only: no UI, just a REST API I could hold
to a higher standard on structure, validation and testing. It covers the core of
a task tool — organisations, projects, tasks, comments and an activity feed.

## Problem

Small APIs often collapse route handlers, business logic and database access into
one file. It works until it doesn't: logic can't be reused, tests have to spin up
HTTP, and swapping the database means touching everything.

## Solution

A strict three-layer structure:

- **Routes** parse and validate the request with Zod, then call a service.
- **Services** contain business rules and know nothing about HTTP.
- **Repositories** are the only code that touches SQL.

Responses are typed end to end: the Zod schema that validates input also infers
the request type, and repository return types flow out to the response.

## Architecture

- **Runtime** — Node.js + Express, TypeScript in strict mode.
- **Auth** — short-lived JWT access tokens plus rotating refresh tokens stored
  hashed in the database.
- **Database** — PostgreSQL with SQL migrations checked into the repo; no ORM,
  just a small query helper.
- **Local dev** — `docker compose up` starts Postgres and the API with hot
  reload; the same compose file backs the CI test job.
- **Docs** — request/response schemas are compiled to an OpenAPI document served
  at `/docs`.

## Challenges

Refresh-token rotation needed care: issuing a new refresh token on every use,
invalidating the previous one, and detecting reuse of a revoked token as a
possible theft signal. Modelling the token family as a chain in the database
made the reuse check a single query.

## What I Learned

- Validation at the boundary plus types flowing inward removes a whole category
  of bugs — you stop writing defensive checks in the middle of the app.
- No-ORM Postgres is very pleasant for an API this size and keeps the SQL honest.
- If the test suite needs the real database, make that the same database the
  developer runs locally. Docker Compose makes that a non-issue.

## Screenshots

> This project ships an OpenAPI UI rather than screenshots — the placeholder
> below stands in for a capture of `/docs`.

![OpenAPI documentation view](/images/projects/task-manager-api.svg)

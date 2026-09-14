---
title: A Docker Compose file for the whole stack
description: Postgres, Redis, mail catcher and the app itself in one compose file — so a new machine is `git clone` and one command.
date: 2026-02-25
author: Phanath
category: Docker
cover: /images/blog/docker-compose-for-local-dev.svg
tags:
  - docker
  - devops
  - tooling
draft: false
---

The goal is simple: anyone should be able to clone the repo, run one command
and have the exact services the app expects. Compose gets you there with very
little YAML.

## The services

```yaml
services:
  db:
    image: postgres:17
    environment:
      POSTGRES_PASSWORD: dev
    ports: ['5432:5432']
    volumes: ['pg:/var/lib/postgresql/data']
  redis:
    image: redis:7-alpine
    ports: ['6379:6379']
  mail:
    image: axllent/mailpit
    ports: ['8025:8025', '1025:1025']
volumes:
  pg:
```

That's a database with persistent storage, a cache and a mail catcher with a
web UI on port 8025 so you can read every email the app sends.

## Keep the app itself outside

For a Nuxt or Laravel project I run the app on the host — hot reload is faster
and editors behave better — and only containerise the things I don't want to
install natively. `docker compose up -d` in the morning, then `pnpm dev`.

## Named volumes, not bind mounts, for data

Bind-mounting the Postgres data directory onto Windows or macOS is slow and
occasionally corrupts. A named volume is fast and survives `docker compose down`.

## One `.env`, one source of truth

The compose file reads the same `.env` the app does, so `DB_PASSWORD` is
defined exactly once. When it changes, it changes everywhere.

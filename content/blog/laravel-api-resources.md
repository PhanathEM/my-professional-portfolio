---
title: Stop returning Eloquent models from your Laravel API
description: API Resources put a stable contract between your database and your JSON. Here's the minimal way to use them without ceremony.
date: 2026-03-17
author: Phanath
category: Laravel
cover: /images/blog/laravel-api-resources.svg
tags:
  - laravel
  - php
  - api
draft: false
---

`return Post::all();` works. It also leaks every column you ever add,
including the ones you'd rather nobody saw, and it welds the API's shape to the
table's shape forever.

## A resource per model

An `API Resource` is a class with one method, `toArray`, that decides exactly
what goes out. Add a column to the table and nothing changes on the wire until
you say so.

```php
class PostResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'author' => new UserResource($this->whenLoaded('author')),
            'published_at' => $this->published_at?->toIso8601String(),
        ];
    }
}
```

## `whenLoaded` prevents N+1

Relations only appear if the controller eager-loaded them. Forget the `with()`
and the field simply isn't there — no accidental query storm.

## Collections and pagination

`PostResource::collection($posts)` handles both plain collections and
paginators, and the paginator version includes `meta` and `links` for free.

## Dates and money

Format them in the resource, once. The client should never have to guess
whether a date is UTC or which currency an integer is in.

It's about ten lines per model, and it's the difference between an API you can
version and one you can only break.

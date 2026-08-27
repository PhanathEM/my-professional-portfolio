import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const blog = defineCollection({
  type: 'page',
  source: 'blog/*.md',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    author: z.string().default('Phanath'),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
})

const projects = defineCollection({
  type: 'page',
  source: 'projects/*.md',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    summary: z.string(),
    year: z.number(),
    role: z.string(),
    timeline: z.string(),
    stack: z.array(z.string()).default([]),
    features: z.array(z.string()).default([]),
    cover: z.string().optional(),
    repo: z.string().optional(),
    demo: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(999),
  }),
})

export default defineContentConfig({
  collections: { blog, projects },
})

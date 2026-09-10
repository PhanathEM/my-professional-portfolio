import type { Project } from '~/types'

/**
 * Featured projects. Each `caseStudy: true` entry has a matching Markdown
 * file at `content/projects/<slug>.md` rendered at `/projects/<slug>`.
 * Cover images are lightweight SVGs in `/public/images/projects/` — replace
 * them with real screenshots when available.
 */
export const projects: Project[] = [
  {
    slug: 'learning-platform',
    title: 'Learning Platform',
    description:
      'A modern learning platform designed to connect students and teachers from different countries, with scheduling, lessons and progress tracking.',
    year: 2024,
    role: 'Solo full-stack developer',
    stack: ['Nuxt', 'Vue', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    features: [
      'Role-based accounts for students, teachers and admins',
      'Timezone-aware lesson scheduling',
      'Lesson materials and submission workflow',
      'Progress dashboard with weekly summaries',
    ],
    cover: '/images/projects/learning-platform.svg',
    repo: 'https://github.com/phanath/learning-platform', // [PLACEHOLDER]
    demo: 'https://learning-platform.phanath.dev', // [PLACEHOLDER]
    featured: true,
    caseStudy: true,
  },
  {
    slug: 'devflow-dashboard',
    title: 'DevFlow — Admin Dashboard',
    description:
      'An internal operations dashboard: content management, user administration, and reporting built on a typed Nuxt server API.',
    year: 2025,
    role: 'Solo full-stack developer',
    stack: ['Nuxt', 'TypeScript', 'Nitro', 'PostgreSQL', 'Tailwind CSS'],
    features: [
      'Composable data table with server-side sort, filter and pagination',
      'Granular role-based access control',
      'Audit log of every mutation',
      'CSV export and scheduled email digests',
    ],
    cover: '/images/projects/devflow-dashboard.svg',
    repo: 'https://github.com/phanath/devflow', // [PLACEHOLDER]
    demo: 'https://devflow.phanath.dev', // [PLACEHOLDER]
    featured: true,
    caseStudy: true,
  },
  {
    slug: 'task-manager-api',
    title: 'Task Manager REST API',
    description:
      'A scalable REST API for team task management: projects, tasks, comments and activity feeds, with validation and OpenAPI docs.',
    year: 2025,
    role: 'Backend developer',
    stack: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Docker'],
    features: [
      'Layered architecture (routes → services → repositories)',
      'Zod request validation and typed responses',
      'JWT auth with refresh tokens',
      'Dockerised local stack + CI test suite',
    ],
    cover: '/images/projects/task-manager-api.svg',
    repo: 'https://github.com/phanath/task-manager-api', // [PLACEHOLDER]
    demo: 'https://task-manager-api.phanath.dev/docs', // [PLACEHOLDER]
    featured: true,
    caseStudy: true,
  },
  {
    slug: 'portfolio-site',
    title: 'This Portfolio',
    description:
      'The site you are looking at — built with Nuxt 4, Vue 3, Tailwind CSS v4 and Nuxt Content, with a centralised design-token system.',
    year: 2026,
    role: 'Designer & developer',
    stack: ['Nuxt', 'Vue', 'TypeScript', 'Tailwind CSS', 'Nuxt Content'],
    features: [
      'Centralised design tokens — recolour the whole site in one file',
      'Dark / light / system theme',
      'Content-driven blog and case studies',
      'Full SEO: sitemap, robots, Open Graph, JSON-LD',
    ],
    cover: '/images/projects/portfolio-site.svg',
    repo: 'https://github.com/phanath/portfolio', // [PLACEHOLDER]
    demo: 'https://phanath.dev', // [PLACEHOLDER]
    featured: false,
    caseStudy: true,
  },
  {
    slug: 'ecommerce-storefront',
    title: 'E-Commerce Storefront',
    description:
      'A storefront with cart, checkout and order history — server-rendered for SEO, with Stripe handling payments and webhooks keeping orders in sync.',
    year: 2025,
    role: 'Solo full-stack developer',
    stack: ['Nuxt', 'Vue', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL'],
    features: [
      'Server-rendered catalogue with faceted search',
      'Cart persisted across sessions and devices',
      'Stripe Checkout with webhook-driven order state',
      'Order history and downloadable invoices',
    ],
    cover: '/images/projects/ecommerce-storefront.svg',
    repo: 'https://github.com/phanath/ecommerce-storefront', // [PLACEHOLDER]
    demo: 'https://ecommerce-storefront.phanath.dev', // [PLACEHOLDER]
    featured: false,
    caseStudy: true,
  },
  {
    slug: 'realtime-chat',
    title: 'Realtime Chat',
    description:
      'Group and direct messaging over WebSockets, with typing indicators, read receipts and message history backed by Redis and PostgreSQL.',
    year: 2025,
    role: 'Solo full-stack developer',
    stack: ['Nuxt', 'TypeScript', 'Node.js', 'WebSocket', 'Redis', 'PostgreSQL'],
    features: [
      'Rooms and direct messages',
      'Presence and typing indicators',
      'Read receipts synced across devices',
      'Redis pub/sub fan-out for horizontal scaling',
    ],
    cover: '/images/projects/realtime-chat.svg',
    repo: 'https://github.com/phanath/realtime-chat', // [PLACEHOLDER]
    demo: 'https://realtime-chat.phanath.dev', // [PLACEHOLDER]
    featured: false,
    caseStudy: true,
  },
  {
    slug: 'expense-tracker',
    title: 'Expense Tracker',
    description:
      'Personal finance tracking with budgets, recurring transactions and monthly reports rendered from a normalised Postgres schema.',
    year: 2024,
    role: 'Solo full-stack developer',
    stack: ['Vue', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    features: [
      'Budgets per category with rollover',
      'Recurring transactions generated ahead of time',
      'Monthly reports with category breakdown',
      'CSV import and export',
    ],
    cover: '/images/projects/expense-tracker.svg',
    repo: 'https://github.com/phanath/expense-tracker', // [PLACEHOLDER]
    demo: 'https://expense-tracker.phanath.dev', // [PLACEHOLDER]
    featured: false,
    caseStudy: true,
  },
  {
    slug: 'weather-dashboard',
    title: 'Weather Dashboard',
    description:
      'A location-aware forecast dashboard with cached API responses, offline fallback and a fully keyboard-navigable interface.',
    year: 2024,
    role: 'Frontend developer',
    stack: ['Nuxt', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Saved locations with drag-to-reorder',
      'Responses cached with stale-while-revalidate',
      'Offline fallback from the last good payload',
      'Fully keyboard navigable',
    ],
    cover: '/images/projects/weather-dashboard.svg',
    repo: 'https://github.com/phanath/weather-dashboard', // [PLACEHOLDER]
    demo: 'https://weather-dashboard.phanath.dev', // [PLACEHOLDER]
    featured: false,
    caseStudy: true,
  },
  {
    slug: 'blog-cms',
    title: 'Headless Blog CMS',
    description:
      'A Markdown-driven publishing system with drafts, scheduled posts and a typed content schema validated at build time.',
    year: 2023,
    role: 'Solo full-stack developer',
    stack: ['Nuxt', 'Nuxt Content', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    features: [
      'Typed frontmatter validated at build time',
      'Draft and scheduled publishing',
      'Tag and category taxonomies',
      'RSS and sitemap generation',
    ],
    cover: '/images/projects/blog-cms.svg',
    repo: 'https://github.com/phanath/blog-cms', // [PLACEHOLDER]
    demo: 'https://blog-cms.phanath.dev', // [PLACEHOLDER]
    featured: false,
    caseStudy: true,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

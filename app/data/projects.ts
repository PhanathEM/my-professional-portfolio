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
    demo: '',
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
    demo: '',
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
    demo: '',
    featured: false,
    caseStudy: true,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

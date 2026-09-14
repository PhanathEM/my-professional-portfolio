import type { SkillCategory } from '~/types'

/**
 * Grouped technology stack. Category titles/descriptions live in
 * `i18n/locales/*.json` under `skills.<id>.*`. Skill names are proper nouns
 * and stay as-is. Icons use the `lucide:*` set for a calm, consistent look.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    icon: 'lucide:layout-panel-top',
    skills: [
      { name: 'HTML', icon: 'lucide:code-xml', logo: 'logos:html-5' },
      { name: 'CSS', icon: 'lucide:palette', logo: 'logos:css-3' },
      { name: 'JavaScript', icon: 'lucide:braces', logo: 'logos:javascript' },
      { name: 'TypeScript', icon: 'lucide:file-code', logo: 'logos:typescript-icon' },
      { name: 'Vue', icon: 'lucide:component', logo: 'logos:vue' },
      { name: 'Nuxt', icon: 'lucide:mountain', logo: 'logos:nuxt-icon' },
      { name: 'Tailwind CSS', icon: 'lucide:wind', logo: 'logos:tailwindcss-icon' },
    ],
  },
  {
    id: 'backend',
    icon: 'lucide:server',
    skills: [
      { name: 'Node.js', icon: 'lucide:hexagon', logo: 'logos:nodejs-icon' },
      { name: 'Express', icon: 'lucide:route', logo: 'logos:express' },
      { name: 'Nitro', icon: 'lucide:zap', logo: 'lucide:zap' },
      { name: 'Laravel', icon: 'lucide:layers', logo: 'logos:laravel' },
      { name: 'PHP', icon: 'lucide:file-code-2', logo: 'logos:php' },
    ],
  },
  {
    id: 'database',
    icon: 'lucide:database',
    skills: [
      { name: 'PostgreSQL', icon: 'lucide:database', logo: 'logos:postgresql' },
      { name: 'MySQL', icon: 'lucide:database', logo: 'logos:mysql-icon' },
      { name: 'SQL Server', icon: 'lucide:database', logo: 'lucide:database' },
      { name: 'Supabase', icon: 'lucide:database-zap', logo: 'logos:supabase-icon' },
    ],
  },
  {
    id: 'tools',
    icon: 'lucide:wrench',
    skills: [
      { name: 'Git', icon: 'lucide:git-branch', logo: 'logos:git-icon' },
      { name: 'GitHub', icon: 'lucide:github', logo: 'logos:github-icon' },
      { name: 'VS Code', icon: 'lucide:square-terminal', logo: 'logos:visual-studio-code' },
      { name: 'Vite', icon: 'lucide:bolt', logo: 'logos:vitejs' },
      { name: 'Docker', icon: 'lucide:container', logo: 'logos:docker-icon' },
    ],
  },
]

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
      { name: 'HTML', icon: 'lucide:code-xml' },
      { name: 'CSS', icon: 'lucide:palette' },
      { name: 'JavaScript', icon: 'lucide:braces' },
      { name: 'TypeScript', icon: 'lucide:file-code' },
      { name: 'Vue', icon: 'lucide:component' },
      { name: 'Nuxt', icon: 'lucide:mountain' },
      { name: 'Tailwind CSS', icon: 'lucide:wind' },
    ],
  },
  {
    id: 'backend',
    icon: 'lucide:server',
    skills: [
      { name: 'Node.js', icon: 'lucide:hexagon' },
      { name: 'Express', icon: 'lucide:route' },
      { name: 'Nitro', icon: 'lucide:zap' },
      { name: 'Laravel', icon: 'lucide:layers' },
      { name: 'PHP', icon: 'lucide:file-code-2' },
    ],
  },
  {
    id: 'database',
    icon: 'lucide:database',
    skills: [
      { name: 'PostgreSQL', icon: 'lucide:database' },
      { name: 'MySQL', icon: 'lucide:database' },
      { name: 'SQL Server', icon: 'lucide:database' },
      { name: 'Supabase', icon: 'lucide:database-zap' },
    ],
  },
  {
    id: 'tools',
    icon: 'lucide:wrench',
    skills: [
      { name: 'Git', icon: 'lucide:git-branch' },
      { name: 'GitHub', icon: 'lucide:github' },
      { name: 'VS Code', icon: 'lucide:square-terminal' },
      { name: 'Vite', icon: 'lucide:bolt' },
      { name: 'Docker', icon: 'lucide:container' },
    ],
  },
]

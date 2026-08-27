<script setup lang="ts">
/** Small, calm technology chip used across project cards and case studies. */
defineProps<{ name: string }>()

// Map a handful of stack names to a representative Lucide glyph.
const iconMap: Record<string, string> = {
  Nuxt: 'lucide:mountain',
  Vue: 'lucide:component',
  TypeScript: 'lucide:file-code',
  JavaScript: 'lucide:braces',
  'Tailwind CSS': 'lucide:wind',
  'Node.js': 'lucide:hexagon',
  Express: 'lucide:route',
  Nitro: 'lucide:zap',
  Laravel: 'lucide:layers',
  PHP: 'lucide:file-code-2',
  PostgreSQL: 'lucide:database',
  MySQL: 'lucide:database',
  'SQL Server': 'lucide:database',
  Supabase: 'lucide:database-zap',
  Docker: 'lucide:container',
  'Nuxt Content': 'lucide:file-text',
  Git: 'lucide:git-branch',
}
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-subtle px-2.5 py-1 font-mono text-[0.72rem] text-muted"
  >
    <Icon :name="iconMap[name] ?? 'lucide:box'" :size="12" aria-hidden="true" />
    {{ name }}
  </span>
</template>

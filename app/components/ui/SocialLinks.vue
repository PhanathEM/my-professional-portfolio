<script setup lang="ts">
import { social } from '~/data/social'

withDefaults(
  defineProps<{
    size?: 'sm' | 'md'
    variant?: 'bordered' | 'plain'
  }>(),
  { size: 'md', variant: 'bordered' },
)
</script>

<template>
  <ul class="flex items-center gap-2">
    <li v-for="link in social" :key="link.label">
      <a
        :href="link.href"
        :target="link.href.startsWith('http') ? '_blank' : undefined"
        :rel="link.href.startsWith('http') ? 'noopener noreferrer' : undefined"
        :aria-label="`${link.label}${link.handle ? ` — ${link.handle}` : ''}`"
        class="inline-flex items-center justify-center rounded-md text-muted transition-colors duration-200 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        :class="[
          size === 'sm' ? 'size-9' : 'size-10',
          variant === 'bordered' &&
            'border border-border bg-surface hover:border-accent/40 hover:bg-surface-elevated',
        ]"
      >
        <Icon :name="link.icon" :size="size === 'sm' ? 16 : 18" aria-hidden="true" />
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    icon?: string
    variant?: 'default' | 'accent' | 'outline'
    size?: 'sm' | 'md'
  }>(),
  { variant: 'default', size: 'md' },
)
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full font-medium tracking-tight whitespace-nowrap"
    :class="[
      size === 'sm' ? 'px-2.5 py-0.5 text-[0.72rem]' : 'px-3 py-1 text-xs',
      {
        'border border-border bg-surface text-muted': variant === 'default',
        'border border-accent/25 bg-accent/10 text-accent': variant === 'accent',
        'border border-border-strong text-subtle': variant === 'outline',
      },
    ]"
  >
    <Icon v-if="icon" :name="icon" :size="size === 'sm' ? 12 : 13" aria-hidden="true" />
    <slot />
  </span>
</template>

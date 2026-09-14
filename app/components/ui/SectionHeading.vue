<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    description?: string
    align?: 'left' | 'center'
    as?: 'h2' | 'h1'
    /** `sm` matches the button text size, for headings that sit beside one. */
    descriptionSize?: 'sm' | 'base'
    titleSize?: 'sm' | 'base'
  }>(),
  { align: 'left', as: 'h2', descriptionSize: 'base', titleSize: 'base' },
)
</script>

<template>
  <div :class="['max-w-2xl', align === 'center' && 'mx-auto text-center']">
    <p
      v-if="eyebrow"
      class="mb-3 flex items-center gap-2.5 font-mono text-xs font-medium tracking-[0.14em] text-accent uppercase"
      :class="align === 'center' && 'justify-center'"
    >
      <span class="h-px w-6 bg-accent/50" aria-hidden="true" />
      {{ eyebrow }}
    </p>

    <component
      :is="as"
      class="text-balance font-semibold tracking-tight text-text"
      :class="titleSize === 'sm' ? 'text-sm' : 'text-3xl sm:text-4xl'"
    >
      {{ title }}
    </component>

    <p
      v-if="description"
      class="mt-4 text-pretty text-muted"
      :class="descriptionSize === 'sm' ? 'text-sm/relaxed' : 'text-base/relaxed sm:text-lg/relaxed'"
    >
      {{ description }}
    </p>
  </div>
</template>

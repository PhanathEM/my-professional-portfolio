<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string
    alt?: string
    title?: string
    width?: string | number
    height?: string | number
  }>(),
  { alt: '', title: undefined, width: undefined, height: undefined },
)
</script>

<template>
  <figure class="not-prose my-8">
    <img
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      class="w-full rounded-xs border border-border"
      loading="lazy"
      decoding="async"
    />
    <figcaption v-if="title" class="mt-3 text-center text-xs text-subtle">
      {{ title }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
/**
 * Scroll-reveal wrapper built on Motion for Vue.
 * - Respects `prefers-reduced-motion`: content renders immediately, no transform.
 * - `once` so elements don't re-animate on scroll-back.
 */
withDefaults(
  defineProps<{
    y?: number
    delay?: number
    duration?: number
    once?: boolean
  }>(),
  { y: 16, delay: 0, duration: 0.5, once: true },
)

const reduced = usePrefersReducedMotion()
</script>

<template>
  <div v-if="reduced">
    <slot />
  </div>

  <Motion
    v-else
    :initial="{ opacity: 0, y }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :in-view-options="{ once, margin: '0px 0px -12% 0px' }"
    :transition="{ duration, delay, ease: [0.16, 1, 0.3, 1] }"
  >
    <slot />
  </Motion>
</template>

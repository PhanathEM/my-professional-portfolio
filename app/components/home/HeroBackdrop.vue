<script setup lang="ts">
import { heroImages } from '~/data/hero'

/**
 * Hero backdrop: a full-bleed tilted photo collage.
 *  - a dense grid of image tiles, each rotated a little (more toward the edges)
 *    on a slight perspective — the "photos fanned on a table" look
 *  - the whole grid drifts upward slowly and loops seamlessly
 *  - only soft top / bottom fades + a gentle lightening behind the headline;
 *    the photos stay clearly visible
 *  - freezes for `prefers-reduced-motion`, pauses while the tab is hidden
 *
 * Photos come from `app/data/hero.ts` (files in `public/images/hero/`).
 */
const reduced = usePrefersReducedMotion()

const COLS = 6 // max columns (fewer via CSS on small screens)
const ROWS = 6 // rows in one loop half; rendered twice for a seamless loop

const n = Math.max(heroImages.length, 1)
const cells = computed(() => {
  const half = Array.from({ length: COLS * ROWS }, (_, k) => {
    const r = Math.floor(k / COLS)
    const c = k % COLS
    const img = heroImages[(r * 3 + c * 5 + r * c) % n]!
    // fan: edge columns rotate more, plus a small deterministic jitter
    const rot = (c - (COLS - 1) / 2) * 2.3 + (((r + c) % 3) - 1) * 1.3
    return { ...img, rot }
  })
  return [...half, ...half]
})

const paused = ref(false)
onMounted(() => {
  const onVis = () => (paused.value = document.visibilityState !== 'visible')
  document.addEventListener('visibilitychange', onVis)
  onBeforeUnmount(() => document.removeEventListener('visibilitychange', onVis))
})
</script>

<template>
  <div class="absolute inset-0 overflow-hidden" aria-hidden="true">
    <!-- perspective stage -->
    <div class="hero-stage absolute left-1/2 top-[-14%] h-[128%] w-[124%] -translate-x-1/2">
      <div
        class="hero-collage grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3 lg:grid-cols-6"
        :class="{ 'hero-collage--paused': paused || reduced }"
      >
        <div
          v-for="(cell, k) in cells"
          :key="k"
          class="overflow-hidden rounded-xl shadow-xl ring-1 ring-black/10"
          :style="{ transform: `rotate(${cell.rot}deg) scale(1.04)` }"
        >
          <NuxtImg
            :src="cell.src"
            :alt="cell.alt"
            class="aspect-4/3 w-full object-cover saturate-[0.82] contrast-[1.03] brightness-[0.98]"
            width="420"
            height="315"
            sizes="(max-width: 640px) 34vw, (max-width: 1024px) 26vw, 18vw"
            :loading="k < 12 ? 'eager' : 'lazy'"
          />
        </div>
      </div>
    </div>

    <!-- keep photos visible: only soft edge fades + a gentle lift behind the copy -->
    <div
      class="absolute inset-0 [background:radial-gradient(ellipse_55%_80%_at_22%_50%,var(--bg)_0%,color-mix(in_oklab,var(--bg)_35%,transparent)_45%,transparent_72%)]"
    />
    <div class="absolute inset-0 bg-bg/10" />
    <div class="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-bg to-transparent" />
    <div class="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-bg to-transparent" />
  </div>
</template>

<style scoped>
.hero-stage {
  perspective: 1600px;
}
.hero-collage {
  transform: rotateX(6deg);
  transform-origin: top center;
  animation: hero-collage-drift 44s linear infinite;
  will-change: transform;
}
@keyframes hero-collage-drift {
  from {
    transform: rotateX(6deg) translateY(0);
  }
  to {
    transform: rotateX(6deg) translateY(-50%);
  }
}
.hero-collage--paused {
  animation-play-state: paused;
}
</style>

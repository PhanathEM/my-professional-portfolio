<script setup lang="ts">
import { heroImages } from '~/data/hero'

/**
 * Full-bleed photo wall used as the hero background: vertical columns that
 * scroll slowly and loop forever.
 *  - columns alternate direction — 1st up, 2nd down, 3rd up, …
 *  - each runs at its own speed so they never line up into a visible band
 *  - tiles vary in height, keeping the masonry feel
 *  - masked so it fades on all four edges (real transparency, so it reads
 *    correctly on both themes)
 *
 * It fills its parent, so the parent decides the size. Freezes for
 * `prefers-reduced-motion`; pauses while the tab is hidden.
 * Photos: `app/data/hero.ts` → `public/images/hero/`.
 */
const reduced = usePrefersReducedMotion()

/**
 * ⏱️ SPEED — seconds for one full loop of each column, left to right.
 * Bigger number = SLOWER.
 */
const COLUMN_SECONDS = [100, 125, 150, 115, 140, 165]

/** Narrow screens can't fit six columns; reveal them as width allows. */
const COLUMN_VISIBILITY = [
  '',
  '',
  'hidden sm:block',
  'hidden lg:block',
  'hidden lg:block',
  'hidden xl:block',
]

const n = Math.max(heroImages.length, 1)
const ASPECTS = ['aspect-3/4', 'aspect-square', 'aspect-4/5', 'aspect-3/4', 'aspect-4/5']

// Each column is offset into the photo list so no two show the same run.
const columns = computed(() =>
  COLUMN_SECONDS.map((_, c) => {
    const tiles = Array.from({ length: n }, (_, i) => ({
      img: heroImages[(i + c * 3) % n]!,
      aspect: ASPECTS[(i + c) % ASPECTS.length]!,
    }))
    return [...tiles, ...tiles] // duplicated for a seamless loop
  }),
)

const paused = ref(false)
onMounted(() => {
  const onVis = () => (paused.value = document.visibilityState !== 'visible')
  document.addEventListener('visibilitychange', onVis)
  onBeforeUnmount(() => document.removeEventListener('visibilitychange', onVis))
})
</script>

<template>
  <div
    class="hero-collage relative flex h-full w-full min-w-0 gap-2 overflow-hidden sm:gap-2.5"
    :class="{ 'hero-collage--paused': paused || reduced }"
  >
    <div
      v-for="(col, c) in columns"
      :key="c"
      class="relative min-w-0 flex-1"
      :class="COLUMN_VISIBILITY[c]"
    >
      <div
        class="hero-col absolute inset-x-0 top-0 flex flex-col gap-2 sm:gap-2.5"
        :class="c % 2 === 1 ? 'hero-col--down' : 'hero-col--up'"
        :style="{ animationDuration: `${COLUMN_SECONDS[c]}s` }"
      >
        <div
          v-for="(tile, i) in col"
          :key="i"
          class="overflow-hidden bg-surface ring-1 ring-border"
        >
          <NuxtImg
            :src="tile.img.src"
            :alt="tile.img.alt"
            class="w-full object-cover object-[center_25%]"
            :class="tile.aspect"
            width="512"
            height="683"
            :loading="i < 2 ? 'eager' : 'lazy'"
            :preload="c === 1 && i === 0"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*
 * Soft fade on all four edges. Two gradients intersected — transparency, not a
 * colour overlay, so it looks right on both themes.
 */
.hero-collage {
  -webkit-mask-image:
    linear-gradient(to right, transparent 0, black 4rem, black calc(100% - 4rem), transparent 100%),
    linear-gradient(to bottom, transparent 0, black 4rem, black calc(100% - 5rem), transparent 100%);
  -webkit-mask-composite: source-in;
  mask-image:
    linear-gradient(to right, transparent 0, black 4rem, black calc(100% - 4rem), transparent 100%),
    linear-gradient(to bottom, transparent 0, black 4rem, black calc(100% - 5rem), transparent 100%);
  mask-composite: intersect;
}

/*
 * Half the doubled column + half of ONE gap.
 * Keep in sync with the `gap-*` on .hero-col: gap-2 = 0.5rem -> 0.25rem.
 */
@keyframes hero-col-up {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, calc(-50% - 0.25rem), 0);
  }
}
@keyframes hero-col-down {
  from {
    transform: translate3d(0, calc(-50% - 0.25rem), 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}

.hero-col {
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform;
}
.hero-col--up {
  animation-name: hero-col-up;
}
.hero-col--down {
  animation-name: hero-col-down;
}

.hero-collage--paused .hero-col {
  animation-play-state: paused;
}
</style>

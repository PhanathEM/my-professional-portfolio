<script setup lang="ts">
import { profile } from '~/data/profile'

const { t } = useI18n()

// Hero copy is above the fold, so RevealOnScroll fires on mount. Stagger via delay.
const step = 0.07

const features = [
  { icon: 'lucide:code-xml', key: 'hero.features.fullStack' },
  { icon: 'lucide:briefcase', key: 'hero.features.openTo' },
]
</script>

<template>
  <section id="home" class="relative isolate scroll-mt-24 overflow-hidden">
    <!--
      Layer order, back to front:
        0  photo wall   — the graduation photos, full bleed
        1  ambient      — hairline grid + one violet glow
        2  veil         — makes the copy readable over the photos
       10  content
    -->
    <div
      class="pointer-events-none absolute inset-0 z-0 opacity-45 dark:opacity-35"
      aria-hidden="true"
    >
      <HeroPhotoCards />
    </div>

    <div class="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
      <div
        class="absolute inset-0 opacity-30 [background-image:linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent_75%)]"
      />
      <div
        class="absolute left-1/2 top-[-10%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-[0.16] blur-3xl [background:radial-gradient(circle,var(--accent),transparent_65%)]"
      />
    </div>

    <div class="hero-veil pointer-events-none absolute inset-0 z-[2]" aria-hidden="true" />

    <div
      class="container-page relative z-10 flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center pb-20 pt-24 text-center"
    >
      <RevealOnScroll :y="14" :delay="step">
        <h1
          class="font-brand text-6xl font-normal tracking-normal text-text sm:text-7xl lg:text-8xl"
        >
          {{ profile.displayName }}
        </h1>
      </RevealOnScroll>

      <RevealOnScroll :y="12" :delay="step * 2">
        <p class="mt-3 text-xl font-medium text-cta-ink sm:text-2xl">{{ t('profile.role') }}</p>
      </RevealOnScroll>

      <RevealOnScroll :y="12" :delay="step * 3">
        <p
          class="mx-auto mt-5 max-w-2xl text-pretty text-base/relaxed text-muted sm:text-lg/relaxed"
        >
          {{ t('profile.tagline') }}
        </p>
      </RevealOnScroll>

      <RevealOnScroll :y="12" :delay="step * 4">
        <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
          <AppButton to="/projects" icon-right="lucide:arrow-right" size="sm">
            {{ t('hero.viewWork') }}
          </AppButton>
          <AppButton to="/contact" variant="secondary" size="sm">
            {{ t('hero.contactMe') }}
          </AppButton>
        </div>
      </RevealOnScroll>

      <!-- feature chips -->
      <RevealOnScroll :y="12" :delay="step * 5">
        <ul
          class="mx-auto mt-7 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          <li
            v-for="f in features"
            :key="f.key"
            class="flex items-center gap-2 font-mono text-[0.68rem] font-medium tracking-[0.1em] text-subtle uppercase"
          >
            <Icon :name="f.icon" :size="15" class="text-cta-ink" aria-hidden="true" />
            {{ t(f.key) }}
          </li>
        </ul>
      </RevealOnScroll>

      <RevealOnScroll :y="12" :delay="step * 6">
        <div class="mt-7 flex justify-center">
          <SocialLinks size="sm" />
        </div>
      </RevealOnScroll>
    </div>
  </section>
</template>

<style scoped>
/*
 * Readability veil over the photo wall.
 *  - the radial pass concentrates page-colour right behind the centred copy
 *  - the linear pass lands on solid `--bg` at the very top and bottom so the
 *    section meets the navbar and the built-with strip cleanly
 * Everything is expressed in `--bg`, so it re-tints itself per theme instead
 * of being a fixed black or white wash.
 */
.hero-veil {
  background:
    radial-gradient(
      64% 52% at 50% 46%,
      color-mix(in oklab, var(--bg) 92%, transparent) 0%,
      color-mix(in oklab, var(--bg) 74%, transparent) 58%,
      color-mix(in oklab, var(--bg) 34%, transparent) 100%
    ),
    linear-gradient(
      to bottom,
      var(--bg) 0%,
      color-mix(in oklab, var(--bg) 52%, transparent) 16%,
      color-mix(in oklab, var(--bg) 52%, transparent) 68%,
      var(--bg) 94%
    );
}
</style>

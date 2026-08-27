<script setup lang="ts">
import { profile } from '~/data/profile'

const { t } = useI18n()

// Hero copy is above the fold, so RevealOnScroll fires on mount. Stagger via delay.
const step = 0.07
</script>

<template>
  <section id="home" class="relative scroll-mt-24 overflow-hidden">
    <!-- ambient background: one restrained radial + hairline grid -->
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div
        class="absolute inset-0 [background-image:linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent_75%)]"
      />
      <div
        class="absolute left-1/2 top-[-10%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-[0.16] blur-3xl [background:radial-gradient(circle,var(--accent),transparent_65%)]"
      />
    </div>

    <div
      class="container-page grid items-center gap-14 pb-16 pt-20 md:pb-24 md:pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
    >
      <div>
        <RevealOnScroll :y="10" :delay="0">
          <p class="flex items-center gap-2.5 font-mono text-sm text-muted">
            <span class="inline-block h-px w-8 bg-accent/60" aria-hidden="true" />
            {{ t('profile.intro') }}
          </p>
        </RevealOnScroll>

        <RevealOnScroll :y="14" :delay="step">
          <h1 class="mt-4 text-5xl font-semibold tracking-tight text-text sm:text-6xl lg:text-7xl">
            {{ profile.displayName }}
          </h1>
        </RevealOnScroll>

        <RevealOnScroll :y="12" :delay="step * 2">
          <p class="mt-3 text-xl font-medium text-accent sm:text-2xl">{{ t('profile.role') }}</p>
        </RevealOnScroll>

        <RevealOnScroll :y="12" :delay="step * 3">
          <p class="mt-6 max-w-xl text-pretty text-base/relaxed text-muted sm:text-lg/relaxed">
            {{ t('profile.tagline') }}
          </p>
        </RevealOnScroll>

        <RevealOnScroll :y="12" :delay="step * 4">
          <div class="mt-9 flex flex-wrap items-center gap-3">
            <AppButton to="/#projects" icon-right="lucide:arrow-right" size="lg">
              {{ t('hero.viewWork') }}
            </AppButton>
            <AppButton to="/#contact" variant="secondary" size="lg">
              {{ t('hero.contactMe') }}
            </AppButton>
          </div>
        </RevealOnScroll>

        <RevealOnScroll :y="12" :delay="step * 5">
          <div class="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
            <SocialLinks />
            <span class="text-xs text-subtle">{{ t('profile.availability') }}</span>
          </div>
        </RevealOnScroll>
      </div>

      <RevealOnScroll :y="24" :duration="0.7" :delay="step * 3" class="lg:pl-4">
        <TerminalWindow />
      </RevealOnScroll>
    </div>
  </section>
</template>

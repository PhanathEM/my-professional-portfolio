<script setup lang="ts">
import { profile } from '~/data/profile'

const { t } = useI18n()

// Hero copy is above the fold, so RevealOnScroll fires on mount. Stagger via delay.
const step = 0.07

const features = [
  { icon: 'lucide:code-xml', key: 'hero.features.fullStack' },
  { icon: 'lucide:globe', key: 'hero.features.remote' },
  { icon: 'lucide:graduation-cap', key: 'hero.features.graduate' },
]

const techStrip = [
  { name: 'Nuxt', icon: 'lucide:mountain' },
  { name: 'Vue', icon: 'lucide:component' },
  { name: 'TypeScript', icon: 'lucide:file-code' },
  { name: 'Tailwind CSS', icon: 'lucide:wind' },
  { name: 'Node.js', icon: 'lucide:hexagon' },
  { name: 'PostgreSQL', icon: 'lucide:database' },
]
</script>

<template>
  <section id="home" class="relative scroll-mt-24 overflow-hidden">
    <!-- ambient background: hairline grid + one restrained violet glow -->
    <div class="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <div
        class="absolute inset-0 opacity-60 [background-image:linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent_75%)]"
      />
      <div
        class="absolute left-1/2 top-[-10%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-[0.16] blur-3xl [background:radial-gradient(circle,var(--accent),transparent_65%)]"
      />
    </div>

    <div
      class="container-page relative z-10 grid items-center gap-14 pb-10 pt-20 md:pt-24 lg:grid-cols-[1fr_1.05fr] lg:gap-12"
    >
      <div>
        <RevealOnScroll :y="14" :delay="step">
          <h1 class="text-5xl font-semibold tracking-tight text-text sm:text-6xl lg:text-7xl">
            {{ profile.displayName }}
          </h1>
        </RevealOnScroll>

        <RevealOnScroll :y="12" :delay="step * 2">
          <p class="mt-3 text-xl font-medium text-accent sm:text-2xl">{{ t('profile.role') }}</p>
        </RevealOnScroll>

        <RevealOnScroll :y="12" :delay="step * 3">
          <p class="mt-5 max-w-xl text-pretty text-base/relaxed text-muted sm:text-lg/relaxed">
            {{ t('profile.tagline') }}
          </p>
        </RevealOnScroll>

        <RevealOnScroll :y="12" :delay="step * 4">
          <div class="mt-8 flex flex-wrap items-center gap-3">
            <AppButton to="/projects" icon-right="lucide:arrow-right" size="lg">
              {{ t('hero.viewWork') }}
            </AppButton>
            <AppButton to="/contact" variant="secondary" size="lg">
              {{ t('hero.contactMe') }}
            </AppButton>
          </div>
        </RevealOnScroll>

        <!-- feature chips -->
        <RevealOnScroll :y="12" :delay="step * 5">
          <ul class="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <li
              v-for="f in features"
              :key="f.key"
              class="flex items-center gap-2 font-mono text-[0.7rem] font-medium tracking-[0.12em] text-subtle uppercase"
            >
              <Icon :name="f.icon" :size="15" class="text-accent" aria-hidden="true" />
              {{ t(f.key) }}
            </li>
          </ul>
        </RevealOnScroll>

        <RevealOnScroll :y="12" :delay="step * 6">
          <div class="mt-7">
            <SocialLinks size="sm" />
          </div>
        </RevealOnScroll>
      </div>

      <!-- min-w-0: stop the marquee's max-content width from widening the grid column -->
      <RevealOnScroll :y="24" :duration="0.7" :delay="step * 3" class="min-w-0">
        <HeroPhotoCards />
      </RevealOnScroll>
    </div>

    <!-- built-with strip -->
    <div class="relative z-10 border-t border-border/60">
      <div class="container-page py-7">
        <p class="font-mono text-[0.68rem] font-medium tracking-[0.18em] text-subtle uppercase">
          {{ t('hero.builtWith') }}
        </p>
        <ul class="mt-4 flex flex-wrap items-center gap-x-8 gap-y-4">
          <li
            v-for="tech in techStrip"
            :key="tech.name"
            class="flex items-center gap-2 text-muted opacity-70 transition-opacity duration-200 hover:opacity-100"
          >
            <Icon :name="tech.icon" :size="18" aria-hidden="true" />
            <span class="text-sm font-semibold tracking-tight">{{ tech.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

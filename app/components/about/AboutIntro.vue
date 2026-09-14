<script setup lang="ts">
import { profile } from '~/data/profile'
import { social } from '~/data/social'

const { t } = useI18n()

/** Contact strip under the name: email, location, then the social handles. */
const contacts = computed(() => [
  { icon: 'lucide:mail', label: profile.email, href: `mailto:${profile.email}` },
  { icon: 'lucide:map-pin', label: t('profile.location') },
  ...social
    .filter((s) => s.label !== 'Email')
    .map((s) => ({ icon: s.icon, label: s.handle ?? s.label, href: s.href })),
])
</script>

<template>
  <section class="container-page pt-16 md:pt-20">
    <!-- Résumé header: an orange plate inside a hatched frame, with white
         corner ticks — the "spec sheet" look. Portrait, then name and role. -->
    <RevealOnScroll>
      <div class="about-frame rounded-xs p-2.5">
        <div class="relative rounded-xs bg-[#fd611b] px-6 py-8 text-white sm:px-10 sm:py-10">
          <span class="about-tick top-2 left-2 border-t border-l" aria-hidden="true" />
          <span class="about-tick top-2 right-2 border-t border-r" aria-hidden="true" />
          <span class="about-tick bottom-2 left-2 border-b border-l" aria-hidden="true" />
          <span class="about-tick right-2 bottom-2 border-r border-b" aria-hidden="true" />

          <AboutCollage />

          <!-- The cutout stands on the plate's bottom edge: its negative
               margin cancels the plate's bottom padding. -->
          <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-10">
            <NuxtImg
              :src="profile.avatar"
              :alt="t('about.portraitAlt', { name: profile.name })"
              width="800"
              height="1078"
              sizes="(max-width: 640px) 208px, 256px"
              class="-mb-8 h-64 w-auto shrink-0 self-start object-contain sm:-mb-10 sm:h-80 sm:self-end"
            />
            <div class="min-w-0 sm:pb-2">
              <h1 class="text-3xl font-bold tracking-tight uppercase sm:text-4xl">
                {{ profile.name }}
              </h1>
              <p class="mt-1 text-lg text-white/90">{{ t('profile.role') }}</p>
              <p class="mt-3 max-w-xl text-pretty text-sm/relaxed text-white/85">
                {{ t('profile.tagline') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </RevealOnScroll>

    <!-- Contact strip -->
    <RevealOnScroll :delay="0.05">
      <ul
        class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-border py-3 text-sm text-muted"
        :aria-label="t('about.contact')"
      >
        <li v-for="c in contacts" :key="c.label" class="inline-flex items-center gap-2">
          <Icon :name="c.icon" :size="15" class="text-cta-ink" aria-hidden="true" />
          <a
            v-if="c.href"
            :href="c.href"
            :target="c.href.startsWith('http') ? '_blank' : undefined"
            :rel="c.href.startsWith('http') ? 'noopener noreferrer' : undefined"
            class="transition-colors hover:text-text"
          >
            {{ c.label }}
          </a>
          <span v-else>{{ c.label }}</span>
        </li>
      </ul>
    </RevealOnScroll>
  </section>
</template>

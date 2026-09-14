<script setup lang="ts">
import { experience } from '~/data/experience'

const { t } = useI18n()

/** Work and project entries; education is listed beside the skills. */
const items = computed(() => experience.filter((e) => e.kind !== 'education'))
</script>

<template>
  <section id="experience" class="section-pad container-page scroll-mt-20 pt-14">
    <RevealOnScroll>
      <h2 class="text-sm font-semibold tracking-tight text-text">{{ t('experience.title') }}</h2>
    </RevealOnScroll>

    <ol class="mt-4">
      <RevealOnScroll
        v-for="(item, i) in items"
        :key="`${item.title}-${i}`"
        :y="14"
        :delay="i * 0.04"
      >
        <li class="flex items-start justify-between gap-6 border-b border-border py-5">
          <div class="min-w-0">
            <h3 class="text-sm font-medium text-text">
              {{ item.organization }}
              <span class="font-normal text-muted"> · {{ item.title }}</span>
            </h3>
            <p
              v-if="item.location"
              class="mt-1 inline-flex items-center gap-1.5 text-xs text-subtle"
            >
              <Icon name="lucide:map-pin" :size="12" aria-hidden="true" />
              {{ item.location }}
            </p>
            <p class="mt-2 max-w-2xl text-pretty text-sm/relaxed text-muted">
              {{ item.description }}
            </p>
            <p class="mt-2 text-xs text-subtle">{{ item.technologies.join(' · ') }}</p>
          </div>
          <p class="shrink-0 text-right text-xs text-subtle">
            {{ item.period }}
            <span v-if="item.current" class="block text-cta-ink">{{ t('experience.now') }}</span>
          </p>
        </li>
      </RevealOnScroll>
    </ol>
  </section>
</template>

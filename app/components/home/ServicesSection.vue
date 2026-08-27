<script setup lang="ts">
import { services } from '~/data/services'

const { t } = useI18n()
const deliverableKeys = ['d1', 'd2', 'd3', 'd4'] as const
</script>

<template>
  <section id="services" class="section-pad scroll-mt-20 border-t border-border">
    <div class="container-page">
      <RevealOnScroll>
        <SectionHeading
          :eyebrow="t('services.eyebrow')"
          :title="t('services.title')"
          :description="t('services.description')"
        />
      </RevealOnScroll>

      <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <RevealOnScroll
          v-for="(service, i) in services"
          :key="service.id"
          :y="18"
          :delay="i * 0.05"
        >
          <article
            class="flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-border-strong"
          >
            <span
              class="grid size-11 place-items-center rounded-lg border border-border bg-bg-subtle text-accent"
            >
              <Icon :name="service.icon" :size="20" aria-hidden="true" />
            </span>
            <h3 class="mt-4 text-[0.95rem] font-semibold tracking-tight text-text">
              {{ t(`services.${service.id}.title`) }}
            </h3>
            <p class="mt-2 flex-1 text-sm/relaxed text-muted">
              {{ t(`services.${service.id}.description`) }}
            </p>
            <ul class="mt-4 space-y-1.5 border-t border-border pt-4">
              <li
                v-for="key in deliverableKeys"
                :key="key"
                class="flex items-center gap-2 text-[0.8rem] text-subtle"
              >
                <Icon name="lucide:dot" :size="16" class="text-accent" aria-hidden="true" />
                {{ t(`services.${service.id}.${key}`) }}
              </li>
            </ul>
          </article>
        </RevealOnScroll>
      </div>
    </div>
  </section>
</template>

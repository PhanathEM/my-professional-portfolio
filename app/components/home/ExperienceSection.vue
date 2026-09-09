<script setup lang="ts">
import { experience } from '~/data/experience'

const { t } = useI18n()
</script>

<template>
  <section id="experience" class="section-pad scroll-mt-20 border-t border-border bg-bg-subtle">
    <div class="container-page">
      <RevealOnScroll>
        <SectionHeading
          :eyebrow="t('experience.eyebrow')"
          :title="t('experience.title')"
          :description="t('experience.description')"
        />
      </RevealOnScroll>

      <RevealOnScroll :y="16">
        <p
          class="mt-6 inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 text-xs text-subtle"
        >
          <Icon name="lucide:info" :size="13" aria-hidden="true" />
          {{ t('experience.placeholderNote') }}
        </p>
      </RevealOnScroll>

      <div class="mt-12">
        <Timeline :items="experience" />
      </div>
    </div>
  </section>
</template>

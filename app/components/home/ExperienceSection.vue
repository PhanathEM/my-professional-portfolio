<script setup lang="ts">
import { experience } from '~/data/experience'

const { t } = useI18n()

/**
 * `standalone` = this section IS the page (/skills, /experience) rather than a
 * block inside one: its heading becomes the page's single <h1>, and the top
 * border is dropped since there is nothing above it to divide from.
 */
withDefaults(defineProps<{ standalone?: boolean }>(), { standalone: false })
</script>

<template>
  <section
    id="experience"
    class="section-pad scroll-mt-20 bg-bg-subtle"
    :class="standalone ? 'pt-24 md:pt-28' : 'border-t border-border'"
  >
    <div class="container-page">
      <RevealOnScroll>
        <SectionHeading
          :as="standalone ? 'h1' : 'h2'"
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

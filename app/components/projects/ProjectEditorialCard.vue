<script setup lang="ts">
import type { Project } from '~/types'

/**
 * Project card: cover, headline, standfirst on a soft tinted panel. No border,
 * badges or action row — the image and the type carry it. Used by `ProjectGrid`, so
 * the home page teaser and the full `/projects` listing stay identical.
 */
const props = defineProps<{ project: Project }>()

const { t } = useI18n()

/** Case study when there is one, else the live demo or the repo. */
const href = computed(() => {
  const p = props.project
  if (p.caseStudy) return `/projects/${p.slug}`
  return p.demo || p.repo || `/projects/${p.slug}`
})
const isExternal = computed(() => href.value.startsWith('http'))
</script>

<template>
  <!-- Course-card layout: a white surface with a hairline border, the cover
       inset by the card's own padding so it reads as a picture *in* the card,
       then headline and standfirst. -->
  <article
    class="group relative flex h-full flex-col rounded-xs border border-border bg-surface p-2 transition-colors duration-200 hover:border-border-hover"
  >
    <!-- The cover repeats the headline's link, so it is hidden from assistive
         tech and skipped by the keyboard rather than announced twice. -->
    <NuxtLinkLocale
      :to="href"
      :external="isExternal"
      :target="isExternal ? '_blank' : undefined"
      :rel="isExternal ? 'noopener noreferrer' : undefined"
      class="block overflow-hidden rounded-xs focus-visible:outline-none"
      tabindex="-1"
      aria-hidden="true"
    >
      <NuxtImg
        :src="project.cover"
        :alt="t('projectDetail.previewAlt', { title: project.title })"
        width="800"
        height="450"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
        class="aspect-video w-full object-cover"
        loading="lazy"
      />
    </NuxtLinkLocale>

    <div class="flex flex-1 flex-col px-3 pb-3 pt-4">
      <h4 class="font-heading text-base/snug tracking-tight text-text">
        <NuxtLinkLocale
          :to="href"
          :external="isExternal"
          :target="isExternal ? '_blank' : undefined"
          :rel="isExternal ? 'noopener noreferrer' : undefined"
          class="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
        >
          {{ project.title }}
        </NuxtLinkLocale>
      </h4>

      <p class="mt-3 text-pretty text-sm/relaxed text-muted">{{ project.description }}</p>
    </div>
  </article>
</template>

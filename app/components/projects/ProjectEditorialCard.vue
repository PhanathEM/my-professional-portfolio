<script setup lang="ts">
import type { Project } from '~/types'

/**
 * Editorial project card: cover, headline, standfirst. No border, fill, badges
 * or action row — the image and the type carry it. Used by `ProjectGrid`, so
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
  <article class="group relative flex flex-col">
    <!-- The cover repeats the headline's link, so it is hidden from assistive
         tech and skipped by the keyboard rather than announced twice. -->
    <NuxtLinkLocale
      :to="href"
      :external="isExternal"
      :target="isExternal ? '_blank' : undefined"
      :rel="isExternal ? 'noopener noreferrer' : undefined"
      class="block overflow-hidden bg-bg-subtle focus-visible:outline-none"
      tabindex="-1"
      aria-hidden="true"
    >
      <NuxtImg
        :src="project.cover"
        :alt="t('projectDetail.previewAlt', { title: project.title })"
        width="800"
        height="450"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
        class="aspect-video w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.03]"
        loading="lazy"
      />
    </NuxtLinkLocale>

    <h3 class="mt-4 font-heading text-xl/snug font-bold tracking-tight text-text">
      <NuxtLinkLocale
        :to="href"
        :external="isExternal"
        :target="isExternal ? '_blank' : undefined"
        :rel="isExternal ? 'noopener noreferrer' : undefined"
        class="decoration-2 underline-offset-4 after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-hover:underline"
      >
        {{ project.title }}
      </NuxtLinkLocale>
    </h3>

    <p class="mt-3 text-pretty text-sm/relaxed text-muted">{{ project.description }}</p>
  </article>
</template>

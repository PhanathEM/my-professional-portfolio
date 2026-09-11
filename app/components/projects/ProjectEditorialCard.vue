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
  <!-- Same treatment as the case-study sidebar: soft tint, no border, 12px
       corners. `overflow-hidden` lets the cover take the card's corners. -->
  <article class="group relative flex h-full flex-col overflow-hidden rounded-xs bg-bg-subtle">
    <!-- The cover repeats the headline's link, so it is hidden from assistive
         tech and skipped by the keyboard rather than announced twice. -->
    <NuxtLinkLocale
      :to="href"
      :external="isExternal"
      :target="isExternal ? '_blank' : undefined"
      :rel="isExternal ? 'noopener noreferrer' : undefined"
      class="block overflow-hidden focus-visible:outline-none"
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

    <div class="flex flex-1 flex-col p-5">
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

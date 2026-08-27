<script setup lang="ts">
import type { Project } from '~/types'

const props = withDefaults(defineProps<{ project: Project; featured?: boolean }>(), {
  featured: false,
})

const { t } = useI18n()

/** Where the card's primary link points: the case study if it exists, else demo/repo. */
const primaryHref = computed(() => {
  if (props.project.caseStudy) return `/projects/${props.project.slug}`
  return props.project.demo || props.project.repo || `/projects/${props.project.slug}`
})
const primaryIsExternal = computed(() => primaryHref.value.startsWith('http'))
</script>

<template>
  <article
    class="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lift"
    :class="featured && 'lg:flex-row'"
  >
    <!-- preview -->
    <NuxtLinkLocale
      :to="primaryHref"
      :external="primaryIsExternal"
      :target="primaryIsExternal ? '_blank' : undefined"
      :rel="primaryIsExternal ? 'noopener noreferrer' : undefined"
      class="relative block overflow-hidden bg-bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
      :class="featured ? 'aspect-video lg:aspect-auto lg:w-[52%]' : 'aspect-video'"
      :aria-label="
        project.caseStudy
          ? t('projectsSection.readCaseStudy', { title: project.title })
          : t('projectsSection.visitProject', { title: project.title })
      "
      tabindex="-1"
    >
      <NuxtImg
        :src="project.cover"
        :alt="t('projectDetail.previewAlt', { title: project.title })"
        width="800"
        height="450"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        class="size-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        loading="lazy"
      />
      <span
        class="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-bg/80 px-2.5 py-1 font-mono text-[0.7rem] text-muted backdrop-blur"
      >
        {{ project.year }}
      </span>
    </NuxtLinkLocale>

    <!-- body -->
    <div class="flex flex-1 flex-col p-6" :class="featured && 'lg:p-8'">
      <div class="flex items-start justify-between gap-4">
        <h3 class="text-lg font-semibold tracking-tight text-text">
          <NuxtLinkLocale
            :to="primaryHref"
            :external="primaryIsExternal"
            :target="primaryIsExternal ? '_blank' : undefined"
            :rel="primaryIsExternal ? 'noopener noreferrer' : undefined"
            class="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {{ project.title }}
          </NuxtLinkLocale>
        </h3>
        <span class="mt-1 shrink-0 font-mono text-xs text-subtle">{{ project.role }}</span>
      </div>

      <p
        class="mt-2.5 text-pretty text-sm/relaxed text-muted"
        :class="featured ? '' : 'line-clamp-3'"
      >
        {{ project.description }}
      </p>

      <ul v-if="featured" class="mt-4 space-y-1.5">
        <li
          v-for="feature in project.features.slice(0, 3)"
          :key="feature"
          class="flex items-start gap-2 text-[0.82rem] text-muted"
        >
          <Icon
            name="lucide:check"
            :size="14"
            class="mt-0.5 shrink-0 text-accent"
            aria-hidden="true"
          />
          {{ feature }}
        </li>
      </ul>

      <ul class="mt-5 flex flex-wrap gap-1.5">
        <li v-for="tech in project.stack" :key="tech">
          <TechnologyBadge :name="tech" />
        </li>
      </ul>

      <div class="mt-6 flex items-center gap-4 pt-4 text-sm">
        <NuxtLinkLocale
          v-if="project.caseStudy"
          :to="`/projects/${project.slug}`"
          class="relative z-10 inline-flex items-center gap-1.5 font-medium text-text transition-colors hover:text-accent"
        >
          {{ t('projectsSection.caseStudy') }}
          <Icon
            name="lucide:arrow-right"
            :size="15"
            class="transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </NuxtLinkLocale>
        <a
          v-if="project.repo"
          :href="project.repo"
          target="_blank"
          rel="noopener noreferrer"
          class="relative z-10 inline-flex items-center gap-1.5 text-muted transition-colors hover:text-text"
          :aria-label="t('projectsSection.onGithub', { title: project.title })"
        >
          <Icon name="lucide:github" :size="15" aria-hidden="true" />
          {{ t('projectsSection.code') }}
        </a>
        <a
          v-if="project.demo"
          :href="project.demo"
          target="_blank"
          rel="noopener noreferrer"
          class="relative z-10 inline-flex items-center gap-1.5 text-muted transition-colors hover:text-text"
          :aria-label="t('projectsSection.liveDemo', { title: project.title })"
        >
          <Icon name="lucide:external-link" :size="15" aria-hidden="true" />
          {{ t('projectsSection.live') }}
        </a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { featuredProjects } from '~/data/projects'

const { t } = useI18n()

/**
 * Same grid as `/projects`, just limited to the featured set. Four across when
 * a fourth project is marked featured, so the row fills instead of leaving an
 * orphan on a second line.
 */
const columns = computed<3 | 4>(() => (featuredProjects.length >= 4 ? 4 : 3))
</script>

<template>
  <section id="projects" class="section-pad scroll-mt-20">
    <div class="container-page">
      <RevealOnScroll>
        <div class="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            :title="t('projectsSection.title')"
            :description="t('projectsSection.description')"
            description-size="sm"
            title-size="sm"
          />
          <NuxtLinkLocale
            to="/projects"
            class="inline-flex shrink-0 items-center gap-1.5 text-sm text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {{ t('projectsSection.allProjects') }}
            <Icon
              name="lucide:arrow-right"
              :size="15"
              class="transition-transform duration-300"
              aria-hidden="true"
            />
          </NuxtLinkLocale>
        </div>
      </RevealOnScroll>

      <ProjectGrid class="mt-10" :projects="featuredProjects" :columns="columns" />
    </div>
  </section>
</template>

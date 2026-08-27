<script setup lang="ts">
import { featuredProjects } from '~/data/projects'

const { t } = useI18n()
const [lead, ...rest] = featuredProjects
</script>

<template>
  <section id="projects" class="section-pad scroll-mt-20 border-t border-border">
    <div class="container-page">
      <RevealOnScroll>
        <div class="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            :eyebrow="t('projectsSection.eyebrow')"
            :title="t('projectsSection.title')"
            :description="t('projectsSection.description')"
          />
          <AppButton to="/projects" variant="secondary" icon-right="lucide:arrow-right">
            {{ t('projectsSection.allProjects') }}
          </AppButton>
        </div>
      </RevealOnScroll>

      <div class="mt-14 space-y-5">
        <RevealOnScroll v-if="lead" :y="20">
          <ProjectCard :project="lead" featured />
        </RevealOnScroll>

        <ProjectGrid v-if="rest.length" :projects="rest" />
      </div>
    </div>
  </section>
</template>

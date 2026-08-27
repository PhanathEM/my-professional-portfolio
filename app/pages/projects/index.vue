<script setup lang="ts">
import { projects } from '~/data/projects'

const { t } = useI18n()

useSeoMeta({
  title: () => t('meta.projectsTitle'),
  description: () => t('meta.projectsDescription'),
  ogTitle: () => `${t('meta.projectsTitle')} · Phanath`,
})

defineOgImageComponent('OgCard', {
  label: t('projectsPage.eyebrow'),
  title: t('projectsSection.title'),
  description: t('meta.projectsDescription'),
})

const ordered = [...projects].sort((a, b) => b.year - a.year)
</script>

<template>
  <div>
    <header class="border-b border-border">
      <div class="container-page pb-10 pt-16 md:pt-20">
        <RevealOnScroll>
          <SectionHeading
            as="h1"
            :eyebrow="t('projectsPage.eyebrow')"
            :title="t('projectsPage.title')"
            :description="t('projectsPage.description')"
          />
        </RevealOnScroll>
      </div>
    </header>

    <section class="section-pad">
      <div class="container-page">
        <ProjectGrid :projects="ordered" :columns="3" />
      </div>
    </section>
  </div>
</template>

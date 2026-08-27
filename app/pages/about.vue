<script setup lang="ts">
import { profile } from '~/data/profile'

const { t } = useI18n()

useSeoMeta({
  title: () => t('meta.aboutTitle'),
  description: () => t('meta.aboutDescription'),
  ogTitle: () => `${t('meta.aboutTitle')} · ${profile.displayName}`,
})

defineOgImageComponent('OgCard', {
  label: t('meta.aboutTitle'),
  title: `${t('meta.aboutTitle')} ${profile.displayName}`,
  description: t('profile.role'),
})
</script>

<template>
  <div>
    <header class="border-b border-border">
      <div class="container-page pb-10 pt-16 md:pt-20">
        <RevealOnScroll>
          <SectionHeading
            as="h1"
            :eyebrow="t('about.eyebrow')"
            :title="t('about.title')"
            :description="t('profile.tagline')"
          />
        </RevealOnScroll>
      </div>
    </header>

    <AboutSection />
    <ExperienceSection />
    <ServicesSection />
  </div>
</template>

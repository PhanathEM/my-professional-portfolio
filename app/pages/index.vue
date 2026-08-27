<script setup lang="ts">
import { profile } from '~/data/profile'

const { t } = useI18n()

defineOgImageComponent('OgCard', {
  title: profile.displayName,
  description: t('profile.role'),
})

useSeoMeta({
  title: '',
  description: () => t('meta.homeDescription'),
  ogTitle: () => `${profile.displayName} — ${t('profile.role')}`,
})
</script>

<template>
  <div>
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <FeaturedProjects />
    <ExperienceSection />
    <ServicesSection />
    <ContactSection />
  </div>
</template>

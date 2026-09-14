<script setup lang="ts">
import { profile } from '~/data/profile'

const { t } = useI18n()

useSeoMeta({
  title: () => t('meta.aboutTitle'),
  description: () => t('meta.aboutDescription'),
  ogTitle: () => `${t('meta.aboutTitle')} · ${profile.displayName}`,
})

defineOgImage('OgCard', {
  label: t('meta.aboutTitle'),
  title: `${t('meta.aboutTitle')} ${profile.displayName}`,
  description: t('profile.role'),
})
</script>

<template>
  <div>
    <AboutIntro />
    <AboutSkills />
    <AboutExperience />
  </div>
</template>

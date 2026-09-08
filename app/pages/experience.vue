<script setup lang="ts">
import { profile } from '~/data/profile'

const { t } = useI18n()

useSeoMeta({
  title: () => t('experience.title'),
  description: () => t('experience.description'),
  ogTitle: () => `${t('experience.title')} · ${profile.displayName}`,
})

defineOgImageComponent('OgCard', {
  label: t('experience.eyebrow'),
  title: t('experience.title'),
  description: t('experience.description'),
})
</script>

<template>
  <ExperienceSection standalone />
</template>

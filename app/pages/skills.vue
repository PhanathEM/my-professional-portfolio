<script setup lang="ts">
import { profile } from '~/data/profile'

const { t } = useI18n()

useSeoMeta({
  title: () => t('skills.title'),
  description: () => t('skills.description'),
  ogTitle: () => `${t('skills.title')} · ${profile.displayName}`,
})

defineOgImageComponent('OgCard', {
  label: t('skills.eyebrow'),
  title: t('skills.title'),
  description: t('skills.description'),
})
</script>

<template>
  <SkillsSection standalone />
</template>

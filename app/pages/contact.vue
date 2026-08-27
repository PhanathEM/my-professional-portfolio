<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('meta.contactTitle'),
  description: () => t('meta.contactDescription'),
  ogTitle: () => `${t('meta.contactTitle')} · Phanath`,
})

defineOgImageComponent('OgCard', {
  label: t('contact.eyebrow'),
  title: t('contact.title'),
  description: t('contact.intro'),
})
</script>

<template>
  <div class="pt-6">
    <ContactSection />
  </div>
</template>

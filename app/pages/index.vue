<script setup lang="ts">
import { profile } from '~/data/profile'

const { t } = useI18n()

defineOgImage('OgCard', {
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
    <!--
      A landing page, not the whole site: About / Skills / Experience /
      Contact each own a route now (see `app/data/navigation.ts`), so
      repeating them here would just be the old one-page scroll again.
      Featured projects stay as the one teaser that leads further in.
    -->
    <FeaturedProjects />
    <LatestPosts />
  </div>
</template>

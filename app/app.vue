<script setup lang="ts">
import { profile } from '~/data/profile'
import { social } from '~/data/social'

const siteUrl = useRuntimeConfig().public.siteUrl
const { t } = useI18n()

// <html lang/dir>, og:locale, and rel="alternate" hreflang links per locale.
// Canonical stays owned by @nuxtjs/seo (already locale-aware) — filter it out
// here so it isn't emitted twice.
const localeHead = useLocaleHead({ dir: true, seo: true })
useHead(() => ({
  htmlAttrs: localeHead.value.htmlAttrs,
  link: (localeHead.value.link ?? []).filter((l) => l.rel === 'alternate'),
  meta: localeHead.value.meta,
}))

// Site-wide SEO defaults (pages override title/description as needed)
useSeoMeta({
  titleTemplate: (title) =>
    title ? `${title} · ${profile.displayName}` : `${profile.displayName} · ${t('profile.role')}`,
  description: () => t('meta.homeDescription'),
  ogType: 'website',
  ogSiteName: () => `${profile.displayName} — ${t('profile.role')}`,
  twitterCard: 'summary_large_image',
})

// Site-wide default OG image; individual pages override with their own title/description.
defineOgImageComponent('OgCard', {
  title: profile.displayName,
  description: profile.name,
})

// Organisation / Person structured data for the whole site
useSchemaOrg([
  definePerson({
    name: profile.name,
    alternateName: profile.displayName,
    image: `${siteUrl}${profile.avatar}`,
    sameAs: social.filter((s) => s.label !== 'Email').map((s) => s.href),
  }),
  defineWebSite({ name: `${profile.displayName}` }),
])
</script>

<template>
  <div class="min-h-dvh bg-bg text-text antialiased">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-surface-elevated focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-lift focus:outline-none focus:ring-2 focus:ring-accent"
    >
      {{ t('a11y.skipToContent') }}
    </a>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

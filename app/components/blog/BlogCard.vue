<script setup lang="ts">
import { formatDate } from '~/utils/content'

interface BlogCardItem {
  path: string
  title: string
  description: string
  date: string
  cover?: string
}

/**
 * One story in the news-style listing.
 *  - `lead`    — the big one: full-width cover, large headline, standfirst.
 *  - `medium`  — cover on top, headline, date.
 *  - `compact` — headline and date with a small thumbnail on the right,
 *                separated from its neighbours by hairlines.
 */
withDefaults(defineProps<{ post: BlogCardItem; variant?: 'lead' | 'medium' | 'compact' }>(), {
  variant: 'medium',
})

const { locale } = useI18n()
const dateTag = computed(() => ({ en: 'en-GB', km: 'km-KH', lo: 'lo-LA' })[locale.value] ?? 'en-GB')

/** The whole story is one link; the headline carries it and the cover is decorative. */
const LINK = "after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
</script>

<template>
  <!-- lead -->
  <article v-if="variant === 'lead'" class="group relative flex flex-col">
    <div class="relative">
      <BlogCover :post="post" class="aspect-video" />
      <!-- The short accent bar tucked under the picture, as on a front page. -->
      <span class="absolute bottom-0 left-5 h-1 w-20 bg-cta" aria-hidden="true" />
    </div>
    <h3
      class="mt-5 text-balance text-2xl/tight font-semibold tracking-tight text-text transition-colors group-hover:text-cta-ink sm:text-3xl/tight"
    >
      <NuxtLinkLocale :to="post.path" :class="LINK">{{ post.title }}</NuxtLinkLocale>
    </h3>
    <p class="mt-3 text-pretty text-base/relaxed text-muted">{{ post.description }}</p>
    <p class="mt-3 text-xs text-subtle">
      <time :datetime="post.date">{{ formatDate(post.date, dateTag) }}</time>
    </p>
  </article>

  <!-- medium -->
  <article v-else-if="variant === 'medium'" class="group relative flex flex-col">
    <BlogCover :post="post" class="aspect-video" />
    <h3
      class="mt-4 text-balance text-lg/snug font-medium tracking-tight text-text transition-colors group-hover:text-cta-ink"
    >
      <NuxtLinkLocale :to="post.path" :class="LINK">{{ post.title }}</NuxtLinkLocale>
    </h3>
    <p class="mt-2 text-xs text-subtle">
      <time :datetime="post.date">{{ formatDate(post.date, dateTag) }}</time>
    </p>
  </article>

  <!-- compact -->
  <article v-else class="group relative flex items-start gap-4 border-t border-border py-4">
    <div class="min-w-0 flex-1">
      <h3
        class="text-pretty text-sm/snug font-medium tracking-tight text-text transition-colors group-hover:text-cta-ink"
      >
        <NuxtLinkLocale :to="post.path" :class="LINK">{{ post.title }}</NuxtLinkLocale>
      </h3>
      <p class="mt-2 text-xs text-subtle">
        <time :datetime="post.date">{{ formatDate(post.date, dateTag) }}</time>
      </p>
    </div>
    <BlogCover :post="post" class="aspect-[4/3] w-28 shrink-0" sizes="112px" />
  </article>
</template>

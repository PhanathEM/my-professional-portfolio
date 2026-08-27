<script setup lang="ts">
import { formatDate } from '~/utils/content'

interface BlogCardItem {
  path: string
  title: string
  description: string
  date: string
  category: string
  readingTime?: number
  cover?: string
}

withDefaults(defineProps<{ post: BlogCardItem; feature?: boolean }>(), { feature: false })

const { t, locale } = useI18n()
const dateTag = computed(() => ({ en: 'en-GB', km: 'km-KH', lo: 'lo-LA' })[locale.value] ?? 'en-GB')
</script>

<template>
  <article
    class="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lift"
  >
    <NuxtLinkLocale
      :to="post.path"
      :aria-label="t('blogPage.readArticleAria', { title: post.title })"
      tabindex="-1"
      class="relative block aspect-[16/9] overflow-hidden bg-bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
    >
      <NuxtImg
        v-if="post.cover"
        :src="post.cover"
        :alt="t('blogDetail.coverAlt', { title: post.title })"
        width="720"
        height="405"
        sizes="(max-width: 768px) 100vw, 400px"
        class="size-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        loading="lazy"
      />
      <div
        v-else
        class="grid size-full place-items-center [background-image:linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)] [background-size:24px_24px]"
      >
        <Icon name="lucide:file-text" :size="28" class="text-subtle" aria-hidden="true" />
      </div>
    </NuxtLinkLocale>

    <div class="flex flex-1 flex-col p-5">
      <div class="flex items-center gap-2 font-mono text-[0.72rem] text-subtle">
        <span class="text-accent">{{ post.category }}</span>
        <span aria-hidden="true">·</span>
        <time :datetime="post.date">{{ formatDate(post.date, dateTag) }}</time>
        <template v-if="post.readingTime">
          <span aria-hidden="true">·</span>
          <span>{{ t('blogPage.minRead', { count: post.readingTime }) }}</span>
        </template>
      </div>

      <h3 class="mt-2.5 text-[1.05rem] font-semibold leading-snug tracking-tight text-text">
        <NuxtLinkLocale :to="post.path" class="after:absolute after:inset-0 after:content-['']">
          {{ post.title }}
        </NuxtLinkLocale>
      </h3>

      <p class="mt-2 line-clamp-2 flex-1 text-pretty text-sm/relaxed text-muted">
        {{ post.description }}
      </p>

      <span
        class="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-text transition-colors group-hover:text-accent"
      >
        {{ t('blogPage.readArticle') }}
        <Icon
          name="lucide:arrow-right"
          :size="15"
          class="transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </div>
  </article>
</template>

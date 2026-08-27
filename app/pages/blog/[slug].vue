<script setup lang="ts">
import { profile } from '~/data/profile'
import { estimateReadingTime, formatDate } from '~/utils/content'

const route = useRoute()
const siteUrl = useRuntimeConfig().public.siteUrl
const { t, locale, locales } = useI18n()
const localePath = useLocalePath()

// Posts are authored once (English). Strip any locale prefix for content lookup.
const localePrefixes = computed(() =>
  locales.value.map((l) => (typeof l === 'string' ? l : l.code)).filter((c) => c !== 'en'),
)
const contentPath = computed(() => {
  for (const p of localePrefixes.value) {
    if (route.path === `/${p}` || route.path.startsWith(`/${p}/`)) {
      return route.path.slice(p.length + 1) || '/'
    }
  }
  return route.path
})

const { data: doc } = await useAsyncData(`post-${contentPath.value}`, () =>
  queryCollection('blog').path(contentPath.value).first(),
)

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
}

const readingTime = computed(() => estimateReadingTime(doc.value?.body))
const dateTag = computed(() => ({ en: 'en-GB', km: 'km-KH', lo: 'lo-LA' })[locale.value] ?? 'en-GB')

const { data: surround } = await useAsyncData(`post-surround-${contentPath.value}`, () =>
  queryCollectionItemSurroundings('blog', contentPath.value, {
    fields: ['title', 'description', 'path'],
  }),
)
const prev = computed(() => surround.value?.[0] ?? null)
const next = computed(() => surround.value?.[1] ?? null)

useSeoMeta({
  title: () => doc.value?.title,
  description: () => doc.value?.description,
  ogType: 'article',
  ogTitle: () => doc.value?.title,
  articleAuthor: () => [doc.value?.author ?? profile.name],
  articlePublishedTime: () => doc.value?.date,
})

defineOgImageComponent('OgCard', {
  label: doc.value.category,
  title: doc.value.title,
  description: doc.value.description,
})

useSchemaOrg([
  defineArticle({
    headline: doc.value.title,
    description: doc.value.description,
    datePublished: doc.value.date,
    author: { name: doc.value.author || profile.name },
    ...(doc.value.cover ? { image: siteUrl + doc.value.cover } : {}),
  }),
])
</script>

<template>
  <article v-if="doc" class="pb-20">
    <div class="container-page max-w-2xl pt-10 md:pt-14">
      <NuxtLinkLocale
        to="/blog"
        class="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-text"
      >
        <Icon name="lucide:arrow-left" :size="15" aria-hidden="true" />
        {{ t('blogDetail.breadcrumb') }}
      </NuxtLinkLocale>

      <header class="mt-6">
        <div class="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-subtle">
          <span class="text-accent">{{ doc.category }}</span>
          <span aria-hidden="true">·</span>
          <time :datetime="doc.date">{{ formatDate(doc.date, dateTag) }}</time>
          <span aria-hidden="true">·</span>
          <span>{{ t('blogDetail.minRead', { count: readingTime }) }}</span>
          <span aria-hidden="true">·</span>
          <span>{{ doc.author }}</span>
        </div>

        <h1 class="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          {{ doc.title }}
        </h1>
        <p class="mt-4 text-pretty text-lg/relaxed text-muted">{{ doc.description }}</p>

        <ul v-if="doc.tags?.length" class="mt-5 flex flex-wrap gap-1.5">
          <li v-for="tag in doc.tags" :key="tag">
            <BaseBadge size="sm" variant="outline">#{{ tag }}</BaseBadge>
          </li>
        </ul>
      </header>
    </div>

    <div v-if="doc.cover" class="container-page mt-10 max-w-3xl">
      <NuxtImg
        :src="doc.cover"
        :alt="t('blogDetail.coverAlt', { title: doc.title })"
        width="1024"
        height="512"
        sizes="(max-width: 1024px) 100vw, 1024px"
        class="aspect-[2/1] w-full rounded-xl border border-border object-cover"
      />
    </div>

    <div class="container-page mt-12 max-w-2xl">
      <div class="prose-content">
        <ContentRenderer :value="doc" />
      </div>
    </div>

    <!-- prev / next -->
    <nav
      v-if="prev || next"
      class="container-page mt-16 grid max-w-2xl gap-4 sm:grid-cols-2"
      :aria-label="t('blogDetail.moreArticles')"
    >
      <NuxtLink
        v-if="prev"
        :to="localePath(prev.path)"
        class="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/40"
      >
        <span class="font-mono text-xs text-subtle">
          <Icon name="lucide:arrow-left" :size="12" class="mr-1 inline" aria-hidden="true" />
          {{ t('blogDetail.previous') }}
        </span>
        <span class="mt-1.5 block text-sm font-semibold tracking-tight text-text">
          {{ prev.title }}
        </span>
      </NuxtLink>
      <NuxtLink
        v-if="next"
        :to="localePath(next.path)"
        class="group rounded-xl border border-border bg-surface p-5 text-right transition-colors hover:border-accent/40 sm:col-start-2"
      >
        <span class="font-mono text-xs text-subtle">
          {{ t('blogDetail.next') }}
          <Icon name="lucide:arrow-right" :size="12" class="ml-1 inline" aria-hidden="true" />
        </span>
        <span class="mt-1.5 block text-sm font-semibold tracking-tight text-text">
          {{ next.title }}
        </span>
      </NuxtLink>
    </nav>
  </article>
</template>

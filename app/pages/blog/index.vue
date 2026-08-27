<script setup lang="ts">
import { estimateReadingTime } from '~/utils/content'

const { t } = useI18n()

const { data: posts } = await useAsyncData('blog-list', () =>
  queryCollection('blog').where('draft', '=', false).order('date', 'DESC').all(),
)

const withMeta = computed(() =>
  (posts.value ?? []).map((post) => ({
    path: post.path,
    title: post.title,
    description: post.description,
    date: post.date,
    category: post.category,
    cover: post.cover,
    readingTime: estimateReadingTime(post.body),
  })),
)

const ALL = '__all__'
const categories = computed(() => [
  ALL,
  ...Array.from(new Set(withMeta.value.map((p) => p.category))).sort(),
])
const activeCategory = ref(ALL)
const filtered = computed(() =>
  activeCategory.value === ALL
    ? withMeta.value
    : withMeta.value.filter((p) => p.category === activeCategory.value),
)

useSeoMeta({
  title: () => t('meta.blogTitle'),
  description: () => t('meta.blogDescription'),
  ogTitle: () => `${t('meta.blogTitle')} · Phanath`,
})

defineOgImageComponent('OgCard', {
  label: t('blogPage.eyebrow'),
  title: t('blogPage.title'),
  description: t('meta.blogDescription'),
})
</script>

<template>
  <div>
    <header class="border-b border-border">
      <div class="container-page pb-10 pt-16 md:pt-20">
        <RevealOnScroll>
          <SectionHeading
            as="h1"
            :eyebrow="t('blogPage.eyebrow')"
            :title="t('blogPage.title')"
            :description="t('blogPage.description')"
          />
        </RevealOnScroll>
      </div>
    </header>

    <section class="section-pad">
      <div class="container-page">
        <div
          v-if="categories.length > 2"
          class="mb-10 flex flex-wrap gap-2"
          role="group"
          :aria-label="t('blogPage.filterLabel')"
        >
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            class="rounded-md border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            :class="
              activeCategory === category
                ? 'border-accent/40 bg-accent/10 text-accent'
                : 'border-border bg-surface text-muted hover:text-text'
            "
            :aria-pressed="activeCategory === category"
            @click="activeCategory = category"
          >
            {{ category === ALL ? t('blogPage.filterAll') : category }}
          </button>
        </div>

        <BlogList :posts="filtered" />
      </div>
    </section>
  </div>
</template>

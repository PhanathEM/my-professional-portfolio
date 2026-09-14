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

/**
 * Search mirrors the projects page: title, blurb and category, every term
 * must match. The haystack is built once per post rather than per keystroke.
 */
const haystacks = computed(
  () =>
    new Map(
      withMeta.value.map((p) => [
        p.path,
        [p.title, p.description, p.category].join(' ').toLowerCase(),
      ]),
    ),
)

/** Small category switcher on the left; `ALL` is the sentinel for "no filter". */
const ALL = '__all__'
const categories = computed(() =>
  Array.from(new Set(withMeta.value.map((p) => p.category))).sort((a, b) => a.localeCompare(b)),
)
const activeCategory = ref(ALL)

const query = ref('')
const normalised = computed(() => query.value.trim().toLowerCase())

const filtered = computed(() => {
  const inCategory =
    activeCategory.value === ALL
      ? withMeta.value
      : withMeta.value.filter((p) => p.category === activeCategory.value)
  if (!normalised.value) return inCategory
  const terms = normalised.value.split(/\s+/)
  return inCategory.filter((p) => {
    const hay = haystacks.value.get(p.path) ?? ''
    return terms.every((term) => hay.includes(term))
  })
})

const CAT =
  'text-sm transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none'
function catClass(value: string) {
  return [
    CAT,
    activeCategory.value === value ? 'font-medium text-cta-ink' : 'text-muted hover:text-text',
  ]
}

/**
 * The front page shows a lead, two pictured stories and six compact ones.
 * "See more" appends another batch of compact rows instead of paging.
 */
const BATCH = 9
const visible = ref(BATCH)
const shown = computed(() => filtered.value.slice(0, visible.value))
const hasMore = computed(() => filtered.value.length > visible.value)

// A new search starts the list over.
watch(filtered, () => {
  visible.value = BATCH
})

useSeoMeta({
  title: () => t('meta.blogTitle'),
  description: () => t('meta.blogDescription'),
  ogTitle: () => `${t('meta.blogTitle')} · Phanath`,
})

defineOgImage('OgCard', {
  label: t('blogPage.eyebrow'),
  title: t('blogPage.title'),
  description: t('meta.blogDescription'),
})
</script>

<template>
  <div>
    <header>
      <div class="container-page pt-16 md:pt-20">
        <RevealOnScroll>
          <!-- Heading kept for assistive tech and search engines only — the
               search field is the visible opener, as on /projects. -->
          <h1 class="sr-only">{{ t('blogPage.title') }}</h1>

          <!-- Categories on the left, search on the right. -->
          <div class="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
            <nav
              v-if="categories.length > 1"
              class="flex flex-wrap items-center gap-x-5 gap-y-2"
              :aria-label="t('blogPage.filterLabel')"
            >
              <button
                type="button"
                :class="catClass(ALL)"
                :aria-pressed="activeCategory === ALL"
                @click="activeCategory = ALL"
              >
                {{ t('blogPage.filterAll') }}
              </button>
              <button
                v-for="category in categories"
                :key="category"
                type="button"
                :class="catClass(category)"
                :aria-pressed="activeCategory === category"
                @click="activeCategory = category"
              >
                {{ category }}
              </button>
            </nav>

            <div class="relative w-full sm:ml-auto sm:w-72">
              <Icon
                name="lucide:search"
                :size="15"
                class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-subtle"
                aria-hidden="true"
              />
              <input
                v-model="query"
                type="search"
                :aria-label="t('blogPage.searchLabel')"
                :placeholder="t('blogPage.searchPlaceholder')"
                class="h-8 w-full rounded-full border border-border bg-surface pr-9 pl-9 text-sm text-text transition-colors duration-200 placeholder:text-subtle hover:border-border-hover focus:border-text focus:outline-none focus-visible:outline-none"
              />
              <button
                v-if="query"
                type="button"
                :aria-label="t('blogPage.clearSearch')"
                class="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full p-0.5 text-subtle transition-colors hover:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                @click="query = ''"
              >
                <Icon name="lucide:x" :size="14" aria-hidden="true" />
              </button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </header>

    <section class="section-pad pt-12">
      <div class="container-page">
        <template v-if="filtered.length">
          <BlogList :posts="shown" />

          <div v-if="hasMore" class="mt-12 flex justify-center">
            <AppButton
              size="sm"
              variant="secondary"
              icon-right="lucide:chevron-down"
              @click="visible += BATCH"
            >
              {{ t('blogPage.seeMore') }}
            </AppButton>
          </div>
        </template>

        <div v-else class="py-10">
          <p class="text-sm text-muted">
            {{
              withMeta.length
                ? t('blogPage.noResults', { query: query.trim() })
                : t('blogPage.empty')
            }}
          </p>
          <button
            v-if="withMeta.length"
            type="button"
            class="mt-3 inline-flex items-center gap-1.5 text-sm text-cta-ink transition-colors hover:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            @click="((query = ''), (activeCategory = ALL))"
          >
            <Icon name="lucide:rotate-ccw" :size="14" aria-hidden="true" />
            {{ t('blogPage.clearSearch') }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

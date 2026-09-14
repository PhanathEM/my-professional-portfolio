<script setup lang="ts">
import { projects } from '~/data/projects'

const { t } = useI18n()

useSeoMeta({
  title: () => t('meta.projectsTitle'),
  description: () => t('meta.projectsDescription'),
  ogTitle: () => `${t('meta.projectsTitle')} · Phanath`,
})

defineOgImage('OgCard', {
  label: t('projectsPage.eyebrow'),
  title: t('projectsSection.title'),
  description: t('meta.projectsDescription'),
})

const ordered = [...projects].sort((a, b) => b.year - a.year)

/**
 * Search across everything a visitor might type: name, blurb, role, year,
 * stack and features. The haystack is built once per project rather than on
 * every keystroke.
 */
const haystacks = new Map(
  ordered.map((p) => [
    p.slug,
    [p.title, p.description, p.role, String(p.year), ...p.stack, ...p.features]
      .join(' ')
      .toLowerCase(),
  ]),
)

const query = ref('')
const normalised = computed(() => query.value.trim().toLowerCase())

const filtered = computed(() => {
  if (!normalised.value) return ordered
  // Every term must appear, so "nuxt api" narrows rather than widens.
  const terms = normalised.value.split(/\s+/)
  return ordered.filter((p) => {
    const hay = haystacks.get(p.slug) ?? ''
    return terms.every((term) => hay.includes(term))
  })
})

/** 9 cards fill the 3-column grid to exactly three complete rows. */
const PER_PAGE = 9
const page = ref(1)
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / PER_PAGE)))
const paged = computed(() =>
  filtered.value.slice((page.value - 1) * PER_PAGE, page.value * PER_PAGE),
)

// Filtering shrinks the list, so page 3 of the old results may not exist.
watch(filtered, () => {
  if (page.value > totalPages.value) page.value = 1
})
</script>

<template>
  <div>
    <header>
      <div class="container-page pt-16 md:pt-20">
        <RevealOnScroll>
          <!-- The visible heading was dropped; keep one for assistive tech
               and search engines, and let the search field take centre stage. -->
          <h1 class="sr-only">{{ t('projectsPage.title') }}</h1>

          <div class="flex justify-center">
            <div class="relative w-full sm:w-72">
              <Icon
                name="lucide:search"
                :size="15"
                class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-subtle"
                aria-hidden="true"
              />
              <input
                v-model="query"
                type="search"
                :aria-label="t('projectsPage.searchLabel')"
                :placeholder="t('projectsPage.searchPlaceholder')"
                class="h-8 w-full rounded-full border border-border bg-surface pr-9 pl-9 text-sm text-text transition-colors duration-200 placeholder:text-subtle hover:border-border-hover focus:border-text focus:outline-none focus-visible:outline-none"
              />
              <button
                v-if="query"
                type="button"
                :aria-label="t('projectsPage.clearSearch')"
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
          <ProjectGrid :projects="paged" :columns="3" />

          <PaginationNav
            v-if="totalPages > 1"
            v-model:page="page"
            :total-pages="totalPages"
            class="mt-16"
          />
        </template>

        <div v-else class="py-10">
          <p class="text-sm text-muted">
            {{ t('projectsPage.noResults', { query: query.trim() }) }}
          </p>
          <button
            type="button"
            class="mt-3 inline-flex items-center gap-1.5 text-sm text-cta-ink transition-colors hover:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            @click="query = ''"
          >
            <Icon name="lucide:rotate-ccw" :size="14" aria-hidden="true" />
            {{ t('projectsPage.clearSearch') }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

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

/**
 * Every technology in the data, most-used first. The counts are not rendered
 * any more but still decide the order, so the stack you use most leads.
 */
const technologies = computed(() => {
  const counts = new Map<string, number>()
  for (const p of ordered) for (const tech of p.stack) counts.set(tech, (counts.get(tech) ?? 0) + 1)
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
})

const query = ref('')
const activeTech = ref<string | null>(null)
const normalised = computed(() => query.value.trim().toLowerCase())
const isFiltering = computed(() => Boolean(normalised.value) || activeTech.value !== null)

const filtered = computed(() => {
  const terms = normalised.value ? normalised.value.split(/\s+/) : []
  return ordered.filter((p) => {
    if (activeTech.value && !p.stack.includes(activeTech.value)) return false
    if (!terms.length) return true
    // Every term must appear, so "nuxt api" narrows rather than widens.
    const hay = haystacks.get(p.slug) ?? ''
    return terms.every((term) => hay.includes(term))
  })
})

function reset() {
  query.value = ''
  activeTech.value = null
}

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

const CHIP_BASE =
  'inline-flex h-8 items-center rounded-full border px-3.5 text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none'
const CHIP_ON = 'border-transparent bg-nav-active text-cta-ink'
const CHIP_OFF = 'border-border bg-surface text-muted hover:border-border-hover hover:text-text'
</script>

<template>
  <div>
    <header>
      <div class="container-page pt-16 md:pt-20">
        <RevealOnScroll>
          <!-- Title and search share one row. The search used to sit alone
               with two thirds of the line empty beside it. -->
          <div class="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
            <SectionHeading
              as="h1"
              :eyebrow="t('projectsPage.eyebrow')"
              :title="t('projectsPage.title')"
              :description="t('projectsPage.description')"
            />

            <div class="relative w-full sm:w-64">
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

        <!-- Technology filters, derived from the project data itself. -->
        <RevealOnScroll :y="12" :delay="0.06">
          <div
            class="mt-8 flex flex-wrap items-center gap-2 border-t border-border pt-6"
            role="group"
            :aria-label="t('projectsPage.filterLabel')"
          >
            <button
              type="button"
              :class="[CHIP_BASE, activeTech === null ? CHIP_ON : CHIP_OFF]"
              :aria-pressed="activeTech === null"
              @click="activeTech = null"
            >
              {{ t('projectsPage.filterAll') }}
            </button>

            <button
              v-for="tech in technologies"
              :key="tech.name"
              type="button"
              :class="[CHIP_BASE, activeTech === tech.name ? CHIP_ON : CHIP_OFF]"
              :aria-pressed="activeTech === tech.name"
              @click="activeTech = activeTech === tech.name ? null : tech.name"
            >
              {{ tech.name }}
            </button>

            <p v-if="isFiltering" class="ml-auto font-mono text-xs text-subtle" aria-live="polite">
              {{ t('projectsPage.resultCount', { count: filtered.length, total: ordered.length }) }}
            </p>
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
            {{ t('projectsPage.noResults', { query: query.trim() || activeTech }) }}
          </p>
          <button
            type="button"
            class="mt-3 inline-flex items-center gap-1.5 text-sm text-cta-ink transition-colors hover:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            @click="reset"
          >
            <Icon name="lucide:rotate-ccw" :size="14" aria-hidden="true" />
            {{ t('projectsPage.filterAll') }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

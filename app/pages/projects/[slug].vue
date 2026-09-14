<script setup lang="ts">
import { projects } from '~/data/projects'

const route = useRoute()
const { t, locales } = useI18n()

// Case-study Markdown is authored once (English). Strip any locale prefix from
// the route so the content lookup resolves on /km/... and /lo/... too.
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

const { data: doc } = await useAsyncData(`project-${contentPath.value}`, () =>
  queryCollection('projects').path(contentPath.value).first(),
)

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

/**
 * Related projects: whichever others share the most of this project's stack,
 * newest first as the tie-break. Read from `~/data/projects` rather than a
 * second content query — that is the same list the /projects grid renders, so
 * the cards stay identical and there is no extra database round-trip.
 */
const related = computed(() => {
  const stack = new Set((doc.value?.stack ?? []).map((s: string) => s.toLowerCase()))
  return projects
    .filter((p) => `/projects/${p.slug}` !== contentPath.value)
    .map((p) => ({ p, shared: p.stack.filter((s) => stack.has(s.toLowerCase())).length }))
    .sort((a, b) => b.shared - a.shared || b.p.year - a.p.year)
    .slice(0, 3)
    .map((x) => x.p)
})

/**
 * "Nuxt, TypeScript, Nitro, PostgreSQL and Tailwind CSS" — the stack as a
 * sentence, with the conjunction in the visitor's language where the runtime
 * knows it. The plain join is only for engines without `Intl.ListFormat`.
 */
const { locale } = useI18n()
const stackSentence = computed(() => {
  const items: string[] = doc.value?.stack ?? []
  try {
    // en-GB: "A, B and C" — no Oxford comma.
    const tag = locale.value === 'en' ? 'en-GB' : locale.value
    return new Intl.ListFormat(tag, { style: 'long', type: 'conjunction' }).format(items)
  } catch {
    return items.join(', ')
  }
})

useSeoMeta({
  title: () => doc.value?.title,
  description: () => doc.value?.description,
  ogTitle: () => `${doc.value?.title} — ${t('projectsSection.caseStudy')}`,
  ogDescription: () => doc.value?.summary,
  ogType: 'article',
})

defineOgImage('OgCard', {
  label: t('projectsSection.caseStudy'),
  title: doc.value.title,
  description: doc.value.description,
})

useSchemaOrg([
  defineArticle({
    headline: doc.value.title,
    description: doc.value.description,
    datePublished: `${doc.value.year}-01-01`,
    author: { name: 'Phanath' },
  }),
])
</script>

<template>
  <article v-if="doc" class="pb-20">
    <div class="container-page pt-10 md:pt-14">
      <NuxtLinkLocale
        to="/projects"
        class="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-text"
      >
        <Icon name="lucide:arrow-left" :size="15" aria-hidden="true" />
        {{ t('projectDetail.allProjects') }}
      </NuxtLinkLocale>
    </div>

    <div class="container-page mt-10 grid gap-6 lg:grid-cols-3">
      <!-- cover + body -->
      <div class="min-w-0 lg:col-span-2">
        <NuxtImg
          v-if="doc.cover"
          :src="doc.cover"
          :alt="t('projectDetail.previewAlt', { title: doc.title })"
          width="1200"
          height="675"
          sizes="(max-width: 1024px) 100vw, 60vw"
          class="aspect-video w-full rounded-xs border border-border object-cover"
        />
      </div>

      <!-- aside -->
      <!-- Stretches to the cover's height; the action row is pinned to the bottom. -->
      <aside class="flex">
        <div class="flex flex-1 flex-col gap-8 rounded-xs border border-border bg-bg-subtle p-6">
          <!-- Title and summary open the panel, in place of the Markdown body. -->
          <header>
            <h1 class="font-heading text-base/snug tracking-tight text-text">
              {{ doc.title }}
            </h1>
            <p class="mt-3 text-pretty text-sm/relaxed text-muted">{{ doc.summary }}</p>
          </header>

          <p class="text-pretty text-sm/relaxed text-muted">
            <span class="font-medium text-text">{{ t('projectDetail.technologyStack') }}:</span>
            {{ stackSentence }}.
          </p>

          <div class="mt-auto flex flex-wrap items-center gap-2">
            <AppButton
              v-if="doc.repo"
              :href="doc.repo"
              size="sm"
              variant="secondary"
              icon="lucide:github"
            >
              {{ t('projectDetail.githubRepo') }}
            </AppButton>
            <AppButton
              v-if="doc.demo"
              :href="doc.demo"
              size="sm"
              icon="lucide:external-link"
              class="ml-auto"
            >
              {{ t('projectDetail.liveDemo') }}
            </AppButton>
          </div>
        </div>
      </aside>
    </div>

    <!-- related -->
    <section v-if="related.length" class="container-page mt-20">
      <RevealOnScroll>
        <h2 class="text-balance text-sm font-semibold tracking-tight text-text sm:text-base">
          {{ t('projectDetail.relatedProjects') }}
        </h2>
      </RevealOnScroll>

      <ProjectGrid class="mt-8" :projects="related" :columns="3" />
    </section>
  </article>
</template>

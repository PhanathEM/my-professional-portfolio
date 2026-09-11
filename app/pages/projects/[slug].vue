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

    <div class="container-page mt-10 grid gap-10 lg:grid-cols-[1fr_21rem] lg:gap-8">
      <!-- cover + body -->
      <div class="min-w-0">
        <NuxtImg
          v-if="doc.cover"
          :src="doc.cover"
          :alt="t('projectDetail.previewAlt', { title: doc.title })"
          width="1200"
          height="675"
          sizes="(max-width: 1024px) 100vw, 60vw"
          class="aspect-video w-full border border-border object-cover"
        />

        <!-- Title and summary sit under the cover, in place of the Markdown body. -->
        <header class="mt-8 max-w-2xl">
          <h1 class="font-heading text-base/snug tracking-tight text-text">
            {{ doc.title }}
          </h1>
          <p class="mt-4 text-pretty text-sm/relaxed text-muted">{{ doc.summary }}</p>
        </header>
      </div>

      <!-- aside -->
      <aside class="lg:sticky lg:top-24 lg:h-fit">
        <div class="space-y-8 rounded-xs bg-bg-subtle p-6 border border-border">
          <div>
            <h2 class="font-mono text-xs font-medium tracking-[0.14em] text-subtle uppercase">
              {{ t('projectDetail.technologyStack') }}
            </h2>
            <ul class="mt-3 flex flex-wrap gap-1.5">
              <li v-for="tech in doc.stack" :key="tech">
                <TechnologyBadge :name="tech" variant="surface" />
              </li>
            </ul>
          </div>

          <div class="flex flex-wrap items-center gap-2">
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

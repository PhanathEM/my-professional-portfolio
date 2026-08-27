<script setup lang="ts">
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

const { data: surround } = await useAsyncData(`project-surround-${contentPath.value}`, () =>
  queryCollectionItemSurroundings('projects', contentPath.value, {
    fields: ['title', 'description', 'path'],
  }),
)
const nextProject = computed(() => surround.value?.[1] ?? surround.value?.[0] ?? null)

useSeoMeta({
  title: () => doc.value?.title,
  description: () => doc.value?.description,
  ogTitle: () => `${doc.value?.title} — ${t('projectsSection.caseStudy')}`,
  ogDescription: () => doc.value?.summary,
  ogType: 'article',
})

defineOgImageComponent('OgCard', {
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

const localePath = useLocalePath()
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

      <header class="mt-6 max-w-3xl">
        <div class="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-subtle">
          <span>{{ doc.year }}</span>
          <span aria-hidden="true">·</span>
          <span>{{ doc.role }}</span>
          <span aria-hidden="true">·</span>
          <span>{{ doc.timeline }}</span>
        </div>
        <h1 class="mt-3 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
          {{ doc.title }}
        </h1>
        <p class="mt-4 text-pretty text-lg/relaxed text-muted">{{ doc.summary }}</p>

        <div class="mt-6 flex flex-wrap gap-3">
          <AppButton v-if="doc.demo" :href="doc.demo" size="sm" icon="lucide:external-link">
            {{ t('projectDetail.liveDemoButton') }}
          </AppButton>
          <AppButton
            v-if="doc.repo"
            :href="doc.repo"
            size="sm"
            :variant="doc.demo ? 'secondary' : 'primary'"
            icon="lucide:github"
          >
            {{ t('projectDetail.viewCodeButton') }}
          </AppButton>
        </div>
      </header>
    </div>

    <div class="container-page mt-10">
      <NuxtImg
        v-if="doc.cover"
        :src="doc.cover"
        :alt="t('projectDetail.previewAlt', { title: doc.title })"
        width="1200"
        height="675"
        sizes="(max-width: 1024px) 100vw, 1024px"
        class="aspect-video w-full rounded-xl border border-border object-cover"
      />
    </div>

    <div class="container-page mt-14 grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
      <!-- body -->
      <div class="prose-content min-w-0 max-w-2xl">
        <ContentRenderer :value="doc" />
      </div>

      <!-- aside -->
      <aside class="lg:sticky lg:top-24 lg:h-fit">
        <div class="space-y-8 rounded-xl border border-border bg-surface p-6">
          <div>
            <h2 class="font-mono text-xs font-medium tracking-[0.14em] text-subtle uppercase">
              {{ t('projectDetail.technologyStack') }}
            </h2>
            <ul class="mt-3 flex flex-wrap gap-1.5">
              <li v-for="tech in doc.stack" :key="tech">
                <TechnologyBadge :name="tech" />
              </li>
            </ul>
          </div>

          <div v-if="doc.features?.length">
            <h2 class="font-mono text-xs font-medium tracking-[0.14em] text-subtle uppercase">
              {{ t('projectDetail.keyFeatures') }}
            </h2>
            <ul class="mt-3 space-y-2">
              <li
                v-for="feature in doc.features"
                :key="feature"
                class="flex items-start gap-2 text-sm text-muted"
              >
                <Icon
                  name="lucide:check"
                  :size="14"
                  class="mt-0.5 shrink-0 text-accent"
                  aria-hidden="true"
                />
                {{ feature }}
              </li>
            </ul>
          </div>

          <div class="flex flex-col gap-2">
            <a
              v-if="doc.repo"
              :href="doc.repo"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
            >
              <Icon name="lucide:github" :size="15" aria-hidden="true" />
              {{ t('projectDetail.githubRepo') }}
            </a>
            <a
              v-if="doc.demo"
              :href="doc.demo"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
            >
              <Icon name="lucide:external-link" :size="15" aria-hidden="true" />
              {{ t('projectDetail.liveDemo') }}
            </a>
          </div>
        </div>
      </aside>
    </div>

    <!-- next project -->
    <div v-if="nextProject" class="container-page mt-16">
      <NuxtLink
        :to="localePath(nextProject.path)"
        class="group flex items-center justify-between gap-4 rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
      >
        <span>
          <span class="font-mono text-xs text-subtle">{{ t('projectDetail.nextProject') }}</span>
          <span class="mt-1 block text-lg font-semibold tracking-tight text-text">
            {{ nextProject.title }}
          </span>
        </span>
        <Icon
          name="lucide:arrow-right"
          :size="20"
          class="shrink-0 text-muted transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import { profile } from '~/data/profile'
import { formatDate } from '~/utils/content'

const route = useRoute()
const siteUrl = useRuntimeConfig().public.siteUrl
const { t, locale, locales } = useI18n()

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

/**
 * Related: the other posts that share the most tags (same category counts as
 * one more), newest first as the tie-break. Three to start; "See more" adds
 * another three at a time.
 */
const { data: others } = await useAsyncData('blog-related-pool', () =>
  queryCollection('blog')
    .where('draft', '=', false)
    .select('path', 'title', 'description', 'date', 'cover', 'category', 'tags')
    .order('date', 'DESC')
    .all(),
)
const relatedAll = computed(() => {
  const me = doc.value
  if (!me) return []
  const tags = new Set(me.tags ?? [])
  return (others.value ?? [])
    .filter((p) => p.path !== me.path)
    .map((p) => ({
      p,
      score:
        (p.tags ?? []).filter((t) => tags.has(t)).length + (p.category === me.category ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score || b.p.date.localeCompare(a.p.date))
    .map((x) => x.p)
})
const RELATED_BATCH = 3
const relatedVisible = ref(RELATED_BATCH)
const related = computed(() => relatedAll.value.slice(0, relatedVisible.value))
const hasMoreRelated = computed(() => relatedAll.value.length > relatedVisible.value)

const dateTag = computed(() => ({ en: 'en-GB', km: 'km-KH', lo: 'lo-LA' })[locale.value] ?? 'en-GB')

/** Nuxt Content builds the outline from the `##`/`###` headings. */
interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}
const toc = computed<TocLink[]>(() => doc.value?.body?.toc?.links ?? [])

/**
 * Share: the native share sheet where the browser has one (phones, Safari,
 * Edge), otherwise copy the canonical URL and flash a tick on the button.
 */
const { copy, copied } = useClipboard({ copiedDuring: 1800 })
async function share() {
  const url = siteUrl + route.path
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({ title: doc.value?.title, url })
    } catch {
      // Sheet dismissed — nothing to do.
    }
    return
  }
  copy(url)
}

/** Aa: cycle the body text through three sizes; remembered per browser. */
const SIZES = ['sm', 'md', 'lg'] as const
type TextSize = (typeof SIZES)[number]
const textSize = useLocalStorage<TextSize>('blog-text-size', 'md')
function cycleTextSize() {
  const i = SIZES.indexOf(textSize.value)
  textSize.value = SIZES[(i + 1) % SIZES.length] ?? 'md'
}

/**
 * Scroll spy for the outline: the active entry is the last heading whose top
 * has passed a line just under the sticky navbar. Cheap enough to run on
 * every scroll frame — there are a handful of headings, not hundreds.
 */
const activeId = ref('')
const headingEls = shallowRef<HTMLElement[]>([])
function collectHeadings() {
  headingEls.value = Array.from(
    document.querySelectorAll<HTMLElement>('.prose-content :is(h2, h3)[id]'),
  )
}
/**
 * A click on an outline entry pins that entry. Near the end of an article the
 * page cannot scroll far enough to carry the heading under the navbar, so the
 * spy alone would keep the previous section lit. The pin is released as soon
 * as the reader scrolls on their own (wheel, touch or keyboard).
 */
const pinned = ref(false)
function goTo(id: string) {
  activeId.value = id
  pinned.value = true
}
for (const evt of ['wheel', 'touchmove', 'keydown', 'popstate'] as const) {
  useEventListener(evt, () => (pinned.value = false), { passive: true })
}

function updateActive() {
  if (pinned.value) return
  const line = 112
  let current = ''
  for (const el of headingEls.value) {
    if (el.getBoundingClientRect().top <= line) current = el.id
    else break
  }
  activeId.value = current
}
onMounted(() => {
  collectHeadings()
  updateActive()
})
useEventListener('scroll', updateActive, { passive: true })
useEventListener('resize', updateActive, { passive: true })

function backToTop() {
  pinned.value = false
  // Drop the "#section" from the address bar too; replaceState fires no popstate.
  history.replaceState(history.state, '', location.pathname + location.search)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const TOC_LINK = 'block text-sm/relaxed transition-colors duration-200'
function tocClass(id: string) {
  return [TOC_LINK, activeId.value === id ? 'text-cta-ink' : 'text-muted hover:text-text']
}

/** Full-size cover, opened from the expand button; Esc or a click closes it. */
const lightbox = ref(false)
useEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape') lightbox.value = false
})

/** Square icon buttons beside the byline — same footprint as the theme switch. */
const TOOL =
  'inline-flex size-9 items-center justify-center rounded-xs border border-border bg-surface text-text transition-colors duration-200 hover:border-border-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none'

useSeoMeta({
  title: () => doc.value?.title,
  description: () => doc.value?.description,
  ogType: 'article',
  ogTitle: () => doc.value?.title,
  articleAuthor: () => [doc.value?.author ?? profile.name],
  articlePublishedTime: () => doc.value?.date,
})

defineOgImage('OgCard', {
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
    <div class="container-page pt-10 md:pt-14">
      <NuxtLinkLocale
        to="/blog"
        class="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-text"
      >
        <Icon name="lucide:arrow-left" :size="15" aria-hidden="true" />
        {{ t('blogDetail.allArticles') }}
      </NuxtLinkLocale>
    </div>

    <!-- Same 3-column rhythm as a case study: the article takes two columns,
         the outline and details panel the third. -->
    <div class="container-page mt-10 grid gap-6 lg:grid-cols-3">
      <div class="min-w-0 lg:col-span-2">
        <header>
          <h1
            class="text-balance text-3xl/tight font-bold tracking-tight text-text sm:text-4xl/tight"
          >
            {{ doc.title }}
          </h1>

          <!-- Dateline on the left, the article tools on the right. -->
          <div class="mt-5 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <p class="text-sm text-subtle">
              <time :datetime="doc.date">{{ formatDate(doc.date, dateTag) }}</time>
            </p>

            <div class="flex items-center gap-2">
              <button
                type="button"
                :class="TOOL"
                :aria-label="t('blogDetail.textSize')"
                :title="t('blogDetail.textSize')"
                @click="cycleTextSize"
              >
                <span class="text-sm font-medium" aria-hidden="true">Aa</span>
              </button>
              <button
                type="button"
                :class="TOOL"
                :aria-label="copied ? t('blogDetail.linkCopied') : t('blogDetail.share')"
                :title="t('blogDetail.share')"
                aria-live="polite"
                @click="share"
              >
                <Icon
                  :name="copied ? 'lucide:check' : 'lucide:share-2'"
                  :size="17"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </header>

        <figure v-if="doc.cover" class="relative mt-6">
          <NuxtImg
            :src="doc.cover"
            :alt="t('blogDetail.coverAlt', { title: doc.title })"
            width="1200"
            height="675"
            sizes="(max-width: 1024px) 100vw, 60vw"
            class="aspect-video w-full rounded-xs border border-border object-cover"
          />
          <button
            type="button"
            class="absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-xs border border-border bg-bg/80 text-text backdrop-blur transition-colors hover:border-border-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            :aria-label="t('blogDetail.expandImage')"
            @click="lightbox = true"
          >
            <Icon name="lucide:maximize-2" :size="16" aria-hidden="true" />
          </button>
        </figure>

        <div class="prose-content mt-10" :data-size="textSize">
          <ContentRenderer :value="doc" />
        </div>

        <!-- related -->
        <section v-if="related.length" class="mt-16 border-t border-border pt-8">
          <h2
            class="flex items-center gap-2.5 text-lg font-medium tracking-[0.06em] text-text uppercase"
          >
            {{ t('blogDetail.related') }}
            <span class="size-2 rounded-full bg-cta" aria-hidden="true" />
          </h2>

          <ul class="mt-2">
            <li
              v-for="post in related"
              :key="post.path"
              class="group relative flex items-start gap-6 border-t border-border py-6 first:border-t-0"
            >
              <div class="min-w-0 flex-1">
                <h3
                  class="text-pretty text-lg/snug font-medium tracking-tight text-text transition-colors group-hover:text-cta-ink"
                >
                  <NuxtLinkLocale
                    :to="post.path"
                    class="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                  >
                    {{ post.title }}
                  </NuxtLinkLocale>
                </h3>
                <p class="mt-2 text-pretty text-sm/relaxed text-muted">{{ post.description }}</p>
                <p class="mt-3 text-xs text-subtle">
                  <time :datetime="post.date">{{ formatDate(post.date, dateTag) }}</time>
                </p>
              </div>
              <BlogCover :post="post" class="aspect-video w-28 shrink-0 sm:w-48" sizes="192px" />
            </li>
          </ul>

          <div v-if="hasMoreRelated" class="mt-2 flex justify-center border-t border-border pt-8">
            <AppButton
              size="sm"
              variant="secondary"
              icon-right="lucide:chevron-down"
              @click="relatedVisible += RELATED_BATCH"
            >
              {{ t('blogPage.seeMore') }}
            </AppButton>
          </div>
        </section>
      </div>

      <!-- Plain outline, no panel — it sits on the page like the reference. -->
      <aside class="lg:sticky lg:top-24 lg:h-fit lg:pl-6">
        <div>
          <nav v-if="toc.length" :aria-label="t('blogDetail.onThisPage')">
            <h2 class="text-base font-semibold tracking-tight text-text">
              {{ t('blogDetail.onThisPage') }}
            </h2>
            <ol class="mt-4 space-y-3 border-l border-border pl-4">
              <li v-for="link in toc" :key="link.id">
                <a
                  :href="`#${link.id}`"
                  :class="tocClass(link.id)"
                  :aria-current="activeId === link.id ? 'location' : undefined"
                  @click="goTo(link.id)"
                >
                  {{ link.text }}
                </a>
                <ol v-if="link.children?.length" class="mt-3 space-y-3 pl-5">
                  <li v-for="child in link.children" :key="child.id">
                    <a
                      :href="`#${child.id}`"
                      :class="tocClass(child.id)"
                      :aria-current="activeId === child.id ? 'location' : undefined"
                      @click="goTo(child.id)"
                    >
                      {{ child.text }}
                    </a>
                  </li>
                </ol>
              </li>
            </ol>
            <button
              type="button"
              class="mt-5 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              @click="backToTop"
            >
              <Icon name="lucide:arrow-up" :size="15" aria-hidden="true" />
              {{ t('blogDetail.backToTop') }}
            </button>
          </nav>
        </div>
      </aside>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="lightbox && doc.cover"
        class="fixed inset-0 z-[60] grid place-items-center bg-black/90 p-4 sm:p-8"
        role="dialog"
        aria-modal="true"
        :aria-label="t('blogDetail.coverAlt', { title: doc.title })"
        @click="lightbox = false"
      >
        <button
          type="button"
          class="absolute top-4 right-4 inline-flex size-10 items-center justify-center rounded-xs border border-white/20 text-white transition-colors hover:border-white/50 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          :aria-label="t('blogDetail.closeImage')"
          @click.stop="lightbox = false"
        >
          <Icon name="lucide:x" :size="18" aria-hidden="true" />
        </button>
        <NuxtImg
          :src="doc.cover"
          :alt="t('blogDetail.coverAlt', { title: doc.title })"
          width="1600"
          height="900"
          sizes="100vw"
          class="max-h-full max-w-full rounded-xs object-contain"
          @click.stop
        />
      </div>
    </Teleport>
  </article>
</template>

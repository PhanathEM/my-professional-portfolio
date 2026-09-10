<script setup lang="ts">
import { estimateReadingTime, formatDate } from '~/utils/content'

/**
 * Three most recent posts, in the same editorial style as the projects grid
 * above — but text-led, because blog posts carry no cover image.
 * Renders nothing at all when there are no published posts, rather than
 * leaving an empty heading stranded on the home page.
 */
const { t, locale } = useI18n()

const { data: posts } = await useAsyncData('home-latest-posts', () =>
  queryCollection('blog').where('draft', '=', false).order('date', 'DESC').limit(3).all(),
)

const items = computed(() =>
  (posts.value ?? []).map((post) => ({
    path: post.path,
    title: post.title,
    description: post.description,
    date: post.date,
    category: post.category,
    readingTime: estimateReadingTime(post.body),
  })),
)

const localeTag = computed(() => (locale.value === 'en' ? 'en-GB' : locale.value))
</script>

<template>
  <section v-if="items.length" id="writing" class="section-pad scroll-mt-20 pt-0">
    <div class="container-page">
      <RevealOnScroll>
        <div class="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            :title="t('blogSection.title')"
            :description="t('blogSection.description')"
            description-size="sm"
            title-size="sm"
          />
          <NuxtLinkLocale
            to="/blog"
            class="inline-flex shrink-0 items-center gap-1.5 text-sm text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {{ t('blogSection.allPosts') }}
            <Icon
              name="lucide:arrow-right"
              :size="15"
              class="transition-transform duration-300"
              aria-hidden="true"
            />
          </NuxtLinkLocale>
        </div>
      </RevealOnScroll>

      <div class="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        <RevealOnScroll
          v-for="(post, i) in items"
          :key="post.path"
          :y="18"
          :delay="i * 0.06"
          class="min-w-0"
        >
          <article class="group relative flex flex-col border-t border-border pt-5">
            <p class="flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.12em] uppercase">
              <span class="text-cta-ink">{{ post.category }}</span>
              <span class="text-subtle" aria-hidden="true">·</span>
              <span class="text-subtle">{{ formatDate(post.date, localeTag) }}</span>
            </p>

            <h3 class="mt-3 font-heading text-lg/snug font-bold tracking-tight text-text">
              <NuxtLinkLocale
                :to="post.path"
                class="decoration-2 underline-offset-4 after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-hover:underline"
              >
                {{ post.title }}
              </NuxtLinkLocale>
            </h3>

            <p class="mt-2.5 text-pretty text-sm/relaxed text-muted">{{ post.description }}</p>

            <p class="mt-4 font-mono text-[0.7rem] text-subtle">
              {{ t('blogPage.minRead', { count: post.readingTime }) }}
            </p>
          </article>
        </RevealOnScroll>
      </div>
    </div>
  </section>
</template>

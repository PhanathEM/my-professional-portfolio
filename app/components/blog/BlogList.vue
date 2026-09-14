<script setup lang="ts">
interface BlogListItem {
  path: string
  title: string
  description: string
  date: string
  cover?: string
}

const props = defineProps<{ posts: BlogListItem[] }>()

const { t } = useI18n()

/**
 * Front-page layout: the newest story leads on the left; on the right two
 * pictured stories sit above a two-column run of compact headlines.
 */
const lead = computed(() => props.posts[0])
const pictured = computed(() => props.posts.slice(1, 3))
const compact = computed(() => props.posts.slice(3))
</script>

<template>
  <div v-if="lead" class="grid gap-10 lg:grid-cols-2 lg:gap-8">
    <RevealOnScroll :y="16">
      <BlogCard :post="lead" variant="lead" />
    </RevealOnScroll>

    <div v-if="pictured.length" class="flex flex-col gap-8">
      <div class="grid gap-6 sm:grid-cols-2">
        <RevealOnScroll
          v-for="(post, i) in pictured"
          :key="post.path"
          :y="16"
          :delay="0.06 + i * 0.06"
        >
          <BlogCard :post="post" variant="medium" />
        </RevealOnScroll>
      </div>

      <!-- Compact stories: hairline-separated, two columns, no row gap. -->
      <div v-if="compact.length" class="grid gap-x-6 sm:grid-cols-2">
        <BlogCard v-for="post in compact" :key="post.path" :post="post" variant="compact" />
      </div>
    </div>
  </div>

  <p v-else class="py-10 text-sm text-muted">{{ t('blogPage.empty') }}</p>
</template>

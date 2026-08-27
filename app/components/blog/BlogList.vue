<script setup lang="ts">
interface BlogListItem {
  path: string
  title: string
  description: string
  date: string
  category: string
  readingTime?: number
  cover?: string
}

defineProps<{ posts: BlogListItem[] }>()

const { t } = useI18n()
</script>

<template>
  <div v-if="posts.length" class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    <RevealOnScroll v-for="(post, i) in posts" :key="post.path" :y="16" :delay="(i % 3) * 0.06">
      <BlogCard :post="post" />
    </RevealOnScroll>
  </div>

  <div
    v-else
    class="rounded-xl border border-dashed border-border-strong bg-surface p-12 text-center"
  >
    <Icon name="lucide:pencil-line" :size="24" class="mx-auto text-subtle" aria-hidden="true" />
    <p class="mt-3 text-sm text-muted">{{ t('blogPage.empty') }}</p>
  </div>
</template>

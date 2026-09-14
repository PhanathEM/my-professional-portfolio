<script setup lang="ts">
/** Story picture, or the dotted placeholder when a post has no cover yet. */
withDefaults(defineProps<{ post: { title: string; cover?: string }; sizes?: string }>(), {
  sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px',
})

const { t } = useI18n()
</script>

<template>
  <div class="overflow-hidden rounded-xs bg-bg-subtle">
    <NuxtImg
      v-if="post.cover"
      :src="post.cover"
      :alt="t('blogDetail.coverAlt', { title: post.title })"
      width="1200"
      height="675"
      :sizes="sizes"
      class="size-full object-cover"
      loading="lazy"
    />
    <div
      v-else
      class="grid size-full place-items-center [background-image:linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)] [background-size:24px_24px]"
    >
      <Icon name="lucide:file-text" :size="24" class="text-subtle" aria-hidden="true" />
    </div>
  </div>
</template>

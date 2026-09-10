<script setup lang="ts">
import type { Project } from '~/types'

const props = withDefaults(defineProps<{ projects: Project[]; columns?: 2 | 3 | 4 }>(), {
  columns: 3,
})

const COLUMNS: Record<2 | 3 | 4, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
}
const columnClass = computed(() => COLUMNS[props.columns])
</script>

<template>
  <div class="grid gap-x-8 gap-y-12" :class="columnClass">
    <RevealOnScroll
      v-for="(project, i) in projects"
      :key="project.slug"
      :y="18"
      :delay="(i % columns) * 0.06"
      class="min-w-0"
    >
      <ProjectEditorialCard :project="project" />
    </RevealOnScroll>
  </div>
</template>

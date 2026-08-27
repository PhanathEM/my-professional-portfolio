<script setup lang="ts">
import type { Project } from '~/types'

defineProps<{ projects: Project[]; columns?: 2 | 3 }>()
</script>

<template>
  <div
    class="grid gap-5"
    :class="columns === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'"
  >
    <RevealOnScroll
      v-for="(project, i) in projects"
      :key="project.slug"
      :y="18"
      :delay="(i % 3) * 0.06"
    >
      <ProjectCard :project="project" class="h-full" />
    </RevealOnScroll>
  </div>
</template>

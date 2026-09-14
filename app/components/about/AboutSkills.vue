<script setup lang="ts">
import { experience } from '~/data/experience'
import { skillCategories } from '~/data/skills'

const { t } = useI18n()

/** Degrees and courses live in the same list as work; this column takes only those. */
const education = computed(() => experience.filter((e) => e.kind === 'education'))
</script>

<template>
  <!-- Résumé body: skill tiles on the left, education on the right. -->
  <section id="skills" class="container-page scroll-mt-20 pt-14">
    <div class="grid gap-12 lg:grid-cols-3 lg:gap-8">
      <!-- skills -->
      <div>
        <RevealOnScroll>
          <h2 class="text-sm font-semibold tracking-tight text-text">{{ t('skills.title') }}</h2>
        </RevealOnScroll>

        <div class="mt-4 space-y-6">
          <RevealOnScroll
            v-for="(category, i) in skillCategories"
            :key="category.id"
            :y="14"
            :delay="i * 0.05"
          >
            <h3 class="text-xs text-subtle">{{ t(`skills.${category.id}.title`) }}</h3>
            <ul class="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-4">
              <li
                v-for="skill in category.skills"
                :key="skill.name"
                class="flex flex-col items-center gap-1.5"
              >
                <span
                  class="grid size-12 place-items-center rounded-xs border border-border bg-surface transition-colors hover:border-border-hover"
                  :title="skill.name"
                >
                  <Icon
                    :name="skill.logo ?? skill.icon"
                    :size="22"
                    :class="skill.logo ? '' : 'text-muted'"
                    aria-hidden="true"
                  />
                </span>
                <span class="max-w-full truncate text-[0.65rem] text-subtle">{{ skill.name }}</span>
              </li>
            </ul>
          </RevealOnScroll>
        </div>
      </div>

      <!-- education -->
      <div v-if="education.length" class="lg:col-span-2">
        <RevealOnScroll>
          <h2 class="text-sm font-semibold tracking-tight text-text">{{ t('about.education') }}</h2>
        </RevealOnScroll>

        <ol class="mt-4">
          <RevealOnScroll
            v-for="(item, i) in education"
            :key="`${item.title}-${i}`"
            :y="14"
            :delay="i * 0.05"
          >
            <li class="flex items-start justify-between gap-6 border-b border-border py-4">
              <div class="min-w-0">
                <h3 class="text-sm font-medium text-text">{{ item.title }}</h3>
                <p class="mt-0.5 text-sm text-muted">
                  {{ item.organization }}
                  <template v-if="item.location"> · {{ item.location }}</template>
                </p>
                <p class="mt-1.5 max-w-xl text-pretty text-sm/relaxed text-subtle">
                  {{ item.description }}
                </p>
              </div>
              <p class="shrink-0 text-xs text-subtle">
                {{ item.period }}
              </p>
            </li>
          </RevealOnScroll>
        </ol>
      </div>
    </div>
  </section>
</template>

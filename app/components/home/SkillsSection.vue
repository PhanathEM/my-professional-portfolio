<script setup lang="ts">
import { skillCategories } from '~/data/skills'

const { t } = useI18n()
</script>

<template>
  <section id="skills" class="section-pad scroll-mt-20 border-t border-border bg-bg-subtle">
    <div class="container-page">
      <RevealOnScroll>
        <SectionHeading
          :eyebrow="t('skills.eyebrow')"
          :title="t('skills.title')"
          :description="t('skills.description')"
        />
      </RevealOnScroll>

      <div class="mt-14 grid gap-5 md:grid-cols-2">
        <RevealOnScroll
          v-for="(category, i) in skillCategories"
          :key="category.id"
          :y="18"
          :delay="i * 0.05"
        >
          <article
            class="h-full rounded-xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-border-strong"
          >
            <div class="flex items-center gap-3">
              <span
                class="grid size-10 place-items-center rounded-lg border border-border bg-bg-subtle text-accent"
              >
                <Icon :name="category.icon" :size="18" aria-hidden="true" />
              </span>
              <h3 class="text-[0.95rem] font-semibold tracking-tight text-text">
                {{ t(`skills.${category.id}.title`) }}
              </h3>
            </div>

            <p class="mt-3 text-sm/relaxed text-muted">
              {{ t(`skills.${category.id}.description`) }}
            </p>

            <ul class="mt-5 flex flex-wrap gap-2">
              <li v-for="skill in category.skills" :key="skill.name">
                <span
                  class="inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-subtle px-2.5 py-1.5 text-[0.78rem] font-medium text-muted transition-colors duration-200 hover:border-accent/40 hover:text-text"
                >
                  <Icon :name="skill.icon" :size="13" class="text-subtle" aria-hidden="true" />
                  {{ skill.name }}
                </span>
              </li>
            </ul>
          </article>
        </RevealOnScroll>
      </div>
    </div>
  </section>
</template>

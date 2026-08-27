<script setup lang="ts">
import type { ExperienceItem } from '~/types'

defineProps<{ items: ExperienceItem[] }>()

const { t } = useI18n()

const kindIcon: Record<ExperienceItem['kind'], string> = {
  work: 'lucide:briefcase',
  education: 'lucide:graduation-cap',
  project: 'lucide:folder-git-2',
}
</script>

<template>
  <ol class="relative">
    <li
      v-for="(item, i) in items"
      :key="`${item.title}-${i}`"
      class="relative grid gap-x-6 gap-y-3 pb-10 pl-10 last:pb-0 sm:grid-cols-[8rem_1fr] sm:pl-0"
    >
      <!-- rail -->
      <span
        class="absolute left-3 top-2 bottom-0 w-px bg-border sm:left-[8.4rem]"
        :class="i === items.length - 1 && 'hidden'"
        aria-hidden="true"
      />
      <span
        class="absolute left-[0.32rem] top-1.5 grid size-5 place-items-center rounded-full border border-border-strong bg-surface sm:left-[8.1rem]"
        aria-hidden="true"
      >
        <span
          class="size-1.5 rounded-full"
          :class="item.current ? 'bg-accent' : 'bg-border-strong'"
        />
      </span>

      <!-- period -->
      <div class="sm:text-right">
        <p class="font-mono text-xs text-subtle">{{ item.period }}</p>
        <BaseBadge
          size="sm"
          :variant="item.current ? 'accent' : 'default'"
          :icon="kindIcon[item.kind]"
          class="mt-2"
        >
          {{ t(`experience.kind.${item.kind}`) }}
        </BaseBadge>
      </div>

      <!-- content -->
      <RevealOnScroll :y="14" class="sm:pl-6">
        <div class="rounded-xl border border-border bg-surface p-5">
          <h3 class="text-[0.95rem] font-semibold tracking-tight text-text">
            {{ item.title }}
            <span v-if="item.current" class="ml-1.5 text-xs font-normal text-accent">
              · {{ t('experience.now') }}
            </span>
          </h3>
          <p class="mt-0.5 text-sm text-muted">
            {{ item.organization }}<template v-if="item.location"> · {{ item.location }}</template>
          </p>
          <p class="mt-3 text-pretty text-sm/relaxed text-muted">{{ item.description }}</p>
          <ul class="mt-4 flex flex-wrap gap-1.5">
            <li v-for="tech in item.technologies" :key="tech">
              <BaseBadge size="sm" variant="outline">{{ tech }}</BaseBadge>
            </li>
          </ul>
        </div>
      </RevealOnScroll>
    </li>
  </ol>
</template>

<script setup lang="ts">
/**
 * Numbered pagination: ‹ 1 2 … 11 ›
 *
 * Always shows the first and last page plus a window around the current one,
 * collapsing the gaps to an ellipsis — so the control stays the same width
 * whether there are 3 pages or 300.
 */
const props = withDefaults(
  defineProps<{
    /** 1-based. */
    page: number
    totalPages: number
    /** Pages shown on each side of the current one. */
    siblings?: number
  }>(),
  { siblings: 1 },
)

const emit = defineEmits<{ 'update:page': [value: number] }>()

const { t } = useI18n()

type Item = number | 'gap-start' | 'gap-end'

const items = computed<Item[]>(() => {
  const { page, totalPages, siblings } = props
  // first + last + current + 2 siblings + 2 ellipses
  if (totalPages <= siblings * 2 + 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const left = Math.max(page - siblings, 2)
  const right = Math.min(page + siblings, totalPages - 1)
  const out: Item[] = [1]

  if (left > 2) out.push('gap-start')
  for (let i = left; i <= right; i++) out.push(i)
  if (right < totalPages - 1) out.push('gap-end')

  out.push(totalPages)
  return out
})

function go(next: number) {
  const clamped = Math.min(Math.max(next, 1), props.totalPages)
  if (clamped !== props.page) emit('update:page', clamped)
}

const BASE =
  'inline-flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none'
const IDLE = 'border-border bg-surface text-muted hover:border-border-hover hover:text-text'
const CURRENT = 'border-transparent bg-cta text-cta-contrast'
const ARROW = `${BASE} ${IDLE} disabled:pointer-events-none disabled:opacity-40`
</script>

<template>
  <nav
    v-if="totalPages > 1"
    class="flex flex-wrap items-center justify-center gap-2"
    :aria-label="t('pagination.label')"
  >
    <button
      type="button"
      :class="ARROW"
      :disabled="page === 1"
      :aria-label="t('pagination.previous')"
      @click="go(page - 1)"
    >
      <Icon name="lucide:chevron-left" :size="16" aria-hidden="true" />
    </button>

    <template v-for="(item, i) in items" :key="`${item}-${i}`">
      <span
        v-if="item === 'gap-start' || item === 'gap-end'"
        class="grid size-9 place-items-center text-sm text-subtle"
        aria-hidden="true"
      >
        …
      </span>
      <button
        v-else
        type="button"
        :class="[BASE, item === page ? CURRENT : IDLE]"
        :aria-label="t('pagination.page', { page: item })"
        :aria-current="item === page ? 'page' : undefined"
        @click="go(item)"
      >
        {{ item }}
      </button>
    </template>

    <button
      type="button"
      :class="ARROW"
      :disabled="page === totalPages"
      :aria-label="t('pagination.next')"
      @click="go(page + 1)"
    >
      <Icon name="lucide:chevron-right" :size="16" aria-hidden="true" />
    </button>
  </nav>
</template>

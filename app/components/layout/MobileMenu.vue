<script setup lang="ts">
import type { NavItem } from '~/types'
import { social } from '~/data/social'

const props = defineProps<{
  items: NavItem[]
  isActive: (item: NavItem) => boolean
}>()

const open = defineModel<boolean>('open', { default: false })

const route = useRoute()
watch(
  () => route.fullPath,
  () => (open.value = false),
)

// Lock body scroll while the sheet is open.
watch(open, (isOpen) => {
  if (import.meta.client) {
    document.documentElement.style.overflow = isOpen ? 'hidden' : ''
  }
})
onBeforeUnmount(() => {
  if (import.meta.client) document.documentElement.style.overflow = ''
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-200 ease-out"
    enter-from-class="opacity-0"
    leave-active-class="transition-opacity duration-150 ease-in"
    leave-to-class="opacity-0"
  >
    <div
      v-if="open"
      class="fixed inset-0 top-16 z-30 bg-bg/60 backdrop-blur-sm lg:hidden"
      aria-hidden="true"
      @click="open = false"
    />
  </Transition>

  <Transition
    enter-active-class="transition duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]"
    enter-from-class="opacity-0 -translate-y-3"
    leave-active-class="transition duration-150 ease-in"
    leave-to-class="opacity-0 -translate-y-3"
  >
    <div
      v-if="open"
      id="mobile-menu"
      class="fixed inset-x-0 top-16 z-30 origin-top border-b border-border bg-bg px-5 pb-8 pt-3 shadow-lift lg:hidden"
      @keydown="onKeydown"
    >
      <ul class="flex flex-col">
        <li v-for="(item, i) in items" :key="item.to">
          <Motion
            :initial="{ opacity: 0, x: -8 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ delay: 0.03 * i + 0.05, duration: 0.25 }"
          >
            <NuxtLinkLocale
              :to="item.to"
              class="flex items-center justify-between border-b border-border/70 py-3.5 text-[0.95rem] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              :class="props.isActive(item) ? 'text-accent' : 'text-text'"
              @click="open = false"
            >
              {{ $t(item.label) }}
              <Icon
                v-if="props.isActive(item)"
                name="lucide:arrow-right"
                :size="16"
                aria-hidden="true"
              />
            </NuxtLinkLocale>
          </Motion>
        </li>
      </ul>

      <div class="mt-6 flex items-center gap-3">
        <a
          v-for="link in social"
          :key="link.label"
          :href="link.href"
          :target="link.href.startsWith('http') ? '_blank' : undefined"
          :rel="link.href.startsWith('http') ? 'noopener noreferrer' : undefined"
          :aria-label="link.label"
          class="inline-flex size-11 items-center justify-center rounded-md border border-border bg-surface text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Icon :name="link.icon" :size="18" aria-hidden="true" />
        </a>
      </div>
    </div>
  </Transition>
</template>

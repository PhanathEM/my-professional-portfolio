<script setup lang="ts">
const colorMode = useColorMode()

const { t } = useI18n()

const options = [
  { value: 'system', labelKey: 'theme.system', icon: 'lucide:monitor' },
  { value: 'light', labelKey: 'theme.light', icon: 'lucide:sun' },
  { value: 'dark', labelKey: 'theme.dark', icon: 'lucide:moon' },
] as const

const open = ref(false)
const root = ref<HTMLElement | null>(null)

const current = computed(() => options.find((o) => o.value === colorMode.preference) ?? options[0])

function choose(value: (typeof options)[number]['value']) {
  colorMode.preference = value
  open.value = false
}

onClickOutside(root, () => (open.value = false))
</script>

<template>
  <ClientOnly>
    <div ref="root" class="relative">
      <button
        type="button"
        class="inline-flex size-10 items-center justify-center rounded-md border border-border bg-surface text-muted transition-colors duration-200 hover:border-accent/40 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        :aria-expanded="open"
        aria-haspopup="menu"
        :aria-label="t('a11y.changeTheme')"
        @click="open = !open"
      >
        <Icon :name="current.icon" :size="18" aria-hidden="true" />
      </button>

      <Transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0 -translate-y-1 scale-95"
        leave-active-class="transition duration-100 ease-in"
        leave-to-class="opacity-0 -translate-y-1 scale-95"
      >
        <div
          v-if="open"
          role="menu"
          class="absolute right-0 z-50 mt-2 w-40 origin-top-right overflow-hidden rounded-lg border border-border bg-surface-elevated p-1 shadow-lift"
        >
          <button
            v-for="option in options"
            :key="option.value"
            type="button"
            role="menuitemradio"
            :aria-checked="colorMode.preference === option.value"
            class="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            :class="colorMode.preference === option.value && 'text-text'"
            @click="choose(option.value)"
          >
            <Icon :name="option.icon" :size="16" aria-hidden="true" />
            {{ t(option.labelKey) }}
            <Icon
              v-if="colorMode.preference === option.value"
              name="lucide:check"
              :size="15"
              class="ml-auto text-accent"
              aria-hidden="true"
            />
          </button>
        </div>
      </Transition>
    </div>

    <template #fallback>
      <div class="size-10 rounded-md border border-border bg-surface" aria-hidden="true" />
    </template>
  </ClientOnly>
</template>

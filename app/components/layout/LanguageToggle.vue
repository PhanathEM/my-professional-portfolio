<script setup lang="ts">
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

/** Flag icon per locale (Iconify `circle-flags` set, bundled at build time). */
const FLAGS: Record<string, string> = {
  en: 'circle-flags:uk',
  km: 'circle-flags:kh',
  lo: 'circle-flags:la',
}
const flagFor = (code: string) => FLAGS[code] ?? 'circle-flags:un'

const available = computed(() =>
  locales.value.map((l) => (typeof l === 'string' ? { code: l, name: l, language: l } : l)),
)
const current = computed(() => available.value.find((l) => l.code === locale.value))

const open = ref(false)
const root = ref<HTMLElement | null>(null)
onClickOutside(root, () => (open.value = false))
</script>

<template>
  <div ref="root" class="relative">
    <button
      type="button"
      class="inline-flex h-10 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-sm font-medium text-muted transition-colors duration-200 hover:border-accent/40 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      :aria-expanded="open"
      aria-haspopup="menu"
      :aria-label="t('a11y.changeLanguage')"
      @click="open = !open"
    >
      <Icon :name="flagFor(current?.code ?? 'en')" :size="18" class="rounded-full" aria-hidden="true" />
      <span class="hidden sm:inline">{{ current?.name }}</span>
      <Icon name="lucide:chevron-down" :size="14" class="opacity-60" aria-hidden="true" />
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
        class="absolute right-0 z-50 mt-2 w-44 origin-top-right overflow-hidden rounded-lg border border-border bg-surface-elevated p-1 shadow-lift"
      >
        <NuxtLink
          v-for="loc in available"
          :key="loc.code"
          :to="switchLocalePath(loc.code)"
          role="menuitemradio"
          :aria-checked="loc.code === locale"
          :hreflang="loc.language"
          class="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          :class="loc.code === locale && 'text-text'"
          @click="open = false"
        >
          <Icon :name="flagFor(loc.code)" :size="18" class="shrink-0 rounded-full" aria-hidden="true" />
          {{ loc.name }}
          <Icon
            v-if="loc.code === locale"
            name="lucide:check"
            :size="15"
            class="ml-auto text-accent"
            aria-hidden="true"
          />
        </NuxtLink>
      </div>
    </Transition>
  </div>
</template>

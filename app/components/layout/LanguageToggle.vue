<script setup lang="ts">
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

/**
 * Real flag artwork from `public/images/flags/`. Plain <img> rather than
 * <NuxtImg>: each file is already an optimised WebP under 5 KB, so putting it
 * through the IPX pipeline would cost a request and save nothing.
 */
const FLAGS: Record<string, string> = {
  en: '/images/flags/uk-flag.webp',
  km: '/images/flags/khmer-flag.webp',
  lo: '/images/flags/lao-flag.webp',
}
const flagFor = (code: string) => FLAGS[code] ?? FLAGS.en!

/** The three source images have different aspect ratios, so they are cropped
 *  to one consistent 3:2 tile. The hairline ring keeps the white areas of the
 *  Lao and Khmer flags from bleeding into a light surface. */
const FLAG_CLASS = 'h-4 w-6 shrink-0 rounded-[3px] object-cover ring-1 ring-border-strong'

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
      class="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-sm font-medium text-muted transition-colors duration-200 hover:border-border-hover hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      :aria-expanded="open"
      aria-haspopup="menu"
      :aria-label="t('a11y.changeLanguage')"
      @click="open = !open"
    >
      <img
        :src="flagFor(current?.code ?? 'en')"
        alt=""
        width="24"
        height="16"
        :class="FLAG_CLASS"
        aria-hidden="true"
      />
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
        class="absolute right-0 z-50 mt-2 w-[7.5rem] origin-top-right overflow-hidden rounded-lg border border-border bg-surface-elevated p-1 shadow-lift"
      >
        <NuxtLink
          v-for="loc in available"
          :key="loc.code"
          :to="switchLocalePath(loc.code)"
          role="menuitemradio"
          :aria-checked="loc.code === locale"
          :hreflang="loc.language"
          class="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          :class="loc.code === locale && 'text-text'"
          @click="open = false"
        >
          <img
            :src="flagFor(loc.code)"
            alt=""
            width="24"
            height="16"
            :class="FLAG_CLASS"
            aria-hidden="true"
          />
          {{ loc.name }}
          <Icon
            v-if="loc.code === locale"
            name="lucide:check"
            :size="13"
            class="ml-auto text-cta-ink"
            aria-hidden="true"
          />
        </NuxtLink>
      </div>
    </Transition>
  </div>
</template>

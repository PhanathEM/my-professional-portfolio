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

/**
 * One flag treatment for both the trigger and the menu rows. The rows are
 * padded so the flag lands in exactly the same place it does in the button.
 * The three source images have different aspect ratios, so `object-cover`
 * crops them all to one square that is then masked to a circle.
 *
 *   button : 1px border + 6px (pl-1.5)               = 7px from the edge
 *   row    : 1px border + 4px (menu p-1) + 2px (pl-0.5) = 7px
 *   button : 6px above/below the 20px flag (h-8, centred)
 *   row    : 4px above/below (py-1) — rows sit tighter than the button
 *            on purpose, so the list stays compact
 *
 * Vertical space comes from padding rather than a fixed height, so a Khmer or
 * Lao label with tall subscripts can still grow the row instead of clipping.
 */
const FLAG_CLASS = 'size-5 shrink-0 rounded-full object-cover'

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
      class="inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-surface pl-1.5 pr-3 text-sm sm:w-[8.75rem] font-medium text-muted transition-colors duration-200 hover:border-border-hover hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      :aria-expanded="open"
      aria-haspopup="menu"
      :aria-label="t('a11y.changeLanguage')"
      @click="open = !open"
    >
      <img
        :src="flagFor(current?.code ?? 'en')"
        alt=""
        width="20"
        height="20"
        :class="FLAG_CLASS"
        aria-hidden="true"
      />
      <span class="hidden sm:inline">{{ current?.name }}</span>
      <Icon name="lucide:chevron-down" :size="14" class="ml-auto opacity-60" aria-hidden="true" />
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
        class="absolute right-0 z-50 mt-2 w-full min-w-[8.75rem] origin-top-right overflow-hidden rounded-lg border border-border bg-surface-elevated p-1 shadow-lift"
      >
        <NuxtLink
          v-for="loc in available"
          :key="loc.code"
          :to="switchLocalePath(loc.code)"
          role="menuitemradio"
          :aria-checked="loc.code === locale"
          :hreflang="loc.language"
          class="flex w-full items-center gap-1.5 rounded-md py-1 pl-0.5 pr-2 text-sm text-muted transition-colors hover:bg-surface hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          :class="loc.code === locale && 'text-text'"
          @click="open = false"
        >
          <img
            :src="flagFor(loc.code)"
            alt=""
            width="20"
            height="20"
            :class="FLAG_CLASS"
            aria-hidden="true"
          />
          {{ loc.name }}
          <Icon
            v-if="loc.code === locale"
            name="lucide:circle-check"
            :size="15"
            class="ml-auto text-cta-ink"
            aria-hidden="true"
          />
        </NuxtLink>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { footerNav } from '~/data/navigation'
import { profile } from '~/data/profile'
import { social } from '~/data/social'

const { t } = useI18n()
const year = new Date().getFullYear()

/**
 * Scroll-linked reveal. The footer is pinned behind <main> (see
 * `.footer-sticky-reveal` in main.css); as main slides up off it, `progress`
 * runs 0 → 1: the top hairline draws out from its centre and the contents
 * go from blurred + dim to sharp + bright.
 *
 * SSR / no-JS / reduced-motion all render the footer fully visible.
 */
const reduced = usePrefersReducedMotion()
const footerEl = ref<HTMLElement | null>(null)
const { height: footerH } = useElementSize(footerEl)
const { y } = useWindowScroll()
const { height: winH } = useWindowSize()

const mounted = ref(false)
onMounted(() => (mounted.value = true))

const progress = computed(() => {
  if (!mounted.value || reduced.value) return 1
  const h = footerH.value || 1
  const remaining = document.documentElement.scrollHeight - (y.value + winH.value)
  return Math.min(1, Math.max(0, 1 - remaining / h))
})

/** Smoothstep, optionally delayed so layers stagger. */
function layer(startAt = 0) {
  const p = Math.min(1, Math.max(0, (progress.value - startAt) / (1 - startAt)))
  return p * p * (3 - 2 * p)
}

/**
 * Reveal style for one layer of the footer.
 *
 *   blurred + dim  →  sharp + bright
 *
 * `startAt` delays the layer (0–1) so the columns and the bottom bar
 * stagger; `rise` is how far it travels up, `blur` its starting softness.
 */
const style = (startAt: number, rise: number, blur = 14) => {
  const e = layer(startAt)
  const d = 1 - e
  return {
    opacity: 0.2 + e * 0.8,
    transform: `translate3d(0, ${(d * rise).toFixed(2)}px, 0)`,
    // Dropped entirely once settled — a live filter forces a compositing layer.
    filter:
      d < 0.005
        ? 'none'
        : `blur(${(d * blur).toFixed(2)}px) brightness(${(0.5 + e * 0.5).toFixed(3)}) saturate(${(0.35 + e * 0.65).toFixed(3)})`,
  }
}

/** Hairline rule that grows out from its centre towards both edges. */
const rule = (startAt: number) => ({ transform: `scaleX(${layer(startAt).toFixed(4)})` })
</script>

<template>
  <footer ref="footerEl" class="sticky bottom-0 z-0 bg-bg">
    <!-- Hairline drawn from the centre outwards as the footer is uncovered. -->
    <span
      class="absolute inset-x-0 top-0 h-px origin-center bg-border will-change-transform"
      :style="rule(0)"
      aria-hidden="true"
    />

    <div
      class="container-page grid gap-10 py-14 footer-reveal-layer sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]"
      :style="style(0.05, 30)"
    >
      <div class="max-w-sm">
        <NuxtLinkLocale to="/" class="flex items-center gap-2.5">
          <NuxtImg
            :src="profile.logo"
            :alt="profile.name"
            width="80"
            height="80"
            class="size-9 shrink-0 rounded-full object-cover object-top ring-1 ring-border-strong"
          />
          <span class="text-[0.95rem] font-semibold tracking-tight">{{ profile.name }}</span>
        </NuxtLinkLocale>
        <p class="mt-4 text-sm/relaxed text-muted">
          {{ t('footer.description', { role: t('profile.role') }) }}
        </p>
        <div class="mt-5">
          <SocialLinks size="sm" />
        </div>
      </div>

      <nav :aria-label="t('a11y.footerNav')">
        <h2 class="font-mono text-xs font-medium tracking-[0.14em] text-subtle uppercase">
          {{ t('footer.navigate') }}
        </h2>
        <ul class="mt-4 space-y-2.5">
          <li v-for="item in footerNav" :key="item.to">
            <NuxtLinkLocale
              :to="item.to"
              class="text-sm text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {{ t(item.label) }}
            </NuxtLinkLocale>
          </li>
        </ul>
      </nav>

      <div>
        <h2 class="font-mono text-xs font-medium tracking-[0.14em] text-subtle uppercase">
          {{ t('footer.elsewhere') }}
        </h2>
        <ul class="mt-4 space-y-2.5">
          <li v-for="link in social" :key="link.label">
            <a
              :href="link.href"
              :target="link.href.startsWith('http') ? '_blank' : undefined"
              :rel="link.href.startsWith('http') ? 'noopener noreferrer' : undefined"
              class="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Icon :name="link.icon" :size="15" aria-hidden="true" />
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="relative">
      <!-- Drawn from the centre outwards, a beat before the row below it. -->
      <span
        class="absolute inset-x-0 top-0 h-px origin-center bg-border will-change-transform"
        :style="rule(0.25)"
        aria-hidden="true"
      />
      <div
        class="footer-reveal-layer container-page py-6 text-center text-xs text-subtle"
        :style="style(0.35, 18, 9)"
      >
        <p>{{ t('footer.rights', { year, name: profile.name }) }}</p>
      </div>
    </div>
  </footer>
</template>

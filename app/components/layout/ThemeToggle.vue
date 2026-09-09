<script setup lang="ts">
/**
 * Theme switch.
 *
 * The control itself is deliberately quiet — a plain sliding switch. The
 * effect is on the *page*: flipping it starts a View Transition and the new
 * theme is revealed as a circle expanding out from the switch until it covers
 * the viewport.
 *
 * Falls back to an instant swap where `startViewTransition` is unsupported
 * (Firefox at time of writing) or when the user prefers reduced motion.
 */
type StartViewTransition = (cb: () => Promise<void> | void) => { ready: Promise<void> }

const colorMode = useColorMode()
const { t } = useI18n()
const reduced = usePrefersReducedMotion()

const isDark = computed(() => colorMode.value === 'dark')
const el = ref<HTMLElement | null>(null)

async function toggle() {
  const next = isDark.value ? 'light' : 'dark'
  const apply = () => {
    colorMode.preference = next
  }

  const start = (document as unknown as { startViewTransition?: StartViewTransition })
    .startViewTransition

  if (!start || reduced.value || !el.value) {
    apply()
    return
  }

  // Ripple origin: the centre of the switch.
  const box = el.value.getBoundingClientRect()
  const x = box.left + box.width / 2
  const y = box.top + box.height / 2
  // Radius needed to reach the furthest corner of the viewport.
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

  const transition = start.call(document, async () => {
    apply()
    await nextTick()
  })

  await transition.ready

  // The old theme stays put; the new one is clipped open over the top of it.
  document.documentElement.animate(
    {
      clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
    },
    {
      duration: 620,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      pseudoElement: '::view-transition-new(root)',
    },
  )
}
</script>

<template>
  <ClientOnly>
    <button
      ref="el"
      type="button"
      role="switch"
      class="theme-switch"
      :class="{ 'is-dark': isDark }"
      :aria-checked="isDark"
      :aria-label="t('a11y.changeTheme')"
      :title="isDark ? t('theme.light') : t('theme.dark')"
      @click="toggle"
    >
      <span class="theme-switch__thumb" aria-hidden="true">
        <Icon name="lucide:sun" class="theme-switch__icon theme-switch__icon--sun" :size="13" />
        <Icon name="lucide:moon" class="theme-switch__icon theme-switch__icon--moon" :size="13" />
      </span>
    </button>

    <template #fallback>
      <div class="h-8 w-14 rounded-full border border-border bg-bg-subtle" aria-hidden="true" />
    </template>
  </ClientOnly>
</template>

<style scoped>
.theme-switch {
  display: inline-flex;
  height: 2rem;
  width: 3.5rem;
  flex-shrink: 0;
  align-items: center;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: 9999px;
  background: var(--bg-subtle);
  cursor: pointer;
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease,
    transform 0.18s var(--ease-out-expo);
}

.theme-switch:hover {
  border-color: var(--border-hover);
}

.theme-switch:active {
  transform: scale(0.95);
}

.theme-switch:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

/*
 * Slides across with a small overshoot so it lands rather than stops.
 *
 * Sized and inset to match the flag in LanguageToggle beside it, so the two
 * controls read as siblings:
 *   flag  : 20px circle, 1px border + 6px padding = 7px from the edge
 *   thumb : 20px circle, 1px border + 6px margin  = 7px
 * Travel of 22px leaves the same 6px clear on the right.
 */
.theme-switch__thumb {
  display: grid;
  place-items: center;
  height: 1.25rem;
  width: 1.25rem;
  margin-left: 6px;
  border: 1px solid var(--border-strong);
  border-radius: 9999px;
  background: var(--surface-elevated);
  transform: translateX(0);
  transition: transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1);
}

.theme-switch.is-dark .theme-switch__thumb {
  transform: translateX(1.375rem);
}

/* Sun and moon share one grid cell and rotate through each other. */
.theme-switch__icon {
  grid-area: 1 / 1;
  color: var(--text);
  transition:
    opacity 0.28s var(--ease-out-expo),
    transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1);
}

.theme-switch__icon--sun {
  opacity: 1;
  transform: rotate(0) scale(1);
}
.theme-switch__icon--moon {
  opacity: 0;
  transform: rotate(-90deg) scale(0.4);
}

.theme-switch.is-dark .theme-switch__icon--sun {
  opacity: 0;
  transform: rotate(90deg) scale(0.4);
}
.theme-switch.is-dark .theme-switch__icon--moon {
  opacity: 1;
  transform: rotate(0) scale(1);
}
</style>

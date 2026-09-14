<script setup lang="ts">
import { navItems } from '~/data/navigation'
import { profile } from '~/data/profile'

const route = useRoute()
const localePath = useLocalePath()
const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 12)

/** Trailing slashes vary between SSR and client navigation — normalise both. */
const trim = (path: string) => path.replace(/\/+$/, '') || '/'

/**
 * Home matches exactly; everything else also matches its children, so
 * /projects/my-app keeps "Projects" highlighted.
 */
function isActive(item: (typeof navItems)[number]) {
  const path = trim(route.path)
  const target = trim(localePath(item.to))
  if (item.to === '/') return path === target
  return path === target || path.startsWith(`${target}/`)
}

const mobileOpen = ref(false)
</script>

<template>
  <header
    class="sticky top-0 z-40 transition-[background-color,backdrop-filter] duration-300"
    :class="
      scrolled || mobileOpen ? 'bg-bg/72 backdrop-blur-xl backdrop-saturate-150' : 'bg-transparent'
    "
  >
    <nav class="container-page" :aria-label="$t('a11y.primaryNav')">
      <!-- The baseline sits on this inner row, not the container, so it stops
           at the content edge — flush with the avatar and the theme switch. -->
      <div
        class="flex h-16 items-center justify-between gap-4 border-b border-border dark:border-border-hover"
      >
        <!-- Brand -->
        <NuxtLinkLocale
          to="/"
          class="group flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          :aria-label="$t('a11y.home')"
        >
          <NuxtImg
            :src="profile.logo"
            :alt="profile.name"
            width="80"
            height="80"
            class="size-8 shrink-0 rounded-full object-cover object-top ring-1 ring-border-strong transition-colors group-hover:ring-border-hover"
          />
          <span class="text-sm font-semibold tracking-tight">{{ profile.name }}</span>
        </NuxtLinkLocale>

        <!--
        Folder tabs. The baseline lives on the <nav> row, so it runs the full
        container width — from the avatar across to the theme switch. The <ul>
        stretches to the same height and the active tab is pulled down 1px
        (`-mb-px`) so its own background covers that line, which is what makes
        it read as joined to the page rather than sitting on top of it.
        Inactive tabs keep a transparent border so nothing shifts on hover.
        Dark mode uses a stronger border: --border is only 9% white there, which
        all but disappears against #0a0a0b.
      -->
        <ul class="hidden items-end gap-1 self-stretch lg:flex">
          <li v-for="item in navItems" :key="item.to">
            <NuxtLinkLocale
              :to="item.to"
              class="-mb-px inline-flex h-9 items-center rounded-t-lg border-x border-t px-4 text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              :class="
                isActive(item)
                  ? 'border-border bg-bg text-cta-ink dark:border-border-hover'
                  : 'border-transparent text-muted hover:text-text'
              "
            >
              {{ $t(item.label) }}
            </NuxtLinkLocale>
          </li>
        </ul>

        <div class="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />

          <!-- Mobile trigger -->
          <button
            type="button"
            class="inline-flex size-10 items-center justify-center rounded-md border border-border bg-surface text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
            :aria-expanded="mobileOpen"
            aria-controls="mobile-menu"
            :aria-label="$t('a11y.toggleMenu')"
            @click="mobileOpen = !mobileOpen"
          >
            <Icon :name="mobileOpen ? 'lucide:x' : 'lucide:menu'" :size="19" aria-hidden="true" />
          </button>
        </div>
      </div>
    </nav>

    <MobileMenu v-model:open="mobileOpen" :items="navItems" :is-active="isActive" />
  </header>
</template>

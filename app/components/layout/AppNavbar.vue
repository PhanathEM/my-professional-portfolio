<script setup lang="ts">
import { navItems } from '~/data/navigation'
import { profile } from '~/data/profile'

const route = useRoute()
const localePath = useLocalePath()
const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 12)

const homePath = computed(() => localePath('/'))
const isHome = computed(() => route.path === homePath.value)
const sectionIds = navItems.filter((i) => i.section).map((i) => i.section!)
const activeSection = useScrollSpy(sectionIds, { offset: 72 })

function isActive(item: (typeof navItems)[number]) {
  if (item.to.startsWith('/#')) return isHome.value && activeSection.value === item.section
  return route.path.startsWith(localePath(item.to))
}

const mobileOpen = ref(false)
</script>

<template>
  <header
    class="sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300"
    :class="
      scrolled || mobileOpen
        ? 'border-b border-border bg-bg/72 backdrop-blur-xl backdrop-saturate-150'
        : 'border-b border-transparent bg-transparent'
    "
  >
    <nav
      class="container-page flex h-16 items-center justify-between gap-4"
      :aria-label="$t('a11y.primaryNav')"
    >
      <!-- Brand -->
      <NuxtLinkLocale
        to="/"
        class="group flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        :aria-label="$t('a11y.home')"
      >
        <span
          class="grid size-8 place-items-center rounded-md border border-border-strong bg-surface font-mono text-sm font-semibold text-accent transition-colors group-hover:border-accent/50"
        >
          {{ profile.name.charAt(0) }}
        </span>
        <span class="text-[0.95rem] font-semibold tracking-tight">{{ profile.name }}</span>
      </NuxtLinkLocale>

      <!-- Desktop links -->
      <ul class="hidden items-center gap-0.5 lg:flex">
        <li v-for="item in navItems" :key="item.to">
          <NuxtLinkLocale
            :to="item.to"
            class="relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            :class="isActive(item) ? 'text-text' : 'text-muted hover:text-text'"
          >
            {{ $t(item.label) }}
            <span
              v-if="isActive(item)"
              class="absolute inset-x-3 -bottom-px h-px bg-accent"
              aria-hidden="true"
            />
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
    </nav>

    <MobileMenu v-model:open="mobileOpen" :items="navItems" :is-active="isActive" />
  </header>
</template>

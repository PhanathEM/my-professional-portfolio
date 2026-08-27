<script setup lang="ts">
import { footerNav } from '~/data/navigation'
import { profile } from '~/data/profile'
import { social } from '~/data/social'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border bg-bg">
    <div class="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
      <div class="max-w-sm">
        <NuxtLinkLocale to="/" class="flex items-center gap-2.5">
          <span
            class="grid size-8 place-items-center rounded-md border border-border-strong bg-surface font-mono text-sm font-semibold text-accent"
          >
            {{ profile.name.charAt(0) }}
          </span>
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

    <div class="border-t border-border">
      <div
        class="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-subtle sm:flex-row"
      >
        <p>{{ t('footer.rights', { year, name: profile.name }) }}</p>
        <p class="flex items-center gap-1.5">
          {{ t('footer.builtWith') }}
          <a
            href="https://nuxt.com"
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium text-muted transition-colors hover:text-text"
            >Nuxt</a
          >
          <span aria-hidden="true">+</span>
          <a
            href="https://vuejs.org"
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium text-muted transition-colors hover:text-text"
            >Vue</a
          >
        </p>
      </div>
    </div>
  </footer>
</template>

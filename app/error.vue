<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const isNotFound = computed(() => props.error?.statusCode === 404)

function handleHome() {
  clearError({ redirect: '/' })
}

useSeoMeta({
  title: () => (isNotFound.value ? t('error.notFoundTitle') : t('error.genericTitle')),
  robots: 'noindex, nofollow',
})
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <AppNavbar />
    <main class="container-page flex flex-1 flex-col items-center justify-center py-24 text-center">
      <p class="font-mono text-sm tracking-[0.2em] text-accent uppercase">
        {{ error.statusCode || 500 }}
      </p>
      <h1 class="mt-4 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
        {{ isNotFound ? t('error.notFoundTitle') : t('error.genericTitle') }}
      </h1>
      <p class="mt-3 max-w-md text-pretty text-muted">
        {{ isNotFound ? t('error.notFoundBody') : error.message || t('error.genericBody') }}
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <AppButton to="/" icon="lucide:arrow-left" @click="handleHome">
          {{ t('error.backHome') }}
        </AppButton>
        <AppButton to="/projects" variant="secondary">{{ t('error.browseProjects') }}</AppButton>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useI18n()

const isDark = computed(() => colorMode.value === 'dark')

function toggle() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <ClientOnly>
    <button
      type="button"
      class="inline-flex size-10 items-center justify-center rounded-md border border-border bg-surface text-muted transition-colors duration-200 hover:border-accent/40 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      :aria-label="t('a11y.changeTheme')"
      :aria-pressed="isDark"
      @click="toggle"
    >
      <Icon
        :name="isDark ? 'lucide:moon' : 'lucide:sun'"
        :size="18"
        aria-hidden="true"
      />
    </button>

    <template #fallback>
      <div class="size-10 rounded-md border border-border bg-surface" aria-hidden="true" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
// The single application shell: sticky nav + page slot + footer.
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <AppNavbar />

    <main id="main" class="flex-1">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

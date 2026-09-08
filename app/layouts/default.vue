<script setup lang="ts">
// The single application shell: sticky nav + page slot + footer.
</script>

<template>
  <div class="footer-sticky-reveal flex min-h-dvh flex-col">
    <AppNavbar />

    <main id="main" class="relative z-10 flex-1 bg-bg">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

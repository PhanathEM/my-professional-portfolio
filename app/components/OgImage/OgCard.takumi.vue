<script setup lang="ts">
/**
 * Custom Open Graph image template (1200×630).
 * Rendered by nuxt-og-image via takumi — keep the markup to flexbox + inline
 * styles only (no CSS grid, no unsupported properties).
 */
withDefaults(
  defineProps<{
    title?: string
    description?: string
    label?: string
    accent?: string
  }>(),
  {
    title: 'Phanath',
    description: 'Full-Stack Developer',
    label: 'phanath.dev',
    accent: '#9276ff',
  },
)
</script>

<template>
  <div
    style="
      width: 1200px;
      height: 630px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 80px;
      background-color: #0a0a0b;
      background-image: radial-gradient(
        circle at 12% 0%,
        rgba(106, 63, 245, 0.28),
        transparent 45%
      );
      font-family: 'Inter', sans-serif;
    "
  >
    <!-- top row: brand -->
    <div style="display: flex; align-items: center">
      <div
        style="
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background-color: #111114;
          color: #9276ff;
          font-size: 28px;
          font-weight: 700;
        "
      >
        P
      </div>
      <div style="margin-left: 20px; color: #a1a1aa; font-size: 24px">{{ label }}</div>
    </div>

    <!-- middle: headline -->
    <div style="display: flex; flex-direction: column">
      <div
        style="
          display: flex;
          align-items: center;
          color: #9276ff;
          font-size: 22px;
          font-weight: 600;
          letter-spacing: 4px;
          text-transform: uppercase;
        "
      >
        Portfolio
      </div>
      <div
        style="
          margin-top: 22px;
          color: #ededef;
          font-size: 68px;
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -2px;
        "
      >
        {{ title }}
      </div>
      <div
        v-if="description"
        style="
          margin-top: 24px;
          color: #a1a1aa;
          font-size: 30px;
          line-height: 1.4;
          max-width: 900px;
        "
      >
        {{ description }}
      </div>
    </div>

    <!-- bottom accent rule -->
    <div style="display: flex; align-items: center">
      <div :style="`width: 120px; height: 6px; border-radius: 3px; background-color: ${accent};`" />
      <div style="margin-left: 24px; color: #71717a; font-size: 22px">
        Nuxt · Vue · TypeScript · PostgreSQL
      </div>
    </div>
  </div>
</template>

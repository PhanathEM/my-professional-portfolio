<script setup lang="ts">
/**
 * Scrapbook corner for the About plate: two tilted polaroids held down with
 * tape and a few hand-drawn doodles — all in white on the orange.
 * Purely decorative (the portrait beside it carries the alt text), and hidden
 * below `lg` where it would collide with the name.
 */
const { t } = useI18n()
</script>

<template>
  <div
    class="pointer-events-none absolute top-5 right-6 hidden h-[17rem] w-[24rem] select-none lg:block"
    aria-hidden="true"
  >
    <!-- doodles -->
    <svg
      class="absolute top-1 left-2 h-10 w-10 text-white"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M20 4v10M20 26v10M4 20h10M26 20h10M9 9l6 6M25 25l6 6M31 9l-6 6M15 25l-6 6" />
    </svg>
    <svg
      class="absolute top-16 -left-3 h-8 w-8 text-white"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    >
      <path d="M16 3l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" />
    </svg>
    <svg
      class="absolute right-1 bottom-4 h-14 w-24 text-white"
      viewBox="0 0 96 56"
      fill="none"
      stroke="currentColor"
      stroke-width="2.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M4 44c14-26 32-30 46-22 12 7 8 22-4 20-10-2-6-16 6-18 16-3 30 8 40 24" />
      <path d="M84 40l8 8-11 2" />
    </svg>
    <svg
      class="absolute top-4 right-2 h-9 w-9 text-white"
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    >
      <circle cx="18" cy="18" r="14" />
      <path d="M12 21c3 4 9 4 12 0M13 14h.5M22.5 14h.5" />
    </svg>

    <!-- ceremony polaroid (back) -->
    <figure
      class="absolute top-6 right-20 w-36 rotate-[7deg] bg-white p-2 pb-7 text-[#191919] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)]"
    >
      <span class="absolute -top-3 left-1/2 h-5 w-14 -translate-x-1/2 -rotate-6 bg-white/70" />
      <NuxtImg
        src="/images/profile/graduation-ceremony.webp"
        alt=""
        width="720"
        height="1080"
        sizes="144px"
        class="aspect-[3/4] w-full object-cover"
        loading="lazy"
      />
      <figcaption
        class="absolute right-2 bottom-1.5 left-2 truncate text-center font-brand text-sm"
      >
        {{ t('about.collage.ceremony') }}
      </figcaption>
    </figure>

    <!-- award polaroid (front) -->
    <figure
      class="absolute top-16 right-56 w-40 -rotate-[6deg] bg-white p-2 pb-7 text-[#191919] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)]"
    >
      <span class="absolute -top-3 left-1/2 h-5 w-14 -translate-x-1/2 rotate-3 bg-white/70" />
      <NuxtImg
        src="/images/profile/graduation-award.webp"
        alt=""
        width="720"
        height="720"
        sizes="160px"
        class="aspect-square w-full object-cover"
        loading="lazy"
      />
      <figcaption
        class="absolute right-2 bottom-1.5 left-2 truncate text-center font-brand text-sm"
      >
        {{ t('about.collage.award') }}
      </figcaption>
    </figure>
  </div>
</template>

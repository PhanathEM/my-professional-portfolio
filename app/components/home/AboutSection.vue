<script setup lang="ts">
import { profile } from '~/data/profile'

const { t } = useI18n()
</script>

<template>
  <section id="about" class="section-pad scroll-mt-20 border-t border-border">
    <div class="container-page">
      <RevealOnScroll>
        <SectionHeading
          :eyebrow="t('about.eyebrow')"
          :title="t('about.title')"
          :description="t('about.description')"
        />
      </RevealOnScroll>

      <div class="mt-14 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <!-- portrait -->
        <RevealOnScroll :y="20">
          <div class="relative mx-auto max-w-xs lg:mx-0">
            <div
              class="absolute -inset-3 -z-10 rounded-2xl border border-border [background-image:linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)] [background-size:20px_20px]"
              aria-hidden="true"
            />
            <NuxtImg
              :src="profile.avatar"
              :alt="t('about.portraitAlt', { name: profile.name })"
              width="360"
              height="440"
              sizes="(max-width: 1024px) 18rem, 22rem"
              class="aspect-4/5 w-full rounded-xl border border-border object-cover"
            />
            <dl
              class="mt-4 flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 text-xs"
            >
              <div>
                <dt class="text-subtle">{{ t('about.basedIn') }}</dt>
                <dd class="mt-0.5 font-medium text-text">{{ t('profile.location') }}</dd>
              </div>
              <div class="text-right">
                <dt class="text-subtle">{{ t('about.status') }}</dt>
                <dd class="mt-0.5 inline-flex items-center gap-1.5 font-medium text-text">
                  <span class="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                  {{ t('about.openToWork') }}
                </dd>
              </div>
            </dl>
          </div>
        </RevealOnScroll>

        <!-- bio -->
        <div>
          <RevealOnScroll>
            <div class="space-y-4 text-pretty text-base/relaxed text-muted">
              <p v-for="n in profile.bioCount" :key="n">{{ t(`profile.bio.${n}`) }}</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll :delay="0.05">
            <figure class="mt-8 rounded-lg border border-border bg-surface p-5">
              <blockquote class="text-pretty text-[0.95rem]/relaxed text-text">
                <Icon name="lucide:quote" :size="18" class="mb-2 text-accent" aria-hidden="true" />
                {{ t('profile.philosophy') }}
              </blockquote>
              <figcaption class="mt-3 font-mono text-xs text-subtle">
                — {{ t('about.philosophyLabel') }}
              </figcaption>
            </figure>
          </RevealOnScroll>

          <div class="mt-8 grid gap-6 sm:grid-cols-2">
            <RevealOnScroll>
              <h3 class="font-mono text-xs font-medium tracking-[0.14em] text-subtle uppercase">
                {{ t('about.currentFocus') }}
              </h3>
              <ul class="mt-3 space-y-2">
                <li
                  v-for="n in profile.focusCount"
                  :key="n"
                  class="flex items-start gap-2.5 text-sm text-muted"
                >
                  <Icon
                    name="lucide:corner-down-right"
                    :size="15"
                    class="mt-0.5 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  {{ t(`profile.focus.${n}`) }}
                </li>
              </ul>
            </RevealOnScroll>

            <RevealOnScroll :delay="0.05">
              <h3 class="font-mono text-xs font-medium tracking-[0.14em] text-subtle uppercase">
                {{ t('about.learningJourney') }}
              </h3>
              <p class="mt-3 text-sm/relaxed text-muted">{{ t('profile.learningJourney') }}</p>
            </RevealOnScroll>
          </div>
        </div>
      </div>

      <!-- stats -->
      <RevealOnScroll :y="18">
        <dl
          class="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4"
        >
          <div v-for="stat in profile.stats" :key="stat.key" class="bg-surface p-6">
            <dt class="text-4xl font-semibold tracking-tight text-text">{{ stat.value }}</dt>
            <dd class="mt-1.5 text-sm font-medium text-muted">
              {{ t(`profile.stats.${stat.key}Label`) }}
            </dd>
            <dd class="mt-1 text-xs text-subtle">{{ t(`profile.stats.${stat.key}Hint`) }}</dd>
          </div>
        </dl>
      </RevealOnScroll>
    </div>
  </section>
</template>

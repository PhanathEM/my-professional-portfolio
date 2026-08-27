<script setup lang="ts">
import { social } from '~/data/social'

const { t } = useI18n()
</script>

<template>
  <section id="contact" class="section-pad scroll-mt-20 border-t border-border bg-bg-subtle">
    <div class="container-page">
      <div class="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <RevealOnScroll>
          <SectionHeading :eyebrow="t('contact.eyebrow')" :title="t('contact.title')" />
          <p class="mt-5 max-w-md text-pretty text-base/relaxed text-muted">
            {{ t('contact.intro') }}
          </p>

          <ul class="mt-8 space-y-3">
            <li v-for="link in social" :key="link.label">
              <a
                :href="link.href"
                :target="link.href.startsWith('http') ? '_blank' : undefined"
                :rel="link.href.startsWith('http') ? 'noopener noreferrer' : undefined"
                class="group flex items-center gap-3.5 rounded-lg border border-border bg-surface p-3.5 transition-colors hover:border-accent/40"
              >
                <span
                  class="grid size-10 shrink-0 place-items-center rounded-md border border-border bg-bg-subtle text-accent"
                >
                  <Icon :name="link.icon" :size="17" aria-hidden="true" />
                </span>
                <span class="min-w-0">
                  <span class="block text-sm font-medium text-text">{{ link.label }}</span>
                  <span class="block truncate text-xs text-subtle">{{ link.handle }}</span>
                </span>
                <Icon
                  name="lucide:arrow-up-right"
                  :size="16"
                  class="ml-auto text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </li>
          </ul>

          <p class="mt-6 text-xs text-subtle">
            <Icon name="lucide:map-pin" :size="13" class="mr-1 -mt-0.5 inline" aria-hidden="true" />
            {{ t('profile.location') }} · {{ t('profile.availability') }}
          </p>
        </RevealOnScroll>

        <RevealOnScroll :y="20">
          <div class="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <ContactForm />
          </div>
        </RevealOnScroll>
      </div>
    </div>
  </section>
</template>

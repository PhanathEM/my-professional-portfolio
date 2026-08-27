<script setup lang="ts">
import { profile } from '~/data/profile'

const { t } = useI18n()
const { fields, errors, touched, status, serverMessage, isValid, handleBlur, submit } =
  useContactForm()

const fieldClass = (name: 'name' | 'email' | 'subject' | 'message') => [
  'w-full rounded-md border bg-bg-subtle px-3.5 py-2.5 text-sm text-text placeholder:text-subtle/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent',
  errors[name] && touched[name] ? 'border-red-500/60' : 'border-border focus:border-accent/50',
]
</script>

<template>
  <form class="space-y-5" novalidate @submit.prevent="submit">
    <!-- honeypot -->
    <div class="absolute -left-[9999px]" aria-hidden="true">
      <label
        >Company <input v-model="fields.company" type="text" tabindex="-1" autocomplete="off"
      /></label>
    </div>

    <div class="grid gap-5 sm:grid-cols-2">
      <div>
        <label for="cf-name" class="mb-1.5 block text-sm font-medium text-text">
          {{ t('contact.form.name') }}
        </label>
        <input
          id="cf-name"
          v-model="fields.name"
          type="text"
          name="name"
          autocomplete="name"
          :class="fieldClass('name')"
          :aria-invalid="!!(errors.name && touched.name)"
          :aria-describedby="errors.name && touched.name ? 'cf-name-err' : undefined"
          :placeholder="t('contact.form.namePlaceholder')"
          @blur="handleBlur('name')"
        />
        <p v-if="errors.name && touched.name" id="cf-name-err" class="mt-1.5 text-xs text-red-500">
          {{ errors.name }}
        </p>
      </div>

      <div>
        <label for="cf-email" class="mb-1.5 block text-sm font-medium text-text">
          {{ t('contact.form.email') }}
        </label>
        <input
          id="cf-email"
          v-model="fields.email"
          type="email"
          name="email"
          autocomplete="email"
          :class="fieldClass('email')"
          :aria-invalid="!!(errors.email && touched.email)"
          :aria-describedby="errors.email && touched.email ? 'cf-email-err' : undefined"
          :placeholder="t('contact.form.emailPlaceholder')"
          @blur="handleBlur('email')"
        />
        <p
          v-if="errors.email && touched.email"
          id="cf-email-err"
          class="mt-1.5 text-xs text-red-500"
        >
          {{ errors.email }}
        </p>
      </div>
    </div>

    <div>
      <label for="cf-subject" class="mb-1.5 block text-sm font-medium text-text">
        {{ t('contact.form.subject') }}
      </label>
      <input
        id="cf-subject"
        v-model="fields.subject"
        type="text"
        name="subject"
        :class="fieldClass('subject')"
        :aria-invalid="!!(errors.subject && touched.subject)"
        :aria-describedby="errors.subject && touched.subject ? 'cf-subject-err' : undefined"
        :placeholder="t('contact.form.subjectPlaceholder')"
        @blur="handleBlur('subject')"
      />
      <p
        v-if="errors.subject && touched.subject"
        id="cf-subject-err"
        class="mt-1.5 text-xs text-red-500"
      >
        {{ errors.subject }}
      </p>
    </div>

    <div>
      <label for="cf-message" class="mb-1.5 block text-sm font-medium text-text">
        {{ t('contact.form.message') }}
      </label>
      <textarea
        id="cf-message"
        v-model="fields.message"
        name="message"
        rows="5"
        :class="fieldClass('message')"
        :aria-invalid="!!(errors.message && touched.message)"
        :aria-describedby="errors.message && touched.message ? 'cf-message-err' : undefined"
        :placeholder="t('contact.form.messagePlaceholder')"
        @blur="handleBlur('message')"
      />
      <p
        v-if="errors.message && touched.message"
        id="cf-message-err"
        class="mt-1.5 text-xs text-red-500"
      >
        {{ errors.message }}
      </p>
    </div>

    <div class="flex flex-wrap items-center gap-4">
      <AppButton
        type="submit"
        :loading="status === 'submitting'"
        :disabled="status === 'submitting'"
        icon-right="lucide:send-horizontal"
      >
        {{ status === 'submitting' ? t('contact.form.sending') : t('contact.form.send') }}
      </AppButton>

      <!-- polite live region for status -->
      <p
        v-if="serverMessage"
        role="status"
        aria-live="polite"
        class="text-sm"
        :class="status === 'error' ? 'text-red-500' : 'text-emerald-500'"
      >
        <Icon
          :name="status === 'error' ? 'lucide:circle-alert' : 'lucide:circle-check'"
          :size="15"
          class="mr-1 -mt-0.5 inline"
          aria-hidden="true"
        />
        {{ serverMessage }}
      </p>
    </div>

    <p class="text-xs text-subtle">
      {{ t('contact.form.preferEmail') }}
      <a :href="`mailto:${profile.email}`" class="text-accent underline underline-offset-2">
        {{ profile.email }}
      </a>
      — {{ t('contact.form.readyNote') }}
      <span class="font-mono">NUXT_PUBLIC_CONTACT_ENDPOINT</span>.
      <span class="sr-only">
        {{ isValid ? t('contact.form.validReady') : t('contact.form.validIncomplete') }}
      </span>
    </p>
  </form>
</template>

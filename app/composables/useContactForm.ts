/**
 * Contact-form state, client-side validation and submit orchestration.
 *
 * Backend-agnostic by design: if `NUXT_PUBLIC_CONTACT_ENDPOINT` is set the
 * payload is POSTed there as JSON; otherwise the submit is simulated so the
 * UI can be demonstrated without a server. Swapping in a real email API later
 * (Nuxt server route, Resend, Formspree, …) requires no component changes.
 */
export interface ContactFields {
  name: string
  email: string
  subject: string
  message: string
  /** Honeypot — real users never fill this. */
  company: string
}

export type ContactStatus = 'idle' | 'submitting' | 'success' | 'error'

type FieldErrors = Partial<Record<keyof ContactFields, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useContactForm() {
  const { contactEndpoint } = useRuntimeConfig().public
  const { t } = useI18n()

  const fields = reactive<ContactFields>({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
  })

  const errors = reactive<FieldErrors>({})
  const status = ref<ContactStatus>('idle')
  const serverMessage = ref('')
  const touched = reactive<Partial<Record<keyof ContactFields, boolean>>>({})

  function hasErrors(): boolean {
    return Object.values(errors).some(Boolean)
  }

  function validateField(field: keyof ContactFields): void {
    errors[field] = undefined
    const value = fields[field].trim()

    switch (field) {
      case 'name':
        if (!value) errors.name = t('contact.form.errNameRequired')
        else if (value.length < 2) errors.name = t('contact.form.errNameShort')
        break
      case 'email':
        if (!value) errors.email = t('contact.form.errEmailRequired')
        else if (!EMAIL_RE.test(value)) errors.email = t('contact.form.errEmailInvalid')
        break
      case 'subject':
        if (!value) errors.subject = t('contact.form.errSubjectRequired')
        else if (value.length < 3) errors.subject = t('contact.form.errSubjectShort')
        break
      case 'message':
        if (!value) errors.message = t('contact.form.errMessageRequired')
        else if (value.length < 20)
          errors.message = t('contact.form.errMessageShort', { count: 20 - value.length })
        break
    }
  }

  function validateAll(): boolean {
    ;(['name', 'email', 'subject', 'message'] as const).forEach((f) => {
      touched[f] = true
      validateField(f)
    })
    return !hasErrors()
  }

  function handleBlur(field: keyof ContactFields): void {
    touched[field] = true
    validateField(field)
  }

  const isValid = computed(() => {
    return !!fields.name && !!fields.email && !!fields.subject && !!fields.message && !hasErrors()
  })

  async function submit(): Promise<void> {
    serverMessage.value = ''

    // Honeypot tripped → pretend success, do nothing.
    if (fields.company) {
      status.value = 'success'
      return
    }

    if (!validateAll()) {
      status.value = 'error'
      serverMessage.value = t('contact.form.fixFields')
      return
    }

    status.value = 'submitting'

    try {
      if (contactEndpoint) {
        await $fetch(contactEndpoint, {
          method: 'POST',
          body: {
            name: fields.name,
            email: fields.email,
            subject: fields.subject,
            message: fields.message,
          },
        })
      } else {
        // Simulated latency so the loading state is visible in the demo build.
        await new Promise((resolve) => setTimeout(resolve, 900))
      }

      status.value = 'success'
      serverMessage.value = contactEndpoint
        ? t('contact.form.successReal')
        : t('contact.form.successDemo')
      reset()
    } catch {
      status.value = 'error'
      serverMessage.value = t('contact.form.genericError')
    }
  }

  function reset(): void {
    fields.name = ''
    fields.email = ''
    fields.subject = ''
    fields.message = ''
    fields.company = ''
    ;(Object.keys(touched) as (keyof ContactFields)[]).forEach((k) => (touched[k] = false))
  }

  return {
    fields,
    errors,
    touched,
    status,
    serverMessage,
    isValid,
    handleBlur,
    validateField,
    submit,
    reset,
  }
}

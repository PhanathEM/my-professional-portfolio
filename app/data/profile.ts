import type { Profile } from '~/types'

/**
 * ---------------------------------------------------------------------------
 * NON-TRANSLATABLE profile data.
 * All display copy (role, tagline, bio, philosophy, focus list, learning
 * journey, location, availability, stat labels) lives in
 * `i18n/locales/{en,km,lo}.json` under the `profile.*` namespace — edit there
 * to change wording or add a language.
 *
 * Values marked [PLACEHOLDER] are safe defaults; replace them with real data.
 * The stat figures describe a learning portfolio — nothing is fabricated.
 * ---------------------------------------------------------------------------
 */
export const profile: Profile = {
  name: 'Phanath',
  displayName: 'PHANATH',
  email: 'hello@phanath.dev', // [PLACEHOLDER] public contact email
  resumeUrl: '/resume.pdf', // [PLACEHOLDER] drop a PDF into /public to enable
  avatar: '/images/avatar.svg', // [PLACEHOLDER] swap for a real photo (see /public/images)

  bioCount: 3, // paragraphs authored as profile.bio.1..3
  focusCount: 4, // bullets authored as profile.focus.1..4

  stats: [
    { key: 'projects', value: '12+' },
    { key: 'tech', value: '20+' },
    { key: 'years', value: '4+' },
    { key: 'focus', value: 'Nuxt 4' },
  ],
}

import type { SocialLink } from '~/types'

/**
 * Social / contact links. Update the `href` values with your real profiles.
 * `[PLACEHOLDER]` markers indicate values you should replace before publishing.
 */
export const social: SocialLink[] = [
  {
    label: 'GitHub',
    icon: 'lucide:github',
    href: 'https://github.com/phanath', // [PLACEHOLDER] replace with your GitHub URL
    handle: '@phanath',
  },
  {
    label: 'LinkedIn',
    icon: 'lucide:linkedin',
    href: 'https://www.linkedin.com/in/phanath', // [PLACEHOLDER] replace with your LinkedIn URL
    handle: 'in/phanath',
  },
  {
    label: 'Email',
    icon: 'lucide:mail',
    href: 'mailto:hello@phanath.dev', // [PLACEHOLDER] replace with your public contact email
    handle: 'hello@phanath.dev',
  },
]

export const githubUrl = social.find((s) => s.label === 'GitHub')!.href
export const linkedinUrl = social.find((s) => s.label === 'LinkedIn')!.href

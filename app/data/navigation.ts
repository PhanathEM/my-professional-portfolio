import type { NavItem } from '~/types'

/**
 * Primary navigation. `label` is an i18n key (see `i18n/locales/*.json`).
 * Landing-page sections use hash targets so the sticky navbar can highlight the
 * active section via scroll-spy; Blog is a real route.
 */
export const navItems: NavItem[] = [
  { label: 'nav.home', to: '/#home', section: 'home' },
  { label: 'nav.about', to: '/#about', section: 'about' },
  { label: 'nav.skills', to: '/#skills', section: 'skills' },
  { label: 'nav.projects', to: '/#projects', section: 'projects' },
  { label: 'nav.experience', to: '/#experience', section: 'experience' },
  { label: 'nav.blog', to: '/blog' },
  { label: 'nav.contact', to: '/#contact', section: 'contact' },
]

/** Condensed footer navigation. */
export const footerNav: NavItem[] = [
  { label: 'nav.about', to: '/#about' },
  { label: 'nav.projects', to: '/projects' },
  { label: 'nav.blog', to: '/blog' },
  { label: 'nav.contact', to: '/#contact' },
]

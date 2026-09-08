import type { NavItem } from '~/types'

/**
 * Primary navigation. `label` is an i18n key (see `i18n/locales/*.json`).
 * Every entry is a real route — this is a multi-page site, not a single
 * landing page with hash anchors.
 */
export const navItems: NavItem[] = [
  { label: 'nav.home', to: '/' },
  { label: 'nav.about', to: '/about' },
  { label: 'nav.skills', to: '/skills' },
  { label: 'nav.projects', to: '/projects' },
  { label: 'nav.experience', to: '/experience' },
  { label: 'nav.blog', to: '/blog' },
  { label: 'nav.contact', to: '/contact' },
]

/** Condensed footer navigation. */
export const footerNav: NavItem[] = [
  { label: 'nav.about', to: '/about' },
  { label: 'nav.projects', to: '/projects' },
  { label: 'nav.blog', to: '/blog' },
  { label: 'nav.contact', to: '/contact' },
]

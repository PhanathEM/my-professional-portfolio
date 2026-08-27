import type { Service } from '~/types'

/**
 * "What I can build" — text (title, description, deliverables) lives in
 * `i18n/locales/*.json` under `services.<id>.*`.
 */
export const services: Service[] = [
  { id: 'webApps', icon: 'lucide:app-window' },
  { id: 'fullStack', icon: 'lucide:layers-3' },
  { id: 'dashboards', icon: 'lucide:layout-dashboard' },
  { id: 'apis', icon: 'lucide:webhook' },
]

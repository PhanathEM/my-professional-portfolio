import type { RouterConfig } from '@nuxt/schema'

/**
 * Smooth-scroll behaviour with an offset that clears the sticky navbar,
 * and reduced-motion awareness.
 */
export default <RouterConfig>{
  scrollBehavior(to, _from, savedPosition) {
    const reduced =
      import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (savedPosition) return savedPosition

    if (to.hash) {
      return {
        el: to.hash,
        top: 88,
        behavior: reduced ? 'auto' : 'smooth',
      }
    }

    return { left: 0, top: 0, behavior: reduced ? 'auto' : 'smooth' }
  },
}

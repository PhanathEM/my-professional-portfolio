import type { RouterConfig } from '@nuxt/schema'

/**
 * Smooth-scroll behaviour with an offset that clears the sticky navbar,
 * and reduced-motion awareness.
 */
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    const reduced =
      import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Clears the sticky navbar. Keep in step with `scroll-padding-top` on
    // <html>, which is what the browser's own fragment scroll uses.
    const hashTarget = {
      el: to.hash,
      top: 88,
      behavior: reduced ? 'auto' : 'smooth',
    }

    // A same-page "#section" change (article outline, in-text anchors). Vue
    // Router also sees the popstate a native anchor click fires, and every
    // fragment entry shares one history position, so `savedPosition` here is
    // whatever the page was scrolled to when the reader last *left* that
    // hash — using it would yank the page to the wrong place. Always go to
    // the heading instead; it is the same spot the browser is scrolling to.
    if (to.path === from.path && to.hash) return hashTarget

    if (savedPosition) return savedPosition

    if (to.hash) return hashTarget

    return { left: 0, top: 0, behavior: reduced ? 'auto' : 'smooth' }
  },
}

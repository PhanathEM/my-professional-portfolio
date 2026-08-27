/**
 * Reactive `prefers-reduced-motion` flag.
 * SSR-safe: defaults to `false` on the server and hydrates on the client.
 * (Named to avoid colliding with motion-v's own `useReducedMotion`.)
 */
export function usePrefersReducedMotion() {
  const reduced = ref(false)

  onMounted(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduced.value = mq.matches
    const onChange = (e: MediaQueryListEvent) => {
      reduced.value = e.matches
    }
    mq.addEventListener('change', onChange)
    onBeforeUnmount(() => mq.removeEventListener('change', onChange))
  })

  return reduced
}

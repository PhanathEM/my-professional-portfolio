/**
 * Observes a list of section ids and returns the one currently in view.
 * Used by the navbar to highlight the active landing-page section.
 */
export function useScrollSpy(sectionIds: string[], options?: { offset?: number }) {
  const activeId = ref<string>(sectionIds[0] ?? '')
  const offset = options?.offset ?? 0

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (!elements.length) return

    observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top that is intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]?.target.id) {
          activeId.value = visible[0].target.id
        }
      },
      {
        rootMargin: `-${offset + 96}px 0px -55% 0px`,
        threshold: [0, 0.1, 0.5, 1],
      },
    )

    elements.forEach((el) => observer!.observe(el))
  })

  onBeforeUnmount(() => observer?.disconnect())

  return activeId
}

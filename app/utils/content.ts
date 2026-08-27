/**
 * Helpers for working with Nuxt Content documents.
 */

interface MdcNode {
  type?: string
  value?: string
  tag?: string
  children?: MdcNode[]
  [key: string]: unknown
}

/** Recursively collect all text nodes from a parsed MDC body. */
export function extractPlainText(body: unknown): string {
  const root = body as { value?: MdcNode[] } | MdcNode | undefined
  if (!root) return ''

  const walk = (node: MdcNode): string => {
    if (node.type === 'text' && typeof node.value === 'string') return node.value
    if (!node.children?.length) return ''
    return node.children.map(walk).join(' ')
  }

  const nodes: MdcNode[] = Array.isArray((root as { value?: MdcNode[] }).value)
    ? (root as { value: MdcNode[] }).value
    : [root as MdcNode]

  return nodes.map(walk).join(' ').replace(/\s+/g, ' ').trim()
}

/** Estimate reading time in whole minutes (200 wpm), minimum 1. */
export function estimateReadingTime(body: unknown): number {
  const words = extractPlainText(body).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

/** `2026-03-14` -> `14 March 2026`, localised to the given BCP-47 tag. */
export function formatDate(input: string, localeTag = 'en-GB'): string {
  const date = new Date(input)
  if (Number.isNaN(date.getTime())) return input
  try {
    return new Intl.DateTimeFormat(localeTag, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
  } catch {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
  }
}

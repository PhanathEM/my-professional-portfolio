<script setup lang="ts">
import type { VNode } from 'vue'
import { NuxtLink } from '#components'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    size?: Size
    to?: string
    href?: string
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    loading?: boolean
    icon?: string
    iconRight?: string
    block?: boolean
  }>(),
  { variant: 'primary', size: 'md', type: 'button' },
)

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-tight transition-[background-color,color,border-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-55 active:translate-y-px'

const variants: Record<Variant, string> = {
  primary: 'btn-cta text-cta-contrast',
  secondary:
    'border border-border-strong bg-surface text-text hover:border-border-hover hover:bg-surface-elevated',
  ghost: 'text-muted hover:bg-surface-elevated hover:text-text',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[0.95rem]',
}

const classes = computed(() => [
  base,
  variants[props.variant],
  sizes[props.size],
  props.block && 'w-full',
])

const localePath = useLocalePath()

const component = computed(() => {
  if (props.to) return NuxtLink
  if (props.href) return 'a'
  return 'button'
})

/* ------------------------------------------------------------------ *
 * Rolling text stagger
 * On hover/focus the label rolls up and out of a clipped box while an
 * identical copy rolls in from below, one letter at a time.
 * ------------------------------------------------------------------ */
const slots = useSlots()

/** Flatten the default slot down to its plain text, if that is all it is. */
function vnodeText(nodes: unknown[]): string {
  let out = ''
  for (const node of nodes) {
    if (typeof node === 'string') out += node
    else if (Array.isArray(node)) out += vnodeText(node)
    else if (node && typeof node === 'object') {
      const children = (node as VNode).children
      if (typeof children === 'string') out += children
      else if (Array.isArray(children)) out += vnodeText(children)
    }
  }
  return out
}

const label = computed(() => vnodeText(slots.default?.() ?? []).trim())

/**
 * Khmer and Lao build a syllable from a base consonant plus subscripts and
 * vowel signs; splitting those into separate boxes tears the shaping apart.
 * Detect them and roll the whole label as one unit instead of per letter.
 */
const COMPLEX_SCRIPT = /[ក-៿᧠-᧿຀-໿]/

const letters = computed(() => {
  const text = label.value
  if (!text) return []
  if (COMPLEX_SCRIPT.test(text)) return [text]
  // Code-point split, not Intl.Segmenter — identical on server and client, so
  // there is no chance of a hydration mismatch.
  return Array.from(text)
})

/** Only roll when the slot is plain text we could read. */
const rolls = computed(() => letters.value.length > 0)

const attrs = computed(() => {
  // Internal links are localised so /#projects becomes /km/#projects on the km locale.
  if (props.to) return { to: props.to.startsWith('/') ? localePath(props.to) : props.to }
  if (props.href)
    return {
      href: props.href,
      target: props.href.startsWith('http') ? '_blank' : undefined,
      rel: props.href.startsWith('http') ? 'noopener noreferrer' : undefined,
    }
  return { type: props.type, disabled: props.disabled || props.loading }
})
</script>

<template>
  <component :is="component" v-bind="attrs" :class="classes" :aria-busy="loading || undefined">
    <Icon
      v-if="loading"
      name="lucide:loader-circle"
      class="animate-spin"
      :size="size === 'sm' ? 15 : 17"
      aria-hidden="true"
    />
    <Icon
      v-else-if="icon"
      :name="icon"
      :size="size === 'sm' ? 15 : 17"
      class="-ml-0.5 shrink-0"
      aria-hidden="true"
    />
    <span v-if="rolls" class="btn-roll">
      <span class="sr-only">{{ label }}</span>
      <span class="btn-roll__row btn-roll__row--out" aria-hidden="true">
        <span
          v-for="(ch, i) in letters"
          :key="`o${i}`"
          class="btn-roll__ch"
          :style="{ '--i': i }"
          >{{ ch }}</span
        >
      </span>
      <span class="btn-roll__row btn-roll__row--in" aria-hidden="true">
        <span
          v-for="(ch, i) in letters"
          :key="`i${i}`"
          class="btn-roll__ch"
          :style="{ '--i': i }"
          >{{ ch }}</span
        >
      </span>
    </span>
    <span v-else><slot /></span>
    <Icon
      v-if="iconRight && !loading"
      :name="iconRight"
      :size="size === 'sm' ? 15 : 17"
      class="-mr-0.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
      aria-hidden="true"
    />
  </component>
</template>

<style scoped>
/*
 * The clipping box. `line-height: 1.5` gives descenders (y, g, p) room inside
 * the box, so `overflow: hidden` trims the rolling letters and not the glyphs.
 */
.btn-roll {
  position: relative;
  display: inline-block;
  overflow: hidden;
  line-height: 1.5;
  vertical-align: middle;
}

.btn-roll__row {
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: pre;
}

/* Absolute, so the incoming copy adds no width and the box stays put. */
.btn-roll__row--in {
  position: absolute;
  inset: 0;
}

.btn-roll__ch {
  display: inline-block;
  transform: translateY(0);
  transition: transform 0.42s cubic-bezier(0.16, 1, 0.3, 1);
  /* The stagger: each letter waits a beat longer than the one before it. */
  transition-delay: calc(var(--i) * 22ms);
  will-change: transform;
}

.btn-roll__row--in .btn-roll__ch {
  transform: translateY(105%);
}

.group:hover .btn-roll__row--out .btn-roll__ch,
.group:focus-visible .btn-roll__row--out .btn-roll__ch {
  transform: translateY(-105%);
}

.group:hover .btn-roll__row--in .btn-roll__ch,
.group:focus-visible .btn-roll__row--in .btn-roll__ch {
  transform: translateY(0);
}

/* No roll at all when motion is unwelcome — the label just sits still. */
@media (prefers-reduced-motion: reduce) {
  .btn-roll__row--in {
    display: none;
  }
  .group:hover .btn-roll__row--out .btn-roll__ch,
  .group:focus-visible .btn-roll__row--out .btn-roll__ch {
    transform: none;
  }
}
</style>

<script setup lang="ts">
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
  primary:
    'bg-accent text-accent-contrast shadow-[0_1px_0_0_rgba(255,255,255,0.12)_inset,0_8px_20px_-8px_var(--accent)] hover:bg-accent-hover',
  secondary:
    'border border-border-strong bg-surface text-text hover:border-accent/50 hover:bg-surface-elevated',
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
    <span><slot /></span>
    <Icon
      v-if="iconRight && !loading"
      :name="iconRight"
      :size="size === 'sm' ? 15 : 17"
      class="-mr-0.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
      aria-hidden="true"
    />
  </component>
</template>

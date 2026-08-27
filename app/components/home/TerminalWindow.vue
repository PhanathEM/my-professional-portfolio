<script setup lang="ts">
/**
 * Subtle developer-focused hero visual: a static code panel.
 * Purely decorative — hidden from assistive tech. Tokens are modelled as data
 * so no `v-html` is needed.
 */
type Tok = { t: 'plain' | 'key' | 'str' | 'bool' | 'prop'; v: string }

const lines: { comment?: string; tokens?: Tok[] }[] = [
  { comment: '// building software people actually enjoy using' },
  {
    tokens: [
      { t: 'key', v: 'const' },
      { t: 'plain', v: ' developer = {' },
    ],
  },
  {
    tokens: [
      { t: 'prop', v: '  name' },
      { t: 'plain', v: ': ' },
      { t: 'str', v: '"Phanath"' },
      { t: 'plain', v: ',' },
    ],
  },
  {
    tokens: [
      { t: 'prop', v: '  role' },
      { t: 'plain', v: ': ' },
      { t: 'str', v: '"Full-Stack Developer"' },
      { t: 'plain', v: ',' },
    ],
  },
  {
    tokens: [
      { t: 'prop', v: '  stack' },
      { t: 'plain', v: ': [' },
      { t: 'str', v: '"Nuxt"' },
      { t: 'plain', v: ', ' },
      { t: 'str', v: '"TypeScript"' },
      { t: 'plain', v: ', ' },
      { t: 'str', v: '"PostgreSQL"' },
      { t: 'plain', v: '],' },
    ],
  },
  {
    tokens: [
      { t: 'prop', v: '  focus' },
      { t: 'plain', v: ': ' },
      { t: 'str', v: '"clean architecture"' },
      { t: 'plain', v: ',' },
    ],
  },
  {
    tokens: [
      { t: 'prop', v: '  available' },
      { t: 'plain', v: ': ' },
      { t: 'bool', v: 'true' },
      { t: 'plain', v: ',' },
    ],
  },
  { tokens: [{ t: 'plain', v: '}' }] },
]

const tokClass: Record<Tok['t'], string> = {
  plain: 'text-muted',
  key: 'text-accent',
  prop: 'text-text',
  str: 'text-brand-400',
  bool: 'text-brand-300',
}
</script>

<template>
  <div
    aria-hidden="true"
    class="relative overflow-hidden rounded-xl border border-border bg-surface-elevated shadow-card"
  >
    <div class="flex items-center gap-2 border-b border-border px-4 py-3">
      <span class="size-3 rounded-full bg-border-strong" />
      <span class="size-3 rounded-full bg-border-strong" />
      <span class="size-3 rounded-full bg-border-strong" />
      <span class="ml-2 font-mono text-xs text-subtle">developer.ts</span>
    </div>

    <div class="overflow-x-auto px-5 py-5 font-mono text-[0.82rem] leading-relaxed">
      <div v-for="(line, i) in lines" :key="i" class="flex whitespace-pre">
        <span class="mr-4 select-none text-subtle/50">{{ String(i + 1).padStart(2, ' ') }}</span>
        <span v-if="line.comment" class="text-subtle italic">{{ line.comment }}</span>
        <span v-else>
          <span v-for="(tok, j) in line.tokens" :key="j" :class="tokClass[tok.t]">{{ tok.v }}</span>
        </span>
      </div>
    </div>

    <div
      class="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
    />
  </div>
</template>

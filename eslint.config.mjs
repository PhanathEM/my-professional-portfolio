// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',
    // Optional props are expressed through TypeScript `?`; a runtime default
    // isn't always meaningful (e.g. `to` / `href` on a polymorphic button).
    'vue/require-default-prop': 'off',
    // Defer HTML formatting to Prettier to avoid a rule tug-of-war.
    'vue/html-self-closing': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
  },
}).prepend({
  ignores: ['dist', '.nuxt', '.output', '.data', 'node_modules', 'content/**', '**/*.md'],
})

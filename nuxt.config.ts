import { readdirSync } from 'node:fs'
import tailwindcss from '@tailwindcss/vite'

/** Enumerate content routes at build time so SSG prerenders every case study & post. */
const contentRoutes = (dir: string, base: string): string[] => {
  try {
    return readdirSync(new URL(`./content/${dir}`, import.meta.url))
      .filter((f) => f.endsWith('.md'))
      .map((f) => `${base}/${f.replace(/\.md$/, '')}`)
  } catch {
    return []
  }
}

const NON_DEFAULT_LOCALES = ['km', 'lo']

/** Base routes plus a `/<locale>`-prefixed copy of each for non-default locales. */
const withLocales = (paths: string[]): string[] => [
  ...paths,
  ...NON_DEFAULT_LOCALES.flatMap((l) => paths.map((p) => (p === '/' ? `/${l}` : `/${l}${p}`))),
]

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-08-01',
  future: { compatibilityVersion: 4 },

  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    '@nuxt/eslint',
  ],

  css: ['~/assets/css/main.css'],

  // Register components by their file name (no directory prefix):
  // app/components/home/HeroSection.vue -> <HeroSection />
  components: [{ path: '~/components', pathPrefix: false }],

  vite: {
    plugins: [tailwindcss()],
  },

  // ------------------------------------------------------------------
  // Site identity — single source of truth for SEO / sitemap / schema
  // ------------------------------------------------------------------
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://phanath.dev',
    name: 'Phanath — Full-Stack Developer',
    description:
      'Full-Stack Developer building modern, scalable and user-focused web applications with clean architecture and thoughtful user experiences.',
    defaultLocale: 'en',
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://phanath.dev',
      contactEndpoint: process.env.NUXT_PUBLIC_CONTACT_ENDPOINT || '',
    },
  },

  colorMode: {
    classSuffix: '',
    preference: 'dark', // only light / dark — no system option in the UI
    fallback: 'dark',
    storageKey: 'portfolio-color-mode',
  },

  icon: {
    mode: 'svg',
    class: 'inline-block shrink-0',
    size: '20px',
    serverBundle: {
      collections: ['lucide', 'circle-flags'],
    },
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
          },
        },
      },
    },
  },

  image: {
    format: ['avif', 'webp'],
    quality: 72,
  },

  // Self-hosts fonts at build time — no runtime request to Google.
  // Inter for Latin; Noto Sans Khmer / Lao so km & lo render correctly.
  fonts: {
    families: [
      { name: 'Inter', provider: 'google' },
      { name: 'Noto Sans Khmer', provider: 'google' },
      { name: 'Noto Sans Lao', provider: 'google' },
    ],
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ['normal'],
    },
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://phanath.dev',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json', dir: 'ltr' },
      { code: 'km', language: 'km-KH', name: 'ភាសាខ្មែរ', file: 'km.json', dir: 'ltr' },
      { code: 'lo', language: 'lo-LA', name: 'ພາສາລາວ', file: 'lo.json', dir: 'ltr' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'en',
    },
  },

  ogImage: {
    enabled: true,
  },

  robots: {
    // Allow everything in production; the module still emits a sane robots.txt
    disallow: [],
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/sitemap.xml',
        ...withLocales([
          '/',
          '/about',
          '/projects',
          '/blog',
          '/contact',
          ...contentRoutes('projects', '/projects'),
          ...contentRoutes('blog', '/blog'),
        ]),
      ],
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0a0a0b' },
      ],
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  eslint: {
    config: {
      stylistic: false,
    },
  },
})

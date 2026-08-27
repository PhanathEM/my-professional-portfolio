/**
 * Photos for the hero background (a full-bleed crossfading slideshow).
 *
 * Files live in `public/images/hero/`. The first entry is preloaded (LCP), so
 * make it a strong one. Any aspect ratio works — images are `object-cover`
 * cropped to fill the hero. They sit under a cinematic gradient (heavy on the
 * left, behind the copy) so the text stays readable.
 */
export interface HeroImage {
  src: string
  /** Short description (documentation / a11y if the backdrop is ever exposed). */
  alt: string
}

export const heroImages: HeroImage[] = [
  { src: '/images/hero/1.jpeg', alt: 'Graduation — throwing the cap' },
  { src: '/images/hero/4.jpeg', alt: 'Celebrating on graduation day' },
  { src: '/images/hero/3.jpeg', alt: 'Holding my degree at the graduation ceremony' },
  { src: '/images/hero/2.jpeg', alt: 'Graduation cap in the air' },
  { src: '/images/hero/6.jpeg', alt: 'Graduation portrait with flowers' },
  { src: '/images/hero/5.jpeg', alt: 'Graduation day, seated with my diploma' },
  { src: '/images/hero/7.jpeg', alt: 'At the graduation ceremony' },
]

/** Seconds each photo is shown before crossfading to the next. */
export const heroInterval = 5

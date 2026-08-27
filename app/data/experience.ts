import type { ExperienceItem } from '~/types'

/**
 * Professional & academic timeline.
 * NOTHING here is invented on your behalf — every entry is a clearly marked
 * [PLACEHOLDER] describing the *shape* of a real entry. Replace the text with
 * your actual roles, degrees and dates.
 */
export const experience: ExperienceItem[] = [
  {
    kind: 'work',
    period: '2025 — Present',
    title: 'Freelance Full-Stack Developer', // [PLACEHOLDER]
    organization: 'Self-employed', // [PLACEHOLDER]
    location: 'Remote',
    description:
      'Design and build small to mid-size web applications for clients end to end — requirements, data model, API and interface — primarily on the Nuxt + PostgreSQL stack.', // [PLACEHOLDER]
    technologies: ['Nuxt', 'Vue', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    current: true,
  },
  {
    kind: 'education',
    period: '2023 — Present',
    title: 'BSc in Computer Science', // [PLACEHOLDER: degree name]
    organization: 'Your University', // [PLACEHOLDER: institution]
    location: 'Phnom Penh, Cambodia', // [PLACEHOLDER]
    description:
      'Coursework in algorithms, databases, operating systems, software engineering and web development. Building portfolio projects alongside the curriculum.', // [PLACEHOLDER]
    technologies: ['Data Structures', 'Databases', 'Software Engineering', 'C', 'Java'],
    current: true,
  },
  {
    kind: 'project',
    period: '2024',
    title: 'Learning Platform — capstone build', // [PLACEHOLDER]
    organization: 'Personal project',
    description:
      'A cross-border learning platform connecting students and teachers. Owned architecture, auth, scheduling and the full Nuxt frontend. Full case study in the Projects section.',
    technologies: ['Nuxt', 'Vue', 'TypeScript', 'Node.js', 'PostgreSQL'],
  },
  {
    kind: 'work',
    period: '2023 — 2024',
    title: 'Web Development Intern', // [PLACEHOLDER]
    organization: 'Company name', // [PLACEHOLDER]
    location: 'Phnom Penh, Cambodia', // [PLACEHOLDER]
    description:
      'Contributed to internal tools and marketing sites: built UI components, fixed bugs across a Laravel + Vue codebase, and wrote SQL reports for the operations team.', // [PLACEHOLDER]
    technologies: ['Laravel', 'PHP', 'Vue', 'MySQL', 'Git'],
  },
  {
    kind: 'education',
    period: '2020 — 2023',
    title: 'High School Diploma', // [PLACEHOLDER]
    organization: 'Your High School', // [PLACEHOLDER]
    location: 'Cambodia', // [PLACEHOLDER]
    description:
      'Started self-teaching web development in the final years — HTML, CSS, JavaScript and first PHP projects.', // [PLACEHOLDER]
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP'],
  },
]

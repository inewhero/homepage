import type { SiteCopy } from './types';

export const en = {
  locale: 'en',
  languageName: 'English',
  switchLanguage: '中文',
  nav: {
    home: 'Home',
    notes: 'Notes',
    projects: 'Projects',
    publications: 'Publications',
    journey: 'Journey',
    contact: 'Contact',
  },
  meta: {
    title: 'Ruiyi Huang Homepage',
    description:
      'An academic portfolio exploring attention, mind, behavior, and mental health.',
  },
  home: {
    name: 'Ruiyi Huang',
    welcomeBefore: 'Welcome to the homepage of',
    welcomeAfter: '',
    headline: 'Look Closer. Explore Further.',
    subheadline: 'Turning curiosity into real-world discovery.',
    intro:
      'I study how cognition process shapes mind and behavior, translating fundamental insights into practical advances that improve mental health and life quality.',
  },
  pages: {
    contact: {
      title: 'Contact',
      intro:
        'I am a student learning at the intersection of psychiatry, neuroscience, and psychology. I would be grateful to hear from researchers, students, and practitioners who are willing to exchange ideas or share advice.',
      items: [
        {
          eyebrow: 'Email',
          title: 'yosoro0814(at)gmail.com',
          text: 'I am always glad to hear from fellow students, researchers, and anyone curious about these topics—whether you would like to exchange an idea, share an experience, or simply say hello.',
        },
        {
          eyebrow: 'GitHub',
          title: 'github.com/inewhero',
          text: 'Code, small tools, and works in progress.',
          href: 'https://github.com/inewhero',
        },
        {
          eyebrow: 'ORCID',
          title: '0000-0001-9202-8139',
          text: 'A persistent identifier for my research record.',
          href: 'https://orcid.org/0000-0001-9202-8139',
        },
      ],
    },
  },
  notes: {
    indexTitle: 'Notes',
    indexIntro:
      'Essays, research notes, methods, and reflections written between larger outputs.',
    tableOfContents: 'On this page',
    published: 'Published',
    updated: 'Updated',
    unavailable: 'Translation unavailable',
    backToNotes: 'All notes',
  },
  footer: {
    rights: 'Built with Astro and Markdown.',
  },
} satisfies SiteCopy;

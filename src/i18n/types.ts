import type { Locale } from '../lib/content';

export type NavKey =
  | 'home'
  | 'notes'
  | 'projects'
  | 'publications'
  | 'journey'
  | 'contact';

export interface SectionItem {
  eyebrow?: string;
  title: string;
  text: string;
  meta?: string;
  href?: string;
}

export interface SiteCopy {
  locale: Locale;
  languageName: string;
  switchLanguage: string;
  nav: Record<NavKey, string>;
  meta: {
    title: string;
    description: string;
  };
  home: {
    name: string;
    welcomeBefore: string;
    welcomeAfter: string;
    headline: string;
    subheadline: string;
    intro: string;
    selectedTitle: string;
  };
  pages: {
    contact: {
    title: string;
    intro: string;
    items: SectionItem[];
    };
  };
  notes: {
    indexTitle: string;
    indexIntro: string;
    tableOfContents: string;
    published: string;
    updated: string;
    unavailable: string;
    backToNotes: string;
  };
  publications: {
    indexTitle: string;
    indexIntro: string;
    tableOfContents: string;
    date: string;
    updated: string;
    type: string;
    authors: string;
    backToPublications: string;
  };
  footer: {
    rights: string;
  };
}

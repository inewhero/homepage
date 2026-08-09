import type { Locale } from '../lib/content';

export type NavKey =
  | 'home'
  | 'notes'
  | 'projects'
  | 'publications'
  | 'journey'
  | 'contact';

export type StandardPageKey = Exclude<NavKey, 'home' | 'notes' | 'journey'>;
export type MarkdownSectionKey = Exclude<StandardPageKey, 'contact'>;

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
  footer: {
    rights: string;
  };
}

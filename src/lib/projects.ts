import type { CollectionEntry } from 'astro:content';
import type { Locale } from './content';

export interface ProjectIdentity {
  locale: Locale;
  slug: string;
  translationKey: string;
}

const SUFFIX_PATTERN = /^(.*)_(zh|en)$/;

export function getProjectIdentity(id: string): ProjectIdentity | undefined {
  const normalizedId = id.replace(/\\/g, '/');
  const match = normalizedId.match(SUFFIX_PATTERN);

  if (!match) return undefined;

  const translationKey = match[1];
  const locale = match[2];

  if (!translationKey || (locale !== 'zh' && locale !== 'en')) return undefined;

  return { locale, slug: translationKey, translationKey };
}

export function visibleProjects(
  entries: CollectionEntry<'projects'>[],
  locale: Locale,
) {
  return entries
    .filter((entry) => !entry.data.draft)
    .map((entry) => ({ entry, identity: getProjectIdentity(entry.id) }))
    .filter(
      (item): item is {
        entry: CollectionEntry<'projects'>;
        identity: ProjectIdentity;
      } => item.identity?.locale === locale,
    )
    .sort((a, b) => a.entry.data.order - b.entry.data.order);
}

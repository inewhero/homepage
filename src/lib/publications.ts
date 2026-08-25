import type { CollectionEntry } from 'astro:content';
import type { Locale } from './content';

export interface PublicationIdentity {
  locale: Locale;
  slug: string;
  translationKey: string;
}

const SUFFIX_PATTERN = /^(.*)_(zh|en)$/;

export function getPublicationIdentity(id: string): PublicationIdentity | undefined {
  const normalizedId = id.replace(/\\/g, '/');
  const match = normalizedId.match(SUFFIX_PATTERN);

  if (!match) return undefined;

  const translationKey = match[1];
  const locale = match[2];

  if (!translationKey || (locale !== 'zh' && locale !== 'en')) return undefined;

  return { locale, slug: translationKey, translationKey };
}

export function visiblePublications(
  entries: CollectionEntry<'publications'>[],
  locale: Locale,
) {
  return entries
    .filter((entry) => !entry.data.draft)
    .map((entry) => ({ entry, identity: getPublicationIdentity(entry.id) }))
    .filter(
      (item): item is {
        entry: CollectionEntry<'publications'>;
        identity: PublicationIdentity;
      } => item.identity?.locale === locale,
    )
    .sort((a, b) => b.entry.data.date.getTime() - a.entry.data.date.getTime());
}

export function findPublicationTranslation(
  entries: CollectionEntry<'publications'>[],
  identity: PublicationIdentity,
) {
  const targetLocale: Locale = identity.locale === 'zh' ? 'en' : 'zh';
  return entries.find((entry) => {
    const candidate = getPublicationIdentity(entry.id);
    return (
      candidate?.translationKey === identity.translationKey &&
      candidate.locale === targetLocale &&
      !entry.data.draft
    );
  });
}

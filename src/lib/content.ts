import type { CollectionEntry } from 'astro:content';

export type Locale = 'zh' | 'en';

export interface NoteIdentity {
  locale: Locale;
  slug: string;
  translationKey: string;
}

const SUFFIX_PATTERN = /^(.*)_(zh|en)$/;

export function getNoteIdentity(id: string): NoteIdentity | undefined {
  const normalizedId = id.replace(/\\/g, '/');
  const match = normalizedId.match(SUFFIX_PATTERN);

  if (!match) return undefined;

  const translationKey = match[1];
  const locale = match[2];

  if (!translationKey || (locale !== 'zh' && locale !== 'en')) return undefined;

  return {
    locale,
    slug: translationKey,
    translationKey,
  };
}

export function visibleNotes(
  entries: CollectionEntry<'notes'>[],
  locale: Locale,
) {
  return entries
    .filter((entry) => !entry.data.draft)
    .map((entry) => ({ entry, identity: getNoteIdentity(entry.id) }))
    .filter(
      (item): item is {
        entry: CollectionEntry<'notes'>;
        identity: NoteIdentity;
      } => item.identity?.locale === locale,
    )
    .sort(
      (a, b) =>
        b.entry.data.published.getTime() - a.entry.data.published.getTime(),
    );
}

export function findTranslation(
  entries: CollectionEntry<'notes'>[],
  identity: NoteIdentity,
) {
  const targetLocale: Locale = identity.locale === 'zh' ? 'en' : 'zh';
  return entries.find((entry) => {
    const candidate = getNoteIdentity(entry.id);
    return (
      candidate?.translationKey === identity.translationKey &&
      candidate.locale === targetLocale &&
      !entry.data.draft
    );
  });
}

import { getCollection } from 'astro:content';
import type { Locale } from './content';

export async function getProjectsPageMetadata(locale: Locale) {
  const entries = await getCollection('sections');
  const expectedId = `projects_${locale}`;
  const entry = entries.find((candidate) => candidate.id.replace(/\\/g, '/') === expectedId);

  if (!entry) {
    throw new Error(`Missing Projects page metadata for locale “${locale}”.`);
  }

  return entry.data;
}

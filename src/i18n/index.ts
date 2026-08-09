import { en } from './en';
import { zh } from './zh';
import type { Locale } from '../lib/content';
import type { SiteCopy } from './types';

export const dictionaries = { zh, en } as const;

export function getDictionary(locale: Locale): SiteCopy {
  return dictionaries[locale];
}

import type { Locale } from './content';

export function withBase(path = '/') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const cleanPath = path.replace(/^\//, '');
  return `${base}/${cleanPath}`.replace(/(?<!:)\/{2,}/g, '/');
}

export function localizedPath(locale: Locale, path = '/') {
  const cleanPath = path.replace(/^\//, '');
  const localePrefix = locale === 'zh' ? 'zh/' : '';
  return withBase(`${localePrefix}${cleanPath}`);
}

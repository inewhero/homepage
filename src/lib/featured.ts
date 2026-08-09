import { getCollection } from 'astro:content';
import type { Locale } from './content';

export interface FeaturedWork {
  title: string;
  year: string;
  venue: string;
  href: string;
}

const requiredColumns = ['title', 'year', 'venue', 'href'] as const;

function splitTableRow(line: string) {
  const normalized = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  return normalized
    .split(/(?<!\\)\|/)
    .map((cell) => cell.trim().replace(/\\\|/g, '|'));
}

function readRequiredCell(
  row: Record<string, string>,
  column: string,
  source: string,
  rowNumber: number,
) {
  const value = row[column]?.trim();
  if (!value) {
    throw new Error(`${source}: row ${rowNumber} is missing “${column}”.`);
  }
  return value;
}

function parseFeaturedWorks(body: string, source: string): FeaturedWork[] {
  const lines = body.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim().startsWith('|'));

  if (start < 0) {
    throw new Error(`${source}: expected a Markdown table.`);
  }

  const tableLines: string[] = [];
  for (let index = start; index < lines.length; index += 1) {
    const line = lines[index]?.trim() ?? '';
    if (!line.startsWith('|')) break;
    tableLines.push(line);
  }

  if (tableLines.length < 3) {
    throw new Error(`${source}: the table must include a header and at least one row.`);
  }

  const headers = splitTableRow(tableLines[0] ?? '');
  const separators = splitTableRow(tableLines[1] ?? '');
  const missingColumns = requiredColumns.filter((column) => !headers.includes(column));

  if (missingColumns.length > 0) {
    throw new Error(`${source}: missing columns: ${missingColumns.join(', ')}.`);
  }

  if (separators.length !== headers.length || separators.some((cell) => !/^:?-{3,}:?$/.test(cell))) {
    throw new Error(`${source}: invalid Markdown table separator row.`);
  }

  return tableLines.slice(2).map((line, index) => {
    const values = splitTableRow(line);
    const row = Object.fromEntries(headers.map((header, cellIndex) => [header, values[cellIndex] ?? '']));
    const rowNumber = index + 1;

    return {
      title: readRequiredCell(row, 'title', source, rowNumber),
      year: readRequiredCell(row, 'year', source, rowNumber),
      venue: readRequiredCell(row, 'venue', source, rowNumber),
      href: readRequiredCell(row, 'href', source, rowNumber),
    };
  });
}

export async function getFeaturedWorks(locale: Locale) {
  const entries = await getCollection('featured');
  const expectedId = `selected_works_${locale}`;
  const entry = entries.find((candidate) => candidate.id.replace(/\\/g, '/') === expectedId);

  if (!entry) {
    throw new Error(`Missing Selected Works Markdown for locale “${locale}”.`);
  }
  if (!entry.body) {
    throw new Error(`${entry.id}: Markdown body is empty.`);
  }

  return {
    title: entry.data.title,
    items: parseFeaturedWorks(entry.body, entry.id),
  };
}

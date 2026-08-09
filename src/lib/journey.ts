import { getCollection } from 'astro:content';
import type { Locale } from './content';

export interface JourneyEntry {
  title: string;
  text: string;
  meta?: string;
}

export interface JourneyPeriod {
  id: string;
  year: string;
  academic: JourneyEntry;
  practical: JourneyEntry;
}

const requiredColumns = [
  'id',
  'year',
  'academic_title',
  'academic_text',
  'academic_meta',
  'practical_title',
  'practical_text',
  'practical_meta',
] as const;

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

export function parseJourneyTable(body: string, source: string): JourneyPeriod[] {
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
    throw new Error(`${source}: the Journey table must include a header and at least one row.`);
  }

  const headers = splitTableRow(tableLines[0] ?? '');
  const separators = splitTableRow(tableLines[1] ?? '');
  const missingColumns = requiredColumns.filter((column) => !headers.includes(column));

  if (missingColumns.length > 0) {
    throw new Error(`${source}: missing Journey columns: ${missingColumns.join(', ')}.`);
  }

  if (separators.length !== headers.length || separators.some((cell) => !/^:?-{3,}:?$/.test(cell))) {
    throw new Error(`${source}: invalid Markdown table separator row.`);
  }

  const seenIds = new Set<string>();
  return tableLines.slice(2).map((line, index) => {
    const values = splitTableRow(line);
    const row = Object.fromEntries(headers.map((header, cellIndex) => [header, values[cellIndex] ?? '']));
    const rowNumber = index + 1;
    const id = readRequiredCell(row, 'id', source, rowNumber);

    if (!/^[a-z0-9-]+$/i.test(id)) {
      throw new Error(`${source}: row ${rowNumber} has invalid id “${id}”.`);
    }
    if (seenIds.has(id)) {
      throw new Error(`${source}: duplicate Journey id “${id}”.`);
    }
    seenIds.add(id);

    const academicMeta = row.academic_meta?.trim();
    const practicalMeta = row.practical_meta?.trim();

    return {
      id,
      year: readRequiredCell(row, 'year', source, rowNumber),
      academic: {
        title: readRequiredCell(row, 'academic_title', source, rowNumber),
        text: readRequiredCell(row, 'academic_text', source, rowNumber),
        ...(academicMeta ? { meta: academicMeta } : {}),
      },
      practical: {
        title: readRequiredCell(row, 'practical_title', source, rowNumber),
        text: readRequiredCell(row, 'practical_text', source, rowNumber),
        ...(practicalMeta ? { meta: practicalMeta } : {}),
      },
    };
  });
}

export async function getJourneyContent(locale: Locale) {
  const entries = await getCollection('journey');
  const entry = entries.find((candidate) => candidate.id.replace(/\\/g, '/').endsWith(`_${locale}`));

  if (!entry) {
    throw new Error(`Missing Journey Markdown for locale “${locale}”.`);
  }
  if (!entry.body) {
    throw new Error(`${entry.id}: Journey Markdown body is empty.`);
  }

  return {
    ...entry.data,
    periods: parseJourneyTable(entry.body, entry.id),
  };
}

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const notes = defineCollection({
  loader: glob({
    base: './src/content/notes',
    pattern: '**/*_{zh,en}.md',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const journey = defineCollection({
  loader: glob({
    base: './src/content/journey',
    pattern: 'journey_{zh,en}.md',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    intro: z.string(),
    academicLabel: z.string(),
    practicalLabel: z.string(),
  }),
});

const sections = defineCollection({
  loader: glob({
    base: './src/content/sections',
    pattern: 'projects_{zh,en}.md',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    intro: z.string(),
  }),
});

const projects = defineCollection({
  loader: glob({
    base: './src/content/projects',
    pattern: '**/*_{zh,en}.md',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    repository: z.url(),
    order: z.number().int().nonnegative(),
    selected: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const publications = defineCollection({
  loader: glob({
    base: './src/content/publications',
    pattern: '**/*_{zh,en}.md',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    type: z.string(),
    authors: z.array(z.string()).min(1),
    repository: z.url().optional(),
    materials: z.url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { notes, journey, sections, projects, publications };

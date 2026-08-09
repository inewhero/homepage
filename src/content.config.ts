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
    pattern: '{projects,publications}_{zh,en}.md',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    intro: z.string(),
  }),
});

const featured = defineCollection({
  loader: glob({
    base: './src/content/home',
    pattern: 'selected_works_{zh,en}.md',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { notes, journey, sections, featured };

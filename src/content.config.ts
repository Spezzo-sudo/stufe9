import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Technische Grundlage. Weitere Schemas und Beispieldaten folgen in Schritt 2.
const ressorts = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/ressorts' }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    name: z.string().min(1),
    intro: z.string().min(1),
    motiv: z.string().min(1).optional(),
  }),
});

export const collections = { ressorts };

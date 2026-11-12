import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { contentSchemas } from './lib/content-schemas';

export const collections = {
  ressorts: defineCollection({ loader: glob({ pattern: '**/*.json', base: './src/content/ressorts' }), schema: contentSchemas.ressorts }),
  firmen: defineCollection({ loader: glob({ pattern: '**/*.json', base: './src/content/firmen' }), schema: contentSchemas.firmen }),
  projekte: defineCollection({ loader: glob({ pattern: '**/*.json', base: './src/content/projekte' }), schema: contentSchemas.projekte }),
  meilensteine: defineCollection({ loader: glob({ pattern: '**/*.json', base: './src/content/meilensteine' }), schema: contentSchemas.meilensteine }),
  artikel: defineCollection({ loader: glob({ pattern: '**/*.mdx', base: './src/content/artikel' }), schema: contentSchemas.artikel }),
  updates: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/updates' }), schema: contentSchemas.updates }),
};

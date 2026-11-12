import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { parse } from 'yaml';
import { contentSchemas, validateRelations, validateUpdateBody } from '../src/lib/content-schemas.ts';
import type { ContentSet } from '../src/lib/content-schemas.ts';

const root = fileURLToPath(new URL('../src/content/', import.meta.url));
const content = {} as ContentSet;
for (const collection of Object.keys(contentSchemas) as (keyof ContentSet)[]) {
  const directory = path.join(root, collection);
  const files = (await readdir(directory, { recursive: true })).filter((file) => /\.(json|mdx|md)$/.test(file));
  const entries = [];
  for (const file of files) {
    const raw = await readFile(path.join(directory, file), 'utf8');
    let data: unknown;
    if (file.endsWith('.json')) data = JSON.parse(raw);
    else {
      const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
      if (!match) throw new Error(`${collection}/${file}: Frontmatter fehlt.`);
      data = parse(match[1]);
      if (!match[2].trim()) throw new Error(`${collection}/${file}: Text fehlt.`);
      if (collection === 'updates') validateUpdateBody(match[2]);
    }
    const result = contentSchemas[collection].safeParse(data);
    if (!result.success) throw new Error(`${collection}/${file}: ${result.error.message}`);
    const id = 'slug' in result.data ? result.data.slug : result.data.id;
    if (path.basename(file).replace(/\.(json|mdx|md)$/, '') !== id) throw new Error(`${collection}/${file}: Dateiname und ID müssen übereinstimmen.`);
    entries.push(result.data);
  }
  Object.assign(content, { [collection]: entries });
}
validateRelations(content);
console.log('Inhalte geprüft:', Object.entries(content).map(([key, entries]) => `${key} ${entries.length}`).join(', '));

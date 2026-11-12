import type { CollectionEntry } from 'astro:content';
export type Projekt = CollectionEntry<'projekte'>['data'];
export type Quelle = Projekt['quellen'][number];
export const stageLabels = ['', 'Theorie', 'Theorie', 'Labor', 'Labor', 'Prototyp', 'Prototyp', 'Pilot', 'Pilot', 'Serienreif'];
export const title = (value: string) => value.replace(/\s*\(Beispiel\)$/, '');
export const datum = (value: string) => new Intl.DateTimeFormat('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' }).format(new Date(value));
export const sourceId = (prefix: string, id: string) => `${prefix}-${id}`;

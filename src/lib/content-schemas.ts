import { z } from 'astro/zod';

const text = z.string().trim().min(1);
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
  const parsed = new Date(value);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}, 'Gültiges Datum als JJJJ-MM-TT erforderlich.');
const stage = z.number().int().min(1).max(9);
const unique = <T>(items: T[]) => new Set(items).size === items.length;
const sourceIds = z.array(slug).min(1).refine(unique);

// Erfundene Quellen haben bewusst keinen vermeintlich echten Link.
export const quelleSchema = z.discriminatedUnion('beispiel', [
  z.object({ id: slug, titel: text, datum: date, beispiel: z.literal(true) }).strict(),
  z.object({ id: slug, titel: text, datum: date, beispiel: z.literal(false), url: z.url().refine((url) => url.startsWith('https://'), 'HTTPS-Quelle erforderlich.') }).strict(),
]);
const sources = z.array(quelleSchema).min(1).refine((items) => unique(items.map((item) => item.id)), 'Quellen-IDs müssen eindeutig sein.');
const sourcedText = z.object({ text, quellen: sourceIds }).strict();
const metadata = { beispiel: z.boolean(), quellen: sources };

// Ein Ressort ist eine Rubrik. Es behauptet nichts, braucht also keine Quelle und trägt kein Beispiel-Kennzeichen.
// status 'geplant' zeigt das Feld in der Navigation als «In Vorbereitung». reihenfolge sortiert Raster und Auftritt.
export const ressortSchema = z.object({
  slug, name: text, thema: text.optional(), intro: text, motiv: slug.optional(),
  status: z.enum(['aktiv', 'geplant']).default('aktiv'), reihenfolge: z.number().int().optional(),
}).strict();
export const firmaSchema = z.object({ slug, name: text, land: text, ticker: text.optional(), ...metadata }).strict();
export const projektSchema = z.object({
  slug, name: text, firma: slug, ressorts: z.array(slug).min(1).refine(unique),
  // titel ist die Schlagzeile mit einer Aussage, stand das Datum der letzten Prüfung. aufmacher setzt das Projekt oben auf die Startseite.
  titel: text, stand: date, autor: text, aufmacher: z.boolean().optional(),
  trl_ist: stage, trl_behauptet: stage,
  behauptung: z.object({ begruendung: text, quelle: slug }).strict(),
  versprochen: sourcedText, geliefert: sourcedText, stand_heute: sourcedText,
  engpass: z.object({ frage: text, kennzahl: text, wert: z.number(), ziel: z.number(), einheit: text, quelle: slug }).strict(),
  bauart: z.enum(['tokamak', 'stellarator', 'linear']).optional(),
  risiken: z.array(z.object({
    thema: text, status: z.enum(['belegt', 'behauptet', 'kritik']), beschreibung: text,
    stellungnahme_firma: sourcedText.optional(), quellen: sourceIds,
  }).strict()), ...metadata,
}).strict();
export const meilensteinSchema = z.object({
  id: slug, projekt: slug, titel: text, angekuendigt_fuer: date, erreicht_am: date.optional(),
  status: z.enum(['geplant', 'erreicht', 'verspaetet', 'abgesagt']), quelle: slug,
  trl_aenderung: z.object({
    nach: stage, quelle: slug,
    freigabe: z.object({ art: z.literal('mensch'), name: text, datum: date }).strict(),
  }).strict().optional(), ...metadata,
}).strict().superRefine((entry, ctx) => {
  if (entry.status === 'erreicht' && !entry.erreicht_am) ctx.addIssue({ code: 'custom', path: ['erreicht_am'], message: 'Erreichte Meilensteine brauchen ein Datum.' });
  if (entry.status !== 'erreicht' && entry.erreicht_am) ctx.addIssue({ code: 'custom', path: ['erreicht_am'], message: 'Nur erreichte Meilensteine erhalten ein Erreichungsdatum.' });
  if (entry.trl_aenderung && entry.status !== 'erreicht') ctx.addIssue({ code: 'custom', path: ['trl_aenderung'], message: 'Eine belegte Stufe braucht einen erreichten Meilenstein.' });
  if (entry.trl_aenderung && entry.erreicht_am && entry.trl_aenderung.freigabe.datum < entry.erreicht_am) ctx.addIssue({ code: 'custom', path: ['trl_aenderung'], message: 'Freigabe darf nicht vor dem Belegdatum liegen.' });
});
export const artikelSchema = z.object({
  slug, titel: text, typ: z.enum(['deep-dive', 'messe', 'erklaerer', 'kontroverse']),
  ressorts: z.array(slug).min(1), projekte: z.array(slug), firmen: z.array(slug),
  datum: date, autor: text, zusammenfassung: text, ...metadata,
}).strict();
export const updateSchema = z.object({
  id: slug, titel: text, datum: date, ressort: slug, projekt: slug.optional(),
  quelle: slug, meilenstein: slug.optional(), ...metadata,
}).strict();
export const contentSchemas = {
  ressorts: ressortSchema, firmen: firmaSchema, projekte: projektSchema,
  meilensteine: meilensteinSchema, artikel: artikelSchema, updates: updateSchema,
};
export type ContentSet = { [K in keyof typeof contentSchemas]: z.infer<(typeof contentSchemas)[K]>[] };

/** Prüft Beziehungen zusätzlich zur Feldvalidierung durch die Collections. */
export function validateRelations(content: ContentSet) {
  const fail = (message: string): never => { throw new Error(`Inhaltsprüfung: ${message}`); };
  const find = <K extends keyof ContentSet>(collection: K, id: string): ContentSet[K][number] => {
    const result = content[collection].find((item) => ('slug' in item ? item.slug : item.id) === id);
    if (!result) fail(`${collection}/${id} fehlt.`);
    return result!;
  };
  const link = (entry: { beispiel: boolean }, target: { beispiel: boolean }) => {
    if (entry.beispiel !== target.beispiel) fail('Beispiel-Inhalte und echte Inhalte dürfen nicht vermischt werden.');
  };
  for (const [collection, entries] of Object.entries(content)) {
    const ids = entries.map((item) => 'slug' in item ? item.slug : item.id);
    if (!unique(ids)) fail(`Doppelte ID in ${collection}.`);
    for (const entry of entries) {
      // Ressorts sind Rubriken ohne Quellen und ohne Beispiel-Kennzeichen.
      const quellen = 'quellen' in entry ? entry.quellen : [];
      if ('beispiel' in entry && !entry.beispiel && quellen.some((source) => source.beispiel)) fail(`${collection}: echte Inhalte brauchen echte Quellen.`);
      const known = new Set(quellen.map((source) => source.id));
      const visit = (value: unknown): void => {
        if (!value || typeof value !== 'object') return;
        for (const [key, child] of Object.entries(value)) {
          if (key === 'quelle' && typeof child === 'string' && !known.has(child)) fail(`Unbekannte Quelle ${child} in ${collection}.`);
          if (key === 'quellen' && Array.isArray(child) && child.every((id) => typeof id === 'string')) {
            for (const id of child) if (!known.has(id)) fail(`Unbekannte Quelle ${id} in ${collection}.`);
          } else if (typeof child === 'object') visit(child);
        }
      };
      visit(entry);
    }
  }
  for (const project of content.projekte) {
    link(project, find('firmen', project.firma));
    for (const id of project.ressorts) find('ressorts', id);
    const history = content.meilensteine.filter((milestone) => milestone.projekt === project.slug && milestone.status === 'erreicht' && milestone.trl_aenderung)
      .sort((a, b) => a.erreicht_am!.localeCompare(b.erreicht_am!));
    if (!history.length) fail(`${project.slug}: erreichter Meilenstein mit Stufenfreigabe fehlt.`);
    for (let i = 1; i < history.length; i++) if (history[i].erreicht_am === history[i - 1].erreicht_am) fail(`${project.slug}: mehrere Stufenfreigaben am selben Tag sind nicht eindeutig.`);
    if (history.at(-1)!.trl_aenderung!.nach !== project.trl_ist) fail(`${project.slug}: trl_ist widerspricht dem letzten erreichten Meilenstein.`);
  }
  for (const entry of content.meilensteine) link(entry, find('projekte', entry.projekt));
  for (const entry of content.artikel) {
    for (const id of entry.ressorts) find('ressorts', id);
    for (const id of entry.projekte) link(entry, find('projekte', id));
    for (const id of entry.firmen) link(entry, find('firmen', id));
  }
  for (const entry of content.updates) {
    find('ressorts', entry.ressort);
    if (entry.projekt) link(entry, find('projekte', entry.projekt));
    if (entry.meilenstein) {
      const milestone = find('meilensteine', entry.meilenstein);
      link(entry, milestone);
      if (!entry.projekt || milestone.projekt !== entry.projekt) fail(`${entry.id}: Meilenstein gehört nicht zum genannten Projekt.`);
    }
  }
}

export function validateUpdateBody(body: string) {
  const words = body.trim().split(/\s+/u).filter(Boolean).length;
  if (words === 0 || words > 80) throw new Error(`Update braucht 1 bis 80 Wörter, gefunden: ${words}.`);
}

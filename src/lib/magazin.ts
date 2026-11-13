import type { CollectionEntry } from 'astro:content';
export type Projekt = CollectionEntry<'projekte'>['data'];
export type Quelle = Projekt['quellen'][number];
export const stageLabels = ['', 'Theorie', 'Theorie', 'Labor', 'Labor', 'Prototyp', 'Prototyp', 'Pilot', 'Pilot', 'Serienreif'];
/** Sortiert Ressorts nach dem Feld reihenfolge, danach nach Name. */
export const nachReihenfolge = (ressorts: CollectionEntry<'ressorts'>[]) => ressorts.toSorted((a, b) => (a.data.reihenfolge ?? 999) - (b.data.reihenfolge ?? 999) || a.data.name.localeCompare(b.data.name));
type Meilenstein = CollectionEntry<'meilensteine'>['data'];
/** Sortiert Projekte für die Startseite: gesetzter Aufmacher zuerst, dann der jüngste Stand. */
export const nachAktualitaet = (projekte: CollectionEntry<'projekte'>[]) => projekte.toSorted((a, b) => Number(b.data.aufmacher ?? false) - Number(a.data.aufmacher ?? false) || b.data.stand.localeCompare(a.data.stand) || a.data.slug.localeCompare(b.data.slug));
/** Was ein Update bewegt hat: ein Stufenwechsel oder ein verschobener Termin. Stammt immer aus dem verknüpften Meilenstein. */
export function bewegung(meilensteinId: string | undefined, meilensteine: Meilenstein[]): string | undefined {
  const m = meilensteine.find((eintrag) => eintrag.id === meilensteinId);
  if (!m) return undefined;
  if (m.status === 'verspaetet') return 'Termin verschoben';
  if (m.status === 'abgesagt') return 'Abgesagt';
  if (!m.trl_aenderung || !m.erreicht_am) return undefined;
  const davor = meilensteine.filter((e) => e.projekt === m.projekt && e.trl_aenderung && e.erreicht_am && e.erreicht_am < m.erreicht_am!).sort((a, b) => a.erreicht_am!.localeCompare(b.erreicht_am!)).at(-1);
  return davor ? `Stufe ${davor.trl_aenderung!.nach} → ${m.trl_aenderung.nach}` : `Stufe ${m.trl_aenderung.nach} belegt`;
}
export const title = (value: string) => value.replace(/\s*\(Beispiel\)$/, '');
export const datum = (value: string) => new Intl.DateTimeFormat('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' }).format(new Date(value));
export const sourceId = (prefix: string, id: string) => `${prefix}-${id}`;

import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { test } from 'node:test';
import { parse } from 'yaml';
import { contentSchemas, validateRelations, validateUpdateBody } from '../src/lib/content-schemas.ts';
import type { ContentSet } from '../src/lib/content-schemas.ts';

function fixture(): ContentSet {
  const content = {} as ContentSet;
  for (const collection of Object.keys(contentSchemas) as (keyof ContentSet)[]) {
    const directory = new URL(`../src/content/${collection}/`, import.meta.url);
    const entries = readdirSync(directory).filter((name) => /\.(json|md|mdx)$/.test(name)).map((name) => {
      const raw = readFileSync(new URL(name, directory), 'utf8');
      const data = name.endsWith('.json') ? JSON.parse(raw) : parse(raw.match(/^---\n([\s\S]*?)\n---/)![1]);
      return contentSchemas[collection].parse(data);
    });
    Object.assign(content, { [collection]: entries });
  }
  return content;
}
test('Beispiele bilden konsistente Projekte und Stufen ab', () => assert.doesNotThrow(() => validateRelations(fixture())));
test('fehlende Quelle und Stufe ausserhalb 1–9 werden abgelehnt', () => {
  const project = fixture().projekte[0];
  assert.equal(contentSchemas.projekte.safeParse({ ...project, quellen: [] }).success, false);
  assert.equal(contentSchemas.projekte.safeParse({ ...project, trl_ist: 10 }).success, false);
});
test('unbekannte Quellen-ID und fehlende Firma brechen die Prüfung ab', () => {
  const content = fixture(); content.projekte[0].engpass.quelle = 'fehlt';
  assert.throws(() => validateRelations(content), /Unbekannte Quelle/);
  const other = fixture(); other.projekte[0].firma = 'fehlt';
  assert.throws(() => validateRelations(other), /firmen\/fehlt/);
});
test('Projektstufe muss zum letzten erreichten Meilenstein passen', () => {
  const content = fixture(); content.projekte[0].trl_ist = 9;
  assert.throws(() => validateRelations(content), /trl_ist widerspricht/);
});
test('geplante Stufen und fehlende menschliche Freigabe sind unzulässig', () => {
  const milestone = fixture().meilensteine[0];
  assert.equal(contentSchemas.meilensteine.safeParse({ ...milestone, status: 'geplant' }).success, false);
  assert.equal(contentSchemas.meilensteine.safeParse({ ...milestone, trl_aenderung: { nach: 5, quelle: milestone.quelle } }).success, false);
});
test('echte Inhalte dürfen keine erfundenen Quellen verwenden', () => {
  const content = fixture(); content.projekte[0].beispiel = false;
  assert.throws(() => validateRelations(content), /echte Inhalte brauchen echte Quellen/);
});
test('falscher Projektbezug eines Updates wird abgelehnt', () => {
  const content = fixture(); content.updates[0].projekt = content.projekte[1].slug;
  assert.throws(() => validateRelations(content), /Meilenstein gehört nicht/);
});
test('Updates dürfen höchstens 80 Wörter enthalten', () => {
  assert.doesNotThrow(() => validateUpdateBody(Array(80).fill('Wort').join(' ')));
  assert.throws(() => validateUpdateBody(Array(81).fill('Wort').join(' ')), /1 bis 80/);
});

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { test } from 'node:test';

const root = path.resolve('dist');
function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) return entry.name === 'prototypes' || entry.name === '_astro' ? [] : walk(file);
    return file.endsWith('.html') ? [file] : [];
  });
}
const files = walk(root);
function resolve(url) {
  let file = path.join(root, decodeURIComponent(url.pathname));
  if (!path.extname(file)) file = path.join(file, 'index.html');
  return file;
}
test('alle lokalen Seitenlinks, Quellenanker und Assets sind vorhanden', () => {
  for (const file of files) {
    const html = readFileSync(file, 'utf8');
    const base = new URL(path.relative(root, file).replace(/index\.html$/, ''), 'https://stufe9.test/');
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(ids).size, ids.length, `Doppelte HTML-ID: ${file}`);
    for (const [, href] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      const url = new URL(href, base);
      if (url.origin !== base.origin) continue;
      const target = resolve(url);
      assert.ok(existsSync(target), `${path.relative(root, file)} → ${href} fehlt`);
      if (url.hash && target.endsWith('.html')) assert.ok(readFileSync(target, 'utf8').includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `Anker fehlt: ${href}`);
    }
  }
});
test('Startseite, Ressorts und Projekte enthalten ihren Inhalt schon ohne JavaScript', () => {
  const home = readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.match(home, /id="forschungsfelder"/);
  assert.match(home, /href="\/fusion\/"/);
  assert.match(home, /href="\/robotik\/"/);
  assert.match(home, /id="checks"/);
  for (const slug of ['fusion', 'robotik']) {
    const ressort = readFileSync(path.join(root, slug, 'index.html'), 'utf8');
    assert.match(ressort, new RegExp(`href="/projekt/beispiel-${slug}/"`));
    const project = readFileSync(path.join(root, 'projekt', `beispiel-${slug}`, 'index.html'), 'utf8');
    for (const text of ['Versprochen', 'Geliefert', 'Stand heute', 'Meilensteine', 'Risiken', 'Quellen', 'frei erfunden']) assert.ok(project.includes(text), `${slug}: ${text} fehlt`);
    assert.match(project, /class="fallback"/);
    assert.match(project, /data-scroll-hint/);
  }
});

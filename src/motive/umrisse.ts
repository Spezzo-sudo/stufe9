/**
 * Feld-Silhouetten als einfache Formen.
 * Aus derselben Beschreibung entstehen die Punktwolken für den Auftritt (Canvas, im Browser)
 * und für das Ressort-Raster (SVG, beim Build). Ein neues Motiv ist ein Eintrag in UMRISSE.
 * Einheit: 1 entspricht etwa der halben Motivhöhe. Brauchbarer Bereich: x ±1.25, y ±1.1.
 */
type Form =
  | { t: 'ring'; cx: number; cy: number; rx: number; ry: number; w: number; a0?: number; a1?: number }
  | { t: 'linie'; x1: number; y1: number; x2: number; y2: number; w: number }
  | { t: 'rechteck'; x: number; y: number; w: number; h: number }
  | { t: 'scheibe'; cx: number; cy: number; r: number }
  | { t: 'vieleck'; p: [number, number][] };
/** formen = Flächen, loecher = Aussparungen darin, oben = Flächen, die über den Aussparungen liegen. */
type Umriss = { formen: Form[]; loecher?: Form[]; oben?: Form[] };

const ring = (cx: number, cy: number, rx: number, ry: number, w: number, a0?: number, a1?: number): Form => ({ t: 'ring', cx, cy, rx, ry, w, a0, a1 });
const linie = (x1: number, y1: number, x2: number, y2: number, w: number): Form => ({ t: 'linie', x1, y1, x2, y2, w });
const rechteck = (x: number, y: number, w: number, h: number): Form => ({ t: 'rechteck', x, y, w, h });
const scheibe = (cx: number, cy: number, r: number): Form => ({ t: 'scheibe', cx, cy, r });
const grad = (g: number) => g * Math.PI / 180;

function quanten(): Umriss {
  const xs = [-.9, -.3, .3, .9], ys = [-.6, 0, .6], formen: Form[] = [];
  for (const y of ys) for (const x of xs) formen.push(scheibe(x, y, .13));
  for (const y of ys) for (let i = 0; i < xs.length - 1; i++) formen.push(linie(xs[i], y, xs[i + 1], y, .035));
  for (const x of xs) for (let i = 0; i < ys.length - 1; i++) formen.push(linie(x, ys[i], x, ys[i + 1], .035));
  return { formen };
}
function antrieb(): Umriss {
  const formen: Form[] = [ring(0, 0, .6, .6, .3), ring(0, 0, .2, .2, .1)];
  for (let i = 0; i < 10; i++) { const a = grad(i * 36); formen.push(linie(.74 * Math.cos(a), .74 * Math.sin(a), .98 * Math.cos(a), .98 * Math.sin(a), .22)); }
  return { formen };
}
function chip(): Umriss {
  const formen: Form[] = [rechteck(-.62, -.62, 1.24, 1.24)];
  for (const p of [-.45, -.225, 0, .225, .45]) formen.push(linie(p, -.62, p, -.95, .07), linie(p, .62, p, .95, .07), linie(-.62, p, -.95, p, .07), linie(.62, p, .95, p, .07));
  return { formen, loecher: [rechteck(-.42, -.42, .84, .84)], oben: [rechteck(-.24, -.24, .48, .48)] };
}
function reaktor(): Umriss {
  const r = .24, formen: Form[] = [];
  for (let q = -2; q <= 2; q++) for (let k = -2; k <= 2; k++) {
    if (Math.abs(q + k) > 2) continue;
    const cx = 1.5 * r * q, cy = Math.sqrt(3) * r * (k + q / 2);
    formen.push({ t: 'vieleck', p: Array.from({ length: 6 }, (_, i) => [cx + r * .86 * Math.cos(i * Math.PI / 3), cy + r * .86 * Math.sin(i * Math.PI / 3)] as [number, number]) });
  }
  return { formen };
}
function kollision(): Umriss {
  const formen: Form[] = [ring(0, 0, .95, .95, .05), scheibe(0, 0, .09)];
  for (let i = 0; i < 22; i++) {
    const a = i * 2.399, l = .35 + ((i * 37) % 10) / 10 * .55, b = ((i * 53) % 7 - 3) * .12;
    const mx = Math.cos(a + b) * l * .55, my = Math.sin(a + b) * l * .55;
    formen.push(linie(0, 0, mx, my, .045), linie(mx, my, Math.cos(a) * l, Math.sin(a) * l, .045));
  }
  return { formen };
}

export const UMRISSE: Record<string, Umriss> = {
  fusion: { formen: [ring(0, 0, 1.05, .5, .3)] },
  robotik: {
    formen: [rechteck(-.6, -.75, 1.2, 1.1), rechteck(-.76, -.38, .11, .42), rechteck(.65, -.38, .11, .42), rechteck(-.035, -1, .07, .26), scheibe(0, -1.04, .09), rechteck(-.2, .38, .4, .26), rechteck(-.95, .66, 1.9, .3)],
    loecher: [rechteck(-.44, -.46, .88, .38)],
    oben: [scheibe(-.2, -.27, .085), scheibe(.2, -.27, .085)],
  },
  quanten: quanten(),
  antrieb: antrieb(),
  chip: chip(),
  reaktor: reaktor(),
  kollision: kollision(),
  kontrolle: { formen: [ring(0, .6, 1.25, 1.25, .09, grad(-151.3), grad(-28.7)), ring(0, -.6, 1.25, 1.25, .09, grad(28.7), grad(151.3)), ring(0, 0, .4, .4, .14), scheibe(0, 0, .14)] },
  neutral: { formen: [rechteck(-.9, -.55, 1.8, 1.1)] },
};

function flaeche(f: Form): number {
  switch (f.t) {
    case 'ring': return ((f.a1 ?? Math.PI * 2) - (f.a0 ?? 0)) * (f.rx + f.ry) / 2 * f.w;
    case 'linie': return Math.hypot(f.x2 - f.x1, f.y2 - f.y1) * f.w;
    case 'rechteck': return f.w * f.h;
    case 'scheibe': return Math.PI * f.r * f.r;
    case 'vieleck': return Math.abs(f.p.reduce((s, [x, y], i) => { const [nx, ny] = f.p[(i + 1) % f.p.length]; return s + x * ny - nx * y; }, 0)) / 2;
  }
}
function innen(f: Form, x: number, y: number): boolean {
  switch (f.t) {
    case 'rechteck': return x >= f.x && x <= f.x + f.w && y >= f.y && y <= f.y + f.h;
    case 'scheibe': return Math.hypot(x - f.cx, y - f.cy) <= f.r;
    case 'vieleck': { let drin = false; for (let i = 0, j = f.p.length - 1; i < f.p.length; j = i++) { const [xi, yi] = f.p[i], [xj, yj] = f.p[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) drin = !drin; } return drin; }
    default: return false;
  }
}
function punktIn(f: Form, z: () => number): [number, number] {
  switch (f.t) {
    case 'ring': { const a = (f.a0 ?? 0) + z() * ((f.a1 ?? Math.PI * 2) - (f.a0 ?? 0)), o = (z() - .5) * f.w; return [f.cx + (f.rx + o) * Math.cos(a), f.cy + (f.ry + o) * Math.sin(a)]; }
    case 'linie': { const t = z(), o = (z() - .5) * f.w, dx = f.x2 - f.x1, dy = f.y2 - f.y1, l = Math.hypot(dx, dy) || 1; return [f.x1 + dx * t - dy / l * o, f.y1 + dy * t + dx / l * o]; }
    case 'rechteck': return [f.x + z() * f.w, f.y + z() * f.h];
    case 'scheibe': { const a = z() * Math.PI * 2, r = Math.sqrt(z()) * f.r; return [f.cx + r * Math.cos(a), f.cy + r * Math.sin(a)]; }
    case 'vieleck': { const xs = f.p.map((p) => p[0]), ys = f.p.map((p) => p[1]), x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0, h = Math.max(...ys) - y0;
      for (let i = 0; i < 40; i++) { const x = x0 + z() * w, y = y0 + z() * h; if (innen(f, x, y)) return [x, y]; }
      return f.p[0]; }
  }
}
/** Kleiner fester Zufallsgenerator, damit Build und Browser dieselbe Wolke erzeugen können. */
function zufall(seed: number) { let s = seed >>> 0; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

/** Liefert n Punkte der Silhouette, von links nach rechts sortiert. */
export function punkte(motiv: string | undefined, n: number, seed = 9): [number, number][] {
  const u = UMRISSE[motiv ?? 'neutral'] ?? UMRISSE.neutral, z = zufall(seed + (motiv ?? '').length * 131);
  const alle = [...u.formen.map((f) => ({ f, frei: false })), ...(u.oben ?? []).map((f) => ({ f, frei: true }))];
  const gewichte = alle.map(({ f }) => flaeche(f)), summe = gewichte.reduce((a, b) => a + b, 0), out: [number, number][] = [];
  while (out.length < n) {
    let r = z() * summe, i = 0; while (i < alle.length - 1 && r > gewichte[i]) r -= gewichte[i++];
    const { f, frei } = alle[i]; let p = punktIn(f, z), versuche = 0;
    while (!frei && u.loecher?.some((l) => innen(l, p[0], p[1])) && versuche++ < 30) p = punktIn(f, z);
    if (frei || !u.loecher?.some((l) => innen(l, p[0], p[1]))) out.push(p);
  }
  return out.sort((a, b) => a[0] - b[0]);
}

/** Anteil der Punkte am rechten Rand, der in Signalfarbe erscheint. Entspricht dem neunten Segment im Logo. */
export const SIGNAL_ANTEIL = 1 / (8 * .72 + 1);

/** SVG-Pfade für das statische Motiv: jeder Punkt ist ein Strich der Länge null mit runder Kappe. */
export function motivPfad(motiv: string | undefined, n = 1100, breite = 280, hoehe = 170) {
  const s = Math.min(breite / 2.7, hoehe / 2.5), pts = punkte(motiv, n), grenze = Math.floor(n * (1 - SIGNAL_ANTEIL));
  const d = (liste: [number, number][]) => liste.map(([x, y]) => `M${(breite / 2 + x * s).toFixed(1)} ${(hoehe / 2 + y * s).toFixed(1)}h0`).join('');
  return { hell: d(pts.slice(0, grenze)), signal: d(pts.slice(grenze)) };
}

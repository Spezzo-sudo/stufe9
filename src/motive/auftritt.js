// Canvas-Auftritt nach public/prototypes/01-prototyp-gesamt.html.
// Die Federbewegung stammt aus der Referenz, die Silhouetten kommen aus umrisse.ts.
import { punkte } from './umrisse.ts';
export function initAuftritt() {
const hero = document.getElementById('hero');
const cv = document.getElementById('icv');
const ph = document.getElementById('ph');
const button = document.getElementById('lock');
if (!hero || !cv || !ph || !button) return;
const ctx = cv.getContext('2d');
if (!ctx) return;
const media = matchMedia('(prefers-reduced-motion: reduce)');
let reduced = media.matches;
const N = matchMedia("(max-width: 600px)").matches ? 9000 : 15000; let P = [], bars = [], F = 0, W = 0, H = 0, mark = { x: 0, y: 0 }, t0 = 0, hold = -1e9, labels = [], shown = true, running = false;
// Die Felder kommen aus den Ressort-Dateien: data-felder am Hero, höchstens sechs.
let felder = [];
try { felder = JSON.parse(hero.dataset.felder || '[]').slice(0, 6); } catch {}

function build() {
  const r = hero.getBoundingClientRect(), b = ph.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1);
  W = r.width; H = r.height; F = parseFloat(getComputedStyle(ph).fontSize); mark = { x: b.left - r.left, y: b.bottom - r.top };
  cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
  bars = Array.from({ length: 9 }, (_, i) => ({ x: mark.x + i * .255 * F, w: .17 * F, h: (i === 8 ? 1 : .72) * F }));
  const total = bars.reduce((s, x) => s + x.h, 0); P = [];
  bars.forEach((x, i) => { const n = Math.round(N * x.h / total); for (let k = 0; k < n; k++) { const tx = x.x + Math.random() * x.w, ty = mark.y - Math.random() * x.h; P.push({ bar: i, tx, ty, sx: tx, sy: ty, x: tx, y: ty, vx: 0, vy: 0, s: Math.random() * 6.28, r: Math.random(), in: true }); } });
}
function play(first) {
  hold = first ? 1700 : 1200; labels = []; shown = false;
  if (!felder.length) { hold = -1e9; return; }
  // Obere und untere Reihe um das Logo. Das Logo bleibt die Mitte von allem.
  const oben = Math.ceil(felder.length / 2), reihen = [felder.slice(0, oben), felder.slice(oben)];
  const groups = felder.map(() => []);
  P.forEach((p, i) => groups[i % felder.length].push(p));
  let k = 0;
  reihen.forEach((reihe, r) => reihe.forEach((feld, i) => {
    const cw = (W - 24) / Math.max(reihe.length, 3), s = Math.min(cw / 3.0, H * .27 / 2.9);
    const cx = (W - cw * reihe.length) / 2 + cw * (i + .5), cy = H * (r === 0 ? .15 : .85) - 8, liste = groups[k++];
    const pts = punkte(feld.motiv, liste.length, 9 + k);
    liste.forEach((p, j) => { p.sx = cx + pts[j][0] * s; p.sy = cy + pts[j][1] * s; p.in = false; if (first) { p.x = cx + (Math.random() - .5) * cw; p.y = cy + (Math.random() - .5) * cw; p.vx = p.vy = 0; } });
    labels.push([feld.name, cx, cy + 1.3 * s + 14]);
  }));
  hero.classList.add("pre"); t0 = performance.now();
  if (!running) { running = true; requestAnimationFrame(frame); }
}
function draw(e) {
  ctx.clearRect(0, 0, W, H); const r = Math.max(.7, F / 105), oa = Math.max(0, 1 - (e - hold - 500) / 700);
  if (oa > 0) { ctx.globalAlpha = oa; ctx.lineWidth = 1; bars.forEach((b, i) => { ctx.strokeStyle = i === 8 ? "#8A3A12" : "#34494D"; ctx.strokeRect(b.x + .5, mark.y - b.h + .5, b.w - 1, b.h - 1); }); ctx.globalAlpha = 1; }
  ctx.fillStyle = "#EAF0ED"; for (const p of P) if (p.bar < 8) ctx.fillRect(p.x, p.y, r, r);
  ctx.fillStyle = "#FF5A0A"; for (const p of P) if (p.bar === 8) ctx.fillRect(p.x, p.y, r, r);
  const a = Math.min(1, e / 500) * Math.max(0, 1 - (e - hold) / 250);
  if (labels.length && a > 0) { ctx.globalAlpha = a; ctx.fillStyle = "#8EA3A2"; ctx.font = '500 10px "IBM Plex Mono", monospace'; ctx.textAlign = "center"; labels.forEach(l => ctx.fillText(l[0].toUpperCase(), l[1], l[2])); ctx.globalAlpha = 1; }
}
function frame() {
  if (reduced || !hero.classList.contains('canvas-ready') || document.hidden) { running = false; return; }
  const now = performance.now(), e = now - t0, t = now / 1000, mx = mark.x + 1.1 * F, my = mark.y - .5 * F;
  for (const p of P) {
    if (!p.in && e > hold + p.bar * 90 + p.r * 220) { p.in = true; const dx = p.x - mx, dy = p.y - my, l = Math.hypot(dx, dy) || 1; p.vx += -dy / l * F * .09; p.vy += dx / l * F * .09; }
    const j = (p.in ? (p.bar === 8 ? .02 : .006) : .005) * F, gx = p.in ? p.tx : p.sx, gy = p.in ? p.ty : p.sy;
    p.vx = (p.vx + (gx + Math.sin(t * 2.3 + p.s) * j - p.x) * .06) * .81; p.vy = (p.vy + (gy + Math.cos(t * 1.9 + p.s) * j - p.y) * .06) * .81; p.x += p.vx; p.y += p.vy;
  }
  draw(e);
  if (!shown && e > hold + 1300) { shown = true; hero.classList.remove("pre"); }
  if (e < hold + 2200 && !document.hidden) requestAnimationFrame(frame); else { running = false; hero.classList.remove("pre"); }
}
function rest() { build(); labels = []; hold = -1e9; hero.classList.remove("pre"); draw(1e9); }


const restore = () => { running = false; hero.classList.remove('canvas-ready', 'pre'); };
const start = () => {
  if (reduced || document.hidden) { restore(); return; }
  try {
    build();
    if (!W || !H) return;
    hero.classList.add('canvas-ready');
    lastWidth = W; lastHeight = H;
    let seen = false;
    try { seen = sessionStorage.getItem('s9-auftritt') === '1'; } catch {}
    if (seen) rest(); else {
      play(true);
      try { sessionStorage.setItem('s9-auftritt', '1'); } catch {}
    }
  } catch { restore(); }
};
button.addEventListener('click', () => {
  if (reduced) return;
  try { hero.classList.add('canvas-ready'); build(); play(false); } catch { restore(); }
});
let lastWidth = 0, lastHeight = 0;
new ResizeObserver(() => {
  if (!hero.classList.contains('canvas-ready')) return;
  const { width, height } = hero.getBoundingClientRect();
  if (Math.abs(width - lastWidth) > 2 || Math.abs(height - lastHeight) > 2) {
    lastWidth = width; lastHeight = height;
    try { rest(); } catch { restore(); }
  }
}).observe(hero);
media.addEventListener('change', () => { reduced = media.matches; if (reduced) restore(); else start(); });
document.addEventListener('visibilitychange', () => { if (document.hidden) restore(); else start(); });
void document.fonts.ready.then(start).catch(restore);
}

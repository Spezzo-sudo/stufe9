// Canvas-Auftritt aus public/prototypes/01-prototyp-gesamt.html.
// Die Silhouetten und die Federbewegung stammen unverändert aus der Referenz.
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
const N = matchMedia("(max-width: 600px)").matches ? 6000 : 15000; let P = [], bars = [], F = 0, W = 0, H = 0, mark = { x: 0, y: 0 }, t0 = 0, hold = -1e9, labels = [], shown = true, running = false;
const hexPath = (c, x, y, r) => { c.beginPath(); for (let i = 0; i < 6; i++) c.lineTo(x + r * Math.cos(i * Math.PI / 3), y + r * Math.sin(i * Math.PI / 3)); c.closePath(); c.fill(); };
const SHAPES = [
  ["Fusion", (c, s) => { c.lineWidth = .3 * s; c.beginPath(); c.ellipse(0, 0, 1.05 * s, .5 * s, 0, 0, 7); c.stroke(); }],
  ["Teleskope", (c, s) => { const r = .21 * s; for (let q = -2; q <= 2; q++) for (let k = -2; k <= 2; k++) { if (Math.abs(q + k) > 2 || (!q && !k)) continue; hexPath(c, 1.5 * r * q, Math.sqrt(3) * r * (k + q / 2), r * .9); } }],
  ["Biotech", (c, s) => { c.lineWidth = .1 * s; for (const sg of [1, -1]) { c.beginPath(); for (let x = -1.25; x <= 1.25; x += .02) c.lineTo(x * s, sg * .48 * s * Math.sin(x * 3.6)); c.stroke(); } c.lineWidth = .05 * s; for (let x = -1.2; x <= 1.21; x += .16) { const y = .48 * s * Math.sin(x * 3.6); c.beginPath(); c.moveTo(x * s, -y); c.lineTo(x * s, y); c.stroke(); } }],
  ["Teilchenphysik", (c, s) => { c.lineWidth = .045 * s; c.beginPath(); c.arc(0, 0, .95 * s, 0, 7); c.stroke(); for (let i = 0; i < 22; i++) { const a = i * 2.399, l = (.35 + ((i * 37) % 10) / 10 * .55) * s, b = ((i * 53) % 7 - 3) * .12; c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(Math.cos(a + b) * l * .6, Math.sin(a + b) * l * .6, Math.cos(a) * l, Math.sin(a) * l); c.stroke(); } c.beginPath(); c.arc(0, 0, .09 * s, 0, 7); c.fill(); }],
  ["Raumfahrt", (c, s) => { c.rotate(Math.PI / 2); c.beginPath(); c.moveTo(0, -1.2 * s); c.bezierCurveTo(.36 * s, -.75 * s, .3 * s, .1 * s, .24 * s, .55 * s); c.lineTo(-.24 * s, .55 * s); c.bezierCurveTo(-.3 * s, .1 * s, -.36 * s, -.75 * s, 0, -1.2 * s); c.fill();
    for (const g of [1, -1]) { c.beginPath(); c.moveTo(g * .24 * s, .1 * s); c.lineTo(g * .58 * s, .7 * s); c.lineTo(g * .24 * s, .55 * s); c.fill(); }
    c.globalCompositeOperation = "destination-out"; c.beginPath(); c.arc(0, -.45 * s, .13 * s, 0, 7); c.fill(); c.globalCompositeOperation = "source-over";
    c.globalAlpha = .5; c.beginPath(); c.moveTo(-.16 * s, .62 * s); c.lineTo(0, 1.2 * s); c.lineTo(.16 * s, .62 * s); c.fill(); c.globalAlpha = 1; }],
  ["Robotik", (c, s) => { const rr = (x, y, w, h, r) => { c.beginPath(); c.roundRect(x, y, w, h, r); c.fill(); };
    rr(-.6 * s, -.75 * s, 1.2 * s, 1.1 * s, .26 * s); rr(-.76 * s, -.38 * s, .11 * s, .42 * s, .04 * s); rr(.65 * s, -.38 * s, .11 * s, .42 * s, .04 * s);
    rr(-.035 * s, -1.0 * s, .07 * s, .26 * s, 0); c.beginPath(); c.arc(0, -1.04 * s, .09 * s, 0, 7); c.fill();
    rr(-.2 * s, .38 * s, .4 * s, .26 * s, 0); rr(-.95 * s, .66 * s, 1.9 * s, .3 * s, .14 * s);
    c.globalCompositeOperation = "destination-out"; rr(-.44 * s, -.46 * s, .88 * s, .38 * s, .16 * s); c.globalCompositeOperation = "source-over";
    c.beginPath(); c.arc(-.2 * s, -.27 * s, .085 * s, 0, 7); c.arc(.2 * s, -.27 * s, .085 * s, 0, 7); c.fill(); }],
];
// Zeichnet ein Motiv als Fläche und gibt seine Punkte zurück, von links nach rechts sortiert.
function sample(k, cx, cy, s) {
  const w = Math.ceil(2.9 * s), h = Math.ceil(2.7 * s), o = document.createElement("canvas"); o.width = w; o.height = h; const c = o.getContext("2d");
  c.fillStyle = c.strokeStyle = "#fff"; c.lineCap = "round"; c.translate(w / 2, h / 2); SHAPES[k][1](c, s);
  const px = c.getImageData(0, 0, w, h).data, pts = [];
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const al = px[(y * w + x) * 4 + 3]; if (al > 40 && Math.random() * 255 < al) pts.push([cx - w / 2 + x, cy - h / 2 + y]); }
  return pts.sort((a, b) => a[0] - b[0]);
}
function give(list, pts) { list.forEach((p, j) => { const q = pts[Math.min(pts.length - 1, Math.floor((j + Math.random() * 20) / (list.length + 20) * pts.length))]; p.sx = q[0] + Math.random(); p.sy = q[1] + Math.random(); }); }


function build() {
  const r = hero.getBoundingClientRect(), b = ph.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1);
  W = r.width; H = r.height; F = parseFloat(getComputedStyle(ph).fontSize); mark = { x: b.left - r.left, y: b.bottom - r.top };
  cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
  bars = Array.from({ length: 9 }, (_, i) => ({ x: mark.x + i * .255 * F, w: .17 * F, h: (i === 8 ? 1 : .72) * F }));
  const total = bars.reduce((s, x) => s + x.h, 0); P = [];
  bars.forEach((x, i) => { const n = Math.round(N * x.h / total); for (let k = 0; k < n; k++) { const tx = x.x + Math.random() * x.w, ty = mark.y - Math.random() * x.h; P.push({ bar: i, tx, ty, sx: tx, sy: ty, x: tx, y: ty, vx: 0, vy: 0, s: Math.random() * 6.28, r: Math.random(), in: true }); } });
}
function play(first) {
  hold = first ? 1400 : 1000; labels = []; shown = false;
  const cw = (W - 24) / 3, s = Math.min(cw / 3.0, H * .27 / 2.9), groups = SHAPES.map(() => []);
  P.forEach((p, i) => groups[i % 6].push(p));
  SHAPES.forEach((sh, k) => { const cx = 12 + cw * (k % 3 + .5), cy = H * (k < 3 ? .16 : .84) - 8; give(groups[k], sample(k, cx, cy, s)); labels.push([sh[0], cx, cy + 1.35 * s + 14]);
    groups[k].forEach(p => { p.in = false; if (first) { p.x = cx + (Math.random() - .5) * cw; p.y = cy + (Math.random() - .5) * cw; p.vx = p.vy = 0; } }); });
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
    const j = (p.in ? (p.bar === 8 ? .02 : .006) : .01) * F, gx = p.in ? p.tx : p.sx, gy = p.in ? p.ty : p.sy;
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

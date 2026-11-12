/** Eigenständige, schematische Titelillustration. Deterministische Punkte, keine Messdaten. */
type Punkt = { x: number; y: number; r: number; o: number };
export function titelwelt() {
  const gruppen: Record<string, Punkt[]> = { welt: [], fusion: [], robotik: [], quanten: [], antrieb: [] };
  let aktiv = gruppen.welt;
  const punkt = (x: number, y: number, o = .7, r = .9) => aktiv.push({ x: +x.toFixed(2), y: +y.toFixed(2), r, o });
  const linie = (x1: number, y1: number, x2: number, y2: number, o = .7, step = 3) => {
    const n = Math.ceil(Math.hypot(x2 - x1, y2 - y1) / step);
    for (let i = 0; i <= n; i++) punkt(x1 + (x2 - x1) * i / n, y1 + (y2 - y1) * i / n, o);
  };
  const ellipse = (x: number, y: number, rx: number, ry: number, rot = 0, o = .7) => {
    const n = Math.ceil(Math.max(rx, ry) * 2.8);
    for (let i = 0; i < n; i++) {
      const a = i / n * Math.PI * 2, xx = rx * Math.cos(a), yy = ry * Math.sin(a);
      punkt(x + xx * Math.cos(rot) - yy * Math.sin(rot), y + xx * Math.sin(rot) + yy * Math.cos(rot), o);
    }
  };
  // Ein gemeinsamer Globus hält die Komposition zusammen.
  ellipse(300, 255, 211, 211, 0, .3);
  for (const r of [70, 140, 200]) ellipse(300, 255, r, 211, -.25, .12);
  for (const y of [-140, -70, 0, 70, 140]) ellipse(300, 255 + y, Math.sqrt(211 ** 2 - y ** 2), 28, 0, .12);
  // Torus: die Spulen und der innere Ring erinnern an den vorhandenen Tokamak.
  aktiv = gruppen.fusion;
  for (let k = 0; k < 20; k++) {
    const a = k / 20 * Math.PI * 2;
    ellipse(210 + Math.cos(a) * 75, 162 + Math.sin(a) * 41, 14, 28, -a * .3, .85);
  }
  ellipse(210, 162, 54, 26, 0, .8);
  ellipse(210, 162, 51, 23, 0, .5);
  // Gelenkarm statt eines Comic-Gesichts.
  aktiv = gruppen.robotik;
  const arm = [[388, 240], [372, 178], [424, 123], [462, 148]];
  for (let k = 1; k < arm.length; k++) {
    const [x, y] = arm[k - 1], [xx, yy] = arm[k], a = Math.atan2(yy - y, xx - x);
    for (const d of [-8, -4, 4, 8]) linie(x - Math.sin(a) * d, y + Math.cos(a) * d, xx - Math.sin(a) * d, yy + Math.cos(a) * d, .8);
  }
  for (const [x, y] of arm.slice(0, 3)) { ellipse(x, y, 13, 13, 0, .9); ellipse(x, y, 7, 7, 0, .7); }
  for (let y = 245; y < 260; y += 3) linie(360, y, 414, y, .8);
  linie(462, 148, 477, 130); linie(477, 130, 490, 140);
  linie(462, 148, 462, 168); linie(462, 168, 478, 173);
  // Qubit-Gitter mit Kontaktleitungen als schematische Chip-Ansicht.
  aktiv = gruppen.quanten;
  const iso = (x: number, y: number) => [185 + x * .82 - y * .65, 343 + x * .3 + y * .53];
  for (const s of [78, 83, 88]) {
    const e = [[-s,-s],[s,-s],[s,s],[-s,s],[-s,-s]].map(([x,y]) => iso(x,y));
    for (let i = 1; i < e.length; i++) linie(e[i-1][0], e[i-1][1], e[i][0], e[i][1], .8);
  }
  for (let x = -48; x <= 48; x += 24) for (let y = -48; y <= 48; y += 24) {
    const [xx, yy] = iso(x,y); ellipse(xx, yy, 4, 2.8, .1, .9);
    if (x < 48) { const [nx,ny] = iso(x+24,y); linie(xx,yy,nx,ny,.4); }
    if (y < 48) { const [nx,ny] = iso(x,y+24); linie(xx,yy,nx,ny,.4); }
  }
  for (let k = -60; k <= 60; k += 15) for (const sign of [-1,1]) {
    const [x,y] = iso(k, 88*sign), [xx,yy] = iso(k, 110*sign); linie(x,y,xx,yy,.65);
  }
  // Getriebe mit Zähnen, Welle und innerem Lager.
  aktiv = gruppen.antrieb;
  for (let layer = 0; layer < 4; layer++) for (let i = 0; i < 640; i++) {
    const a = i / 640 * Math.PI * 2, tooth = Math.cos(a * 18) > 0 ? 9 : 0, r = 65 + tooth;
    punkt(402 + Math.cos(a) * r, 356 + Math.sin(a) * r * .72 + layer * 3, .85);
  }
  for (const r of [23, 28, 40, 44]) ellipse(402, 356, r, r * .72, 0, .8);
  for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2; ellipse(402 + Math.cos(a) * 35, 356 + Math.sin(a) * 25, 3, 2, 0, .75); }
  return gruppen;
}

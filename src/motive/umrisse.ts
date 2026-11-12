/** Statische Punktwolken derselben Silhouetten wie im Canvas-Prototyp. */
export function motivPunkte(motiv: string = 'neutral'): { x: number; y: number; opacity: number }[] {
  const points: { x: number; y: number; opacity: number }[] = [];
  const add = (x: number, y: number, opacity = .8) => points.push({ x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100, opacity });
  if (motiv === 'fusion') {
    for (let row = 0; row < 7; row++) for (let i = 0; i < 120; i++) {
      const a = i / 120 * Math.PI * 2, r = 55 + row * 2.3;
      add(140 + Math.cos(a) * r, 85 + Math.sin(a) * r * .48, .3 + row * .07);
    }
  } else if (motiv === 'robotik') {
    // Kopf, Augen, Antenne und Schultern wie in SHAPES[5] der Referenz.
    for (let y = 0; y < 125; y += 4) for (let x = -65; x <= 65; x += 4) {
      const head = Math.abs(x) < 39 && y > 22 && y < 88;
      const eyes = y > 39 && y < 59 && Math.abs(x) < 29;
      const shoulders = y > 106 && y < 120;
      const neck = y >= 88 && y < 106 && Math.abs(x) < 13;
      const antenna = y <= 22 && Math.abs(x) < 4;
      if ((head && !eyes) || shoulders || neck || antenna) add(140 + x, 20 + y, .4 + ((x * x + y) % 7) * .07);
      if (eyes && (Math.abs(x + 14) < 5 || Math.abs(x - 14) < 5)) add(140 + x, 20 + y);
    }
  } else {
    for (let y = 40; y < 140; y += 5) for (let x = 75; x < 205; x += 5) add(x, y, .25 + ((x * 7 + y * 3) % 11) / 20);
  }
  return points;
}

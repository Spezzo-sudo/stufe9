# Vorschau am Handy

Stand: 12.11.2026. Die Vorschau läuft als Cloudflare Worker **stufe9**:
https://stufe9.marco-speth.workers.dev

Jeder Push auf `ccr-7b8b05b1-pterr1` startet das Deployment.

## Nach Schritt 1 einmalig ändern

Cloudflare → **Workers & Pages** → **stufe9** → **Settings** → **Builds** → **Build configuration** → **Edit**:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy` (beibehalten)
- Root directory: Repo-Wurzel (leer oder `/`)
- Branch: `ccr-7b8b05b1-pterr1` (beibehalten)

Speichern und den neuesten Build erneut starten. Bei Workers ist kein separates Build-Ausgabeverzeichnis nötig: `wrangler.jsonc` verweist bereits auf `./dist`. Cloudflare installiert die Abhängigkeiten anhand von `package.json` und `package-lock.json`. Node.js muss mindestens Version 22.12 haben.

Bis der Build-Befehl gesetzt ist, kann das Deployment scheitern, weil `dist` erst durch `npm run build` entsteht. Die letzte erfolgreiche Vorschau bleibt dann bestehen.

## Was prüfen?

- `/`: Astro-Grundlage mit Logo als Home-Link, Farben und lokalen Schriften.
- `/prototypes/`: Übersicht aller unveränderten Prototypen.
- `/prototypes/01-prototyp-gesamt.html`: verbindliche Design-Referenz.

Die neue Astro-Vorschau hat `noindex, nofollow`. Die Prototypen sind unverändert archiviert; deren ursprüngliche Font-Einbindung und Canvas-/WebGL-Logik bleiben erhalten.

## Alternative: Cloudflare Pages

Bei Pages: Framework **Astro**, Build command `npm run build`, Build output directory `dist`.

## Später: eigener VPS

Docker-Container hinter Traefik, Staging-Subdomain mit Basic Auth und `noindex`. Dieser langfristige Plan bleibt bestehen.

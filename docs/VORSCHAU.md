# Vorschau am Handy (Cloudflare Pages)

Ziel: eine feste Adresse, die bei jedem Push den aktuellen Stand zeigt, unabhängig davon, welches Modell gerade arbeitet.

## Einmalig einrichten

1. Auf dash.cloudflare.com ein kostenloses Konto anlegen oder anmelden.
2. **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. GitHub verbinden und nur das Repo `stufe9` freigeben.
4. Einstellungen:
   - Production branch: `ccr-7b8b05b1-pterr1` (oder `main`, sobald es den gibt)
   - Framework preset: **None**
   - Build command: leer lassen
   - Build output directory: `prototypes`
5. **Save and Deploy**. Danach zeigt Cloudflare die Adresse (`<name>.pages.dev`).

Die Adresse ist öffentlich erreichbar, aber nicht verlinkt und per `noindex` von Suchmaschinen ausgeschlossen. Passwortschutz: in Cloudflare unter **Zero Trust → Access** eine Regel für die Adresse anlegen.

## Sobald das Astro-Projekt steht

In den Pages-Einstellungen ändern:

- Framework preset: **Astro**
- Build command: `npm run build`
- Build output directory: `dist`

Die Prototypen sollten dann nach `public/prototypes/` wandern, damit sie unter `/prototypes/` weiter erreichbar sind.

## Später: eigener VPS

Docker-Container hinter Traefik, Staging-Subdomain mit Basic Auth und `noindex`. Der Wechsel ist klein, weil in beiden Fällen dieselben statischen Dateien ausgeliefert werden.

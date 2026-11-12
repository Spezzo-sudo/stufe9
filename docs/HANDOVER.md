# Stufe 9 – Übergabe

Stand: 12.11.2026. Dieses Dokument reicht aus, um ohne den bisherigen Chat weiterzuarbeiten, egal mit welchem Modell oder Anbieter.

## 1. Was Stufe 9 ist

Deutschsprachiges Frontier-Tech-Magazin (DACH). Kernfrage zu jeder Zukunftstechnik: serienreif oder nur versprochen? Jedes **Projekt** einer Firma bekommt einen Reality Check auf der TRL-Skala 1–9: versprochen, geliefert, Stand heute, belegte Stufe, behauptete Stufe und die Lücke dazwischen.

Der ursprüngliche Plan steht in `docs/BAUPLAN-ORIGINAL.md`. **Wo dieses Dokument dem Bauplan widerspricht, gilt dieses Dokument.**

## 2. Stand der Arbeit

Fertig ist das **Konzept und das Design als klickbare HTML-Prototypen** in `public/prototypes/`. **Schritt 1 ist umgesetzt:** statisches Astro-Projekt, striktes TypeScript, Tokens, lokale Schriften, `BaseLayout` und Logo als Home-Link. Die Startseite ist vorerst eine klar bezeichnete Prüfseite für diese Grundlage.

| Datei | Inhalt | Status |
| --- | --- | --- |
| `01-prototyp-gesamt.html` | Auftritt, Startseite, Karten, Projektseite mit Plasma, Logo als Home-Knopf | **Referenz für alles** |
| `02-auftritt-logo.html` | Nur der Auftritt: sechs Felder fliessen ins Logo | abgenommen |
| `03-engpass-fusion.html` | Plasma-Engpass mit Stufen-Regler 1–9 | abgenommen («geil») |
| `04-logo-einzelmotive.html` | Logo wird zu einem einzelnen Motiv | **verworfen**, nur als Motiv-Sammlung nützlich |
| `05-startseite-frueh.html` | Frühe Startseite mit Live-Skala im Hero | überholt, Farb- und Kartenidee gilt weiter |

Die Prototypen sind einzelne HTML-Dateien ohne `<html>`/`<body>`-Gerüst und ohne Build-Schritt. Zum Ansehen genügt es, sie im Browser zu öffnen. Schriften kommen von Google Fonts, sonst gibt es keine Abhängigkeiten.

## 3. Entscheidungen (verbindlich)

### Inhalt und Datenmodell

- **Bewertet wird das Projekt, nicht die Firma.** Vorbild ist die Pharma-Pipeline. Neue Collection `projekte`; die Stufe wandert von der Firma aufs Projekt. Firmenseite = Liste ihrer Projekte. Technologieseite = Projekte verschiedener Firmen im Vergleich.
- **«Behauptete Stufe» ist eine Übersetzung** aus den Terminversprechen der Firma. Die Übersetzungsregel muss auf der Methodik-Seite stehen.
- **Engpass statt Fortschrittsmarsch:** Jedes Projekt nennt das Problem, an dem die Technik wirklich hängt, mit Messwert. Feld `engpass {frage, kennzahl, wert, ziel, einheit, quelle}`.
- **Bauart als Feld**, wo sie das Bild ändert (Fusion: `tokamak` | `stellarator` | `linear`).
- **Eine Quelle der Wahrheit für die Stufe:** aus `meilensteine` ableiten oder Build bei Abweichung abbrechen. Feldnamen ohne Umlaute (`trl_aenderung`, `angekuendigt_fuer`).
- **Stufenänderungen macht nur ein Mensch**, nie die Pipeline.
- **Keine Broker-Affiliates** neben Reifegrad-Urteilen.
- **Start mit weniger Ressorts.** Engpass-Motive nur für Fusion, Robotik, Unter der Haube, Quanten. KI & Compute, Kernspaltung, Forschung, Macht & Kontrolle bekommen Karten und Artikel ohne eigene Animation.
- Beispieldaten sind immer sichtbar als erfunden markiert. Schweizer Rechtschreibung (ss statt ß).

### Design

- **Bildsprache: Punktwolken / Teilchen.** Keine Strichfiguren, keine Icons. Physikalische Vorgänge werden als Teilchen gezeigt (Vorbild in der Wirkung: das PSI-Logo; nicht kopieren).
- **Drei Farben:** Tinte `#070D0F` / `#0D181B` (dunkle Bühnen), Blatt `#EDF1EF` / `#F9FBFA` (Lesetext, Karten), Signal `#FF5A0A`. Orange bedeutet immer «das Ziel»: schraffiert = behauptet, voll = erreicht. Auf hellem Grund für kleine Schrift `#C24100`.
- **Schriften:** Barlow Condensed 600/700 (Titel, Versalien), IBM Plex Sans (Text), IBM Plex Mono (Zahlen, Labels). Im echten Projekt selbst hosten.
- **Dunkle Bühne** für Hero und Projektkopf, **helles Blatt** für Lesetext. Haarlinien, keine Rundungen, keine Schatten.
- **Verboten** bleibt der KI-Einheitslook aus dem Bauplan. Zusätzlich verworfen: Text-Scramble, Scanlinien, Three.js-Hero, Papier-/Strichzeichnungs-Look.

### Logo

- **Das Logo** = neun senkrechte Segmente (acht gleich hoch, das neunte orange und eine Stufe höher) + Wortmarke «STUFE 9». Masse relativ zur Schriftgrösse: Segmentbreite 0.17em, Abstand 0.085em, Höhe 0.72em, neuntes 1em.
- **Ruhige Fassung** (feste Balken) im Seitenkopf, für Druck und Kleines. Der Seitenkopf-Logo ist der Home-Link.
- **Favicon:** zwei Segmente + orange Stufe, statisch. Nicht animieren.
- **Grosser Auftritt** (nur Startseite, nur einmal pro Besuch): Wortmarke und leere Segment-Umrisse stehen in der Mitte, die Forschungsfelder stehen als Punktwolken darum herum, fliessen hinein und füllen die Skala von 1 bis 9. Dauer rund 3 s. Antippen des grossen Logos spielt ihn nochmal.
- Unterseiten: kein Auftritt, nur kurzer Balken-Durchlauf im Seitenkopf beim Seitenwechsel.

### Offene Design-Frage (vom Auftraggeber zuletzt angestossen)

Die Startseite besteht nach dem Auftritt nur aus dem grossen Logo. Wunsch: Die Feld-Motive sollen **als Navigation dienen** (Klick auf Helix → Ressort Biotech mit seinen Projekten). Vorschlag, noch nicht gebaut:

- Nach dem Auftritt bleiben die Motive als **Ressort-Raster** direkt unter dem Hero stehen (statische Punktwolke + Name + Anzahl Projekte), jedes verlinkt auf `/[ressort]`.
- **Erweiterbar:** Der Auftritt zeigt höchstens sechs Felder (Auswahl wechselt), das Raster zeigt alle. Die neun Segmente sind Stufen, keine Felder – die Zahl der Ressorts ist also frei.
- Ein Ressort ohne eigenes Motiv bekommt im Raster ein neutrales Punktfeld.

## 4. Zielarchitektur (noch zu bauen)

Astro, statisch, TypeScript, Content Collections mit Zod. Kein UI-Framework. Deployment als Docker-Container hinter Traefik auf dem VPS, Staging unter eigener Subdomain mit Basic Auth und `noindex`.

```
src/
  content/
    ressorts/        JSON: slug, name, intro, motiv?   (motiv = Name eines Moduls in src/motive)
    projekte/        JSON: slug, firma, ressorts[], trl_ist, trl_behauptet, versprochen, geliefert,
                           stand_heute, engpass{}, bauart?, risiken[], quellen[]
    firmen/          JSON: slug, name, land, ticker?
    meilensteine/    JSON: id, projekt, titel, angekuendigt_fuer, erreicht_am?, status, quelle
    artikel/         MDX
    updates/         Markdown, max. 80 Wörter
  motive/            ein Modul pro Ressort-Motiv
    renderer.ts      gemeinsamer Teilchen-Renderer (WebGL-Punkte, Fallback Standbild)
    umrisse.ts       die Feld-Silhouetten für Auftritt und Ressort-Raster
    fusion.ts        Plasma (aus public/prototypes/03 übernehmen)
  components/        TrlScale, RealityCheckCard, PromiseGap, RiskPanel, MilestoneTimeline,
                     Logo, LogoAuftritt, EngpassStage, UpdateTicker, SourceList …
  layouts/           BaseLayout, ProjektLayout, ArticleLayout
  pages/             /, /[ressort], /projekt/[slug], /firma/[slug], /artikel/[slug], /updates, /methodik …
  styles/            tokens.css, global.css
docs/                HANDOVER.md, DESIGN-SYSTEM.md, CONTENT-GUIDE.md
```

**Erweiterungsregeln:**

- Neues Projekt = eine JSON-Datei in `content/projekte`. Kein Code.
- Neues Ressort = eine JSON-Datei in `content/ressorts`. Optional ein Motiv-Modul und ein Umriss; ohne beides funktioniert die Seite trotzdem.
- Neues Motiv = eine Datei in `src/motive`, die nur ihre Szene beschreibt; Renderer, Farben und Skala kommen vom System.

## 5. Nächste Schritte in Reihenfolge

0. Vorschau: Das Repo ist für Cloudflare Pages vorbereitet (`public/prototypes/index.html`, Anleitung in `docs/VORSCHAU.md`). Stand 12.11.2026: Eingerichtet als Cloudflare Worker `stufe9` mit statischen Dateien (`wrangler.jsonc`), Deploy bei jedem Push auf `ccr-7b8b05b1-pterr1`. Adresse laut Build-Log: https://stufe9.marco-speth.workers.dev `wrangler.jsonc` liefert jetzt `dist` aus. Der Auftraggeber muss in Cloudflare den Build-Befehl auf `npm run build` setzen und den Build erneut starten; Deploy-Befehl bleibt `npx wrangler deploy`. Anleitung in `docs/VORSCHAU.md`.

1. **Umgesetzt am 12.11.2026:** Astro-Projekt, Tokens und lokale Schriften, `BaseLayout` mit Seitenkopf-Logo. **Hier stoppen und auf Rückmeldung aus der Handy-Vorschau warten.**
2. Content-Schemas (Zod) und je zwei Beispiel-Einträge pro Collection, klar als Beispiel markiert.
3. Komponenten aus `01-prototyp-gesamt.html` herauslösen: Logo, LogoAuftritt, TrlScale mit Lücke, Karte, Ticker, Projektkopf, Meilensteine, Risiken, Quellen.
4. Startseite inkl. Ressort-Raster als Navigation (siehe offene Design-Frage), Ressort-Seite als Pipeline-Tabelle, Projektseite.
5. Fusion-Motiv übernehmen, Bauart Stellarator ergänzen.
6. Weitere Motive: Motor (Hitze, Ölkühlung als Teilchenstrom), Quanten (Fehlerrauschen), Robotik (Punktwolken-Figur mit Gang; unsicherster Teil).
7. Dockerfile, Staging auf dem VPS, danach restliche Seitentypen, Impressum, Datenschutz, Methodik.

## 6. Bekannte Lücken und Ungeprüftes

- Die Animationen wurden nur als Standbilder in einem Headless-Browser geprüft, nie auf einem echten Handy gemessen. 30'000 WebGL-Punkte (Plasma) und 15'000 Canvas-Punkte (Auftritt) brauchen einen Leistungstest und ein Standbild als Fallback.
- Einmal blieb der Auftritt auf dem Handy des Auftraggebers bei den Motiven stehen. Nicht reproduziert; die Zeitsteuerung wurde danach umgebaut, eine Bestätigung fehlt.
- Der Fusionsring ist ein vereinfachtes Schema (Tokamak). Alle Motive brauchen den sichtbaren Hinweis «Schema».
- Faktenlage zu echten Firmen ist **nicht recherchiert**. Alles im Prototyp ist erfunden. Aussagen über reale Firmen brauchen eine Quelle, bevor sie auf eine Karte kommen.
- Markenrecht, Domains, Impressum, Datenschutz: offen (siehe Checkliste im Bauplan).

## 7. Arbeitsregeln für jedes Modell

- Zuerst dieses Dokument und `public/prototypes/01-prototyp-gesamt.html` lesen.
- Design nicht neu erfinden. Farben, Schriften, Logo-Masse und Bildsprache aus Abschnitt 3 übernehmen.
- Jede Änderung an einer Entscheidung hier im Dokument nachtragen, mit Datum.
- Der Auftraggeber prüft am Handy. Nach jedem grösseren Schritt eine Vorschau liefern.
- Deutsch, Schweizer Rechtschreibung, einfache Sprache.

## 8. Umsetzung und Entscheidungen vom 12.11.2026

- Schritt 1: Astro baut statische Dateien nach `dist`; kein UI-Framework und kein Cloudflare-Adapter nötig. Striktes TypeScript ist aktiv. Abhängigkeiten sind exakt versioniert und durch `package-lock.json` festgehalten.
- Barlow Condensed 600/700, IBM Plex Sans 400/500 und IBM Plex Mono 400/500 werden als lokale Latin-WOFF-Dateien aus Fontsource ausgeliefert. Die Astro-Seite benötigt keine Google-Fonts-Anfragen.
- Farben und Schriftrollen stehen in `src/styles/tokens.css`. Logo-Masse sind ebenfalls Tokens und entsprechen exakt der Referenz. `Logo.astro` zeigt die ruhige Fassung mit neun Segmenten und verlinkt auf `/`. Statisches Favicon: zwei helle Segmente und eine höhere orange Stufe.
- `BaseLayout` enthält deutschen Sprachcode `de-CH`, Vorschau-`noindex`, Tastatur-Sprunglink und den mobilen Seitenkopf. Es gibt in Schritt 1 keine Animation. Die kurze Balken-Animation für Unterseiten folgt mit den Seiten in einem späteren Schritt.
- Die Prüfseite unter `/` dient ausschliesslich zur Abnahme der Grundlage. Sie ist nicht die fertige Startseite und entscheidet die offene Frage zum Ressort-Raster nicht vorweg.
- Content Collections mit Zod sind technisch eingerichtet: zunächst die leere Collection `ressorts` mit `slug`, `name`, `intro`, optional `motiv`. Vollständige Projekt-/Quellen-/Meilenstein-Schemas, Konsistenzprüfung der Stufe und je zwei sichtbare Beispiele pro Collection bleiben Schritt 2. Es sind noch keine Firmen, Stufen oder Kennzahlen veröffentlicht.
- Alle sechs HTML-Prototypen wurden unverändert nach `public/prototypes/` verschoben. Sie bleiben unter `/prototypes/` erreichbar. Ihre Canvas-/WebGL-Logik wird in späteren Schritten wiederverwendet; in Schritt 1 wurde sie nicht verändert.
- Cloudflare Worker bleibt die aktuelle Vorschau. `wrangler.jsonc` zeigt auf `./dist`. Manuelle Einstellung durch Auftraggeber: Build command `npm run build`, Deploy command weiter `npx wrangler deploy`. Der VPS-Plan aus Abschnitt 4 bleibt das spätere Ziel.
- Nächste Aktion nach dieser Übergabe: erst Rückmeldung des Auftraggebers zur Vorschau abwarten, dann die offenen Schritte in Abschnitt 5 fortsetzen.

### Prüfung von Schritt 1 (12.11.2026)

- `npm run check`: 0 Fehler, 0 Warnungen in Astro/TypeScript. `npm run build`: erfolgreich, statische Startseite in `dist`.
- Der Content-Loader meldet die absichtlich noch leere Ressort-Collection. Es wurden keine Beispieldaten vorgezogen.
- Gebautes HTML geprüft: neun Logo-Segmente, Home-Link, erreichbare lokale Linkziele, `noindex`, lokale WOFF2-Schriften, kein Client-JavaScript auf der Prüfseite. Alle sechs Prototyp-Dateien stimmen bytegenau mit dem bisherigen Stand überein.
- Visuelle Prüfung versucht, aber in dieser Laufzeit blockiert: Chromium bricht bei `socket() failed: Operation not permitted` ab. Auch der lokale Preview-Server ist nicht erreichbar. Eine visuelle Handy-Abnahme bleibt daher offen; keine gemessene Handy-Leistung behauptet.
- Live-Deployment kann erst nach der Cloudflare-Build-Einstellung durch den Auftraggeber bestätigt werden.

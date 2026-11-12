# Stufe 9 – Übergabe

Stand: 12.11.2026. Dieses Dokument reicht aus, um ohne den bisherigen Chat weiterzuarbeiten, egal mit welchem Modell oder Anbieter.

## 1. Was Stufe 9 ist

Deutschsprachiges Frontier-Tech-Magazin (DACH). Kernfrage zu jeder Zukunftstechnik: serienreif oder nur versprochen? Jedes **Projekt** einer Firma bekommt einen Reality Check auf der TRL-Skala 1–9: versprochen, geliefert, Stand heute, belegte Stufe, behauptete Stufe und die Lücke dazwischen.

Der ursprüngliche Plan steht in `docs/BAUPLAN-ORIGINAL.md`. **Wo dieses Dokument dem Bauplan widerspricht, gilt dieses Dokument.**

## 2. Stand der Arbeit

Fertig ist das **Konzept und das Design als klickbare HTML-Prototypen** in `public/prototypes/`. **Schritt 1 ist umgesetzt:** statisches Astro-Projekt, striktes TypeScript, Tokens, lokale Schriften, `BaseLayout` und Logo als Home-Link. **Schritte 3 und 4 sind ebenfalls umgesetzt:** Die Startseite ist jetzt der Magazin-Auftritt mit Ressort-Raster, Update-Leiste, Projektkarten und Artikeln. Ressort-, Projekt-, Firmen-, Artikel- und Update-Seiten sind miteinander verlinkt.

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

### Ressort-Navigation (am 12.11.2026 umgesetzt)

Ausgangslage im alten Prototyp: Nach dem Auftritt stand nur das grosse Logo. Wunsch: Die Feld-Motive sollen **als Navigation dienen** (Klick auf Helix → Ressort Biotech mit seinen Projekten). Umgesetzt:

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

0. Vorschau: Das Repo ist für Cloudflare Pages vorbereitet (`public/prototypes/index.html`, Anleitung in `docs/VORSCHAU.md`). Stand 12.11.2026: Eingerichtet als Cloudflare Worker `stufe9` mit statischen Dateien (`wrangler.jsonc`), Deploy bei jedem Push auf `ccr-7b8b05b1-pterr1`. Adresse laut Build-Log: https://stufe9.marco-speth.workers.dev `wrangler.jsonc` liefert jetzt `dist` aus. Build-Befehl `npm run build` und Deploy-Befehl `npx wrangler deploy` sind eingerichtet; der automatische Deploy ist erfolgreich bestätigt. Anleitung in `docs/VORSCHAU.md`.

1. **Umgesetzt am 12.11.2026:** Astro-Projekt, Tokens und lokale Schriften, `BaseLayout` mit Seitenkopf-Logo. Der damalige Zwischenhalt ist erfolgt; der Auftraggeber hat am 12.11.2026 die Fortsetzung beauftragt.
2. **Umgesetzt am 12.11.2026:** sechs Content-Schemas (Zod), Quellen-/Beziehungsprüfung und je zwei Beispiel-Einträge pro Collection. Sichtbar auf `/beispiele/`, klar als erfunden markiert.
3. **Umgesetzt am 12.11.2026:** Komponenten aus `01-prototyp-gesamt.html`: Logo, LogoAuftritt, TrlScale mit Lücke, Karte, Update-Leiste, Projektkopf, Meilensteine, Risiken, Quellen.
4. **Umgesetzt am 12.11.2026:** Startseite inkl. Ressort-Raster als Navigation, Ressort-Seite als responsive Pipeline-Tabelle und Projektseite. Ergänzt: Firmen-, Artikel- und Update-Seiten, damit Links echte Ziele haben.
5. **Teilweise umgesetzt:** Tokamak-WebGL aus dem Prototyp übernommen, statischer SVG-Fallback und Pause-Knopf ergänzt. Offene Arbeit: eigene Stellarator-Geometrie und physikalisch passende Bauart-Darstellung.
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

### Rückmeldung und Ergänzung vom 12.11.2026: Scroll-Hinweis

- Wunsch des Auftraggebers: Wo nach unten noch Inhalt folgt, soll ein dezenter Pfeil die Scroll-Möglichkeit zeigen. Die Design-Referenz bleibt `public/prototypes/01-prototyp-gesamt.html`; Tokens und Logo-Regeln aus Abschnitt 3 bleiben verbindlich.
- Umsetzung: `ScrollHint.astro` liegt im gemeinsamen `BaseLayout` und gilt damit für alle künftigen Astro-Seiten. Unten rechts erscheint ein ruhiger Abwärtspfeil in Tinte und gedämpftem Hell, mit Haarlinie, ohne Rundung, Schatten oder Pulsieren. Orange bleibt dem Ziel vorbehalten. Die sichtbare Pfeilspitze ist klein, die Tippfläche 44 × 44 CSS-Pixel gross.
- Der Pfeil erscheint nur bei weiterem Seiteninhalt (bis auf 2 Pixel Rundungstoleranz), verschwindet am Ende und reagiert auf Scrollen, Grössenänderungen und nachgeladene Inhalte. Antippen scrollt etwa drei Viertel der Fensterhöhe weiter. Bei reduzierter Bewegung erfolgt das sofort. Ohne JavaScript bleibt der Hinweis verborgen; der Seiteninhalt bleibt normal scrollbar.
- Die archivierten HTML-Prototypen bleiben unverändert. Der gemeinsame Hinweis erscheint in der Astro-Vorschau und später in den echten Seiten.
- Handy-Auftritt für den nächsten Umsetzungsschritt: die Höhe an der kleinen sichtbaren Browser-Fläche (`svh`) ausrichten, Seitenkopf berücksichtigen, Abstände und Motive bei wenig Höhe verkleinern. Keine starre Mindesthöhe erzwingen, die Inhalte abschneidet. Das wurde besprochen, ist im Auftritt noch nicht umgesetzt.
- Prüfung der Ergänzung: `npm run check` ohne Fehler/Warnungen und `npm run build` erfolgreich. Visuelle Handy-Prüfung weiterhin offen (Laufzeit-Sperre wie oben dokumentiert).

### Live-Prüfung vom 12.11.2026: Cloudflare noch auf altem Stand

- GitHub-Branch enthält die Astro-Grundlage und den Scroll-Hinweis (Commit `3b4c06b`). Der Push allein bestätigt kein erfolgreiches Cloudflare-Deployment.
- Direkter Abruf von `https://stufe9.marco-speth.workers.dev/` liefert weiterhin die frühere Prototyp-Übersicht, auch mit zusätzlichem Query-Parameter. `/prototypes/01-prototyp-gesamt.html` liefert HTTP 404. Die neue Astro-Vorschau ist damit noch nicht live.
- Der alte Gesamtprototyp setzt keinen Body-Margin zurück (auch im Live-Abruf bestätigt). Der Browser-Standardabstand erklärt den hellen Aussenrand. Das Astro-Layout setzt bereits `body { margin: 0; }`.
- Für Commit `3b4c06b` meldet GitHub keine Check-Runs und keine Commit-Status-Einträge. Daraus lässt sich kein konkreter Cloudflare-Fehler ableiten. Cloudflare-Build-Einstellung und Build-Log sind von hier nicht einsehbar.
- Nächster notwendiger Schritt: Auftraggeber prüft beim Worker `stufe9` den Build-Befehl `npm run build`, Deploy-Befehl `npx wrangler deploy` und Branch `ccr-7b8b05b1-pterr1`; danach neuesten Build erneut starten. Bei Fehlschlag das Build-Log prüfen. Ein erfolgreicher automatischer Deploy bleibt bis zur Live-Bestätigung offen.

### Schritt 2 vom 12.11.2026: Inhaltsgrundlage und erneuter Deployment-Versuch

- Auftraggeber hat die Fortsetzung freigegeben. Der aktuelle Cloudflare-Screenshot zeigt `npm run build` als Build-Befehl; die vorherige Warnung zur getrennten Git-Verbindung ist verschwunden. Ob Deployments wieder funktionieren, wird erst nach dem nächsten Push live geprüft. Bestehende GitHub-Cloudflare-Verbindung verwenden; kein zusätzlicher Deployment-Workflow, keine neuen Zugangsdaten und kein Wechsel des Hosting-Anbieters.
- Sechs Collections sind registriert: `ressorts`, `firmen`, `projekte`, `meilensteine` als JSON, `artikel` als MDX, `updates` als Markdown. Je zwei verknüpfte Beispiel-Einträge sind angelegt. MDX-Unterstützung ist aktiv.
- Zod-Schemas sind gemeinsam in `src/lib/content-schemas.ts` definiert. `scripts/validate-content.ts` nutzt dieselben Schemas für eine Prüfung vor jedem Check und Build. Unbekannte Felder, ungültige Daten, fehlende Quellen, falsche Quellen-IDs, fehlende Beziehungen, doppelte IDs und widersprüchliche Stufen werden abgelehnt.
- Für `versprochen`, `geliefert`, `stand_heute` wurde die bisherige Kurzform zu `{text, quellen}` präzisiert. Quellen-IDs verweisen auf `quellen` des jeweiligen Eintrags. `behauptung {begruendung, quelle}` dokumentiert die Übersetzung in die behauptete Stufe. Die spätere Methodik-Seite muss die allgemeine Regel noch erklären.
- Alle Inhalte haben ein ausdrückliches `beispiel`-Merkmal. Echte Quellen erfordern HTTPS-URL, Titel, ID und Datum; erfundene Beispielquellen haben bewusst keine Links. Echte und erfundene Inhalte dürfen nicht über Beziehungen vermischt werden. Die Beispielredaktion und ihre Freigaben sind ebenfalls klar als erfunden markiert.
- Die Ist-Stufe muss zum letzten erreichten Meilenstein mit `trl_aenderung` passen. Dieser benötigt eine protokollierte menschliche Freigabe. Das ist eine Datenprüfung, noch kein authentisierter Freigabekanal; die Pipeline darf diese Angaben später nicht selbst erzeugen. Behauptete Stufen werden nie automatisch zu Ist-Stufen.
- Termine werden zunächst taggenau gespeichert. Bei echten nur jahresgenauen Ankündigungen kein Datum erfinden; vor solchen Einträgen das Schema erweitern. Artikel und Updates benötigen Text. Updates sind auf 80 Wörter im Textkörper begrenzt.
- `/beispiele/` ist eine zusätzliche Prüfseite, keine fertige Ressort- oder Projektseite. Sie zeigt alle zwölf Einträge mit sichtbaren Beispiel-Hinweisen und Quellenkennzeichnung. Der gemeinsame Scroll-Pfeil ist dort ebenfalls aktiv. Die Startseite verlinkt darauf. Prototypen und Design-Referenz wurden nicht verändert.
- `docs/CONTENT-GUIDE.md` erklärt alle Collections anhand vorhandener vollständiger Dateien. Neue echte Inhalte erfordern weiterhin Recherche und redaktionelle Prüfung.
- Prüfung: 8 Tests erfolgreich; `npm run check` mit 0 Fehlern/Warnungen/Hinweisen; `npm run build` erfolgreich. Gebautes HTML enthält zwölf Beispiele und den Scroll-Hinweis. Visuelle Handy-Abnahme bleibt offen; die zuvor dokumentierte lokale Browser-Sperre besteht als Einschränkung.

### Automatisches Deployment bestätigt am 12.11.2026

- Push `d2baf711be960f5629137acb5da4c881ae6c3124` hat über die bestehende GitHub-Verbindung den Cloudflare-Check «Workers Builds: stufe9» ausgelöst. Ergebnis: `completed / success`.
- Cloudflare Build-ID: `01ce94aa-21d4-441b-8b3b-693334609dcd`. Version: `eb3b5e4e-a64d-4ba9-9497-bd2f5bccdff2`.
- Live-Abruf von `/beispiele/` an der Worker-Adresse liefert HTTP 200 mit «Inhalte zum Ausprobieren» und `data-scroll-hint`. Damit sind der automatische Build und die Veröffentlichung des neuen Astro-Stands belegt. Dies ersetzt den früher dokumentierten offenen Deployment-Status. Eine visuelle Handy-Abnahme bleibt davon getrennt.
- Für weitere Schritte reicht der Push auf `ccr-7b8b05b1-pterr1`; anschliessend Check-Ergebnis und Live-Inhalt prüfen. Ein zusätzlicher GitHub-Actions-Deploy ist nicht nötig. Nächster Implementierungsschritt ist Abschnitt 5, Punkt 3 (Prototyp-Komponenten), danach Punkt 4 (Magazin-Seiten und Ressort-Raster).

### Schritte 3 und 4 vom 12.11.2026: das Magazin statt der Prüfstartseite

- Der Auftraggeber hat ausdrücklich die Umsetzung der eigentlichen Website verlangt. Die Prüfstartseite wurde durch den Auftritt aus der Design-Referenz, ein Ressort-Raster, eine Update-Leiste, Reality-Check-Karten und Artikel-Links ersetzt. `/beispiele/` bleibt als zusätzliche Daten-Prüfseite erreichbar, ist aber kein Haupteinstieg mehr.
- Dynamische Routen: `/[ressort]/`, `/projekt/[slug]/`, `/firma/[slug]/`, `/artikel/[slug]/`; ausserdem `/updates/` und eine eigene 404-Seite. Alle Inhalte kommen aus den vorhandenen Collections. Aktuell entstehen zwölf Astro-Seiten einschliesslich der Prüf- und Fehlerseite.
- Das Ressort-Raster zeigt alle tatsächlich angelegten Ressorts, aktuell Fusion und Robotik. Jedes Motiv und der ganze Eintrag sind als Home → Ressort → Projekt verlinkt. Projektzahlen werden aus den Daten ermittelt. Fehlendes oder unbekanntes Motiv erhält ein neutrales Punktfeld. Die Pipeline-Tabelle stapelt sich auf kleinen Bildschirmen, ohne horizontales Scrollen zu erzwingen.
- Der Auftritt übernimmt alle sechs illustrativen Silhouetten und die Federbewegung aus dem Canvas-Prototyp. Die feste Auswahl ist noch nicht an Ressort-Dateien gekoppelt; sie ist eine Themen-Illustration und behauptet keine sechs veröffentlichten Ressorts. Variable Motivauswahl ist ein späterer Ausbau. Auftritt einmal pro Browser-Session, wiederholbar durch Antippen des grossen Logos, ruhige CSS-Fassung ohne JavaScript und bei reduzierter Bewegung.
- Die Hero-Höhe berücksichtigt die kleine sichtbare Fläche (`svh`) und die gemessene Kopfhöhe. Niedrige Querformate bekommen eine kompakte Fassung. Die Astro-Seiten haben keinen Browser-Standardrand. Der gemeinsame Scroll-Pfeil bleibt bei weiterem Inhalt verfügbar.
- Plasma: Original-WebGL-Shader des Tokamak-Prototyps wiederverwendet. Fallback ist eine serverseitige SVG-Punktwolke. Der Messwert im Kopf bleibt ein aus den Inhaltsdateien stammender Wert, kein animierter Stoppuhr-Beleg. Schema und Zeitvereinfachung sind sichtbar gekennzeichnet. Die Animation ist pausierbar, stoppt ausserhalb der Sichtfläche und bei verborgenem Tab und entfällt bei reduzierter Bewegung. Kontextverlust zeigt den Fallback. Andere Bauarten bekommen noch keine Tokamak-Animation.
- Punktzahl vorläufig auf schmalen Fenstern reduziert: Auftritt 6'000, Plasma 10'000; sonst Originalwerte 15'000 und 30'000. Pixeldichte maximal 2. Ein echter Handy-Leistungstest bleibt offen.
- Komponenten sind in `src/components/`, Animationen in `src/motive/`. `DESIGN-SYSTEM.md` dokumentiert Design, Verhalten, Erweiterung und Grenzen. Die orange Update-Leiste bleibt als Element der Referenz erhalten, läuft aber nicht endlos: Links sind jederzeit lesbar und ohne Bewegungssteuerung bedienbar.
- Beispiele bleiben auf jeder Karte und auf den betroffenen Seiten sichtbar als erfunden gekennzeichnet. Aussagen und Risiken haben Quellenanker; Meilensteine zeigen ihre eigenen Quellen. Es wurden keine echten Firmenfakten ergänzt.
- Zur Vermeidung doppelter automatisch erzeugter Überschriften-IDs zeigt `/beispiele/` nun Artikel-Zusammenfassungen mit Link auf die echte Artikelseite statt mehrere vollständige MDX-Texte untereinander.
- Die Inhalts- und Stufenprüfung bleibt bestehen. Zusätzliche Tests prüfen gebaute lokale Links, Quellenanker, eindeutige HTML-IDs und die im HTML vorhandenen Kerninhalte ohne JavaScript.
- Lokaler Browser-Test erneut versucht: der zusätzliche Headless-Shell-Download liefert kein gültiges ZIP; der bereits dokumentierte lokale Chromium-Socket-Fehler konnte daher nicht durch eine alternative Browserinstallation umgangen werden. Nach dem Push wird eine externe visuelle Prüfung versucht. Keine Handy-Performance oder visuelle Abnahme allein aus dem Build behaupten.
- Prüfung vor dem Push: 8 Inhalts-Tests und 2 Tests der gebauten Seiten erfolgreich; Astro/TypeScript mit 0 Fehlern, Warnungen und Hinweisen. Statischer Build erstellt zwölf Seiten. `git diff --check` erfolgreich.

### Live- und Sichtprüfung der Magazin-Seiten am 12.11.2026

- Commit `97a38874140b93cf457a428035af9ed3da70acfe` wurde automatisch durch Cloudflare gebaut und veröffentlicht. GitHub-Check: `completed / success`. Build-ID `b4bf5d02-dfc2-4ef3-8508-29d71bf99825`, Worker-Version `2b0410ad-eb34-489d-9276-829931f879f6`.
- Live-Abrufe von `/`, `/fusion/`, `/robotik/`, `/projekt/beispiel-fusion/` und `/projekt/beispiel-robotik/`: jeweils HTTP 200 und erwarteter Seiteninhalt sowie Scroll-Hinweis vorhanden.
- Externe Browser-Screenshots wurden tatsächlich angesehen: mobile Startseite und mobile Fusion-Projektseite bei 390 Pixel Bildbreite sowie Fusion-Ressort auf Desktop bei 1280 Pixel Bildbreite. Kein heller Browser-Aussenrand, kein sichtbares horizontales Überlaufen. Raster, Projektkarten, Skala, Pipeline und Lesebereich erscheinen in der festgelegten Gestaltung.
- Gerendertes Browser-HTML bestätigt `canvas-ready` nach dem Auftritt und `webgl-ready` auf der Fusion-Projektseite. Damit sind diese Client-Skripte auch ausserhalb des lokalen Builds ausgeführt worden. Der Scroll-Pfeil ist in der mobilen Aufnahme sichtbar. Seine vollständige Bedienung und die Leistung auf dem echten Handy bleiben noch vom Auftraggeber zu prüfen.
- Screenshots sind eine Sichtprüfung, kein gemessener Performance-, Screenreader- oder vollständiger Interaktionstest. Die lokalen Tests prüfen 8 Inhaltsregeln und 2 Gruppen von Seiten-/Linkregeln.
- Nächste fachliche Arbeiten: weitere Ressort-Inhalte und Motive, insbesondere Stellarator und Robotik-Bewegung; Methodik und übrige Seitentypen nach Abschnitt 5. Die eigentlichen Magazin-Seiten und ihr automatisches Deployment sind jetzt umgesetzt.

### Startseite geordnet am 12.11.2026

- Auftraggeber empfindet die bisherige Gesamtwirkung als unruhig. Vereinbart: zuerst die Startseite als zusammenhängenden Design-Durchgang fertigstellen, danach mobile Rückmeldung abwarten; Ressort- und Projektseiten folgen separat.
- Reihenfolge jetzt: Auftritt → Forschungsfelder → Reality Checks → Hintergründe und Updates. Updates unterbrechen nicht mehr den Weg vom Thema zum Projekt. Die orange Leiste wird auf der Startseite durch eine ruhige Liste auf Blatt ersetzt; Orange konzentriert sich wieder auf Ziel und Behauptung. Die ursprüngliche Ticker-Variante und die archivierten Prototypen bleiben erhalten.
- Auftritt auf `78svh` abzüglich Kopfhöhe verkürzt (maximal 620 Pixel). Dadurch beginnt der nächste Abschnitt bereits in der ersten Bildschirmansicht bei üblichen Handy-Höhen. Die bestehende Canvas-Logik, Logo-Masse, Schriften und Farben bleiben unverändert. Sehr niedrige Querformate behalten die kompakte Sonderregel.
- Ressort-Raster zeigt auf üblichen Handys zwei kompakte Motiv-Karten nebeneinander. Raster bleibt inhaltsgesteuert und fällt bei sehr wenig Breite auf eine Spalte zurück.
- Startseiten-Projektkarten bündeln Ressort und Beispiel-Hinweis in einer Zeile. Eine gemeinsame visuelle Legende erklärt belegt/behauptet und Stufe 9. Die normale Kartenvariante auf Unterseiten bleibt bestehen.
- Beispielausgabe ist im Auftritt sichtbar markiert; jeder Beispieleintrag bleibt zusätzlich erkennbar. Der separate breite Warnstreifen entfällt hier. Technische Artikel-Zusammenfassungen erscheinen nicht mehr auf der Startseite; Titel führen zu den vorhandenen Artikeln. Keine Inhalte oder Fakten neu erfunden.
- Einheitliche Abschnittsabstände und ruhigere Überschriften-Hierarchie auf der Startseite. Hintergründe und Updates stehen auf Desktop nebeneinander, auf Handy untereinander.
- Prüfung: Astro/TypeScript ohne Fehler, Warnungen oder Hinweise; Inhaltsprüfung, statischer Build (12 Seiten), beide Seiten-/Linktests und `git diff --check` erfolgreich.
- Commit `d3a468bfbd17080b2101b4b066956baecadf9cb8` automatisch veröffentlicht: Cloudflare-Check `completed / success`, Build `d573380a-ce05-45de-96c8-d1cd100dbff0`, Version `0b1ada99-9dc8-443d-95e6-4ae0e91ca4b4`.
- Live-Startseite HTTP 200; neue Texte und ausgeführter Canvas bestätigt. Browser-Aufnahmen bei 390 und 1280 Pixel Breite angesehen: kompakte Themenkarten nebeneinander, klare Abschnittsfolge, Scroll-Pfeil sichtbar, kein sichtbares horizontales Überlaufen. Die mobile Vollseiten-Aufnahme ist rund 2550 statt zuvor 3294 Pixel hoch. Das ist eine Sichtprüfung, keine gemessene Handy-Leistung oder vollständige Interaktionsprüfung.
- Nächster Schritt: Rückmeldung zur Startseite am Handy abwarten. Danach die Gestaltung auf Ressort- und Projektseiten abstimmen.

### Inhaltlicher Einstieg statt Logo-Auftritt am 12.11.2026

- Auftraggeber bestätigt: Das grosse Logo hat im Einstieg keinen Navigations- oder Informationsnutzen und wirkt wie eine Technik-Demo. Diese Rückmeldung ersetzt die bisherige Vorgabe zum automatischen Startseiten-Auftritt.
- Startseite beginnt jetzt mit einem lesbaren Aufmacher: Ressort, Frage zum Engpass als Titel, gelieferter Stand und heutiger Stand aus dem Projekt, sowie direkter Link zum Reality Check. Das zugehörige Punktwolken-Schema verlinkt ebenfalls auf dieses Projekt. Beispiel bleibt sichtbar als frei erfunden markiert.
- Kleines Logo im Seitenkopf bleibt Absender und Home-Link. Der grosse Logo-Auftritt und sein Canvas-Skript werden auf der Startseite nicht mehr eingebunden. Die vorhandenen Module und Prototypen bleiben als Referenz erhalten.
- Vorläufige Auswahl des Aufmachers: erstes Projekt nach Slug sortiert. Noch keine redaktionelle Gewichtung und kein Aktualitätsversprechen. Später explizite redaktionelle Auswahl in den Inhaltsdateien ergänzen. Keine neuen Fakten oder Zahlen eingeführt.
- Forschungsfelder behalten ihre Funktion als Motiv-Navigation. Projektanimationen bleiben im fachlichen Kontext erreichbar.
- Prüfung: Astro/TypeScript ohne Fehler oder Warnungen, Build mit zwölf Seiten und beide bestehenden Seiten-/Linktests erfolgreich. Live-Stand nach Push gesondert prüfen.
- Live bestätigt: Commit `2b31ecd` automatisch erfolgreich durch Cloudflare veröffentlicht. Startseite HTTP 200, Aufmacher vorhanden, Intro-Canvas nicht eingebunden. Mobile Browser-Aufnahme bei 390 Pixel Breite angesehen: Titel, Text, Leselink und verlinktes Schema sichtbar; kein sichtbares Überlaufen. Echte Handy-Abnahme und vollständige Interaktionsprüfung bleiben offen.

### Magazin-Entwurf mit navigierbarem Titelbild am 12.11.2026

- Auftraggeber wünscht einen Magazin-Einstieg, der die gesamte Themenwelt erschliesst. Die Idee einer komponierten Themenwelt mit direkter Navigation wurde angenommen. Referenzgedanke ist ein thematisch verdichtetes Magazin-Cover (genannt wurde The Economist «The World Ahead»), keine Kopie seiner Illustration.
- Neuer vergleichbarer Entwurf unter `/entwurf/`. Die bestehende Startseite bleibt zum direkten Vergleich erhalten. Vor einer Übernahme Rückmeldung zur gestalterischen Richtung am Handy abwarten.
- Eigenständige schematische Punktillustration: Reaktorspulen, Gelenkarm, Quantenchip und Getriebe werden durch einen gemeinsamen Globus zusammengehalten. Keine Interpretation als physikalische oder geografische Darstellung. Native Links liegen als grosse, beschriftete Tippflächen darüber; vollständige Textnavigation ergänzt alle acht geplanten Ressorts. Kein Drehen oder Abwarten nötig, alle Ziele auch ohne JavaScript erreichbar.
- Fusion und Robotik führen zu den vorhandenen Ressorts mit Beispielprojekten. Sechs weitere Ressorts aus dem Konzept führen ausschliesslich zu klar benannten Vorbereitungsseiten unter `/entwurf/feld/`. Es wurden keine echten Artikel oder zusätzlichen Projektbewertungen vorgetäuscht.
- Darunter zwei unterschiedlich gewichtete Geschichten aus vorhandenen Beispielprojekten. Skalen bleiben auf ihren Detailseiten. Alle Beispiele sichtbar gekennzeichnet. Texte und Auswahl für diesen Entwurf liegen in `src/content/entwurf/magazin.json`; diese Datei ist eine redaktionelle Entwurfskonfiguration, keine zusätzliche Fakten-Collection. Bestehende sechs Collections und ihre Belegprüfung bleiben unverändert.
- Titelillustration als deterministisches serverseitiges SVG aus `src/motive/titelwelt.ts`, native HTML-Navigation in `MagazineCover.astro`. Bestehende Plasma-/Canvas-Module und Prototypen bleiben erhalten. Keine Animation im Cover-Entwurf, dadurch gleiches Verhalten bei reduzierter Bewegung.
- BaseLayout unterstützt optionale Navigationsziele für den Entwurf. Standardziele der bestehenden Seiten unverändert. Kleines Logo bleibt der Home-Link auf `/`.
- Prüfung: Astro/TypeScript ohne Fehler/Warnungen/Hinweise, Inhaltsprüfung und Build mit 19 Seiten sowie beide Seiten-/Linktests erfolgreich. Cloudflare hat Commit `2420844` automatisch erfolgreich veröffentlicht. Externe mobile (390 Pixel) und Desktop-Aufnahmen (1280 Pixel) tatsächlich angesehen. Alle Motive und Beschriftungen sichtbar, keine sichtbare horizontale Überbreite. Anschliessend mobile Titelbreite und die Lesbarkeit der Statuszeilen verbessert. Vollständige Touch-/Screenreader-Prüfung und echte Handy-Abnahme bleiben offen.

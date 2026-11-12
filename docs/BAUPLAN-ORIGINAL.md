# Stufe 9 – Bauplan

Nov 12, 2026 · @Spezzo

## Konzept & Positionierung

Stufe 9 ist ein deutschsprachiges Frontier-Tech-Magazin, das bei jeder Zukunftstechnologie eine Frage beantwortet: Ist das schon serienreif oder nur Hype?

- **Kernprodukt:** Reality-Check-Karten pro Technologie und Firma – versprochen, geliefert, Stand heute, TRL-Stufe.
- **Futter:** kurze News-Updates (mehrmals pro Woche, automatisiert vorbereitet, von Spezzo freigegeben) und 1–2 Deep-Dives pro Woche.
- **Zielgruppe:** Ingenieure, Techniker, Tech-Interessierte und Anleger im DACH-Raum, die Substanz statt Hype wollen.
- **Abgrenzung:** heise, Golem und t3n berichten News. Stufe 9 bewertet den Reifegrad, aus Sicht eines Mechatronikers, und erklärt, was unter der Haube steckt.
- **Rolle im Gesamtbild:** Magazin = Reichweite und Expertenstatus → Videos/Social = Sichtbarkeit → Humanoid Praxis = Beratung. Schmaqq bleibt eigenständig.
- **Aktien:** nur als Info-Zeile auf Firmenkarten, nie im Vordergrund.

## TRL-Bewertungssystem

Jede Technologie und jede Firmen-Ankündigung bekommt eine Stufe von 1 bis 9 – angelehnt an die Technology Readiness Levels aus Industrie und Raumfahrt. Stufe 9 ist der Name und das Ziel.

| Stufe | Bedeutung | Label auf der Seite |
| --- | --- | --- |
| 1 | Grundprinzip beobachtet | Theorie |
| 2 | Technologiekonzept formuliert | Theorie |
| 3 | Machbarkeit im Labor gezeigt | Labor |
| 4 | Komponenten im Labor validiert | Labor |
| 5 | Komponenten in realistischer Umgebung validiert | Prototyp |
| 6 | Prototyp in realistischer Umgebung demonstriert | Prototyp |
| 7 | Prototyp im Einsatz demonstriert | Pilot |
| 8 | System fertig und qualifiziert | Pilot |
| 9 | Im Serieneinsatz bewährt | Serienreif |

Regeln für die Bewertung:

- Jede Stufe braucht eine verlinkte Quelle (Paper, Pressemitteilung, Behördenentscheid, Messe-Demo).
- Neben der Stufe steht immer die **Versprechens-Lücke**: welche Stufe die Firma behauptet vs. welche belegt ist.
- Änderungen der Stufe werden als Meilenstein mit Datum geloggt, nie still überschrieben.
- **Stufe 9 heisst nicht unbedenklich:** Die Stufe misst nur Reife. Jede Karte hat zusätzlich ein Feld **Risiken & Kontroversen** – belegt, behauptet und Stellungnahme der Firma getrennt.

## Ressorts

Acht Ressorts zum Start, alle mit dem gleichen Karten-System; weitere (Raumfahrt, Biotech) kommen als neue Collection ohne Design-Änderung dazu.

| Ressort | Slug | Beispiele | Fokus |
| --- | --- | --- | --- |
| Quanten | `quanten` | IBM, Google, IonQ, D-Wave, IQM | Qubits, Fehlerkorrektur, Roadmaps |
| Kernspaltung neu | `kernspaltung` | Oklo, NuScale | SMR, Mikroreaktoren, Genehmigungen |
| Fusion | `fusion` | Helion, Commonwealth Fusion, ITER | Meilensteine vs. Strom-ins-Netz-Versprechen |
| Physik & Forschung | `forschung` | CERN, ETH, PSI | Durchbrüche, neue Anlagen |
| KI & Compute | `ki` | KI-Labs, Chips, Rechenzentren | Energiehunger als Brücke zu SMR/Fusion |
| Robotik & Humanoide | `robotik` | mimic, Hexagon, ANYbotics, Figure | Physical AI, Industrie-Einsatz |
| Unter der Haube | `komponenten` | Harmonic Drives, Aktuatoren, E-Motoren, Sensorik | Spezzos Kerbe: Technik, die alles antreibt |
| Macht & Kontrolle | `kontrolle` | Palantir, Überwachungs- und Analysesoftware bei Behörden, autonome Waffen | Kehrseite: Überwachung, Datenmacht, Energie- und Rohstoffhunger, Jobverdrängung |

Querverbindungen sind gewollt: Ein Artikel kann mehrere Ressorts tragen (z. B. KI-Rechenzentren → SMR-Strom).

## Seitentypen & Komponenten

das Modell baut alle Seitentypen in einer Session, damit sie konsistent sind; jede Komponente wird mit Beispieldaten befüllt und dokumentiert.

**Seitentypen**

| Seite | Route | Inhalt |
| --- | --- | --- |
| Startseite | `/` | Hero mit TRL-Skala, neueste Updates, ausgewählte Reality Checks, Newsletter |
| Ressort | `/[ressort]` | Ressort-Intro, Technologien mit Stufe, Firmen, Updates |
| Technologie | `/technologie/[slug]` | TRL-Stufe, Versprechens-Lücke, Timeline, beteiligte Firmen |
| Firma | `/firma/[slug]` | Reality-Check-Karte, Roadmap vs. Lieferung, Meilensteine, optional Kurs-Zeile |
| Artikel | `/artikel/[slug]` | Deep-Dive oder Messebericht, Quellen, verknüpfte Karten |
| Updates | `/updates` | Ticker-Feed, filterbar nach Ressort und Stufenänderung |
| Video | `/videos` | YouTube- und Shorts-Embeds, verknüpft mit Artikeln |
| Über / Methodik | `/methodik` | TRL-Erklärung, Bewertungsregeln, Herausgeber, Transparenz-Hinweise |
| Newsletter | `/newsletter` | Anmeldung, Archiv |

**Komponenten**

- `TrlScale` – animierte Skala 1–9, markiert Ist-Stufe und behauptete Stufe
- `RealityCheckCard` – Versprochen / Geliefert / Stand heute / Stufe / Quelle
- `PromiseGap` – visuelle Lücke zwischen Behauptung und Beleg
- `RiskPanel` – Risiken & Kontroversen auf jeder Karte, getrennt nach belegt / behauptet / Kritik, mit Stellungnahme der Firma
- `MilestoneTimeline` – Meilensteine mit Datum, angekündigt vs. erreicht vs. verspätet
- `CompanyHeader` – Name, Ressorts, Land, optional Ticker und Kurs-Zeile
- `UpdateItem` / `UpdateTicker` – kurze News mit Stufen-Badge
- `ArticleLayout` – Lesetypografie, Inhaltsverzeichnis, Quellenblock
- `SourceList` – nummerierte Quellen mit Datum
- `ExplainerFigure` – Schnittbild / Diagramm-Slot für „Unter der Haube“
- `VideoEmbed` – Lazy-Load, datenschutzfreundlich (Klick-zum-Laden)
- `NewsletterBox` – inline und als Footer-Variante
- `DisclosureNote` – Transparenz-Hinweis (z. B. Schmaqq gehört zum Herausgeber)
- `AffiliateLink` – gekennzeichneter Link mit `rel="sponsored"`
- `RessortNav`, `Footer`, `SearchBar`

## Datenmodell

Alle Inhalte liegen als Dateien in Astro Content Collections; die Pipeline schreibt nur diese Dateien, das Frontend baut sich daraus neu.

| Collection | Format | Pflichtfelder |
| --- | --- | --- |
| `ressorts` | JSON | slug, name, intro, farbe (Token) |
| `technologien` | JSON | slug, name, ressorts\[\], trl\_ist, trl\_behauptet, zusammenfassung, risiken\[\], quellen\[\] |
| `firmen` | JSON | slug, name, land, ressorts\[\], technologien\[\], trl\_ist, trl\_behauptet, versprochen, geliefert, stand\_heute, risiken\[\], ticker?, quellen\[\] |
| `meilensteine` | JSON | id, firma?, technologie?, titel, angekündigt\_für, erreicht\_am?, status (geplant / erreicht / verspätet / abgesagt), quelle |
| `artikel` | MDX | slug, titel, typ (deep-dive / messe / erklärer / kontroverse), ressorts\[\], firmen\[\], datum, autor, quellen\[\], stellungnahme?, disclosure? |
| `updates` | Markdown | id, datum, ressort, firma?, titel, text (max. 80 Wörter), trl\_änderung?, quelle |
| `videos` | JSON | id, plattform, url, titel, datum, artikel? |

`risiken[]` = Liste aus {thema, status (belegt / behauptet / Kritik), beschreibung, stellungnahme\_firma?, quellen\[\]}.

Regeln:

- `quellen[]` = Liste aus {titel, url, datum}; ohne Quelle lehnt das Schema den Eintrag ab (Zod-Validierung).
- Stufen-Änderungen entstehen nur über einen neuen Eintrag in `meilensteine`, damit die Historie erhalten bleibt.
- Kursdaten liegen nicht in den Dateien, sondern kommen optional per Build-Zeit-Fetch dazu.

## Design-System & Technik

das Modell liefert ein wartbares Astro-Projekt, keine Einzelseiten: Nach dem Run muss jedes andere Modell (Claude, GPT, DeepSeek) Inhalte ergänzen können, ohne das Design anzufassen.

**Stack**

- Astro (statisch, SEO-stark), TypeScript, Content Collections mit Zod-Schemas
- Styling: CSS-Variablen als Design-Tokens in `src/styles/tokens.css`, kein schweres UI-Framework
- Animationen: GSAP + ScrollTrigger und CSS; jede Animation respektiert `prefers-reduced-motion`
- Interaktive Inseln nur wo nötig (TRL-Skala, Filter), sonst null JavaScript
- Deployment: Docker-Container hinter Traefik auf dem Hostinger-VPS

**Design-Richtung**

- **Gefühl:** Die Seite wirkt, als käme sie aus der Zukunft – aber mit eigener Handschrift, nicht wie die tausendste KI-Landingpage.
- **Farben und Schriften wählt das Modell**, abgeleitet aus dem Thema statt aus Web-Trends, und begründet jede Wahl.
- **Inspiration aus der echten Technikwelt:** Messinstrumente, Oszilloskope, Reaktor-Leitstände, technische Zeichnungen und Normblätter, Datenblätter, Laborprotokolle, Schweizer Typografie (Swiss Style).
- **Leitmotiv:** die TRL-Skala 1–9 als Segmentbalken – im Logo, Hero, Badges, Ladeanimation, Übergängen.
- **Verboten:** der KI-Einheitslook (siehe Liste im Bau-Prompt).
- Mobile first, Lesbarkeit vor Effekt: Animationen erklären Inhalte, sie verstecken sie nie.

**Ordnerstruktur**

```
src/
  content/        # Collections: ressorts, technologien, firmen, meilensteine, artikel, updates, videos
  components/     # alle Komponenten, je mit README-Kommentar und Beispiel
  layouts/        # BaseLayout, ArticleLayout
  pages/          # Routen aus dem Abschnitt Seitentypen
  styles/         # tokens.css, global.css, animations.css
  lib/            # TRL-Helfer, Datumsformat, Quellen-Formatierung
docs/
  DESIGN-SYSTEM.md   # Tokens, Komponenten, Do & Don't
  CONTENT-GUIDE.md   # wie neue Einträge aussehen, Pflichtfelder
```

## Logo & Motion

Das Logo ist eine animierte TRL-Skala: neun Segmente, die sich beim Laden von 1 bis 9 füllen – der Name wird zur Bewegung.

**Logo**

- Wortmarke „STUFE 9“ in einer von das Modell gewählten Schrift, daneben oder darunter ein Bildzeichen aus 9 vertikalen Segmenten (oder eine 9, die aus Segmenten gebaut ist)
- Boot-Sequenz beim ersten Besuch: Raster blendet ein, Segmente zünden 1→9 nacheinander, Scanlinie läuft drüber, Wortmarke entschlüsselt sich (Text-Scramble) – max. 1,5 s, danach nie wieder in der Session
- Idle: Segment 9 pulsiert ganz leicht, wie ein Status-LED
- Hover: Segmente laufen kurz durch
- Lieferung: statisches SVG, animierte Version als eigene Komponente, Favicon, Social-Preview-Bild (OG)

**Motion-Katalog**

| Element | Effekt | Dauer / Regel |
| --- | --- | --- |
| Hero | eigene WebGL-Szene aus dem Themenfeld (z. B. Messraster, das sich zur TRL-Skala ordnet), reagiert auf Maus und Scroll – kein generisches Partikelfeld | 60 fps, statischer Fallback auf schwachen Geräten |
| Headlines | Decode-/Scramble-Effekt beim Einblenden | 400–700 ms, nur einmal |
| TRL-Skala | füllt sich beim Scrollen bis zur Ist-Stufe, behauptete Stufe als Ghost-Segment | scroll-gekoppelt |
| Versprechens-Lücke | Lücke öffnet sich sichtbar zwischen Ist und Behauptung | 600 ms ease-out |
| Timeline | Linie zeichnet sich nach, Meilensteine poppen ein | scroll-gekoppelt |
| Karten | präzise Hover-Reaktion im Stil eines Messgeräts (z. B. Skala schlägt aus), kein Glassmorphism | max. 6° |
| Zahlen | zählen hoch, Mono-Schrift | 800 ms |
| Seitenwechsel | Astro View Transitions, Raster-Wipe | max. 400 ms |

**Leitplanken**

- `prefers-reduced-motion`: alles auf Einblenden ohne Bewegung reduzieren
- Inhalte sind ohne JavaScript vollständig lesbar; Animation ist nur Schicht obendrauf
- WebGL nur im Hero und nur, wenn das Gerät es schafft; Three.js lazy geladen
- Ziele: LCP unter 2,5 s, keine Layout-Verschiebung, Lighthouse je mindestens 90 trotz Effekten

## Content-Pipeline

Die Pipeline automatisiert Sammeln, Schreiben und Prüfen; publiziert wird erst nach deinem Tipp in Telegram.

```
Quellen sammeln -> Entwurf (Modell A) -> Faktencheck (Modell B) -> Freigabe via Hermes?
   ja -> Publizieren (Astro-Build, Deploy per Docker) -> Newsletter (wöchentlich)
   überarbeiten -> zurück zu Entwurf
```

Du bekommst jeden Entwurf aufs Handy und antwortest mit freigeben, überarbeiten oder verwerfen; Verworfenes landet nur im Log.

- **Sammeln:** Cronjobs holen Pressemitteilungen, arXiv-Papers, Behördenentscheide und optional Kurse in eine Datenbank auf dem VPS.
- **Entwurf (Modell A):** schreibt Update oder Artikel als Datei im Format aus dem Datenmodell, nur aus den gesammelten Quellen.
- **Faktencheck (Modell B):** gleicht jede Zahl und Behauptung mit den Quellen ab und markiert, was nicht belegt ist.
- **Freigabe:** Hermes schickt den Entwurf mit markierten Stellen; erst danach wird die Datei committed.
- **Publizieren:** Commit löst den Astro-Build aus; der Newsletter bündelt die Woche automatisch.
- **Takt:** Updates mehrmals pro Woche, Deep-Dives 1–2 pro Woche, von dir angestossen.

## Monetarisierung & Kanäle

Die Newsletter-Liste ist das wichtigste Asset; Einnahmen kommen in dieser Reihenfolge dazu, Werbebanner höchstens am Schluss.

1. **Newsletter** „Was sich diese Woche an der Frontier bewegt hat“ – ab Tag 1 sammeln.
2. **Affiliates im Text** – Kurse, Bücher, Tools, Broker-Links bei kotierten Firmen; immer mit `AffiliateLink` gekennzeichnet.
3. **Newsletter-Sponsoring** – Tech- und Industriefirmen, sobald die Liste ein paar tausend Abonnenten hat.
4. **Premium** – Alerts bei Stufenänderungen und Roadmap-Verschiebungen, Monatsreport, Exporte.
5. **B2B** – Datenzugang und Reports für Journalisten, Analysten, Investoren; Leads für Humanoid Praxis.

**Kanäle:** Website als Basis, YouTube (Erklärvideos, Messeberichte), Shorts / TikTok / Instagram (eine Reality-Check-Karte pro Clip), LinkedIn für die B2B-Schiene.

**Schmaqq:** nur in passenden Artikeln erwähnen, mit `DisclosureNote` („Schmaqq gehört zum Herausgeber“); kein „gesponsert von“. Vorher mit Markus abstimmen.

**Unabhängigkeit:** Sponsoren und Affiliate-Partner haben keinen Einfluss auf Stufen, Risiken oder Artikel. Diese Regel steht öffentlich auf der Methodik-Seite. Kritische Artikel bekommen vor Veröffentlichung eine Anfrage zur Stellungnahme an die Firma.

**Pflicht ab Start:** Impressum, Datenschutzerklärung (CH-DSG und DSGVO), Affiliate-Hinweis, „Keine Anlageberatung“ auf Firmenseiten mit Kurs-Zeile.

## Bau-Prompt

Der Prompt lässt das Modell in vier Phasen arbeiten und nach Phase 1 auf deine Abnahme warten – so verbrennst du den Reset nicht an einer falschen Richtung. Kopiere ihn komplett und hänge die Abschnitte Ressorts, Seitentypen & Komponenten, Datenmodell, Design-System & Technik und Logo & Motion darunter.

```text
Du baust "Stufe 9", ein deutschsprachiges Frontier-Tech-Magazin (Quanten, Kernspaltung/SMR, Fusion, Physik & Forschung, KI & Compute, Robotik & Humanoide, Unter der Haube, Macht & Kontrolle). Kernidee: Jede Technologie und Firma bekommt einen Reality Check auf der TRL-Skala 1-9 - versprochen, geliefert, Stand heute, und die Lücke zwischen behaupteter und belegter Stufe.

VISION
Die Seite muss sich anfühlen, als käme sie aus der Zukunft - High-Tech, präzise, lebendig, aber lesbar. Wer sie öffnet, soll in den ersten zwei Sekunden "wow" denken und danach mühelos lesen können. Animationen erklären immer Inhalte (Reifegrad, Lücke, Fortschritt) und verstecken nie Text.

DAS WICHTIGSTE: KEIN KI-EINHEITSLOOK
Fast jede KI-generierte Seite sieht heute gleich aus. Diese Seite darf auf keinen Fall so aussehen. Verboten sind:
- Lila/Blau-Verläufe, leuchtende Orbs oder Blobs im Hintergrund, generische Partikelfelder
- Glassmorphism, weiche Schatten auf abgerundeten Karten, Bento-Grids als Standardlayout
- Inter, Geist oder andere Standard-KI-Schriften als Hauptschrift
- Zentrierter Hero mit grosser Headline + zwei Buttons + Logo-Leiste
- Die Standard-Abfolge Hero > 3 Feature-Spalten > Testimonials > CTA
- Generische Icon-Sets ohne Bezug, Emojis als Icons
- Neon-auf-Schwarz als einzige Idee von "futuristisch"
Leite die visuelle Identität stattdessen aus dem Thema ab: Messinstrumente, Oszilloskope, Reaktor-Leitstände, technische Zeichnungen und Normblätter, Datenblätter, Laborprotokolle, Schweizer Typografie. Die TRL-Skala 1-9 ist das Leitmotiv. Jemand soll einen Screenshot sehen und sofort sagen: Das ist Stufe 9.
Farben, Schriften und Layout wählst du selbst - begründe jede Wahl in einem Satz.

WICHTIG: Nach dieser Session bist du nicht mehr verfügbar. Andere Modelle und eine Pipeline schreiben danach nur noch Dateien in src/content/. Baue deshalb ein vollständiges, wartbares Astro-Projekt mit Design-System, nicht einzelne Seiten. Neue Inhalte müssen ohne Design-Eingriff perfekt aussehen.

ARBEITE IN 4 PHASEN
Phase 1 - Konzept (STOPP danach und warte auf meine Abnahme):
- Drei radikal unterschiedliche Design-Richtungen, jede als kurze Live-Demo (Hero + eine Reality-Check-Karte + TRL-Skala), mit Name, Farben, Schriften, Motion-Idee und Begründung. Keine darf nach dem verbotenen Einheitslook aussehen.
- Nach meiner Wahl: Logo (STUFE 9 Wortmarke + Bildzeichen aus 9 Segmenten) als SVG mit animierter Boot-Sequenz
- Dateiliste des geplanten Projekts
Phase 2 - Fundament: Tokens, alle Komponenten, Layouts, Content-Schemas
Phase 3 - Seiten: alle Routen mit klar markierten Beispieldaten
Phase 4 - Feinschliff: Performance, Barrierefreiheit, Mobile, Doku, README, Dockerfile
Prüfe am Ende jeder Phase selbst gegen die Verbotsliste und die Leitplanken und liste, was du korrigiert hast.

TECHNIK
- Astro + TypeScript, Content Collections mit Zod (Quellen sind Pflichtfelder)
- Design-Tokens als CSS-Variablen in src/styles/tokens.css, Hell- und Dunkelmodus
- GSAP + ScrollTrigger für Scroll-Animationen, Three.js nur für den Hero (lazy geladen), Astro View Transitions für Seitenwechsel
- Keine exotischen Libraries, sauberer konventioneller Code mit Kommentaren
- Statischer Build, Dockerfile für Betrieb hinter Traefik

LEITPLANKEN
- prefers-reduced-motion: alle Bewegung auf sanftes Einblenden reduzieren
- Inhalte ohne JavaScript vollständig lesbar
- WebGL mit statischem Fallback auf schwachen Geräten und Mobile
- LCP unter 2,5 s, keine Layout-Verschiebung, Lighthouse je mindestens 90
- Boot-Sequenz max. 1,5 s und nur beim ersten Besuch
- Sprache Deutsch, Schweizer Rechtschreibung (ss statt ß)
- Keine erfundenen Fakten als echt ausgeben: Beispieldaten sichtbar als Beispiel markieren
- Affiliate-Links über eine Komponente mit rel="sponsored" und sichtbarer Kennzeichnung

LIEFERUMFANG
Alle Seitentypen und Komponenten aus den angehängten Abschnitten, docs/DESIGN-SYSTEM.md (Tokens, Komponenten, Motion-Regeln, Verbotsliste, Do & Don't, neues Ressort ergänzen), docs/CONTENT-GUIDE.md (Beispiel-Datei je Collection), Gerüste für Impressum, Datenschutz, Methodik, README.md.

Wenn etwas unklar ist, triff eine begründete Entscheidung und dokumentiere sie in docs/DESIGN-SYSTEM.md.

[Hier die Abschnitte Ressorts, Seitentypen & Komponenten, Datenmodell, Design-System & Technik und Logo & Motion einfügen]
```

**Prompting-Tipps für den Bau-Run**

- **Phase 1 ernst nehmen:** Gefällt dir die Richtung nicht, korrigiere jetzt mit konkreten Sätzen („Richtung B, aber mit der Typo von A“, „Hero ruhiger“) – nicht erst bei Phase 3.
- **Konkret statt Adjektive:** „Segmente zünden in 80 ms Abständen“ bringt mehr als „mach es geiler“.
- **Referenzen als Richtung, nicht zum Kopieren:** Beschreibe die Stimmung (Mission-Control, Labor-Interface, Sci-Fi-HUD), statt eine bestehende Seite nachbauen zu lassen.
- **Ein Thema pro Korrektur-Nachricht:** sonst setzt das Modell nur die Hälfte um.
- **Zwischendurch sichern:** nach jeder Phase den Code exportieren und ins Repo pushen.
- **Zum Schluss Übergabe-Test verlangen:** „Lege einen neuen Artikel und eine neue Firma nur über src/content/ an und zeig, dass alles ohne Design-Änderung funktioniert.“
- **Einheitslook-Test:** Halte jede Demo neben drei zufällige KI-Landingpages. Sieht sie ähnlich aus, schick sie mit Verweis auf die Verbotsliste zurück.

## Checkliste

**Vor dem Bau-Run**

- [ ] Domain stufe9 sichern (.ch, .com, wenn möglich .de) plus stufeneun als Weiterleitung
- [ ] Markenname auf swissreg.ch und EUIPO prüfen
- [ ] Handles reservieren: YouTube, TikTok, Instagram, LinkedIn
- [ ] Leeres Git-Repo anlegen, damit der Output direkt versioniert wird
- [ ] Prompt plus angehängte Abschnitte einmal komplett durchlesen – Änderungen vorher, nicht während der Session

**Während der Session**

- [ ] Zuerst Gerüst + Tokens + TRL-Skala abnehmen, dann alle Seiten in einem Rutsch
- [ ] Am Ende alles exportieren und ins Repo pushen, bevor die Session abläuft

**Danach (ohne das Erstmodell)**

- [ ] Mit einem anderen Modell testen: einen neuen Artikel und eine Firma nur über `src/content/` anlegen – sieht es ohne Design-Eingriff gut aus?
- [ ] Docker-Container auf dem VPS hinter Traefik starten
- [ ] Newsletter-Tool anbinden
- [ ] Pipeline-Stufen nacheinander aktivieren: erst Sammeln, dann Entwürfe, dann Prüfung, dann Freigabe
- [ ] Erste 10 Reality-Check-Karten von Hand recherchieren – sie setzen den Qualitätsmassstab für die Automation

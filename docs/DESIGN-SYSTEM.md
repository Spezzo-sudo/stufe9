# Stufe 9 – Design-System

Stand: 12.11.2026. Verbindliche visuelle Referenz: `public/prototypes/01-prototyp-gesamt.html`. Die Entscheidungen in `HANDOVER.md` haben Vorrang.

## Farben und Schriften

Alle Werte liegen in `src/styles/tokens.css`.

| Rolle | Token | Wert |
| --- | --- | --- |
| Dunkle Bühne | ink / ink-2 | #070D0F / #0D181B |
| Dunkle Haarlinie | ink-line | #2A3C40 |
| Blatt / Karte | paper / sheet | #EDF1EF / #F9FBFA |
| Helle Haarlinie | paper-line | #B5C0BF |
| Ziel / Behauptung | signal | #FF5A0A |
| Kleine Signalschrift auf Hell | signal-dark | #C24100 |
| Schrift auf Dunkel | on-ink / on-ink-muted | #EAF0ED / #8EA3A2 |
| Gedämpfter Text auf Hell | muted | #55666A |

Titel: Barlow Condensed 600/700. Text: IBM Plex Sans 400/500. Zahlen und Labels: IBM Plex Mono 400/500. Alle selbst gehostet über Fontsource. Keine Google-Fonts-Anfragen auf Magazin-Seiten.

Keine Rundungen oder Schatten. Dunkle Bühnen für Auftritt und Projektkopf, helles Blatt für den Leseteil. Titel in Versalien. Orange bleibt die Ziel- und Behauptungsfarbe; die orange Update-Leiste stammt ebenfalls aus der abgenommenen Referenz.

## Logo und Auftritt

Logo: neun Segmente, Breite 0.17em, Abstand 0.085em, Höhe 0.72em, letztes Segment orange und 1em hoch. Die ruhige Logo-Fassung im Kopf verlinkt immer auf `/`. Auf Unterseiten einmaliger kurzer Balken-Durchlauf, bei reduzierter Bewegung statisch.

`LogoAuftritt.astro` verwendet die Canvas-Silhouetten und die Federbewegung aus dem Prototyp. Sechs illustrative Motive fliessen in das Logo. Sie sind noch keine sechs veröffentlichten Ressorts. Das Raster darunter zeigt ausschliesslich tatsächlich angelegte Ressorts aus Content-Dateien. Aktuell sind das Fusion und Robotik. Der Auftritt läuft einmal pro Browser-Session und lässt sich durch Antippen des grossen Logos wiederholen.

Die Hero-Höhe verwendet `100svh` abzüglich der gemessenen Kopfhöhe, maximal 740 Pixel. Für sehr niedrige Querformate gilt eine kompakte Fassung mit natürlichem Scrollen. Eine stabile kleine Viewport-Höhe vermeidet Sprünge durch ein- und ausfahrende Browserleisten. Geräte-Sicherheitsabstände werden berücksichtigt. Ohne JavaScript oder bei reduzierter Bewegung steht ein vollständiges CSS-Logo im Hero. Die Aussage ist als HTML vorhanden; nur während des kurzen Canvas-Auftritts blendet sie wie in der Vorlage vorübergehend aus.

## Bausteine

| Komponente | Aufgabe |
| --- | --- |
| Logo / LogoAuftritt | Home-Link und einmaliger Auftritt |
| RessortGrid / Motiv | Ressort-Navigation mit statischen SVG-Punktwolken |
| TrlScale | Neun Segmente; voll = Ist, orange schraffiert = Behauptung, Klammer = Lücke |
| RealityCheckCard | Verlinktes Projekt mit Firma, Skala und Engpass |
| PipelineTable | Vergleich im Ressort; auf kleinen Flächen vertikal gestapelt |
| UpdateTicker | Orange Update-Leiste, ruhige lesbare Links statt endlos bewegter Schrift |
| EngpassStage | Frage, belegter Messwert, Testziel und schematisches Motiv |
| MilestoneTimeline | Datierte Meilensteine, Status, Freigabe und Quellen |
| RiskPanel | Belegt, behauptet und Kritik mit Quellen trennen |
| SourceRefs / SourceList | Sprunglinks von Aussagen zu ihren Quellen |
| ExampleNotice | Sichtbare Kennzeichnung erfundener Inhalte |
| ScrollHint | Dezenter Pfeil, solange nach unten noch Inhalt folgt |

## Motive und Animationen

Bildsprache bleibt Punktwolke, keine generischen Themen-Icons. Die statischen Fusion- und Robotik-Silhouetten lehnen sich an dieselbe Geometrie wie der Canvas-Prototyp an. Ein unbekanntes oder fehlendes Motiv ergibt ein neutrales Punktfeld. «Schema» steht sichtbar am Motiv; keine bildliche Präzision behaupten.

Das Tokamak-Plasma nutzt die Original-WebGL-Shader in `src/motive/fusion.js`. Der sichtbare Messwert bleibt HTML und stammt aus dem Inhalt; es wird keine laufende Animation als Live-Messung ausgegeben. Die Animation ist zeitlich vereinfacht und so gekennzeichnet. Stufen ab 7 zeigen stabileren Einschluss; frühere Stufen vereinfachtes Erlöschen. Das ist keine physikalische Simulation und keine Herleitung des TRL. Stellarator und lineare Anlagen zeigen zunächst ein statisches Schema und erhalten keine falsche Tokamak-Animation.

Auf schmalen Fenstern zunächst 6'000 Canvas-Punkte im Auftritt und 10'000 Plasma-Punkte; sonst 15'000 bzw. 30'000. Das sind technische Grenzwerte, kein bestätigter Leistungstest am Handy. Pixeldichte maximal 2. Animation pausiert ausserhalb der Sichtfläche oder bei verborgenem Tab. WebGL hat einen Pause-Knopf. `prefers-reduced-motion` zeigt statische Motive. Fehlender WebGL-Kontext und Kontextverlust lassen das statische SVG sichtbar. Text, Messwerte und Quellen bleiben unabhängig davon lesbar.

## Inhalte erweitern

Neue Ressorts kommen aus `src/content/ressorts`, neue Projekte aus `src/content/projekte`; Seiten werden über dynamische Astro-Routen generiert. Projekt-Stufen benötigen die in `CONTENT-GUIDE.md` beschriebenen Meilensteine. Kein manuell gepflegtes Projektarray im Frontend. Der Auftritt ist visuell aus der Referenz übernommen, seine Motive sind noch eine feste illustrative Auswahl; die Auswahl aus Ressort-Dateien ist ein späterer Ausbau.

Neue Einträge müssen ohne Design-Änderung funktionieren. Keine künstlichen Zahlen, Quellen oder Firmen als echt ausgeben. Beispiel-Hinweise auf jeder Karte und in jedem betroffenen Seitenkopf erhalten.

## Prüfen

`npm test`, `npm run check`, `npm run build` und danach `npm run test:site` im Repo-Verzeichnis. Keine Platzhalter in diesen Befehlen. Die Seitenprüfung kontrolliert lokale Links, Quellenanker, eindeutige HTML-IDs und die ohne JavaScript vorhandenen Kerninhalte. Sie ersetzt keine visuelle Browser- oder Handy-Prüfung.

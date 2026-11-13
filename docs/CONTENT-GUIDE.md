# Inhalte ergänzen

Stand: 12.11.2026. Inhalte liegen ausschliesslich in `src/content/`. Neue Einträge benötigen später keine Design-Änderung. Im aktuellen Schritt ist die Anzeige auf der Prüfseite `/beispiele/` umgesetzt; die eigentlichen Magazin-Seiten folgen.

## Collections und Vorlagen

Jede Collection enthält zwei vollständige, erfundene Beispiele. Eine passende Datei kopieren, eine neue eindeutige ID vergeben und alle Inhalte ersetzen.

| Collection | Format | Vollständige Vorlage |
| --- | --- | --- |
| ressorts | JSON | `src/content/ressorts/fusion.json` |
| firmen | JSON | `src/content/firmen/beispiel-fusion-firma.json` |
| projekte | JSON | `src/content/projekte/beispiel-fusion.json` |
| meilensteine | JSON | `src/content/meilensteine/beispiel-fusion-nachweis.json` |
| artikel | MDX mit Frontmatter | `src/content/artikel/beispiel-fusion-erklaerung.mdx` |
| updates | Markdown mit Frontmatter | `src/content/updates/beispiel-fusion-update.md` |

Dateiname ohne Endung = `slug` oder `id`. Nur kleine Buchstaben, Zahlen und Bindestriche. Die Quellen-ID gilt innerhalb eines Eintrags. Die IDs von Firmen, Projekten und Ressorts verweisen auf die entsprechenden Einträge.

## Beispiele und echte Inhalte

Jeder Eintrag ausser Ressorts hat ausdrücklich `beispiel: true` oder `beispiel: false`. Seiten mit Beispielen zeigen einen Hinweisstreifen und an jedem Eintrag das Wort «Beispiel». Künftige Karten, Tabellen und Detailseiten müssen dieses Merkmal ebenfalls sichtbar anzeigen. Der Datenwert allein genügt nicht.

Beispielquellen haben `beispiel: true` und bewusst keine URL. Sie sind kein Beleg. Echte Quellen haben `beispiel: false`, einen Titel, eine ID, ein gültiges Datum und eine HTTPS-URL. Echte Inhalte dürfen keine Beispielquellen und keine Beziehungen zu Beispiel-Inhalten enthalten. Die Vorlage darf also erst nach echter Recherche als real markiert werden. Auch die Freigaben der Beispiele sind erfunden.

Alle Quellenlisten sind Pflicht und dürfen nicht leer sein. Eine Quellenangabe ersetzt keine redaktionelle Prüfung: Die Redaktion muss nachsehen, ob sie die Aussage wirklich belegt. Das Schema kann die Wahrheit einer Quelle nicht feststellen.

## Projekte und Stufen

- `firma`: ID einer vorhandenen Firma. `ressorts`: IDs vorhandener Forschungsfelder.
- `trl_ist` und `trl_behauptet`: ganze Zahlen von 1 bis 9.
- `behauptung`: redaktionelle Übersetzung des Versprechens in eine Stufe, mit Begründung und Quellen-ID. Die allgemeine Übersetzungsregel muss später auf die Methodik-Seite.
- `versprochen`, `geliefert`, `stand_heute`: jeweils `{text, quellen}`. `quellen` ist hier eine Liste der Quellen-IDs des Projekts.
- `engpass`: `{frage, kennzahl, wert, ziel, einheit, quelle}`. Beide Messwerte brauchen einen Beleg; bei unterschiedlichen Ursprüngen müssen sie vor der Veröffentlichung sauber redaktionell aufgelöst werden. Die Beispiele haben dieselbe erfundene Quelle für beide Werte.
- `bauart`: optional `tokamak`, `stellarator` oder `linear` für Fusion.
- `risiken`: Thema, Status (`belegt`, `behauptet`, `kritik`), Beschreibung, Quellen-IDs und optional eine ebenfalls belegte Stellungnahme der Firma.

Die Ist-Stufe wird gegen den zeitlich letzten erreichten Meilenstein mit `trl_aenderung` geprüft. Stimmen sie nicht überein, bricht der Build ab. Zwei Stufenfreigaben am selben Erreichungsdatum sind mehrdeutig und werden abgelehnt. Abstufungen sind zulässig, wenn ein späterer, redaktionell freigegebener Meilenstein sie belegt. Behauptete Stufen werden nicht automatisch als erreicht übernommen.

## Meilensteine und menschliche Freigabe

Jeder Meilenstein verweist mit `projekt` auf ein Projekt. Termine sind vollständige Daten als `JJJJ-MM-TT`; bei bisher nur jahresgenauen Ankündigungen kein genaues Datum erfinden, sondern vor einem echten Eintrag das Datenmodell entsprechend erweitern.

Ein erreichter Meilenstein braucht `erreicht_am`. Nur erreichte Meilensteine dürfen eine `trl_aenderung` tragen. Diese nennt `nach`, `quelle` und `freigabe` mit `art: mensch`, Name und Freigabedatum. Die Freigabe darf nicht vor dem Nachweis liegen.

Die Freigabe ist eine redaktionelle Aufzeichnung, keine technische Identitätsprüfung. Eine künftige Pipeline darf sie nicht selbst erfinden oder Stufen selbst ändern. Eine echte Authentisierung und der Freigabekanal werden erst beim Aufbau der Pipeline umgesetzt.

## Artikel und Updates

Artikel: MDX-Datei mit Titel, Typ, Datum, Autor, Zusammenfassung, Ressort-/Projekt-/Firmenbezügen und Quellen. Die Frontmatter-Beispiele verwenden JSON-Schreibweise; sie ist auch gültiges YAML. Im Text Zahlen und Aussagen den Quellen zuordnen.

Updates: Markdown-Datei mit nicht leerem Text und höchstens 80 Wörtern im Textkörper, durch Leerraum gezählt. Titel und Frontmatter zählen nicht mit. Ein Update kann auf einen Meilenstein verweisen. Der muss zum genannten Projekt gehören. Updates tragen keine eigene zweite Stufenbewertung.

## Prüfen und veröffentlichen

Im Repo-Verzeichnis ausführen:

```sh
npm test
npm run check
npm run build
```

Diese Befehle haben keine Platzhalter. `npm test` prüft die Schutzregeln. `npm run check` prüft Daten, Astro und TypeScript. `npm run build` prüft alle Daten und Beziehungen erneut und baut die statische Website in `dist`.

Ein Push auf `ccr-7b8b05b1-pterr1` soll über die vorhandene Cloudflare-GitHub-Verbindung den Build starten. Kein zusätzlicher Deployment-Workflow und keine neuen API-Schlüssel sind eingerichtet. Nach einem Push den echten Build-Status und die Live-Adresse prüfen; ein erfolgreicher Push ist kein Deployment-Nachweis.

## Ressort anlegen (Stand 13.11.2026)

Eine Datei in `src/content/ressorts/`, zum Beispiel `raumfahrt.json`:

```json
{
  "slug": "raumfahrt",
  "name": "Raumfahrt",
  "thema": "Höher hinaus",
  "intro": "Ein Satz, worum es in diesem Feld geht.",
  "motiv": "neutral",
  "status": "geplant",
  "reihenfolge": 9
}
```

- Ein Ressort ist eine Rubrik und braucht keine Quellen und kein Feld `beispiel`.
- `motiv` ist optional und nennt einen Eintrag aus `src/motive/umrisse.ts`. Vorhanden sind: `fusion`, `robotik`, `quanten`, `antrieb`, `chip`, `reaktor`, `kollision`, `kontrolle`, `neutral`.
- `reihenfolge` sortiert das Raster. Die ersten sechs Ressorts mit Motiv erscheinen im Auftritt.
- Solange kein Projekt auf das Ressort verweist, zeigen Kachel und Seite «In Vorbereitung».

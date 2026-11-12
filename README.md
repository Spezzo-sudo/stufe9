# Stufe 9

Deutschsprachiges Frontier-Tech-Magazin: Jedes Zukunftsprojekt bekommt einen Reality Check auf der Reifegrad-Skala 1 bis 9. Serienreif oder nur versprochen?

**Stand:** Schritte 1 und 2 sind umgesetzt: Astro-Grundlage, sechs Zod-Collections mit Quellen- und Beziehungsprüfung, je zwei sichtbare Beispiele pro Collection. Auftritt und Magazin-Seiten folgen.

## Einstieg

1. [`docs/HANDOVER.md`](docs/HANDOVER.md) – aktueller Stand, alle Entscheidungen, nächste Schritte. **Zuerst lesen.**
2. [`public/prototypes/01-prototyp-gesamt.html`](public/prototypes/01-prototyp-gesamt.html) – die Design-Referenz. Im Browser öffnen.
3. [`docs/BAUPLAN-ORIGINAL.md`](docs/BAUPLAN-ORIGINAL.md) – der ursprüngliche Plan. Wo er der Übergabe widerspricht, gilt die Übergabe.

Vorschau am Handy einrichten: [`docs/VORSCHAU.md`](docs/VORSCHAU.md).

Wer mit einem KI-Modell weiterarbeitet: [`AGENTS.md`](AGENTS.md).

## Lokal entwickeln

Node.js ab 22.12 verwenden.

```sh
npm ci
npm run dev
```

`npm run check` prüft Astro und TypeScript. `npm run build` erzeugt die statische Seite in `dist`. `npm run preview` zeigt den Build lokal.

Neue Inhalte liegen in `src/content/`. Anleitung: [`docs/CONTENT-GUIDE.md`](docs/CONTENT-GUIDE.md). Die Prüfseite `/beispiele/` zeigt die erfundenen Beispiele. `npm test` prüft die Schutzregeln. `npm run check` und `npm run build` prüfen vorab alle Inhaltsdateien, Quellenbezüge und Stufen.

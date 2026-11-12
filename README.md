# Stufe 9

Deutschsprachiges Frontier-Tech-Magazin: Jedes Zukunftsprojekt bekommt einen Reality Check auf der Reifegrad-Skala 1 bis 9. Serienreif oder nur versprochen?

**Stand:** Schritt 1 ist umgesetzt: statisches Astro-Projekt, TypeScript, erste Zod-Collection, Design-Tokens, lokale Schriften und Seitenkopf-Logo. Auftritt und Inhaltsseiten folgen nach der Vorschau-Prüfung.

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

Neue Inhalte liegen in `src/content/`. In Schritt 1 ist erst die leere Ressort-Collection mit Zod eingerichtet. Die vollständigen Schemas und Beispieldaten sind der nächste offene Punkt der Übergabe.

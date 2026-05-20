// TODO Sieglinde: aktuelle Preise einsetzen
// Diese Preise sind Platzhalter für den Build — bitte vor dem Launch durch die echten Preise ersetzen.
// dietary flags: 'veg' (vegetarisch) · 'vegan' · 'gf' (glutenfrei)
// TODO Sieglinde: vollständige Karte ergänzen — diese 6 Highlights sind die Vorschau auf der Startseite

export const SPEISEN = [
  {
    name: 'Wiener Schnitzel vom Kalb',
    beschreibung: 'mit Petersilkartoffeln und Preiselbeeren',
    preis: '19,80',
    kategorie: 'Hauptspeise',
    dietary: [],
  },
  {
    name: 'Käsespätzle',
    beschreibung: 'mit gerösteten Zwiebeln und Salat',
    preis: '13,50',
    kategorie: 'Hauptspeise',
    dietary: ['veg'],
  },
  {
    name: 'Cordon Bleu vom Schwein',
    beschreibung: 'mit Pommes frites',
    preis: '18,90',
    kategorie: 'Hauptspeise',
    dietary: [],
  },
  {
    name: 'Rindergulasch',
    beschreibung: 'mit hausgemachten Semmelknödeln',
    preis: '16,50',
    kategorie: 'Hauptspeise',
    dietary: [],
  },
  {
    name: 'Grillteller „Stern"',
    beschreibung: 'gemischte Grillspezialitäten vom Spieß',
    preis: '22,80',
    kategorie: 'Hauptspeise',
    dietary: [],
  },
  {
    name: 'Hausgemachter Apfelstrudel',
    beschreibung: 'mit Vanilleeis oder Schlagobers',
    preis: ' 6,50',
    kategorie: 'Dessert',
    dietary: ['veg'],
  },
]

export const DIETARY_LABELS = {
  veg:   { label: 'vegetarisch', short: 'veg' },
  vegan: { label: 'vegan',       short: 'vegan' },
  gf:    { label: 'glutenfrei',  short: 'gf' },
}

export const KATEGORIEN = ['Vorspeise', 'Hauptspeise', 'Dessert', 'Getränk']

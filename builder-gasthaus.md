# Gasthaus Website Builder — Universal Gastronomy Template

## Role

Act as a World-Class Senior Creative Technologist and Lead Frontend Engineer who specialises in Austrian and German *Wirtshaus-Kultur*. You are building a **production-ready, multi-section website** for a local gastronomy business. The site must feel authentic to its specific location, cuisine, and owner — never generic, never SaaS, never a startup landing page in disguise. Read `Brief.md` first. Build from it. Let the client's own words and real guest quotes carry the weight.

> **Sprache:** The entire visible website is in **German (Sie-Form, österreichisches or regionales Hochdeutsch)** unless Brief.md specifies otherwise. No English marketing-speak. No "Experience the Taste of Tradition™" nonsense.

---

## 0. How to Use This Builder

### Files required in the project root

```
Brief.md          ← client-specific data (see Section 1 for schema)
builder-gasthaus.md  ← this file
```

### Agent flow — MUST FOLLOW

1. **Read `Brief.md` first.** Extract all variables into your working memory (see Section 1 for the full variable map).
2. **Select the aesthetic preset** from Section 2 based on the `aesthetic_hint` field in Brief.md.
3. **Check the feature tier** (`tier: basic | standard | pro`) and note which optional sections and features to include.
4. **Ask the user two questions** in a single `AskUserQuestion` call — skip this if the user signals "just build":
   - "Soll ich Platzhalter-Bilder von Unsplash verwenden oder soll ich Bildplätze leer lassen?"
     → `Unsplash-Platzhalter (sofort visuell)` / `Leere Bildplätze mit Beschriftung`
   - "Reservierungsformular per E-Mail (`mailto:`) oder Formspree-Endpoint?"
     → `mailto: (sofort funktional, kein Backend)` / `Formspree (echter E-Mail-Versand)`
5. **Build all sections** in order A → K, skipping optional sections where Brief.md has no data.
6. **Populate all data files** from Brief.md values.
7. **Run `npm run build`** and fix any TypeErrors or missing imports before reporting done.

---

## 1. Brief.md Schema

The following is the complete contract. Every variable used in Section 4 (section templates) maps to a field here. A fresh agent must fill in all `{{VARIABLE}}` tokens using values from Brief.md.

### 1a. Required fields schema

```markdown
# [CLIENT_NAME] — Project Brief

## Identität
- name: Vollständiger Betriebsname
- tagline: Untertitel / Kurzbeschreibung (1 Satz)
- owner_name: Vor- und Nachname des Inhabers / der Inhaberin
- years_in_business: Anzahl Jahre (Zahl)
- price_range: € / €€ / €€€
- serve_cuisine: Küchenstil (z.B. "Austrian, Traditional" / "Regional, Bavarian" / "Italian, Mediterranean")
- aesthetic_hint: 1–3 Adjektive (z.B. "rustic warm" / "alpine dark" / "urban modern" / "wine traditional")
- tier: basic / standard / pro
- client_slug: URL-freundlicher Kurzname (z.B. "gasthaus-stern", "hotel-alpenblick")

## Kontakt & Adresse
- address_street: Straße und Hausnummer
- address_city_zip: PLZ + Ort
- address_region: Region / Bundesland / Land
- phone: Telefonnummer (internationales Format)
- email: Kontakt-E-Mail (wird als CONTACT_EMAIL Variable gebaut)
- geo_lat: Breitengrad (Dezimalgrad)
- geo_lng: Längengrad (Dezimalgrad)
- google_place_id: Google Place ID (optional — für Maps-Embed)

## Öffnungszeiten
- hours: (pro Wochentag)
  - Montag: Ruhetag / 09:00–22:00
  - Dienstag: …
  - Mittwoch: …
  - Donnerstag: …
  - Freitag: …
  - Samstag: …
  - Sonntag: …
- kitchen_hours: Küchenzeiten (z.B. "11:30–14:00 und 17:00–21:00")

## Kapazitäten & Räumlichkeiten
(Nur ausfüllen, was tatsächlich vorhanden ist)
- space_restaurant:
    seats: Anzahl Sitzplätze
    description: 2–3 Sätze Beschreibung
    photo_keywords: Unsplash-Suchbegriffe
- space_garden:        # Auslassen wenn kein Gastgarten
    seats: ~
    description: ~
    photo_keywords: ~
- space_saal:          # Auslassen wenn kein Saal
    seats: ~
    description: ~
    photo_keywords: ~
    mailto_subject: Betreff für Saal-Anfrage-E-Mail
    mailto_body_template: "Datum: ___, Anlass: ___, Gäste: ___"

## Speisekarte (Vorschau — 6 Highlights)
menu_items:
  - name: Gerichtsname
    description: Kurze Beschreibung / Beilage
    price: "€ XX,XX"
    category: Vorspeise / Hauptspeise / Dessert / Getränk
    dietary: []  # veg / vegan / gf — leer lassen wenn keine Angabe
  # ... 5 weitere Einträge

tagesangebot:          # Auslassen wenn kein Tagesmenü
  description: "Mo–Fr wechselnd, Suppe + Hauptspeise"
  hours: "11:30–14:00"
  price_from: "€ XX,XX"

## Über uns
about_headline_1: Erste Zeile der H2-Überschrift (z.B. "Seit über 30 Jahren")
about_headline_2: Zweite Zeile der H2-Überschrift (z.B. "unsere Familie. Ihr Wirtshaus.")
about_body_1: >
  VERBATIM — Den exakten Text des Inhabers hier einfügen. Nicht umformulieren.
  Dieser Text erscheint 1:1 auf der Website.
about_body_2: >
  Optionaler zweiter Absatz (Lage, Geschichte, etc.)
about_signature: "— Vorname Nachname"  # für Caveat-Font-Signatur
about_photo_keywords: Unsplash-Suchbegriffe für das Portaitfoto

## Hero
hero_eyebrow: Kurze Zeile über dem H1 (z.B. "SEIT ÜBER 30 JAHREN", uppercase)
hero_line_1: Erste H1-Zeile (aufrecht, cream)
hero_line_2: Zweite H1-Zeile (kursiv, accent-farbe)
hero_subline: >
  Kurzer Fließtext unter H1 (max. 52 Zeichen pro Zeile, 2 Zeilen).
hero_photo_keywords: Unsplash-Suchbegriffe für Hero-Hintergrundbild

## USP Strip (3 Versprechen)
usp_1:
  icon: lucide-react Icon-Name (z.B. TreePine, UtensilsCrossed, Waves)
  title: Kurzbezeichnung (3–5 Wörter)
  body: Ein Satz Erläuterung
usp_2:
  icon: ~
  title: ~
  body: ~
usp_3:
  icon: ~
  title: ~
  body: ~

## Bewertungen
review_aggregate:
  google_stars: "4.4"
  google_count: 203
  tripadvisor_stars: "4.5"  # Auslassen wenn keine TA-Bewertungen
reviews:
  - quote: Exakter Zitat-Text
    author: Vorname N.
    source: Google / TripAdvisor / Booking.com
  - quote: ~
    author: ~
    source: ~
  - quote: ~
    author: ~
    source: ~

## Events (optional — Auslassen wenn keine Veranstaltungen)
events:
  - title: Veranstaltungsname
    date_or_recurrence: "Jeden ersten Freitag im Monat" / "15. August 2025"
    description: Kurze Beschreibung
    recurring: true / false

## Zimmer (optional — nur bei Gasthaus mit Übernachtung)
rooms:
  - name: Zimmerbezeichnung
    description: 2–3 Sätze
    capacity: "2 Personen"
    photo_keywords: Unsplash-Suchbegriffe
  # ... weitere Zimmer

## Social & Legal
facebook_url: https://www.facebook.com/...     # Auslassen wenn kein Facebook
instagram_url: https://www.instagram.com/...   # Auslassen wenn kein Instagram
copyright_name: "Vorname Nachname e.U." / "GmbH" / etc.
copyright_year: "2026"

## Logo
logo_description: >
  Beschreibung des Logos für Inline-SVG-Nachbau, ODER "existing_svg" wenn eine SVG-Datei
  bereitgestellt wird. Beispiel: "Fünfzackiger Stern, leicht abgerundete Spitzen, einfarbig"
```

### 1b. Worked example — Gasthaus Stern Bludenz

```markdown
# Gasthaus Stern Bludenz — Project Brief

## Identität
- name: Gasthaus Stern
- tagline: Gutbürgerliches Gasthaus im Herzen von Bludenz
- owner_name: Sieglinde Baumann
- years_in_business: 30
- price_range: €€
- serve_cuisine: Austrian, Traditional
- aesthetic_hint: rustic warm
- tier: standard
- client_slug: gasthaus-stern

## Kontakt & Adresse
- address_street: St.-Peter-Straße 31
- address_city_zip: 6700 Bludenz
- address_region: Vorarlberg, Österreich
- phone: +43 5552 62390
- email: kontakt@gasthaus-stern.at
- geo_lat: 47.14905
- geo_lng: 9.82680
- google_place_id: ChIJT0O_CMxPm0cRuCDf6R0Wql8

## Öffnungszeiten
- hours:
  - Montag: Ruhetag
  - Dienstag: Ruhetag
  - Mittwoch: 09:00–22:00
  - Donnerstag: 09:00–22:00
  - Freitag: 09:00–22:00
  - Samstag: 09:00–22:00
  - Sonntag: 09:00–14:00
- kitchen_hours: "11:30–14:00 und 16:30–21:00"

## Kapazitäten & Räumlichkeiten
- space_restaurant:
    seats: 50
    description: "Gemütlich, mit Kamin und ehrlicher Wirtshaus-Atmosphäre. Rollstuhlgerecht. Ideal für ein ruhiges Abendessen oder die Stammtischrunde am Mittwoch."
    photo_keywords: "traditional austrian inn interior wood warm light"
- space_garden:
    seats: 160
    description: "Im Schatten unserer alten Kastanienbäume. In der warmen Jahreszeit unser Herzstück. Biker willkommen, Hunde erlaubt."
    photo_keywords: "outdoor beer garden chestnut tree dappled light wooden tables"
- space_saal:
    seats: 80
    description: "Geburtstage, Hochzeiten im kleineren Rahmen, Vereinsfeste, Firmenfeiern. Im Sommer regelmäßig Live-Musik. Partyservice auf Anfrage."
    photo_keywords: "festive banquet hall set table candles austrian"
    mailto_subject: "Saal-Anfrage Gasthaus Stern"
    mailto_body_template: "Datum: ___, Anlass: ___, Gäste: ___"

## Speisekarte (Vorschau)
menu_items:
  - name: Wiener Schnitzel vom Kalb
    description: mit Petersilkartoffeln und Preiselbeeren
    price: "€ 19,80"
    category: Hauptspeise
    dietary: []
  - name: Käsespätzle
    description: mit gerösteten Zwiebeln und Salat
    price: "€ 13,50"
    category: Hauptspeise
    dietary: [veg]
  - name: Cordon Bleu vom Schwein
    description: mit Pommes frites
    price: "€ 18,90"
    category: Hauptspeise
    dietary: []
  - name: Rindergulasch
    description: mit hausgemachten Semmelknödeln
    price: "€ 16,50"
    category: Hauptspeise
    dietary: []
  - name: Grillteller "Stern"
    description: gemischte Grillspezialitäten vom Spieß
    price: "€ 22,80"
    category: Hauptspeise
    dietary: []
  - name: Hausgemachter Apfelstrudel
    description: mit Vanilleeis oder Schlagobers
    price: "€  6,50"
    category: Dessert
    dietary: [veg]

tagesangebot:
  description: "Mo–Fr wechselnd, von 11:30 bis 14:00. Suppe + Hauptspeise"
  hours: "11:30–14:00"
  price_from: "€ 11,90"

## Über uns
about_headline_1: "Seit über 30 Jahren"
about_headline_2: "unsere Familie. Ihr Wirtshaus."
about_body_1: >
  Wir sind ein kleiner Gastronomiebetrieb im Herzen von Bludenz. Seit nun mehr als 30 Jahren führen wir unser Gasthaus als Familienbetrieb. Dabei schätzen unsere Gäste nicht nur unsere gutbürgerlichen Speisen, sondern auch das ein oder andere Getränk in geselliger Runde. Auch in unserem geschätzten Gastgarten verweilt man in der warmen Jahreszeit im Schatten unserer Kastanien sehr gerne.
about_body_2: >
  Unser Haus liegt im südlichen Stadtteil St. Peter, nur wenige Schritte vom Kloster St. Peter entfernt — einer der geschichtsträchtigsten Adressen der Stadt. Vom Bahnhof Bludenz erreichen Sie uns in etwa zehn Minuten zu Fuß.
about_signature: "— Sieglinde Baumann"
about_photo_keywords: "austrian inn facade old building summer"

## Hero
hero_eyebrow: "SEIT ÜBER 30 JAHREN"
hero_line_1: "Gutbürgerlich"
hero_line_2: "unter den Kastanien."
hero_subline: >
  Kleines, familiengeführtes Wirtshaus in Bludenz. Echte österreichische Küche. Schattiger Gastgarten. Ein Saal für Ihre Feier.
hero_photo_keywords: "chestnut beer garden austrian inn summer afternoon"

## USP Strip
usp_1:
  icon: TreePine
  title: Gastgarten unter Kastanien
  body: "Bis zu 160 Plätze im Schatten alter Bäume."
usp_2:
  icon: UtensilsCrossed
  title: Gutbürgerliche Küche
  body: "Schnitzel, Käsespätzle, Apfelstrudel — wie es sein soll."
usp_3:
  icon: PartyPopper
  title: Saal für Ihre Feier
  body: "Geburtstage, Hochzeiten, Vereinsfeste bis 80 Personen."

## Bewertungen
review_aggregate:
  google_stars: "4,4"
  google_count: 203
  tripadvisor_stars: "4,5"
reviews:
  - quote: "Sehr gute, gut bürgerliche Küche. Freundliche Bedienung. Schöner schattiger Gastgarten. Sehr zu empfehlen. Gute Auswahl an Nachspeisen. Eis, Apfelstrudel. Biker willkommen."
    author: Reinhold T.
    source: Google
  - quote: "Wir kommen schon 10 Jahre bei De Stern und immer ist das Essen und die Stimmung sehr gut."
    author: Langjähriger Stammgast
    source: TripAdvisor
  - quote: "Personal sehr nett und sehr flott. Essen war sehr gut und ging sehr rasch. Schöner Gastgarten mit Beschattung. Kommen jederzeit sehr gerne wieder."
    author: Martina J.
    source: Google

## Social & Legal
facebook_url: https://www.facebook.com/Gasthaus-Stern-343206389646351/
copyright_name: "Sieglinde Baumann e.U."
copyright_year: "2026"

## Logo
logo_description: >
  Fünfzackiger Stern, leicht abgerundete Spitzen, einfarbig — im Accent-Farbton oder dunkel.
  Als Inline-SVG nachbauen (28px nav / 32px footer).
```

---

## 2. Aesthetic Presets

Read `aesthetic_hint` from Brief.md and select the closest matching preset. When in doubt, default to **Sommerwirtschaft**.

| Hint keywords | Preset |
|---|---|
| rustic, warm, cozy, Biergarten, Wirtshaus, family | **A. Sommerwirtschaft** |
| dark, alpine, mountain, lodge, Hütte, premium, moody | **B. Alpenabend** |
| modern, urban, bistro, Brasserie, minimal, clean | **C. Stadtbrasserie** |
| wine, traditional, baroque, elegant, Weinschenke, fine | **D. Weinschenke** |

### Preset A — "Sommerwirtschaft" (warm rustic)

```css
--base:         #F4EDE0   /* page background */
--surface:      #E8DFD0   /* card / panel surface */
--primary:      #7A8B6F   /* sage — structure, navbar fill */
--primary-deep: #5A6B53   /* primary hover / borders */
--accent:       #D4A24C   /* amber — CTAs, hover underlines, the star logo */
--accent-deep:  #B5852E   /* accent hover */
--dark:         #5C3D2E   /* chestnut — dark surfaces, footer */
--text:         #2A1F18   /* ink — body text */
--cta-strong:   #7A2E2A   /* bordeaux — reservation CTA (sparingly) */
```
**Fonts:** Fraunces (display, variable wght+SOFT+opsz+italic) + Inter (body 400/500/600) + Caveat (signature only)  
**Google Fonts URL:**
```
https://fonts.googleapis.com/css2?family=Caveat&family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..700,0..100;1,9..144,300..700,0..100&family=Inter:wght@400;500;600&display=swap
```
**Texture:** SVG `feTurbulence baseFrequency="0.9" numOctaves="2"` at 0.06 opacity (craft paper feel)  
**Shadows:** `0 20px 60px -30px rgba(92,61,46,0.25)` (chestnut-tinted, never neutral black)  
**Radius:** pill = `rounded-full` · cards = `rounded-2xl` · panels = `rounded-[2rem]`

---

### Preset B — "Alpenabend" (alpine dark)

```css
--base:         #141A1F   /* near-black — page background */
--surface:      #1E2830   /* slate surface */
--primary:      #2E5266   /* slate blue */
--primary-deep: #1D3A4D   /* primary hover */
--accent:       #C89B3C   /* warm gold */
--accent-deep:  #A67C20   /* gold hover */
--dark:         #0D1115   /* deepest dark — footer */
--text:         #E8E0D0   /* warm off-white — body text */
--cta-strong:   #3A7D44   /* forest green — reservation CTA */
```
**Fonts:** Playfair Display (display 400/700 italic) + Inter (body 400/500/600)  
**Google Fonts URL:**
```
https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@400;500;600&display=swap
```
**Texture:** Subtle noise at 0.04 opacity  
**Shadows:** `0 20px 60px -30px rgba(0,0,0,0.6)` (deep black, noir feel)  
**Radius:** pill = `rounded-full` · cards = `rounded-xl` · panels = `rounded-2xl`

---

### Preset C — "Stadtbrasserie" (urban modern minimal)

```css
--base:         #F7F5F2   /* warm off-white */
--surface:      #EFECE7   /* light sand */
--primary:      #2D2D2D   /* near-black charcoal */
--primary-deep: #1A1A1A   /* deep charcoal */
--accent:       #C4612B   /* terracotta */
--accent-deep:  #A34D22   /* terracotta hover */
--dark:         #1A1A1A   /* footer */
--text:         #2D2D2D   /* body text */
--cta-strong:   #C4612B   /* same as accent for this preset */
```
**Fonts:** DM Serif Display (display 400/italic) + DM Sans (body 400/500/600)  
**Google Fonts URL:**
```
https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&display=swap
```
**Texture:** None — clean surfaces  
**Shadows:** `0 4px 24px -8px rgba(45,45,45,0.15)` (subtle, neutral)  
**Radius:** pill = `rounded-full` · cards = `rounded-lg` · panels = `rounded-xl`

---

### Preset D — "Weinschenke" (wine traditional)

```css
--base:         #F5EFE0   /* aged parchment */
--surface:      #EDE4D0   /* warm parchment */
--primary:      #6B1A2A   /* deep burgundy */
--primary-deep: #4F1220   /* burgundy hover */
--accent:       #B8943A   /* antique gold */
--accent-deep:  #956F20   /* gold hover */
--dark:         #2A1018   /* very deep wine — footer */
--text:         #2A1F18   /* dark ink */
--cta-strong:   #3D5A2A   /* dark olive — reservation CTA */
```
**Fonts:** Cormorant Garamond (display 300/400/600/italic) + Libre Baskerville (body 400/700)  
**Google Fonts URL:**
```
https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap
```
**Texture:** SVG paper grain at 0.05 opacity  
**Shadows:** `0 20px 60px -30px rgba(107,26,42,0.30)` (burgundy-tinted)  
**Radius:** pill = `rounded-full` · cards = `rounded-xl` · panels = `rounded-2xl`

---

## 3. Universal Design System Rules

These rules apply to **all presets** — they define the premium quality floor.

### Color usage
- `--base` is the page color of every section unless explicitly inverted.
- `--primary` is structure: navbar background (scrolled), footer, section dividers.
- `--accent` is the spark: logo mark, link hover underlines, icon fills, price highlights, "Heute geöffnet" dot.
- `--cta-strong` is the single strongest call-to-action (Tisch reservieren button) — use it nowhere else.
- Never use `--primary` for body text on `--base` backgrounds — it may fail AA contrast. Use `--text` instead.

### Corner radius scale
- `rounded-full` — pills, navbar, tags, badges, form inputs
- `rounded-2xl` — image containers in cards, small cards
- `rounded-[2rem]` — large panels (menu card, reservations form, testimonial cards)
- `rounded-t-[4rem]` — footer top edge only (upward curve)

### Shadow system
Every shadow uses the preset's specified formula — never `shadow-sm` defaults (too neutral). Name the custom token `warm` or `deep` in tailwind.config.js:
```js
boxShadow: {
  warm:    '0 20px 60px -30px rgba(VAR_R,VAR_G,VAR_B,0.25)',
  'warm-sm': '0 8px 24px -12px rgba(VAR_R,VAR_G,VAR_B,0.20)',
  luxury:  '0 30px 80px -40px rgba(VAR_R,VAR_G,VAR_B,0.30)',
}
```
Replace `VAR_R,VAR_G,VAR_B` with the `--dark` color's RGB components.

### Micro-interactions

**Buttons (primary, CTA-strong):**
- Shape: `rounded-full`, `px-6 py-3`
- Hover: `scale(1.04)`, timing `cubic-bezier(0.34, 1.56, 0.64, 1)` 240ms (spring overshoot — feels like settling into a chair)
- Fill wipe: a `<span>` overlay slides left→right on hover (240ms, `ease-out`), primary → primary-deep

**Links:**
- Underline grows from left to right on hover (240ms `ease-out`) using `scaleX(0→1)` on a `::after` pseudo-element
- Color of underline: `--accent`
- Optional `translateY(-1px)` lift

**Menu item rows:**
- `translateY(-2px)` + shadow on hover
- Price dotted leader line: `border-bottom: 2px dotted --surface` between name and price (classic Speisekarten-Typografie)

**Cards:**
- Hover: `translateY(-4px)` + shadow deepens, 300ms `ease-out`
- Image inside card: `scale(1.04)` 700ms `ease-out` (creates a subtle zoom as card lifts)

### Animation system (GSAP + ScrollTrigger)

All scroll-driven animations follow this pattern:
```js
// Inside each component, in useEffect:
const ctx = gsap.context(() => {
  gsap.fromTo(ref.current, 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.9, ease: 'sine.out',
      scrollTrigger: { trigger: ref.current, start: 'top 75%' } }
  );
}, ref);
return () => ctx.revert();
```

Standard values:
- **Duration:** 0.8–1.2s for single elements, 0.7–0.9s for stagger items
- **Easing:** `sine.out` for entrances (breath-like), `power2.inOut` for morphs
- **Stagger:** `0.12s` between text lines, `0.18s` between cards/rows
- **Scroll trigger start:** `'top 75%'` for section contents, `'top 85%'` for footers
- **Hero:** timeline on mount, not scroll-triggered

Hero entrance sequence:
1. Eyebrow: `y: 20→0, opacity: 0→1`, 0.7s, `sine.out`
2. H1 line 1: clip-path mask `inset(100% 0 0 0 → 0 0 0 0)`, 1.2s, `sine.out`, delay 0.5s
3. H1 line 2: same, delay 1.3s
4. Subline: `y: 20→0, opacity: 0→1`, 0.8s, delay 2.0s
5. CTA buttons: stagger 0.12s, delay 2.3s

Respect `prefers-reduced-motion`:
```js
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReduced) return; // skip all gsap animations
```

### Typography scale (responsive — all presets)

```css
/* Display headlines */
.text-display-xl  { font-size: clamp(2.5rem, 7vw, 5.5rem); }
.text-display-lg  { font-size: clamp(2rem, 5vw, 4rem); }
.text-display-md  { font-size: clamp(1.5rem, 3.5vw, 3rem); }

/* Body */
.text-body-lg     { font-size: clamp(1rem, 1.2vw, 1.125rem); }
```

Use `clamp()` values for all display headings — never fixed px for h1/h2.

### Spacing rhythm

| Breakpoint | Section vertical padding |
|---|---|
| Mobile (`< md`) | `py-16` |
| Tablet/Desktop (`≥ md`) | `py-28` |

Use `md:py-28 py-16` pattern throughout.

---

## 4. Section Architecture

All `{{VARIABLE}}` tokens must be filled from Brief.md before building. Missing optional fields → skip that element.

---

### A. NAVBAR

**Structure:** Fixed, horizontally centered floating pill, `max-w-4xl`, `top-4`.

**Scroll behavior:** Uses `IntersectionObserver` on a `#hero-sentinel` element at 60vh depth.
- Above sentinel (at top): `bg-[var(--base)]/30 backdrop-blur-sm` — light, transparent
- Below sentinel (scrolled): `bg-[var(--base)]/92 backdrop-blur-2xl border border-[var(--accent)]/20 shadow-warm-sm`
- Transition: all 300ms ease

**Desktop contents (left → right):**
1. Inline SVG logo (accent color, 28px) + `{{CLIENT_NAME}}` in display font 600, 18px, `--text`
2. Nav links (sans 500, 14px): `Speisekarte` · `{{SPACES_NAV_LABEL}}` · `Über uns` · `Kontakt`
   - *`{{SPACES_NAV_LABEL}}`* = "Gastgarten & Saal" / "Räumlichkeiten" / "Unser Haus" depending on what spaces exist
3. CTA pill: "Tisch reservieren" — `--cta-strong` fill, `--base` text

**Mobile (< 768px):** Logo + hamburger only. Hamburger opens a full-bleed `--base` sheet with 4 nav links stacked in display font 32px each + CTA at bottom.

**Logo SVG:** Build inline from `logo_description` in Brief.md. If description says "existing_svg", import from `src/components/icons/BrandLogo.jsx`.

---

### B. HERO

**Layout:** `min-h-[100dvh] min-h-[720px]`, full-bleed background photo. Content bottom-left, `pl-8 md:pl-20 pb-24`.

**Photo:** Unsplash URL based on `{{HERO_PHOTO_KEYWORDS}}` from Brief.md. Format:
```
https://images.unsplash.com/photo-[ID]?w=1600&q=80
```
Search Unsplash for the keywords and pick the warmest, most atmospheric frame.

**Overlay:** `bg-gradient-to-t from-[var(--dark)]/70 via-[var(--dark)]/20 to-transparent`

**Content:**
```
Eyebrow (sans 500, 13px, tracking-widest, --accent, uppercase):
{{HERO_EYEBROW}}

H1 Line 1 (display 600, clamp(2.5rem,7vw,5.5rem), --base, SOFT:80 if Fraunces):
{{HERO_LINE_1}}

H1 Line 2 (display italic 400, clamp(3.5rem,11vw,8.75rem), --accent, SOFT:100 if Fraunces, line-height:0.95):
{{HERO_LINE_2}}

Subline (sans 400, 18px, --base/90, max-width 52ch):
{{HERO_SUBLINE}}
```

**CTA row:**
- Primary pill (`--cta-strong`): "Tisch reservieren" → `#kontakt`
- Ghost pill (`--base` border, `--base` text, `--accent` on hover): "Zur Speisekarte" → `#speisekarte`

**Ambient (Preset A only):** 3–5 SVG leaf/decorative shapes drifting diagonally at 0.04 opacity, 28–48s loop. Disable on mobile and `prefers-reduced-motion`.

---

### C. USP STRIP

**Layout:** Thin horizontal band on `--base`. Three columns (1col → 3col responsive). Amber hairline dividers top and bottom (`h-px bg-[var(--accent)]/30 w-32 mx-auto`).

**Each USP:**
- Icon: lucide-react `{{USP_N_ICON}}` in a circle (`--primary` fill, 40px)
- Title: display 500, 20px, `--text`
- Body: sans 400, 14px, `--text/70`

**Content from Brief.md:**
```
USP 1: icon={{USP_1_ICON}} title="{{USP_1_TITLE}}" body="{{USP_1_BODY}}"
USP 2: icon={{USP_2_ICON}} title="{{USP_2_TITLE}}" body="{{USP_2_BODY}}"
USP 3: icon={{USP_3_ICON}} title="{{USP_3_TITLE}}" body="{{USP_3_BODY}}"
```

**Animation:** GSAP stagger `0.18s` on scroll at `top 80%`.

---

### D. SPEISEKARTE PREVIEW

**Layout:** `bg-[var(--base)]`, `py-28`. Asymmetric two-column desktop (40%/60%). Below: Tagesmenü band if `tagesangebot` exists in Brief.md.

**Left column (40%):**
- Section label: sans 500, 13px, tracking-wider, `--accent`, uppercase: "SPEISEKARTE"
- H2 display italic: "Was bei uns auf den Tisch kommt." (or equivalent — adapt to Brief.md's cuisine/tone)
- Body paragraph: owner's description of cooking philosophy (derive from `about_body_1` or write a short intro — keep it honest, never marketing-speak)
- CTA link: "Vollständige Speisekarte als PDF →" (`href="#"` with `// TODO: replace with real PDF URL` comment)

**Right column (60%):**
A `--surface` card (`rounded-[2rem]`, `p-10`, `shadow-luxury`):
- Header: sans 500, 13px, tracking-wider, `--accent`: "AUSWAHL · à la carte"
- 6 menu items from `menu_items` in Brief.md, formatted as:

```
[name]   (display 500, 18px, --text)     [price]  (sans 500, 16px, --text, right-aligned)
[desc]   (sans 400, 14px, --text/70)
────────────────────────────────────── (dotted border separator)
```

Dotted leader line implementation:
```css
.menu-row {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: baseline;
}
.menu-row-name::after {
  content: '';
  display: block;
  border-bottom: 2px dotted var(--surface);
  margin: 0 8px;
  flex: 1;
}
```

If `dietary` array contains `veg`, `vegan`, or `gf` → show a small pill badge next to the name.

> **Code comment on all prices:** `// TODO: aktuelle Preise einsetzen`

**Below menu card (if `tagesangebot` exists):**
A `--primary` band (`rounded-[2rem]`, `p-8`, `--base` text):
> **Mittagsmenü.** `{{TAGESANGEBOT_DESCRIPTION}}`. `{{TAGESANGEBOT_HOURS}}`. Suppe + Hauptspeise `{{TAGESANGEBOT_PRICE_FROM}}`.
> *Tagesaktuell unter `{{PHONE}}`.*

**Animation:** Left column `y: 30→0, opacity: 0→1` first (0.8s), then menu rows stagger `0.08s` between rows. ScrollTrigger at `top 75%`.

---

### E. RÄUMLICHKEITEN

**When to render:** Always — every Gasthaus has at least a restaurant. Render only the cards for spaces that exist in Brief.md (`space_restaurant` always, `space_garden` if present, `space_saal` if present).

**Layout:** `bg-[var(--surface)]`, `py-28`. Section label + centered H2 display italic: "Unsere Räumlichkeiten." (or adapt). Three-card grid (1col → 2col → 3col responsive, auto-adjust if only 2 cards).

**Each card** (`bg-[var(--base)]`, `rounded-[2rem]`, `overflow-hidden`, `shadow-luxury`):
- Image top (16:10 aspect): Unsplash photo from `photo_keywords`. `hover:scale-105` 700ms ease.
- Heading: display 500, 28px, `--text`
- Capacity badge: small `--accent` pill, sans 500, 12px: "ca. {{SEATS}} Plätze"
- Body: sans 400, 15px. Use `description` from Brief.md verbatim.
- CTA link (`--accent` underline wipe):
  - Restaurant: "Tisch reservieren →" → `#kontakt`
  - Gastgarten: "Reservierung erbeten →" → `#kontakt`
  - Saal: "Saal-Anfrage senden →" → `mailto:{{EMAIL}}?subject={{MAILTO_SUBJECT}}&body={{MAILTO_BODY}}`

**Animation:** Cards stagger `y: 40→0, opacity: 0→1`, `0.18s` between cards, `sine.out`.

---

### F. VERANSTALTUNGEN *(optional — render only if `events` array in Brief.md is non-empty)*

**Layout:** `bg-[var(--base)]`, `py-28`. Section label "VERANSTALTUNGEN" + H2 display: "Was bei uns los ist."

**Content:** A card or list for each event. Each item:
- Date/recurrence: sans 500, 14px, `--accent`, tracking-wider
- Title: display 500, 24px, `--text`
- Description: sans 400, 15px, `--text/70`
- Tag if `recurring: true`: small `--primary/15` pill "Regelmäßig"

**Layout:** Auto-grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, card style matching Räumlichkeiten.

---

### G. ZIMMER *(optional — render only if `rooms` array in Brief.md is non-empty)*

**Layout:** `bg-[var(--surface)]`, `py-28`. Section label "ÜBERNACHTUNG" + H2 display italic: "Schlafen, wo man gut isst."

**Each room card:**
- Image from `photo_keywords`
- Room name: display 500, 24px
- Capacity: sans 400, 14px, `--text/70`
- Description: verbatim from Brief.md
- CTA: "Zimmer anfragen →" → `mailto:{{EMAIL}}?subject=Zimmer-Anfrage`

---

### H. ÜBER UNS

**Layout:** `bg-[var(--base)]`, `py-28 md:py-36`. Asymmetric editorial: image left (40%), text right (60%).

**Left:** Portrait or building photo from `{{ABOUT_PHOTO_KEYWORDS}}`. `rounded-[2rem]`, `shadow-luxury`. Parallax: `y: 0 → -40px` over section scroll (GSAP ScrollTrigger scrub).

**Right:**
- Eyebrow: sans 500, 13px, tracking-wider, `--accent`, uppercase: "ÜBER UNS"
- H2 display italic, `clamp(2.5rem,5vw,4.5rem)`, `--text`:
  ```
  {{ABOUT_HEADLINE_1}}
  {{ABOUT_HEADLINE_2}}
  ```
- Body 1 (sans 400, 17px, `--text`, max-width 56ch): **`{{ABOUT_BODY_1}}`** — verbatim, do NOT paraphrase
- Body 2 (sans 400, 16px, `--text/80`): `{{ABOUT_BODY_2}}`
- Signature: Caveat 400, 36px (or display italic for non-Preset-A), `--text`, mt-8: `{{ABOUT_SIGNATURE}}`

**Animation:** Image parallax (scrub). Text lines reveal stagger `0.12s, sine.out`. Signature fades last (1.2s delay).

---

### I. BEWERTUNGEN

**Layout:** Full-width inverted section on `--primary`, `py-28`, `--base` text.

**Header (centered):**
- Label: "BEWERTUNGEN", sans 500, 13px, tracking-wider, `--accent`
- H2 display italic: "Was unsere Gäste sagen."

**Trust strip (centered, below H2):**
- 5 filled star icons (`--accent`)
- `{{REVIEW_GOOGLE_STARS}} / 5 auf Google · {{REVIEW_GOOGLE_COUNT}} Bewertungen`
- If TripAdvisor stars present: `· ★ TripAdvisor {{REVIEW_TRIPADVISOR_STARS}}/5` pill

**Three testimonial cards** (`bg-[var(--base)]/8 backdrop-blur-sm border border-[var(--base)]/15`, `rounded-[2rem]`, `p-10`):
- Large `--accent` opening quote glyph (display italic 400, 80px, line-height: 0.5): `"`
- Quote (display italic 400, 19px, `--base`): `{{REVIEW_N_QUOTE}}`
- Attribution (sans 500, 14px, `--accent`, mt-6): `— {{REVIEW_N_AUTHOR}}, {{REVIEW_N_SOURCE}}`

Use **real quotes** from Brief.md. Never invent testimonials.

**Animation:** Cards stagger `y: 40→0, opacity: 0→1`, `0.18s` between.

---

### J. KONTAKT & ANFAHRT

**Layout:** `bg-[var(--base)]`, `py-28`. Two-column desktop (50/50): left = info, right = map. Full-width reservation form below.

**Left column:**

"Heute geöffnet"-pill (computed via `isOpenNow()` from `oeffnungszeiten.js`):
- Open: pulsing `--primary` dot + "Heute geöffnet · bis `{{CLOSE_TIME}}`" (sage/primary pill)
- Closed: "Heute Ruhetag" (surface pill, no dot)

Display H2 italic: "Schauen Sie auf einen Sprung vorbei." (or equivalent — can adapt to local idiom from Brief.md region)

Address block (sans 400, 16px, `--text`, mb-8):
```
{{CLIENT_NAME}}
{{ADDRESS_STREET}}
{{ADDRESS_CITY_ZIP}}, Österreich

Tel.  {{PHONE}}   (tel: link)
Mail  {{EMAIL}}   (mailto: link)
```

Öffnungszeiten table (two-column: day + hours, Inter 500/400):
```
Montag     [Ruhetag / HH:MM – HH:MM]
Dienstag   [...]
...
```
Add italic note below: "Küche: `{{KITCHEN_HOURS}}`"

**Right column:**
Google Maps iframe. Use Place ID if available, else `q={{GEO_LAT}},{{GEO_LNG}}` in embed URL:
```html
<iframe
  src="https://www.google.com/maps/embed/v1/place?key=YOUR_KEY&q={{GEO_LAT}},{{GEO_LNG}}"
  ...
/>
```
If no API key: use direct embed URL without key:
```
https://maps.google.com/maps?q={{GEO_LAT}},{{GEO_LNG}}&output=embed
```
Wrap in `rounded-[2rem]` overflow-hidden + shadow. Below: "Route in Google Maps öffnen →" link.

**Reservation form** (full-width, `--surface` card, `rounded-[2rem]`, `p-10`):
Fields: Name · Telefon oder E-Mail · Datum · Uhrzeit · Personenzahl · Nachricht  
Submit button (`--cta-strong` pill): "Anfrage senden"

Form submission:
- **If mailto**: build `mailto:{{EMAIL}}?subject=Reservierungsanfrage&body=...` URL, open on submit
- **If Formspree**: POST to `https://formspree.io/f/{{FORMSPREE_ID}}` — add `FORMSPREE_ID` as `.env` variable

Below form (sans 400, 13px, `--text/60`, italic):
> Für kurzfristige Reservierungen rufen Sie uns bitte direkt an: **`{{PHONE}}`**.

---

### K. FOOTER

**Layout:** `bg-[var(--dark)]`, `--base` text, `rounded-t-[4rem]`, `py-20`.

Four-column desktop grid (→ 1col on mobile):

**Col 1 — Brand:**
- Logo SVG + `{{CLIENT_NAME}}` (display 500, 22px, `--base`)
- Tagline (sans 400, 14px, `--base/70`): `{{TAGLINE}}`
- "Heute geöffnet" mini-indicator (same logic as Kontakt, smaller)

**Col 2 — Navigation:**
Heading "Entdecken" (display 500, 16px, `--accent`). Links (sans 400, 14px, `--base/80`):
Speisekarte · `{{SPACES_NAV_LABEL}}` · Über uns · Kontakt

**Col 3 — Adresse & Kontakt:**
Heading "Besuchen". Address, phone, email — all `tel:`/`mailto:` linked.

**Col 4 — Folgen:**
Heading "Folgen". Links to `{{FACEBOOK_URL}}` and `{{INSTAGRAM_URL}}` if present in Brief.md. Below: legal row in sans 400, 12px, `--base/60`: "Impressum" · "Datenschutz" · "© `{{COPYRIGHT_YEAR}}` `{{COPYRIGHT_NAME}}`"

**Bottom strip** (border-t `--base/10`, mt-12, pt-8, sans 400, 12px, `--base/50`, centered):
"Made with care in `{{ADDRESS_REGION}}`."

---

## 5. Technical Requirements

### Stack (NEVER CHANGE)

| Layer | Technology |
|---|---|
| Build | Vite + React 19 |
| Styling | Tailwind CSS v3.4.17 |
| Animations | GSAP 3 + ScrollTrigger |
| Icons | lucide-react |
| Fonts | Google Fonts via `<link>` |

No chart library. No UI kit. No animation framework besides GSAP. All components hand-built.

### File structure

```
{{CLIENT_SLUG}}/
  src/
    App.jsx
    index.css           — Tailwind directives + CSS variables + texture
    main.jsx
    components/
      Navbar.jsx
      Hero.jsx
      UspStrip.jsx
      SpeisekartePreview.jsx
      Raeumlichkeiten.jsx
      Veranstaltungen.jsx     (only create if events present)
      Zimmer.jsx              (only create if rooms present)
      UeberUns.jsx
      Bewertungen.jsx
      Kontakt.jsx
      Footer.jsx
      icons/BrandLogo.jsx
    data/
      speisen.js          — menu items array from Brief.md
      bewertungen.js      — testimonials from Brief.md
      oeffnungszeiten.js  — hours + isOpenNow() helper
  index.html              — SEO: title, OG, JSON-LD schema
  public/
    textures/             — paper texture PNG or SVG filter (Preset A/D)
  .env                    — VITE_CONTACT_EMAIL, VITE_FORMSPREE_ID
```

### Core Web Vitals targets

| Metric | Target | What to watch |
|---|---|---|
| LCP | < 2.5s | Hero image must have `fetchpriority="high"`, no lazy loading |
| INP | < 200ms | Keep JS bundles lean; no blocking third-party scripts |
| CLS | < 0.1 | All images need explicit `width`/`height` or `aspect-ratio`; fonts use `display=swap` |

### Image strategy

1. Every `<img>` tag gets a `// TODO: replace with real client photo` comment
2. Use real Unsplash URL (not placeholder.png): `https://images.unsplash.com/photo-[ID]?w=1600&q=80`
3. Hero image: `fetchpriority="high"`, no `loading="lazy"`
4. All other images: `loading="lazy"`, explicit `width`/`height` attributes
5. Alt text: descriptive German text ("Gastgarten unter Kastanienbäumen im Sommer") — never "image" or "photo"

### SEO (wire in index.html)

```html
<title>{{CLIENT_NAME}} {{ADDRESS_CITY_ZIP}} — {{TAGLINE}}</title>
<meta name="description" content="{{SEO_DESCRIPTION}}">
<meta property="og:type" content="website">
<meta property="og:title" content="{{CLIENT_NAME}} — {{TAGLINE}}">
<meta property="og:description" content="{{SEO_DESCRIPTION}}">
<meta property="og:image" content="{{HERO_PHOTO_URL}}">
```

`{{SEO_DESCRIPTION}}` formula: "Familiengeführtes [serve_cuisine] in [city] seit über [years] Jahren. [USP1 title]. [USP2 title]. [USP3 title]."

JSON-LD Restaurant Schema:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "{{CLIENT_NAME}}",
  "description": "{{TAGLINE}}",
  "url": "https://{{CLIENT_SLUG}}.at",
  "telephone": "{{PHONE}}",
  "email": "{{EMAIL}}",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{{ADDRESS_STREET}}",
    "addressLocality": "{{ADDRESS_CITY}}",
    "postalCode": "{{ADDRESS_ZIP}}",
    "addressCountry": "AT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": {{GEO_LAT}},
    "longitude": {{GEO_LNG}}
  },
  "openingHoursSpecification": [
    // one object per open day, e.g.:
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Wednesday", "opens": "09:00", "closes": "22:00" }
  ],
  "priceRange": "{{PRICE_RANGE}}",
  "servesCuisine": "{{SERVE_CUISINE}}",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{{REVIEW_GOOGLE_STARS}}",
    "reviewCount": "{{REVIEW_GOOGLE_COUNT}}"
  }
}
</script>
```

### Accessibility

- All `<img>` tags: descriptive German `alt` text
- Form labels: explicitly associated to inputs via `htmlFor` / `id` pairs
- All interactive elements: `focus-visible` ring — `outline: 2px solid var(--accent); outline-offset: 2px`
- `aria-live="polite"` on reservation form success state
- `prefers-reduced-motion`: wrap all GSAP `fromTo` calls behind the check; replace with instant reveals
- Contrast: verify `--text` on `--base` and `--base` on `--dark` both meet WCAG AA (4.5:1 minimum). For Preset A, never use `--primary` (sage) for body text on `--base` (cream) — use `--text` (ink).
- Semantic heading hierarchy: one `<h1>` (Hero), then `<h2>` per section, `<h3>` for cards
- Keyboard: mobile menu opens/closes with Escape key; focus trap inside open menu

---

## 6. Feature Tier System

The `tier` field in Brief.md determines which features to build. If Brief.md omits it, default to **standard**.

### Basic (≈ €1,500–€2,500)

A clean, professional brochure site. Everything a local Gasthaus needs on day 1.

**Includes:**
- Sections A (Navbar) through K (Footer)
- Optional sections F/G skipped even if data present
- `mailto:` reservation form
- Static menu in `speisen.js` (no filtering, no categories)
- Google Maps iframe embed
- JSON-LD schema + OG meta
- "Heute geöffnet" live indicator
- Mobile responsive, GSAP entrance animations
- Accessibility (WCAG AA)

**Skip:** Formspree, multi-page routing, gallery, language switcher, analytics, cookie banner

---

### Standard (≈ €2,500–€5,000)

A full professional site. Adds real email delivery and richer content display.

**All Basic features, plus:**
- Formspree or EmailJS reservation form (real email delivery, no backend server needed)
- Menu split by category (Vorspeisen / Hauptspeisen / Desserts / Getränke) with tab or section filter
- Dietary badges on menu items (🥦 vegetarisch · 🌱 vegan · 🌾 glutenfrei)
- Optional section F (Veranstaltungen) if events in Brief.md
- Optional section G (Zimmer) if rooms in Brief.md
- Multi-page routing via React Router: `/` (main) + `/speisekarte` (full menu page)
- Impressum page stub (`/impressum`) with placeholder legal text
- Datenschutz page stub (`/datenschutz`) with DSGVO placeholder text
- `robots.txt` and `sitemap.xml` stub

---

### Pro (≈ €5,000–€10,000)

Full business website. Maximum conversion and SEO value. The €5k–€10k package.

**All Standard features, plus:**
- Full-screen photo gallery with lightbox (section between Räumlichkeiten and Über uns)
  - Grid of 8–12 photos, `rounded-2xl` tiles, click → full-screen overlay with arrow navigation
  - Use `@fancyapps/ui` Fancybox or a hand-built lightbox (no jQuery)
- Seasonal menu toggle (Sommerkarte / Winterkarte) — toggle in Speisekarte section header, persists in `localStorage`
- Language switcher (DE / EN) — pill toggle in Navbar, top-right; use `i18next` with JSON translation files
  - `public/locales/de/translation.json` and `en/translation.json`
  - All visible text strings externalized; no hardcoded German text in JSX
- Google Analytics 4: `import ReactGA from 'react-ga4'`, initialize in `App.jsx` with `VITE_GA_MEASUREMENT_ID`
- Cookie consent banner (DSGVO-compliant): appears on first visit, gates GA4 initialization
  - Simple hand-built banner (cream/chestnut, bottom of screen), not a third-party widget
  - Stores consent in `localStorage` key `cookieConsent`
- PWA manifest (`public/manifest.json`) + service worker stub (`public/sw.js`)
  - Enables "Add to Home Screen" on mobile
  - Service worker: cache-first for assets, network-first for data
- `sitemap.xml` generated via `vite-plugin-sitemap` (add to devDependencies)

---

## 7. Build Sequence

Follow these steps in order. A fresh agent in a clean directory should be able to execute this from start to finish.

```bash
# 1. Scaffold
npm create vite@latest {{CLIENT_SLUG}} -- --template react
cd {{CLIENT_SLUG}}
npm install

# 2. Styling & animation dependencies
npm install -D tailwindcss@3.4.17 postcss autoprefixer
npx tailwindcss init -p
npm install gsap lucide-react

# 3. Standard tier extras
npm install react-router-dom   # if tier >= standard

# 4. Pro tier extras (only if tier === pro)
npm install react-ga4 i18next react-i18next @fancyapps/ui
npm install -D vite-plugin-sitemap
```

**Configuration order:**
1. `tailwind.config.js` — add palette (from selected preset), fontFamily (display/sans/script), boxShadow tokens
2. `src/index.css` — `@tailwind` directives, `:root` CSS variables (selected preset), global focus ring, texture SVG filter
3. `index.html` — Google Fonts `<link>`, `<title>`, OG meta tags, JSON-LD schema block
4. `.env` — `VITE_CONTACT_EMAIL={{EMAIL}}` + `VITE_FORMSPREE_ID=...` (if standard+)

**Build components in order:**
5. `src/data/oeffnungszeiten.js` — hours object + `isOpenNow()` helper
6. `src/data/speisen.js` — menu items array from Brief.md
7. `src/data/bewertungen.js` — testimonials from Brief.md
8. `src/components/icons/BrandLogo.jsx` — inline SVG from logo_description
9. Build sections A → K in order: Navbar, Hero, UspStrip, SpeisekartePreview, Raeumlichkeiten, [Veranstaltungen], [Zimmer], UeberUns, Bewertungen, Kontakt, Footer
10. `src/App.jsx` — import all sections, register GSAP ScrollTrigger once at top, mount sections in order
11. Implement feature tier additions

**Verify:**
```bash
npm run build          # must complete with 0 errors
npm run preview        # open localhost:4173 and check visually
```
Check at 375px (iPhone SE), 768px (tablet), 1280px (desktop).
Check "Heute geöffnet" pill reflects the actual current weekday.
Check reservation form submission (mailto: or Formspree).
Check that `prefers-reduced-motion: reduce` in browser flags disables all GSAP animations.

---

## 8. Deployment Guide

### Netlify (recommended — zero config for Vite)

```bash
npm run build
npx netlify-cli deploy --prod --dir=dist
```

Or connect GitHub repo → Netlify will auto-detect Vite and run `npm run build` with `dist` as publish dir.

**Environment variables in Netlify dashboard:**
- `VITE_CONTACT_EMAIL` = client's real email
- `VITE_FORMSPREE_ID` = Formspree form ID (if standard+)
- `VITE_GA_MEASUREMENT_ID` = GA4 measurement ID (if pro)

### Vercel

```bash
npm run build
npx vercel --prod
```

Zero-config — Vercel auto-detects Vite.

### Custom domain

1. Buy domain (e.g. `{{CLIENT_SLUG}}.at`) via Namecheap / Strato / Domainrobot
2. Point domain's A record to Netlify/Vercel IP, or add CNAME `www` → `{{CLIENT_SLUG}}.netlify.app`
3. SSL: automatic via Netlify/Vercel (Let's Encrypt, renews automatically)

---

## 9. Client Handoff Checklist

Before handing off to the client or going live, verify every item:

**Content:**
- [ ] All Unsplash placeholder images have been discussed with client — real photos ordered or agreed plan in place
- [ ] `// TODO: swap with real photo` comments noted for client
- [ ] Menu prices in `src/data/speisen.js` verified with current menu (remove `// TODO: aktuelle Preise einsetzen` comment after verified)
- [ ] Opening hours in `src/data/oeffnungszeiten.js` match current schedule
- [ ] Holiday closures handled (add logic or note to client)

**Environment:**
- [ ] `.env` file filled with real `VITE_CONTACT_EMAIL`
- [ ] Formspree form created and `VITE_FORMSPREE_ID` filled (Standard+)
- [ ] GA4 property created and `VITE_GA_MEASUREMENT_ID` filled (Pro)

**Legal (Pflicht in Österreich/Deutschland):**
- [ ] Impressum page: real legal text (Offenlegungspflicht nach § 5 ECG Austria / § 5 TMG Germany)
  - Required: Name, Adresse, UID-Nummer, Zuständige Behörde
- [ ] Datenschutzerklärung: real DSGVO text generated (datenschutz-generator.de or similar)
- [ ] Cookie consent banner (Pro tier) tested for DSGVO compliance

**SEO & Google:**
- [ ] Submit `sitemap.xml` to Google Search Console
- [ ] Google Business Profile: verify ownership and link website
- [ ] Open Graph image verified (check with opengraph.xyz or similar)
- [ ] JSON-LD schema validated at schema.org/validator

**QA:**
- [ ] `npm run build` completes with 0 errors
- [ ] Test on real mobile device (not just DevTools)
- [ ] Test at 375px, 768px, 1280px, 1920px
- [ ] Test reservation form end-to-end (receives email)
- [ ] Test "Heute geöffnet" pill on a Ruhetag AND an open day
- [ ] Check for CLS issues (fonts should not cause layout shift — `display=swap` in fonts URL)
- [ ] Run Lighthouse audit — target ≥ 90 Performance, ≥ 95 Accessibility, ≥ 95 Best Practices, ≥ 95 SEO

---

## 10. Execution Directive

> **Build a Wirtshaus, not a startup.** Every decision — color, copy, spacing, animation — should feel like it belongs next to a hand-printed menu on a wooden table. The owner's real words go on the page. Real guest quotes carry the reviews section. The "Heute geöffnet" dot is amber like the evening sun. The footer is as warm and dark as the interior after last call.

> **No generic AI patterns.** No "Discover Our Story" buttons. No "Experience the Taste of Tradition™" copy. No SaaS pill cards with check marks listing "Competitive Pricing ✓". No English marketing-speak embedded in German text. No sharp corners, no neutral shadows, no Inter-only typography.

> **The Brief.md is law.** If it says the owner's name is Sieglinde, she is Sieglinde. If the about text says "schätzen unsere Gäste", that sentence goes on the page verbatim — not "our guests appreciate". The owner spent 30 years cooking Schnitzel. Show it like she's proud of it, not like she's pitching to VCs.

> **The only job of this website** is to make a human being — sitting on their phone at 17:30 on a Wednesday, wondering where to eat — feel so welcome and warm from the screen that they pick up the phone and call. Or tap "Tisch reservieren". That's it. Do that job perfectly.

---

*Sources used during research for this builder:*
- awwwards.com/websites/hotel-restaurant/ — premium design references
- loop11.com — restaurant UX best practices
- befoundonline.com — Restaurant Schema markup guide
- malou.io — Google Business Profile and local SEO for restaurants
- wpengine.com/blog/core-web-vitals-what-to-know-2024/ — Core Web Vitals reference
- richmenu.io/restaurant-website-cost/ — pricing benchmarks
- 216digital.com — restaurant website accessibility

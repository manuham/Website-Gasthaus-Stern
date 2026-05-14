# Gasthaus Stern Bludenz — Modern-Rustic Landing Page Builder

## Role

Act as a World-Class Senior Creative Technologist and Lead Frontend Engineer with a soft spot for Austrian Wirtshaus-Kultur. You are building a **production-ready, multi-section website** for **Gasthaus Stern Bludenz** — a small, family-run *Gasthaus* in Vorarlberg with a famous chestnut-shaded *Gastgarten*. The site must feel like a warm summer afternoon under the Kastanien: light, airy, honest, regional. Modern craftsmanship in service of a 30-year-old family business. Eradicate all generic AI patterns, SaaS-isms, English marketing-speak, and "techno-clinical" language.

> **Sprache:** Die gesamte sichtbare Website ist auf **Deutsch (Sie-Form, österreichisches Hochdeutsch)**. Keine englischen Marketing-Floskeln. Optionale EN-Variante darf später ergänzt werden, ist aber nicht Teil dieses Builds.

## Agent Flow — MUST FOLLOW

This builder is **purpose-built for one client**. The content is pre-filled from the project brief. **Do not ask the user for brand, value props, or CTA** — those decisions are already made and encoded below. Build immediately when this file is loaded into a fresh project.

The only thing to confirm with the user (in a single `AskUserQuestion` call, optional — skip if the user signals "just build"):

1. **"Soll ich Platzhalter-Bilder von Unsplash verwenden oder wartest du auf echte Fotos vom Gasthaus?"** — Single-select: `Unsplash-Platzhalter` (default) / `Bildplätze leer lassen mit Beschriftung`.
2. **"Reservierungs-Formular per E-Mail (`mailto:`) oder per einfachem POST-Endpoint vorbereiten?"** — Single-select: `mailto: (sofort funktional)` / `POST-Stub (später anbinden)`.

Then build.

---

## Brand Identity (HARDCODED — DO NOT INVENT)

| Feld | Wert |
|---|---|
| **Brand name** | Gasthaus Stern |
| **Untertitel** | Gutbürgerliches Gasthaus im Herzen von Bludenz |
| **Inhaberin** | Sieglinde Baumann |
| **Adresse** | St.-Peter-Straße 31, 6700 Bludenz, Vorarlberg, Österreich |
| **Telefon** | +43 5552 62390 |
| **E-Mail (Platzhalter)** | kontakt@gasthaus-stern.at *(im Build als Variable `CONTACT_EMAIL`, der echte Wert wird vom Client später eingesetzt)* |
| **Geo** | 47.14905, 9.82680 |
| **Ruhetage** | Montag, Dienstag |
| **Öffnungszeiten** | Mi–Sa 09:00–22:00, So 09:00–14:00 |
| **Küchenzeiten** | 11:30–14:00 und 16:30–21:00 |
| **Kapazitäten** | Restaurant ca. 50 · Saal bis zu 80 · Gastgarten ca. 160 |
| **Logo** | Stilisierter schwarzer Stern (Asset noch nicht als Vektor verfügbar — als Inline-SVG nachbauen: fünfzackiger Stern, leicht abgerundete Spitzen, einfarbig im Accent oder Dark) |

**Markenkern:** Wärme · Tradition · Familie · Schatten unter Kastanien · Geselligkeit · Heimatverbundenheit · Faires Preis-Leistungs-Verhältnis.

**Was die Marke NICHT ist:** kein "luxuriöses Fine-Dining", kein "Erlebnis-Konzept", kein "Foodie-Hotspot". Es ist ein ehrliches *Wirtshaus*. Die Sprache spiegelt das wider.

---

## Fixed Design System (NEVER CHANGE)

### Aesthetic Direction — "Sommerwirtschaft" (Modern Rustic, Biergarten-Forward)

**Identity:** Ein heller, luftiger Sommernachmittag im Gastgarten. Tageslicht durch Kastanienlaub. Holzdielen, Leinen, glasiertes Bier in der Sonne. Modern in der Umsetzung, aber unmissverständlich traditionell in der Seele.

### Palette (use as CSS variables AND Tailwind theme extension)

```
--cream:       #F4EDE0   /* Background / page */
--linen:       #E8DFD0   /* Card surface / panels */
--sage:        #7A8B6F   /* Primary — Wiesengrün */
--sage-deep:   #5A6B53   /* Primary-hover / borders */
--amber:       #D4A24C   /* Accent — Honig / Sonne / "der Stern" */
--amber-deep:  #B5852E   /* Accent-hover */
--chestnut:    #5C3D2E   /* Dark text / wood */
--ink:         #2A1F18   /* Body text */
--bordeaux:    #7A2E2A   /* Sparingly: Reservierungs-CTA, Tagesmenü-Highlight */
```

**Rule:** Cream is the base of every section unless explicitly inverted. Sage is primary structure (lines, navbar fill, footer). Amber is the *one* warm spark — used for the star logo, primary CTAs, hover underlines, and the "Heute geöffnet"-dot. Bordeaux only for the strongest call-to-action (Tisch reservieren).

### Typography

Load via Google Fonts `<link>` tags in `index.html`:

- **Display / Headlines:** `"Fraunces"` (variable, axes: `wght 100..900`, `SOFT 0..100`, `opsz 9..144`). Use it warm — `SOFT 80–100` on display sizes. This is the soul of the brand.
- **UI / Running text:** `"Inter"` 400/500/600 — clean German legibility.
- **Drama / Italics:** Fraunces Italic with `SOFT 100` for menu names, pull-quotes, "Willkommen!" lines.
- **Decorative (very sparingly, ≤2 occurrences site-wide):** `"Caveat"` for handwritten flourishes like a signature "— Familie Baumann" at the end of Über uns.

**Never use:** monospace fonts, condensed sans, all-caps tracking-wide tech labels. Those signal SaaS and break the warmth.

### Visual Texture

- Subtle **paper/linen texture** overlay site-wide at **0.06 opacity** (SVG `<feTurbulence baseFrequency="0.9" numOctaves="2"/>` or a tiny tileable PNG). Mimics a printed Speisekarte on craft paper.
- Optional: a single, very low-opacity (`0.04`) **Kastanienblatt SVG drift** behind the hero — three to five leaves slowly translating diagonally on a 30-second loop. No more.
- Corner radius scale: `rounded-2xl` (16px) for cards, `rounded-[2rem]` for large panels, `rounded-full` for pills and the navbar. No sharp corners.
- Shadows: warm, soft. Use `shadow-[0_20px_60px_-30px_rgba(92,61,46,0.25)]` (chestnut-tinted) rather than neutral black.

### Micro-Interactions

- **Buttons** are pill-shaped (`rounded-full`), with a "warm magnetic" feel: `scale(1.04)` on hover, easing `cubic-bezier(0.34, 1.56, 0.64, 1)` (gentle overshoot — like settling into a comfortable chair).
- Primary CTA fill transitions from `--sage` → `--sage-deep` on hover with a 240ms `cubic-bezier(0.4, 0, 0.2, 1)` wipe (left-to-right `<span>` overlay), text stays cream.
- Reservation CTA uses the bordeaux fill on `:hover` only — at rest it's the sage primary. The bordeaux is the "I really mean it" state.
- Links: amber underline grows from left-to-right on hover (240ms, `ease-out`), plus `translateY(-1px)` lift.
- Menu-item rows lift `translateY(-2px)` with a soft chestnut shadow on hover. Price right-aligns with a leader-dot row (CSS `border-bottom: 2px dotted` trick) — this is *Speisekarten-Typografie*.

### Animation Lifecycle

- All scroll animations use **GSAP 3 + ScrollTrigger** inside `useEffect` with `gsap.context()`, returning `ctx.revert()` in cleanup.
- Default easing: `sine.out` for entrances (slower, breath-like — fits the brand), `power2.inOut` for morphs.
- Stagger: `0.12` for text lines, `0.18` for cards/rows.
- **No** snap-scrolling, no card-pinning-stack effects, no marquee. Those are SaaS tells. The site should feel like turning the pages of a thoughtfully designed menu, not piloting a spaceship.

---

## Section Architecture (BUILD IN THIS ORDER)

### A. NAVBAR — "Die Sternenleiste"

`fixed top-4`, horizontally centered pill (`rounded-full`), max-width ~880px. Backdrop: at the top of the hero it's `bg-cream/40 backdrop-blur-sm` with cream text + amber accents; after scrolling past 60vh it morphs to `bg-cream/85 backdrop-blur-xl` with chestnut text and a hair-line sage border. Use `IntersectionObserver` on a sentinel below the hero, or ScrollTrigger.

**Contents (left → right):**
- Inline SVG star logo (amber fill, 28px) + "Gasthaus Stern" in Fraunces 600, 18px, chestnut.
- Nav links (Inter 500, 14px, chestnut at rest → amber underline on hover): `Speisekarte`, `Gastgarten & Saal`, `Über uns`, `Kontakt`.
- CTA pill: "Tisch reservieren" — bordeaux fill, cream text, amber chevron icon.

**Mobile (< 768px):** logo + hamburger only. Menu opens as a full-bleed cream sheet with the four links stacked, Fraunces 32px each, plus the CTA at the bottom.

### B. HERO — "Unter den Kastanien"

`100dvh` (min 720px), full-bleed background photo. Photo brief: a sunlit Biergarten under chestnut trees, late afternoon, dappled light, ideally a wooden table with a beer glass in soft focus mid-foreground. Unsplash search: `chestnut beer garden austrian inn summer afternoon` — pick the warmest dappled-light frame.

Overlay: a vertical gradient `bg-gradient-to-t from-chestnut/70 via-chestnut/20 to-transparent` so the bottom-left text reads cleanly without darkening the canopy.

**Layout:** content pushed to the **bottom-left third**, `pl-8 md:pl-20 pb-24`.

**Typography pattern (German hero line):**

```
Eyebrow (Inter 500, 13px, tracking-wider, amber, uppercase):
SEIT ÜBER 30 JAHREN

Display H1 (two-line balanced):
Line 1 — Fraunces 600, clamp(40px, 7vw, 88px), cream, SOFT 80:
  Gutbürgerlich
Line 2 — Fraunces Italic 400, clamp(56px, 11vw, 140px), amber, SOFT 100, line-height: 0.95:
  unter den Kastanien.
```

**Sub-line (below H1, Inter 400, 18px, cream/90, max-width 52ch):**
> Kleines, familiengeführtes Wirtshaus in Bludenz. Echte österreichische Küche. Schattiger Gastgarten. Ein Saal für Ihre Feier.

**CTA-Reihe (16px gap):**
- Primary (bordeaux pill): "Tisch reservieren" → scrolls to / opens Kontakt-Anker.
- Ghost (cream border, cream text, amber on hover): "Zur Speisekarte" → scrolls to Speisekarte section.

**Animation:** GSAP timeline on mount — eyebrow fades in `y: 20→0` first, then line 1, then line 2 (mask reveal from bottom — clip-path inset 100% 0 0 0 → 0 0 0 0, 1.2s `sine.out`), then sub-line + CTAs staggered `0.12s`. Total 2.4s, then idle.

**Idle ambient:** the Kastanienblatt SVG drift behind the photo (very low opacity, 30s loop, 3–5 leaves). Optional but desired.

### C. USP STRIP — "Drei Versprechen"

Thin horizontal band on cream, just below hero. Three columns, each: lucide-react icon in a sage circle (40px), heading (Fraunces 500, 20px, chestnut), one-liner (Inter 400, 14px, ink/70).

1. 🌳 **Gastgarten unter Kastanien** — Bis zu 160 Plätze im Schatten alter Bäume.
2. 🍽️ **Gutbürgerliche Küche** — Schnitzel, Käsespätzle, Apfelstrudel — wie es sein soll.
3. 🎉 **Saal für Ihre Feier** — Geburtstage, Hochzeiten, Vereinsfeste bis 80 Personen.

Icons: `TreePine`, `UtensilsCrossed`, `PartyPopper` from lucide-react.

Section padding: `py-20 md:py-28`. Background: `bg-cream`. Top and bottom: a thin amber hairline divider (`h-px bg-amber/30 w-32 mx-auto`).

### D. SPEISEKARTE PREVIEW — "Ein Blick in die Küche"

Editorial spread, asymmetric two-column on desktop:

**Left column (`w-2/5`):** Section label "Speisekarte" (Inter 500, 13px, tracking-wider, amber, uppercase) + display headline (Fraunces Italic 400, 56px, chestnut, SOFT 100): "Was bei uns auf den Tisch kommt." + a paragraph (Inter 400, 16px, ink, max-width 38ch):

> Unsere Karte ist klein und ehrlich. Was Sie hier finden, kocht Sieglinde seit über drei Jahrzehnten — mit der Sorgfalt, die unsere Stammgäste so schätzen. Wechselnde Mittagsmenüs ergänzen die Klassiker.

Plus a small CTA link with amber underline: "Vollständige Speisekarte als PDF →" (`href="#"`, Platzhalter).

**Right column (`w-3/5`):** Menüblock-Karte auf Linen-Hintergrund mit `rounded-[2rem]`, `p-10`, soft chestnut shadow. Inside: a small header "AUSWAHL · à la carte" in Inter 500 13px tracking-wider amber, then a list of six dishes formatted with classic Speisekarten-Typografie (dotted leader line between name and price):

```
Wiener Schnitzel vom Kalb              € 19,80
mit Petersilkartoffeln und Preiselbeeren

Käsespätzle                              € 13,50
mit gerösteten Zwiebeln und Salat

Cordon Bleu vom Schwein                  € 18,90
mit Pommes frites

Rindergulasch                            € 16,50
mit hausgemachten Semmelknödeln

Grillteller "Stern"                      € 22,80
gemischte Grillspezialitäten vom Spieß

Hausgemachter Apfelstrudel               €  6,50
mit Vanilleeis oder Schlagobers
```

Dish names: Fraunces 500 18px chestnut. Descriptions: Inter 400 14px ink/70. Prices: Inter 500 16px chestnut, right-aligned.

> **Important:** these prices are *placeholders for the build* — leave a code comment `// TODO Sieglinde: aktuelle Preise einsetzen` above the array.

**Below the menu card:** a slim sage band (`bg-sage`, `rounded-[2rem]`, `p-8`, cream text) — the **Tagesmenü-Teaser**:

> **Mittagsmenü.** Mo–Fr wechselnd, von 11:30 bis 14:00. Suppe + Hauptspeise ab € 11,90.
> *Tagesaktuell unter Telefon 05552 62390.*

**Animation:** Left column fade-up first (`y: 30→0`, 0.8s `sine.out`), then the menu rows stagger in `y: 20→0, opacity: 0→1`, `0.08s` between rows. Trigger when the section's top is at 75% viewport.

### E. GASTGARTEN & SAAL — "Drei Räume, eine Familie"

Full-width section, `bg-linen` background, `py-28`. Section label "Räumlichkeiten" + display headline (Fraunces Italic 400, 64px) "Drei Räume, eine Familie." centered, max-width 720px.

Below, a **three-card grid** (responsive: 1col → 2col → 3col). Each card: `bg-cream`, `rounded-[2rem]`, overflow-hidden, `shadow-[0_30px_80px_-40px_rgba(92,61,46,0.3)]`. Top half: image (16:10). Bottom half: padding-8, heading + capacity + body + CTA.

**Card 1 — Gastgarten**
- Image: Unsplash `outdoor beer garden chestnut tree dappled light wooden tables`
- Heading (Fraunces 500, 28px): "Gastgarten"
- Capacity badge (small amber pill, Inter 500 12px): "ca. 160 Plätze"
- Body (Inter 400, 15px): "Im Schatten unserer alten Kastanienbäume. In der warmen Jahreszeit unser Herzstück. Biker willkommen, Hunde erlaubt."
- CTA link (amber underline): "Reservierung erbeten →"

**Card 2 — Restaurant**
- Image: Unsplash `traditional austrian inn interior wood warm light`
- Heading: "Restaurant"
- Capacity: "ca. 50 Plätze"
- Body: "Gemütlich, mit Kamin und ehrlicher Wirtshaus-Atmosphäre. Rollstuhlgerecht. Ideal für ein ruhiges Abendessen oder die Stammtischrunde am Mittwoch."
- CTA: "Tisch reservieren →"

**Card 3 — Saal**
- Image: Unsplash `festive banquet hall set table candles austrian`
- Heading: "Saal für Ihre Feier"
- Capacity: "bis zu 80 Personen"
- Body: "Geburtstage, Hochzeiten im kleineren Rahmen, Vereinsfeste, Firmenfeiern. Im Sommer regelmäßig Live-Musik. Partyservice auf Anfrage."
- CTA: "Saal-Anfrage senden →" (opens a `mailto:` with subject pre-filled "Saal-Anfrage Gasthaus Stern" and body template `Datum: ___, Anlass: ___, Gäste: ___`)

**Animation:** Cards stagger in on scroll, `y: 40→0, opacity: 0→1`, `0.18s` between cards, `sine.out`, 0.9s duration each.

### F. ÜBER UNS — "Familie Baumann"

Full-width section on `bg-cream`, `py-28 md:py-36`. **Asymmetric editorial layout:**

**Left (`w-2/5`):** a tall portrait-orientation image — Unsplash `austrian inn facade old building summer` or `family restaurant owner portrait warm` if available. `rounded-[2rem]`, soft chestnut shadow.

**Right (`w-3/5`, `pl-12 md:pl-20`):**
- Eyebrow (Inter 500 13px tracking-wider amber uppercase): "ÜBER UNS"
- Display H2 (Fraunces 400 Italic, clamp(40px, 5vw, 72px), chestnut, SOFT 100):
  > Seit über 30 Jahren
  > unsere Familie. Ihr Wirtshaus.
- Body paragraph 1 (Inter 400, 17px, ink, max-width 56ch — **this is the owner's own text from the brief, do not paraphrase**):
  > Wir sind ein kleiner Gastronomiebetrieb im Herzen von Bludenz. Seit nun mehr als 30 Jahren führen wir unser Gasthaus als Familienbetrieb. Dabei schätzen unsere Gäste nicht nur unsere gutbürgerlichen Speisen, sondern auch das ein oder andere Getränk in geselliger Runde. Auch in unserem geschätzten Gastgarten verweilt man in der warmen Jahreszeit im Schatten unserer Kastanien sehr gerne.

- Body paragraph 2 (Inter 400, 16px, ink/80):
  > Unser Haus liegt im südlichen Stadtteil St. Peter, nur wenige Schritte vom Kloster St. Peter entfernt — einer der geschichtsträchtigsten Adressen der Stadt. Vom Bahnhof Bludenz erreichen Sie uns in etwa zehn Minuten zu Fuß.

- Signature (Caveat 400, 36px, chestnut, mt-8): "— Sieglinde Baumann"

**Animation:** Image fades + slight Y-shift on parallax (range 0 to -40px over the scroll of the section). Right column words reveal line-by-line (SplitText-style, `y: 20→0`, `0.12s` stagger, `sine.out`). Caveat signature fades in last with a subtle handwriting effect (clip-path or `stroke-dashoffset` if rendered as SVG path; if pure text, just opacity fade).

### G. BEWERTUNGEN — "Stimmen unserer Gäste"

Full-width on `bg-sage` (inverted section), `py-28`, cream text. Section label "BEWERTUNGEN" in amber. Display headline (Fraunces Italic 400, 56px, cream, centered): "Was unsere Gäste sagen."

**Trust strip** below the headline, centered: five amber stars (filled, lucide `Star`), then "**4,4 / 5** auf Google · 203 Bewertungen" in Inter 500 16px cream, then a small "★ TripAdvisor 4,5/5" pill.

**Three testimonial cards** in a row (responsive 1col → 3col), each `bg-cream/8 backdrop-blur-sm`, `border border-cream/15`, `rounded-[2rem]`, `p-10`. Use the **real quotes from the brief** — do not invent. Each card has:
- A large amber opening quote glyph (Fraunces Italic 400, 80px, line-height: 0.5, mb-4, `“`).
- Quote (Fraunces Italic 400, 19px, cream, SOFT 80, line-height: 1.5):
- Attribution (Inter 500, 14px, amber, mt-6):

**Card 1:**
> "Sehr gute, gut bürgerliche Küche. Freundliche Bedienung. Schöner schattiger Gastgarten. Sehr zu empfehlen. Gute Auswahl an Nachspeisen. Eis, Apfelstrudel. Biker willkommen."
> — **Reinhold T.**, Google

**Card 2:**
> "Wir kommen schon 10 Jahre bei De Stern und immer ist das Essen und die Stimmung sehr gut."
> — **Langjähriger Stammgast**, TripAdvisor

**Card 3:**
> "Personal sehr nett und sehr flott. Essen war sehr gut und ging sehr rasch. Schöner Gastgarten mit Beschattung. Kommen jederzeit sehr gerne wieder."
> — **Martina J.**, Google

**Animation:** Cards stagger in `y: 40→0`, `0.18s`, on ScrollTrigger.

### H. KONTAKT & ANFAHRT — "Schauen Sie auf einen Sprung vorbei"

Full-width `bg-cream`, `py-28`. Two-column desktop layout:

**Left (`w-1/2`):** Display headline (Fraunces Italic 400, 56px, chestnut): "Schauen Sie auf einen Sprung vorbei." Below: address block, opening hours table, contact lines.

**Adresse block** (Inter 400, 16px, ink, mb-8):
```
Gasthaus Stern
St.-Peter-Straße 31
6700 Bludenz, Österreich

Tel.   +43 5552 62390  (clickable tel: link)
Mail   kontakt@gasthaus-stern.at  (clickable, mailto:)
```

**Öffnungszeiten table** (clean two-column, Inter 500 15px chestnut left, Inter 400 15px ink right):
```
Montag        Ruhetag
Dienstag      Ruhetag
Mittwoch      09:00 – 22:00
Donnerstag    09:00 – 22:00
Freitag       09:00 – 22:00
Samstag       09:00 – 22:00
Sonntag       09:00 – 14:00
```

Below the table, a small **Küchenzeiten-Hinweis** (Inter 400, 13px, ink/60, italic):
> Küche: 11:30 – 14:00 und 16:30 – 21:00

**"Heute geöffnet"-Indikator** (computed at runtime via `Date()`): a pill with a pulsing sage dot and text — either "Heute geöffnet · bis 22:00" (sage pill) or "Heute Ruhetag" (linen pill, no dot). Place this above the address.

**Right (`w-1/2`):** an embedded Google Maps iframe (no API key needed — use the simple embed URL based on the Place ID `ChIJT0O_CMxPm0cRuCDf6R0Wql8` or the lat/lng `47.14905, 9.82680`). Wrap in `rounded-[2rem]` overflow-hidden, soft shadow. Below the map, a small CTA: "Route in Google Maps öffnen →" (links to the Maps URL).

**Below both columns (full width):** a simple **Reservierungs-Formular** card on `bg-linen`, `rounded-[2rem]`, `p-10`. Fields: Name, Telefon (or E-Mail), Datum, Uhrzeit, Personenzahl, Nachricht. Submit button (bordeaux pill): "Anfrage senden". On submit, build a `mailto:` URL to `kontakt@gasthaus-stern.at` with subject "Reservierungsanfrage" and body containing the form values (if user answered `mailto:` to the flow question) — OR a POST stub to `/api/reservation` that just logs and returns 200 (if `POST-Stub`).

Below the form, a polite line in Inter 400 13px ink/60 italic:
> Für kurzfristige Reservierungen rufen Sie uns bitte direkt an: **05552 62390**.

### I. FOOTER — "Bis bald."

Full-width `bg-chestnut` (deep), cream text, `rounded-t-[4rem]`, `py-20`. Grid layout (4 columns desktop, 1 column mobile):

**Col 1 (brand):**
- Inline SVG star (amber, 32px) + "Gasthaus Stern" in Fraunces 500 22px cream.
- Tagline (Inter 400 14px cream/70): "Gutbürgerliches Gasthaus im Herzen von Bludenz. Seit über 30 Jahren."
- "Heute geöffnet" mini-indicator (same logic as Kontakt section, but smaller — sage dot + label in Inter 500 13px).

**Col 2 (Navigation):**
Heading "Entdecken" (Fraunces 500 16px amber). Links (Inter 400 14px cream/80, hover → cream): Speisekarte · Gastgarten & Saal · Über uns · Kontakt.

**Col 3 (Adresse & Kontakt):**
Heading "Besuchen". Address, phone, email (same as Kontakt section). All `tel:`/`mailto:` linked.

**Col 4 (Folgen):**
Heading "Folgen". Links to Facebook (URL: `https://www.facebook.com/Gasthaus-Stern-343206389646351/`) and Google Maps profile. Below: legal pill row in Inter 400 12px cream/60: "Impressum" · "Datenschutz" · "© 2026 Sieglinde Baumann e.U."

**Bottom strip** (border-t cream/10, mt-12, pt-8, Inter 400 12px cream/50, centered): "Made with care in Vorarlberg."

---

## Technical Requirements (NEVER CHANGE)

### Stack

- **Vite + React 19** (single-page).
- **Tailwind CSS v3.4.17** with theme extension declaring the palette CSS variables as Tailwind colors (`cream`, `linen`, `sage`, `sage-deep`, `amber`, `amber-deep`, `chestnut`, `ink`, `bordeaux`). Configure `fontFamily` for `display` (Fraunces), `sans` (Inter), `script` (Caveat).
- **GSAP 3** with ScrollTrigger plugin registered once in `src/App.jsx`.
- **lucide-react** for icons (TreePine, UtensilsCrossed, PartyPopper, Star, Phone, Mail, MapPin, Clock, ArrowRight).
- **No** chart library, no animation framework other than GSAP, no UI kit. Hand-built components only.

### File Structure

```
src/
  App.jsx                  — root, mounts sections in order
  index.css                — Tailwind directives + CSS variables + linen texture + Kastanienblatt SVG
  components/
    Navbar.jsx
    Hero.jsx
    UspStrip.jsx
    SpeisekartePreview.jsx
    Raeumlichkeiten.jsx     (Gastgarten & Saal section)
    UeberUns.jsx
    Bewertungen.jsx
    Kontakt.jsx
    Footer.jsx
    icons/StarLogo.jsx     — the inline brand-mark SVG
  data/
    speisen.js             — menu items array (so future maintenance is one file)
    bewertungen.js         — the three testimonials
    oeffnungszeiten.js     — schedule + helper isOpenNow()
public/
  textures/linen.png       — tileable paper texture
  textures/kastanienblatt.svg
```

### Fonts

Load Fraunces (axes wght + SOFT + opsz, italic), Inter (400/500/600), Caveat (400) via a single Google Fonts `<link>` in `index.html`:

```
https://fonts.googleapis.com/css2?family=Caveat&family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..700,0..100;1,9..144,300..700,0..100&family=Inter:wght@400;500;600&display=swap
```

### Images

- Use real Unsplash URLs (`https://images.unsplash.com/photo-...?w=1600&q=80`) matching the photo briefs above. **Never** placeholder.png.
- Add a code comment beside each `<img>` with the search keywords used, so the client can later swap in real photos.
- All images have meaningful German `alt` text ("Gastgarten unter Kastanienbäumen im Sommer", not "garden").

### SEO Basics (must be wired)

- `<title>`: "Gasthaus Stern Bludenz — Gutbürgerliches Wirtshaus & Gastgarten in Vorarlberg"
- `<meta name="description">`: "Familiengeführtes Gasthaus im Herzen von Bludenz seit über 30 Jahren. Wiener Schnitzel, Käsespätzle, Apfelstrudel. Schattiger Gastgarten unter Kastanien. Saal bis zu 80 Personen."
- Open Graph image: a hero photo URL.
- A `<script type="application/ld+json">` Restaurant Schema with name, address, geo, openingHours, telephone, priceRange `€€`, servesCuisine `Austrian, Traditional`.

### Responsive Rules

- Mobile-first. Below `md`: hero font sizes shrink (use the `clamp()` values defined above — they already scale), three-card grids stack vertically, asymmetric two-column layouts become single-column with the image first then text.
- Navbar collapses to logo + hamburger below `md`. Sheet menu as described.
- Reduce all `py-28` to `py-20` below `md`.
- Disable the Kastanienblatt drift animation below `md` (mobile perf).

### Accessibility

- Color contrast: cream-on-chestnut and ink-on-cream both clear AA. Sage-on-cream needs care — use `sage-deep` for body text on cream, never `sage` itself.
- All interactive elements: visible `:focus-visible` ring (amber, 2px, offset 2px).
- Form labels associated to inputs. `aria-live` polite on the reservation form's success state.
- `prefers-reduced-motion`: respect it — disable the Kastanienblatt drift, replace fade-up animations with instant reveals.

---

## Build Sequence

1. `npm create vite@latest gasthaus-stern -- --template react`
2. `cd gasthaus-stern && npm i`
3. `npm i -D tailwindcss@3.4.17 postcss autoprefixer && npx tailwindcss init -p`
4. `npm i gsap lucide-react`
5. Configure `tailwind.config.js` with the palette, font families, and a `boxShadow` token `warm: '0 30px 80px -40px rgba(92,61,46,0.30)'`.
6. Add the Google Fonts `<link>` and the JSON-LD Restaurant Schema to `index.html`.
7. Build sections in order A → I. Wire all GSAP animations inside `useEffect` + `gsap.context()`.
8. Pull menu items, testimonials, and opening hours into `src/data/*.js` so they're maintainable.
9. Implement `isOpenNow()` helper and use it in both Navbar(optional)/Kontakt/Footer "Heute geöffnet" pills.
10. Verify mobile layout at 375px and 768px breakpoints; verify reduced-motion path.

---

## Execution Directive

> **Build a Wirtshaus, not a startup.** Every choice should feel like it could have lived next to a hand-printed menu on a wooden table. Cream paper. Sage shadow. Honey-amber light. A black star. The owner's real words. Real quotes from real guests. No telemetry feeds, no protocol cards, no "system operational" footers. The site's job is simple and old-fashioned: make a Bludenzer family that's been cooking Schnitzel for 30 years look as welcoming online as they are in the garden under the Kastanien.

Sources used for content (do not include in the build, just for traceability):
- `gasthaus-stern-bludenz-brief.md` (in this project root)
- `gasthaussternbludenz.wordpress.com` (existing site)
- `vorarlberg-alpenregion.at/bludenz/de/gasthaus-stern-2_vc3071` (tourism portal)
- Google Business reviews (4.4 / 203)
- TripAdvisor reviews (4.5 / 13)

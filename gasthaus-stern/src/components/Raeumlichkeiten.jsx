import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
gsap.registerPlugin(ScrollTrigger)

const CONTACT_EMAIL = 'kontakt@gasthaus-stern.at'

const KARTEN = [
  {
    // Unsplash: outdoor beer garden chestnut tree dappled light wooden tables
    bild: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    bildAlt: 'Gastgarten unter Kastanienbäumen, Holztische im Schatten',
    titel: 'Gastgarten',
    kapazitaet: 'ca. 160 Plätze',
    beschreibung: 'Im Schatten unserer alten Kastanienbäume. In der warmen Jahreszeit unser Herzstück. Biker willkommen, Hunde erlaubt.',
    cta: 'Reservierung erbeten',
    ctaHref: '#kontakt',
  },
  {
    // Unsplash: traditional austrian inn interior wood warm light
    bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    bildAlt: 'Gemütliches Wirtshaus-Interieur mit Holzvertäfelung und warmem Licht',
    titel: 'Restaurant',
    kapazitaet: 'ca. 50 Plätze',
    beschreibung: 'Gemütlich, mit Kamin und ehrlicher Wirtshaus-Atmosphäre. Rollstuhlgerecht. Ideal für ein ruhiges Abendessen oder die Stammtischrunde.',
    cta: 'Tisch reservieren',
    ctaHref: '#kontakt',
  },
  {
    // Unsplash: festive banquet hall set table candles austrian
    bild: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80',
    bildAlt: 'Festlich gedeckter Saal mit Kerzenlicht für eine Feier',
    titel: 'Saal für Ihre Feier',
    kapazitaet: 'bis zu 80 Personen',
    beschreibung: 'Geburtstage, Hochzeiten im kleineren Rahmen, Vereinsfeste, Firmenfeiern. Im Sommer regelmäßig Live-Musik. Partyservice auf Anfrage.',
    cta: 'Saal-Anfrage senden',
    ctaHref: `mailto:${CONTACT_EMAIL}?subject=Saal-Anfrage%20Gasthaus%20Stern&body=Datum%3A%20___%0ADatum%3A%20___%0AAnlass%3A%20___%0AG%C3%A4ste%3A%20___`,
    ctaExternal: true,
  },
]

export default function Raeumlichkeiten() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll('.raum-card'),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.18, ease: 'sine.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollTo = (href) => {
    if (href.startsWith('mailto:')) return
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="raeumlichkeiten"
      ref={sectionRef}
      className="bg-linen py-20 md:py-28 px-6"
      aria-label="Gastgarten, Restaurant und Saal"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <p className="font-sans font-medium text-[13px] tracking-widest text-amber uppercase text-center mb-4">
          Räumlichkeiten
        </p>
        <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-amber/50 to-transparent my-3" aria-hidden="true" />
        <h2
          className="font-display italic font-normal text-chestnut text-center mx-auto max-w-[720px] mb-14"
          style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontVariationSettings: '"SOFT" 100' }}
        >
          Drei Räume, eine Familie.
        </h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {KARTEN.map((karte) => (
            <div
              key={karte.titel}
              className="raum-card opacity-0 bg-cream rounded-[2rem] overflow-hidden shadow-luxury flex flex-col"
            >
              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden relative">
                {/* TODO: replace with real client photo — Unsplash keywords noted in KARTEN array above */}
                <img
                  src={karte.bild}
                  alt={karte.bildAlt}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  width="800"
                  height="500"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chestnut/20 to-transparent pointer-events-none" aria-hidden="true" />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col gap-3 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display font-medium text-[28px] text-chestnut leading-snug">
                    {karte.titel}
                  </h3>
                  <span className="shrink-0 bg-amber/10 text-amber-deep border border-amber/30 rounded-full px-3 py-1 font-sans font-medium text-[12px] tracking-wide whitespace-nowrap mt-1">
                    {karte.kapazitaet}
                  </span>
                </div>
                <p className="font-sans font-normal text-[15px] text-ink/80 leading-relaxed flex-1">
                  {karte.beschreibung}
                </p>

                {karte.ctaExternal ? (
                  <a
                    href={karte.ctaHref}
                    className="inline-flex items-center gap-1.5 font-sans font-medium text-[14px] text-chestnut group mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded"
                  >
                    <span className="relative">
                      {karte.cta}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-amber group-hover:w-full transition-[width] duration-[240ms] ease-out" />
                    </span>
                    <ArrowRight size={14} className="text-amber group-hover:translate-x-0.5 transition-transform" />
                  </a>
                ) : (
                  <button
                    onClick={() => scrollTo(karte.ctaHref)}
                    className="inline-flex items-center gap-1.5 font-sans font-medium text-[14px] text-chestnut group mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded"
                  >
                    <span className="relative">
                      {karte.cta}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-amber group-hover:w-full transition-[width] duration-[240ms] ease-out" />
                    </span>
                    <ArrowRight size={14} className="text-amber group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

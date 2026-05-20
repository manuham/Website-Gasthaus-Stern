import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { SPEISEN, DIETARY_LABELS, KATEGORIEN } from '../data/speisen'
gsap.registerPlugin(ScrollTrigger)

// Group items by kategorie, preserving KATEGORIEN order. Empty categories are skipped.
function groupByKategorie(items) {
  const groups = KATEGORIEN.map(kat => ({
    kategorie: kat,
    items: items.filter(i => i.kategorie === kat),
  })).filter(g => g.items.length > 0)
  return groups
}

export default function SpeisekartePage() {
  const sectionRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const rows = sectionRef.current?.querySelectorAll('.menu-row')
      if (rows) {
        gsap.fromTo(rows,
          { opacity: 0, y: 16 },
          {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'sine.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const groups = groupByKategorie(SPEISEN)

  return (
    <main className="bg-cream pt-32 pb-20 md:pt-40 md:pb-28 px-6 min-h-screen" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">

        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 font-sans font-medium text-[14px] text-chestnut/80 hover:text-amber transition-colors mb-10 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Zurück zur Startseite
        </Link>

        {/* Header */}
        <p className="font-sans font-medium text-[13px] tracking-widest text-amber uppercase mb-4">
          Speisekarte · à la carte
        </p>
        <h1
          className="font-display italic font-normal text-chestnut mb-6"
          style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontVariationSettings: '"SOFT" 100', lineHeight: 1.05 }}
        >
          Was bei uns auf den Tisch kommt.
        </h1>
        <p className="font-sans font-normal text-[17px] text-ink/80 max-w-[60ch] mb-12 leading-relaxed">
          Unsere Karte ist klein und ehrlich. Was Sie hier finden, kocht Sieglinde seit über drei Jahrzehnten — mit der Sorgfalt, die unsere Stammgäste so schätzen. Wechselnde Mittagsmenüs ergänzen die Klassiker.
        </p>

        {/* Categories */}
        {groups.map(({ kategorie, items }) => (
          <section key={kategorie} className="mb-14">
            <div className="flex items-baseline gap-4 mb-6">
              <h2 className="font-display font-medium text-[28px] text-chestnut">
                {kategorie}
              </h2>
              <span className="h-px flex-1 bg-amber/30" aria-hidden="true" />
            </div>

            <div className="bg-linen rounded-[2rem] p-8 md:p-10 shadow-warm-sm flex flex-col gap-5">
              {items.map((gericht) => (
                <div
                  key={gericht.name}
                  className="menu-row opacity-0 flex items-start justify-between gap-4 hover:-translate-y-0.5 transition-transform duration-200 ease-out"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-display font-medium text-[18px] text-chestnut leading-snug">
                        {gericht.name}
                      </span>
                      {gericht.dietary?.length > 0 && (
                        <span className="inline-flex items-center gap-1 shrink-0">
                          {gericht.dietary.map(d => (
                            <span
                              key={d}
                              className="bg-sage/15 text-sage-deep border border-sage/30 rounded-full px-2 py-0.5 font-sans font-medium text-[10px] tracking-wide whitespace-nowrap"
                              title={DIETARY_LABELS[d]?.label}
                            >
                              {DIETARY_LABELS[d]?.label || d}
                            </span>
                          ))}
                        </span>
                      )}
                      <span className="flex-1 border-b-2 border-dotted border-chestnut/20 mb-0.5 min-w-[1.5rem]" aria-hidden="true" />
                    </div>
                    <p className="font-sans font-normal text-[14px] text-ink/70 mt-0.5">
                      {gericht.beschreibung}
                    </p>
                  </div>
                  <span className="font-sans font-medium text-[16px] text-chestnut whitespace-nowrap">
                    € {gericht.preis}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Tagesmenü teaser */}
        <div className="rounded-[2rem] p-8 md:p-10 mt-4 mb-12 text-cream" style={{ background: 'linear-gradient(135deg, #5A6B53 0%, #7A8B6F 100%)' }}>
          <p className="font-sans font-semibold text-[15px] text-cream mb-1">Mittagsmenü.</p>
          <p className="font-sans font-normal text-[15px] text-cream/90">
            Mo–Fr wechselnd, von 11:30 bis 14:00. Suppe + Hauptspeise ab € 11,90.
          </p>
          <p className="font-sans italic text-[14px] text-cream/70 mt-2">
            Tagesaktuell unter Telefon 05552 62390.
          </p>
        </div>

        {/* Note */}
        <p className="font-sans italic text-[13px] text-ink/60 mb-10 max-w-[60ch]">
          Eine Auswahl unserer Klassiker. Die vollständige aktuelle Karte erhalten Sie gerne bei einem Besuch oder auf Anfrage.
        </p>

        {/* CTA back to home */}
        <div className="flex flex-wrap gap-4">
          <Link
            to="/#kontakt"
            className="inline-flex items-center gap-1.5 bg-bordeaux hover:bg-bordeaux/90 text-cream rounded-full px-6 py-3 font-sans font-medium text-[15px] transition-transform duration-[240ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2"
          >
            Tisch reservieren
            <ChevronRight size={14} className="text-amber" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 border-2 border-chestnut/30 text-chestnut hover:border-amber hover:text-amber rounded-full px-6 py-3 font-sans font-medium text-[15px] transition-all duration-[240ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </main>
  )
}

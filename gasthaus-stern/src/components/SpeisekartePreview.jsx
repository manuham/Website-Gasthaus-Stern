import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SPEISEN } from '../data/speisen'
gsap.registerPlugin(ScrollTrigger)

export default function SpeisekartePreview() {
  const sectionRef = useRef(null)
  const leftRef    = useRef(null)
  const rowsRef    = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'sine.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      )

      const rows = rowsRef.current?.querySelectorAll('.menu-row')
      if (rows) {
        gsap.fromTo(rows,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'sine.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="speisekarte"
      ref={sectionRef}
      className="bg-cream py-20 md:py-28 px-6"
      aria-label="Speisekarte"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-start">

        {/* Left column */}
        <div ref={leftRef} className="md:w-2/5 opacity-0">
          <p className="font-sans font-medium text-[13px] tracking-widest text-amber uppercase mb-4">
            Speisekarte
          </p>
          <h2
            className="font-display italic font-normal text-chestnut mb-6"
            style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontVariationSettings: '"SOFT" 100' }}
          >
            Was bei uns auf den Tisch kommt.
          </h2>
          <p className="font-sans font-normal text-[16px] text-ink max-w-[38ch] mb-8 leading-relaxed">
            Unsere Karte ist klein und ehrlich. Was Sie hier finden, kocht Sieglinde seit über drei Jahrzehnten — mit der Sorgfalt, die unsere Stammgäste so schätzen. Wechselnde Mittagsmenüs ergänzen die Klassiker.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-1 font-sans font-medium text-[15px] text-chestnut group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded"
          >
            <span className="relative">
              Vollständige Speisekarte als PDF
              <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-amber group-hover:w-full transition-[width] duration-[240ms] ease-out" />
            </span>
            {' →'}
          </a>
        </div>

        {/* Right column — Menu card */}
        <div className="md:w-3/5">
          <div
            className="bg-linen rounded-[2rem] overflow-hidden shadow-luxury"
            ref={rowsRef}
          >
            <div className="h-[3px] bg-gradient-to-r from-amber/40 via-amber to-amber/40" aria-hidden="true" />
            <div className="p-8 md:p-10">
            <p className="font-sans font-medium text-[13px] tracking-widest text-amber uppercase mb-6">
              AUSWAHL · à la carte
            </p>

            <div className="flex flex-col gap-5">
              {SPEISEN.map((gericht) => (
                <div
                  key={gericht.name}
                  className="menu-row opacity-0 flex items-start justify-between gap-4 hover:-translate-y-0.5 transition-transform duration-200 ease-out group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display font-medium text-[18px] text-chestnut leading-snug">
                        {gericht.name}
                      </span>
                      {/* dotted leader */}
                      <span
                        className="flex-1 border-b-2 border-dotted border-chestnut/20 mb-0.5 min-w-[1.5rem]"
                        aria-hidden="true"
                      />
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
            </div>
          </div>

          {/* Tagesmenü teaser */}
          <div className="rounded-[2rem] p-8 mt-4 text-cream" style={{ background: 'linear-gradient(135deg, #5A6B53 0%, #7A8B6F 100%)' }}>
            <p className="font-sans font-semibold text-[15px] text-cream mb-1">Mittagsmenü.</p>
            <p className="font-sans font-normal text-[15px] text-cream/90">
              Mo–Fr wechselnd, von 11:30 bis 14:00. Suppe + Hauptspeise ab € 11,90.
            </p>
            <p className="font-sans italic text-[14px] text-cream/70 mt-2">
              Tagesaktuell unter Telefon 05552 62390.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

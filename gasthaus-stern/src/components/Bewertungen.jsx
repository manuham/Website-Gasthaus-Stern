import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star } from 'lucide-react'
import { BEWERTUNGEN } from '../data/bewertungen'
gsap.registerPlugin(ScrollTrigger)

export default function Bewertungen() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll('.bewertung-card'),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.18, ease: 'sine.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-sage py-20 md:py-28 px-6"
      aria-label="Bewertungen unserer Gäste"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <p className="font-sans font-medium text-[13px] tracking-widest text-amber uppercase text-center mb-4">
          BEWERTUNGEN
        </p>
        <h2
          className="font-display italic font-normal text-cream text-center mx-auto max-w-[600px] mb-8"
          style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontVariationSettings: '"SOFT" 80' }}
        >
          Was unsere Gäste sagen.
        </h2>

        {/* Trust strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
          <div className="flex gap-0.5" aria-label="5 Sterne">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={20} className="text-amber fill-amber" />
            ))}
          </div>
          <span className="font-sans font-medium text-[16px] text-cream">
            <strong>4,4 / 5</strong> auf Google · 203 Bewertungen
          </span>
          <span className="bg-cream/15 text-cream rounded-full px-3 py-1 font-sans text-[13px]">
            ★ TripAdvisor 4,5/5
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BEWERTUNGEN.map((b, i) => (
            <div
              key={i}
              className="bewertung-card opacity-0 bg-cream/[0.08] backdrop-blur-sm border border-cream/15 rounded-[2rem] p-8 md:p-10 flex flex-col"
            >
              {/* Opening quote glyph */}
              <div
                className="font-display italic text-amber leading-none mb-4 select-none"
                style={{ fontSize: 80, lineHeight: 0.5, fontVariationSettings: '"SOFT" 100' }}
                aria-hidden="true"
              >
                "
              </div>
              <p
                className="font-display italic font-normal text-cream flex-1 leading-relaxed"
                style={{ fontSize: 19, fontVariationSettings: '"SOFT" 80' }}
              >
                {b.zitat}
              </p>
              <p className="font-sans font-medium text-[14px] text-amber mt-6">
                — {b.autor}, {b.plattform}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

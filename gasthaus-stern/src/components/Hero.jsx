import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Unsplash search: "chestnut beer garden austrian inn summer afternoon dappled light"
const HERO_IMAGE = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80'

// Kastanienblatt SVG path (simplified leaf shape)
const LEAF_PATH = 'M12 2C8 6 6 10 8 15C5 13 3 15 4 18C6 16 8 17 10 20C9 23 11 25 14 24C13 21 15 20 18 22C20 19 19 16 16 15C19 11 18 6 14 3Z'

function KastanienLeaf({ style }) {
  return (
    <svg
      viewBox="0 0 24 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="kastanienblatt absolute pointer-events-none"
      style={{ width: 48, height: 56, opacity: 0.04, ...style }}
      aria-hidden="true"
    >
      <path d={LEAF_PATH} fill="#5C3D2E" />
    </svg>
  )
}

export default function Hero() {
  const eyebrowRef  = useRef(null)
  const line1Ref    = useRef(null)
  const line2Ref    = useRef(null)
  const subRef      = useRef(null)
  const ctaRef      = useRef(null)
  const leavesRef   = useRef([])

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      ;[eyebrowRef, line1Ref, line2Ref, subRef, ctaRef].forEach(r => {
        if (r.current) { r.current.style.opacity = 1; r.current.style.clipPath = 'none' }
      })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      tl.fromTo(eyebrowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'sine.out' }
      )
      .fromTo(line1Ref.current,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1.2, ease: 'sine.out',
          onComplete: () => { if (line1Ref.current) line1Ref.current.style.clipPath = 'none' } },
        '-=0.3'
      )
      .fromTo(line2Ref.current,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1.2, ease: 'sine.out',
          onComplete: () => { if (line2Ref.current) line2Ref.current.style.clipPath = 'none' } },
        '-=0.9'
      )
      .fromTo(subRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'sine.out' },
        '-=0.5'
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'sine.out' },
        '-=0.4'
      )

      // Kastanienblatt drift — only on desktop
      const isMobile = window.innerWidth < 768
      if (!isMobile) {
        leavesRef.current.forEach((leaf, i) => {
          if (!leaf) return
          gsap.to(leaf, {
            x: `+=${30 + i * 12}`,
            y: `+=${40 + i * 8}`,
            rotation: 20 + i * 15,
            duration: 28 + i * 5,
            ease: 'none',
            repeat: -1,
            yoyo: true,
            delay: i * 6,
          })
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative w-full min-h-[720px] h-[100dvh] overflow-hidden" aria-label="Willkommen im Gasthaus Stern">
      {/* Background image */}
      {/* Unsplash: chestnut beer garden austrian inn summer afternoon dappled light */}
      <img
        src={HERO_IMAGE}
        alt="Gastgarten unter Kastanienbäumen im Sommer, warmes Nachmittagslicht"
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="eager"
      />

      {/* Background blur */}
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      {/* Gradient overlay — darkened for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-chestnut/80 via-chestnut/40 to-chestnut/20" />

      {/* Kastanienblätter — 5 Blätter im Hintergrund */}
      {[
        { top: '10%', left: '15%' },
        { top: '20%', left: '60%' },
        { top: '5%',  left: '80%' },
        { top: '35%', left: '40%' },
        { top: '15%', left: '30%' },
      ].map((pos, i) => (
        <KastanienLeaf
          key={i}
          style={{ top: pos.top, left: pos.left }}
          ref={el => { leavesRef.current[i] = el }}
        />
      ))}

      {/* Sentinel for navbar scroll detection */}
      <div id="hero-sentinel" className="absolute bottom-[40%] left-0 w-px h-px" aria-hidden="true" />

      {/* Hero content — bottom-left */}
      <div className="relative z-10 flex flex-col justify-end h-full pl-8 md:pl-20 pb-12 md:pb-16 lg:pb-24">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p
            ref={eyebrowRef}
            className="font-sans font-medium text-[13px] tracking-widest text-amber uppercase mb-4 opacity-0"
          >
            SEIT ÜBER 30 JAHREN
          </p>

          {/* H1 line 1 */}
          <h1 className="leading-none mb-1">
            <span
              ref={line1Ref}
              className="block font-display font-semibold text-cream opacity-0"
              style={{
                fontSize: 'clamp(32px, 6vw, 88px)',
                fontVariationSettings: '"SOFT" 80',
              }}
            >
              Gutbürgerlich
            </span>
          </h1>

          {/* H1 line 2 */}
          <div className="mb-6">
            <span
              ref={line2Ref}
              className="block font-display italic font-normal text-amber opacity-0"
              style={{
                fontSize: 'clamp(38px, 9vw, 140px)',
                fontVariationSettings: '"SOFT" 100',
                lineHeight: 0.95,
              }}
            >
              unter den Kastanien.
            </span>
          </div>

          {/* Sub-line */}
          <p
            ref={subRef}
            className="font-sans font-normal text-[18px] text-cream/90 max-w-[52ch] mb-8 opacity-0"
          >
            Kleines, familiengeführtes Wirtshaus in Bludenz. Echte österreichische Küche. Schattiger Gastgarten. Ein Saal für Ihre Feier.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 opacity-0">
            <button
              onClick={() => scrollTo('#kontakt')}
              className="bg-bordeaux hover:bg-bordeaux/90 text-cream rounded-full px-7 py-3.5 font-sans font-medium text-[16px] transition-transform duration-[240ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2"
            >
              Tisch reservieren
            </button>
            <button
              onClick={() => scrollTo('#speisekarte')}
              className="border-2 border-cream text-cream rounded-full px-7 py-3.5 font-sans font-medium text-[16px] hover:border-amber hover:text-amber transition-colors duration-[240ms] hover:scale-[1.04] transform ease-[cubic-bezier(0.34,1.56,0.64,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2"
            >
              Zur Speisekarte
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

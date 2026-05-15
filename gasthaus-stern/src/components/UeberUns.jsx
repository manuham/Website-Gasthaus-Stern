import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// Unsplash: austrian inn facade old building summer / family restaurant owner portrait warm
const PORTRAIT_IMAGE = 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80'

export default function UeberUns() {
  const sectionRef  = useRef(null)
  const imgRef      = useRef(null)
  const textRef     = useRef(null)
  const sigRef      = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // Parallax on image
      gsap.fromTo(imgRef.current,
        { y: 0 },
        {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

      // Image fade in
      gsap.fromTo(imgRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'sine.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      )

      // Text lines stagger
      const lines = textRef.current?.querySelectorAll('.text-line')
      if (lines) {
        gsap.fromTo(lines,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'sine.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
          }
        )
      }

      // Signature fade in last
      gsap.fromTo(sigRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 1.2, ease: 'sine.out', delay: 0.6,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="ueber-uns"
      ref={sectionRef}
      className="bg-cream py-20 md:py-36 px-6 overflow-hidden"
      aria-label="Über uns — Familie Baumann"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-start">

        {/* Left — portrait image */}
        <div className="md:w-2/5 opacity-0" ref={imgRef}>
          {/* Unsplash: austrian inn facade old building summer */}
          <img
            src={PORTRAIT_IMAGE}
            alt="Gasthaus Stern von außen, warmer Sommertag in Bludenz"
            className="w-full rounded-[2rem] shadow-luxury object-cover ring-1 ring-amber/20"
            style={{ aspectRatio: '3/4' }}
            loading="lazy"
          />
        </div>

        {/* Right — text */}
        <div ref={textRef} className="md:w-3/5 md:pl-8">
          <p className="text-line font-sans font-medium text-[13px] tracking-widest text-amber uppercase mb-5 opacity-0">
            ÜBER UNS
          </p>

          <h2
            className="text-line font-display italic font-normal text-chestnut mb-8 opacity-0"
            style={{
              fontSize: 'clamp(40px, 5vw, 72px)',
              fontVariationSettings: '"SOFT" 100',
              lineHeight: 1.05,
            }}
          >
            Seit über 30 Jahren<br />unsere Familie. Ihr Wirtshaus.
          </h2>

          {/* Owner's own text — verbatim from the brief, do not paraphrase */}
          <p className="text-line font-sans font-normal text-[17px] text-ink max-w-[56ch] leading-relaxed mb-5 opacity-0">
            Wir sind ein kleiner Gastronomiebetrieb im Herzen von Bludenz. Seit nun mehr als 30 Jahren führen wir unser Gasthaus als Familienbetrieb. Dabei schätzen unsere Gäste nicht nur unsere gutbürgerlichen Speisen, sondern auch das ein oder andere Getränk in geselliger Runde. Auch in unserem geschätzten Gastgarten verweilt man in der warmen Jahreszeit im Schatten unserer Kastanien sehr gerne.
          </p>

          <p className="text-line font-sans font-normal text-[16px] text-ink/80 max-w-[56ch] leading-relaxed opacity-0">
            Unser Haus liegt im südlichen Stadtteil St. Peter, nur wenige Schritte vom Kloster St. Peter entfernt — einer der geschichtsträchtigsten Adressen der Stadt. Vom Bahnhof Bludenz erreichen Sie uns in etwa zehn Minuten zu Fuß.
          </p>

          {/* Signature — Caveat font */}
          <div className="h-px w-16 bg-amber/40 mt-8 mb-3" aria-hidden="true" />
          <p
            ref={sigRef}
            className="font-script text-[40px] text-amber-deep mt-0 opacity-0"
          >
            — Sieglinde Baumann
          </p>
        </div>

      </div>
    </section>
  )
}

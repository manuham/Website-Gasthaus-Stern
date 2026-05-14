import { useEffect, useRef } from 'react'
import { TreePine, UtensilsCrossed, PartyPopper } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const USPS = [
  {
    Icon: TreePine,
    heading: 'Gastgarten unter Kastanien',
    text: 'Bis zu 160 Plätze im Schatten alter Bäume.',
  },
  {
    Icon: UtensilsCrossed,
    heading: 'Gutbürgerliche Küche',
    text: 'Schnitzel, Käsespätzle, Apfelstrudel — wie es sein soll.',
  },
  {
    Icon: PartyPopper,
    heading: 'Saal für Ihre Feier',
    text: 'Geburtstage, Hochzeiten, Vereinsfeste bis 80 Personen.',
  },
]

export default function UspStrip() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll('.usp-card'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: 'sine.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-cream py-20 md:py-28" aria-label="Unsere drei Versprechen">
      {/* Top hairline */}
      <div className="h-px bg-amber/30 w-32 mx-auto mb-16" />

      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {USPS.map(({ Icon, heading, text }) => (
          <div key={heading} className="usp-card flex flex-col items-center text-center gap-4 opacity-0">
            <div className="w-10 h-10 rounded-full bg-sage flex items-center justify-center">
              <Icon size={20} className="text-cream" strokeWidth={1.8} />
            </div>
            <h3 className="font-display font-medium text-[20px] text-chestnut">{heading}</h3>
            <p className="font-sans font-normal text-[14px] text-ink/70">{text}</p>
          </div>
        ))}
      </div>

      {/* Bottom hairline */}
      <div className="h-px bg-amber/30 w-32 mx-auto mt-16" />
    </section>
  )
}

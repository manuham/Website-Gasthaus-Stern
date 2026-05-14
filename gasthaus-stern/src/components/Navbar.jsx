import { useState, useEffect, useRef } from 'react'
import StarLogo from './icons/StarLogo'
import { Menu, X, ChevronRight } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Speisekarte',       href: '#speisekarte' },
  { label: 'Gastgarten & Saal', href: '#raeumlichkeiten' },
  { label: 'Über uns',          href: '#ueber-uns' },
  { label: 'Kontakt',           href: '#kontakt' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const sentinelRef               = useRef(null)

  useEffect(() => {
    const sentinel = document.getElementById('hero-sentinel')
    if (!sentinel) return
    const obs = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    )
    obs.observe(sentinel)
    return () => obs.disconnect()
  }, [])

  // lock body scroll when sheet open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[880px] rounded-full px-5 py-3 flex items-center justify-between transition-all duration-300
          ${scrolled
            ? 'bg-cream/85 backdrop-blur-xl border border-chestnut/10 shadow-warm-sm'
            : 'bg-cream/40 backdrop-blur-sm'
          }`}
      >
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 rounded-full"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          <StarLogo size={28} color="#D4A24C" />
          <span className="font-display font-semibold text-[18px] text-chestnut leading-none">
            Gasthaus Stern
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <button
                onClick={() => scrollTo(href)}
                className="font-sans font-medium text-[14px] text-chestnut relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 rounded"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-amber group-hover:w-full transition-[width] duration-[240ms] ease-out" />
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <button
          onClick={() => scrollTo('#kontakt')}
          className="hidden md:flex items-center gap-1.5 bg-bordeaux hover:bg-bordeaux/90 text-cream rounded-full px-5 py-2 font-sans font-medium text-[14px] transition-transform duration-[240ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2"
        >
          Tisch reservieren
          <ChevronRight size={14} className="text-amber" />
        </button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-chestnut focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded-full p-1"
          onClick={() => setMenuOpen(true)}
          aria-label="Menü öffnen"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 z-[60] bg-cream flex flex-col transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div className="flex items-center gap-2">
            <StarLogo size={28} color="#D4A24C" />
            <span className="font-display font-semibold text-[18px] text-chestnut">Gasthaus Stern</span>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-chestnut focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded-full p-1"
            aria-label="Menü schließen"
          >
            <X size={24} />
          </button>
        </div>

        <ul className="flex-1 flex flex-col justify-center px-8 gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <button
                onClick={() => scrollTo(href)}
                className="font-display text-[32px] text-chestnut hover:text-amber transition-colors duration-200 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <div className="px-8 pb-12">
          <button
            onClick={() => scrollTo('#kontakt')}
            className="w-full flex items-center justify-center gap-2 bg-bordeaux text-cream rounded-full py-4 font-sans font-medium text-[16px] transition-transform duration-[240ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
          >
            Tisch reservieren
            <ChevronRight size={16} className="text-amber" />
          </button>
        </div>
      </div>
    </>
  )
}

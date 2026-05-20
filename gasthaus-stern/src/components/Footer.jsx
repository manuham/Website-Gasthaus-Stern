import { Link, useLocation, useNavigate } from 'react-router-dom'
import StarLogo from './icons/StarLogo'
import { isOpenNow } from '../data/oeffnungszeiten'
import { MapPin } from 'lucide-react'

function FacebookIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'kontakt@gasthaus-stern.at'

// href starting with '/' is a route; href starting with '#' is an anchor on Home
const NAV_LINKS = [
  { label: 'Speisekarte',       href: '/speisekarte' },
  { label: 'Gastgarten & Saal', href: '#raeumlichkeiten' },
  { label: 'Über uns',          href: '#ueber-uns' },
  { label: 'Kontakt',           href: '#kontakt' },
]

export default function Footer() {
  const { offen, bisUhr } = isOpenNow()
  const location = useLocation()
  const navigate = useNavigate()

  const handleNav = (href) => {
    if (href.startsWith('#')) {
      if (location.pathname === '/') {
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      } else {
        navigate('/' + href) // Home will pick up hash on mount and scroll
      }
    } else {
      navigate(href)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-chestnut rounded-t-[4rem] py-20 px-6" aria-label="Footer">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

        {/* Col 1 — Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <StarLogo size={32} color="#D4A24C" />
            <span className="font-display font-medium text-[22px] text-cream">
              Gasthaus Stern
            </span>
          </div>
          <p className="font-sans font-normal text-[14px] text-cream/70 leading-relaxed max-w-[28ch]">
            Gutbürgerliches Gasthaus im Herzen von Bludenz. Seit über 30 Jahren.
          </p>
          {/* Mini "Heute geöffnet" indicator */}
          <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-sans font-medium text-[13px] w-fit ${offen ? 'bg-sage/20 text-sage' : 'bg-cream/10 text-cream/50'}`}>
            {offen && <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" aria-hidden="true" />}
            {offen ? `Geöffnet · bis ${bisUhr}` : 'Heute Ruhetag'}
          </div>
        </div>

        {/* Col 2 — Navigation */}
        <div className="flex flex-col gap-3">
          <h3 className="font-display font-medium text-[16px] text-amber mb-1">Entdecken</h3>
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => handleNav(href)}
              className="font-sans font-normal text-[14px] text-cream/80 hover:text-cream transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded w-fit"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Col 3 — Address & Contact */}
        <div className="flex flex-col gap-2">
          <h3 className="font-display font-medium text-[16px] text-amber mb-1">Besuchen</h3>
          <p className="font-sans font-normal text-[14px] text-cream/80 leading-relaxed">
            St.-Peter-Straße 31<br />
            6700 Bludenz, Österreich
          </p>
          <a
            href="tel:+435552623900"
            className="font-sans font-normal text-[14px] text-cream/80 hover:text-cream transition-colors mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded"
          >
            +43 5552 62390
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-sans font-normal text-[14px] text-cream/80 hover:text-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        {/* Col 4 — Social & Legal */}
        <div className="flex flex-col gap-3">
          <h3 className="font-display font-medium text-[16px] text-amber mb-1">Folgen</h3>
          <a
            href="https://www.facebook.com/Gasthaus-Stern-343206389646351/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans font-normal text-[14px] text-cream/80 hover:text-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded"
          >
            <FacebookIcon size={16} />
            Facebook
          </a>
          <a
            href="https://www.google.com/maps/place/Gasthaus+Stern/@47.14905,9.82680,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans font-normal text-[14px] text-cream/80 hover:text-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded"
          >
            <MapPin size={16} />
            Google Maps
          </a>

          {/* Legal pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Link
              to="/impressum"
              className="font-sans text-[12px] text-cream/60 hover:text-cream/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded"
            >
              Impressum
            </Link>
            <Link
              to="/datenschutz"
              className="font-sans text-[12px] text-cream/60 hover:text-cream/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded"
            >
              Datenschutz
            </Link>
            <span className="font-sans text-[12px] text-cream/60">
              © 2026 Sieglinde Baumann e.U.
            </span>
          </div>
        </div>

      </div>

      {/* Bottom strip */}
      <div className="border-t border-cream/10 pt-8 text-center">
        <p className="font-sans font-normal text-[12px] text-cream/50">
          Made with care in Vorarlberg.
        </p>
      </div>
    </footer>
  )
}

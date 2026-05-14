import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import UspStrip from './components/UspStrip'
import SpeisekartePreview from './components/SpeisekartePreview'
import Raeumlichkeiten from './components/Raeumlichkeiten'
import UeberUns from './components/UeberUns'
import Bewertungen from './components/Bewertungen'
import Kontakt from './components/Kontakt'
import Footer from './components/Footer'
import './index.css'

// Register GSAP plugins once
gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    // Global ScrollTrigger refresh after first paint
    ScrollTrigger.refresh()
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div className="relative bg-cream overflow-x-hidden">
      {/* Linen paper texture overlay — site-wide */}
      <div
        className="pointer-events-none fixed inset-0 z-[100] mix-blend-multiply"
        aria-hidden="true"
        style={{ opacity: 0.06 }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="linen-texture">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
          </filter>
          <rect width="100%" height="100%" filter="url(#linen-texture)" />
        </svg>
      </div>

      <Navbar />
      <main>
        <Hero />
        <UspStrip />
        <SpeisekartePreview />
        <Raeumlichkeiten />
        <UeberUns />
        <Bewertungen />
        <Kontakt />
      </main>
      <Footer />
    </div>
  )
}

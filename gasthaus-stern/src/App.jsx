import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import SpeisekartePage from './pages/Speisekarte'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'
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
    <BrowserRouter>
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
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/speisekarte" element={<SpeisekartePage />} />
          <Route path="/impressum"   element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="*"            element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

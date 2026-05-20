import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import UspStrip from '../components/UspStrip'
import SpeisekartePreview from '../components/SpeisekartePreview'
import Raeumlichkeiten from '../components/Raeumlichkeiten'
import UeberUns from '../components/UeberUns'
import Bewertungen from '../components/Bewertungen'
import Kontakt from '../components/Kontakt'

export default function Home() {
  const location = useLocation()

  // Scroll to anchor on mount when arriving from another route with a hash
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) {
        // small delay so layout settles before scroll
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 80)
      }
    }
  }, [location.hash])

  return (
    <main>
      <Hero />
      <UspStrip />
      <SpeisekartePreview />
      <Raeumlichkeiten />
      <UeberUns />
      <Bewertungen />
      <Kontakt />
    </main>
  )
}

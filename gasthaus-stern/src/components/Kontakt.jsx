import { useState, useEffect, useRef, useId } from 'react'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { OEFFNUNGSZEITEN, isOpenNow } from '../data/oeffnungszeiten'

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'kontakt@gasthaus-stern.at'
const FORMSPREE_ID  = import.meta.env.VITE_FORMSPREE_ID || ''

export default function Kontakt() {
  const { offen, bisUhr } = isOpenNow()
  const formId = useId()

  const [formData, setFormData] = useState({
    name: '', telefon: '', datum: '', uhrzeit: '', personen: '', nachricht: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const liveRef = useRef(null)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const openMailto = () => {
    const { name, telefon, datum, uhrzeit, personen, nachricht } = formData
    const body = encodeURIComponent(
      `Name: ${name}\nTelefon / E-Mail: ${telefon}\nDatum: ${datum}\nUhrzeit: ${uhrzeit}\nPersonen: ${personen}\nNachricht: ${nachricht}`
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=Reservierungsanfrage&body=${body}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError(null)

    // Formspree path — only when env var is set
    if (FORMSPREE_ID) {
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, _subject: 'Reservierungsanfrage' }),
        })
        if (res.ok) {
          setSubmitted(true)
          return
        }
        // Fall through to mailto on non-2xx response
      } catch (err) {
        // Network failure — fall through to mailto
      }
    }

    // Default mailto path
    openMailto()
    setSubmitted(true)
  }

  return (
    <section
      id="kontakt"
      className="bg-cream py-20 md:py-28 px-6"
      aria-label="Kontakt und Anfahrt"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-display italic font-normal text-chestnut mb-14 max-w-[560px]"
          style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontVariationSettings: '"SOFT" 100' }}
        >
          Schauen Sie auf einen Sprung vorbei.
        </h2>

        {/* Two-column: info + map */}
        <div className="flex flex-col md:flex-row gap-10 mb-12">

          {/* Left — address + hours */}
          <div className="md:w-1/2">

            {/* Heute geöffnet indicator */}
            <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-sans font-medium text-[14px] mb-6 ${offen ? 'bg-sage/15 text-sage-deep' : 'bg-linen text-ink/60'}`}>
              {offen && (
                <span className="w-2 h-2 rounded-full bg-sage animate-pulse" aria-hidden="true" />
              )}
              {offen
                ? `Heute geöffnet · bis ${bisUhr}`
                : 'Heute Ruhetag'
              }
            </div>

            {/* Address */}
            <div className="font-sans font-normal text-[16px] text-ink mb-8 space-y-1">
              <p className="font-medium text-chestnut">Gasthaus Stern</p>
              <p>St.-Peter-Straße 31</p>
              <p>6700 Bludenz, Österreich</p>
              <div className="mt-4 space-y-1">
                <p>
                  Tel.&nbsp;&nbsp;
                  <a href="tel:+4355526239" className="hover:text-amber transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded">
                    +43 5552 62390
                  </a>
                </p>
                <p>
                  Mail&nbsp;&nbsp;
                  <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-amber transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded">
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>
            </div>

            {/* Opening hours */}
            <table className="w-full max-w-sm font-sans text-[15px] mb-6" aria-label="Öffnungszeiten">
              <tbody>
                {OEFFNUNGSZEITEN.map(({ tag, ruhetag, von, bis }) => (
                  <tr key={tag} className="border-b border-linen last:border-0">
                    <td className="py-2 pr-6 font-medium text-chestnut">{tag}</td>
                    <td className={`py-2 ${ruhetag ? 'text-ink/40 italic' : 'text-ink'}`}>
                      {ruhetag ? 'Ruhetag' : `${von} – ${bis}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="font-sans italic text-[13px] text-ink/60">
              Küche: 11:30 – 14:00 und 16:30 – 21:00
            </p>
          </div>

          {/* Right — Google Maps embed */}
          <div className="md:w-1/2 flex flex-col gap-4">
            <div className="rounded-[2rem] overflow-hidden shadow-warm-sm flex-1 min-h-[320px]">
              <iframe
                title="Gasthaus Stern auf Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2671.8!2d9.82680!3d47.14905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479b4fcc08bf434f%3A0x5faa161de9df38b8!2sGasthaus%20Stern!5e0!3m2!1sde!2sat!4v1"
                width="100%"
                height="100%"
                className="min-h-[320px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://www.google.com/maps/place/Gasthaus+Stern/@47.14905,9.82680,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans font-medium text-[14px] text-chestnut group inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded"
            >
              <span className="relative">
                Route in Google Maps öffnen
                <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-amber group-hover:w-full transition-[width] duration-[240ms] ease-out" />
              </span>
              {' →'}
            </a>
          </div>
        </div>

        {/* Reservation form */}
        <div className="bg-linen rounded-[2rem] p-8 md:p-10">
          <h3 className="font-display font-medium text-[28px] text-chestnut mb-8">
            Tisch reservieren
          </h3>

          {submitted ? (
            <div aria-live="polite" className="font-sans text-[16px] text-sage-deep py-8 text-center">
              Vielen Dank! Ihr E-Mail-Programm öffnet sich. Bitte senden Sie die Anfrage ab.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6" aria-describedby={`${formId}-hint`}>
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor={`${formId}-name`} className="font-sans font-medium text-[14px] text-chestnut">
                  Name *
                </label>
                <input
                  id={`${formId}-name`}
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-cream border border-chestnut/20 rounded-xl px-4 py-3 font-sans text-[15px] text-ink placeholder:text-ink/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber"
                  placeholder="Vorname Nachname"
                />
              </div>

              {/* Telefon */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor={`${formId}-telefon`} className="font-sans font-medium text-[14px] text-chestnut">
                  Telefon oder E-Mail *
                </label>
                <input
                  id={`${formId}-telefon`}
                  name="telefon"
                  type="text"
                  required
                  value={formData.telefon}
                  onChange={handleChange}
                  className="bg-cream border border-chestnut/20 rounded-xl px-4 py-3 font-sans text-[15px] text-ink placeholder:text-ink/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber"
                  placeholder="+43 5552 ..."
                />
              </div>

              {/* Datum */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor={`${formId}-datum`} className="font-sans font-medium text-[14px] text-chestnut">
                  Datum *
                </label>
                <input
                  id={`${formId}-datum`}
                  name="datum"
                  type="date"
                  required
                  value={formData.datum}
                  onChange={handleChange}
                  className="bg-cream border border-chestnut/20 rounded-xl px-4 py-3 font-sans text-[15px] text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-amber"
                />
              </div>

              {/* Uhrzeit */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor={`${formId}-uhrzeit`} className="font-sans font-medium text-[14px] text-chestnut">
                  Uhrzeit *
                </label>
                <input
                  id={`${formId}-uhrzeit`}
                  name="uhrzeit"
                  type="time"
                  required
                  value={formData.uhrzeit}
                  onChange={handleChange}
                  className="bg-cream border border-chestnut/20 rounded-xl px-4 py-3 font-sans text-[15px] text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-amber"
                />
              </div>

              {/* Personen */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor={`${formId}-personen`} className="font-sans font-medium text-[14px] text-chestnut">
                  Personenzahl *
                </label>
                <input
                  id={`${formId}-personen`}
                  name="personen"
                  type="number"
                  min="1"
                  max="200"
                  required
                  value={formData.personen}
                  onChange={handleChange}
                  className="bg-cream border border-chestnut/20 rounded-xl px-4 py-3 font-sans text-[15px] text-ink placeholder:text-ink/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber"
                  placeholder="z.B. 4"
                />
              </div>

              {/* Nachricht */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label htmlFor={`${formId}-nachricht`} className="font-sans font-medium text-[14px] text-chestnut">
                  Nachricht
                </label>
                <textarea
                  id={`${formId}-nachricht`}
                  name="nachricht"
                  rows={3}
                  value={formData.nachricht}
                  onChange={handleChange}
                  className="bg-cream border border-chestnut/20 rounded-xl px-4 py-3 font-sans text-[15px] text-ink placeholder:text-ink/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber resize-none"
                  placeholder="Besondere Wünsche, Anlass, Allergien …"
                />
              </div>

              <div className="sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  type="submit"
                  className="bg-bordeaux hover:bg-bordeaux/90 text-cream rounded-full px-8 py-3.5 font-sans font-medium text-[15px] transition-transform duration-[240ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2"
                >
                  Anfrage senden
                </button>
                <p id={`${formId}-hint`} className="font-sans italic text-[13px] text-ink/60">
                  Für kurzfristige Reservierungen rufen Sie uns bitte direkt an:{' '}
                  <a href="tel:+435552623900" className="not-italic font-medium hover:text-amber transition-colors">
                    05552 62390
                  </a>.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

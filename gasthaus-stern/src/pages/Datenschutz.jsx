import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'kontakt@gasthaus-stern.at'

export default function Datenschutz() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <main className="bg-cream pt-32 pb-20 md:pt-40 md:pb-28 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 font-sans font-medium text-[14px] text-chestnut/80 hover:text-amber transition-colors mb-10 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Zurück zur Startseite
        </Link>

        <p className="font-sans font-medium text-[13px] tracking-widest text-amber uppercase mb-4">
          Rechtliches
        </p>
        <h1
          className="font-display italic font-normal text-chestnut mb-10"
          style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontVariationSettings: '"SOFT" 100' }}
        >
          Datenschutzerklärung
        </h1>

        <div className="font-sans text-[16px] text-ink leading-relaxed space-y-6 max-w-[60ch]">

          {/* TODO: vollständige Datenschutzerklärung vom Inhaber generieren lassen — z.B. via datenschutz-generator.de */}
          <p className="italic text-ink/60 text-[14px]">
            Diese Datenschutzerklärung informiert Sie über die Verarbeitung Ihrer personenbezogenen Daten gemäß DSGVO und österreichischem Datenschutzgesetz (DSG).
          </p>

          <section>
            <h2 className="font-display font-medium text-[20px] text-chestnut mb-2">Verantwortliche Stelle</h2>
            <p>
              Gasthaus Stern · Sieglinde Baumann e.U.<br />
              St.-Peter-Straße 31, 6700 Bludenz, Österreich<br />
              Telefon:{' '}
              <a href="tel:+435552623900" className="text-chestnut hover:text-amber transition-colors">
                +43 5552 62390
              </a><br />
              E-Mail:{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-chestnut hover:text-amber transition-colors">
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-display font-medium text-[20px] text-chestnut mb-2">Welche Daten wir erheben</h2>
            <p>
              Wir erheben nur jene Daten, die Sie uns aktiv übermitteln — etwa über das Reservierungsformular auf dieser Website (Name, Telefon, E-Mail, Datum, Uhrzeit, Personenzahl, Nachricht). Diese Daten dienen ausschließlich der Bearbeitung Ihrer Anfrage.
            </p>
          </section>

          <section>
            <h2 className="font-display font-medium text-[20px] text-chestnut mb-2">Rechtsgrundlage</h2>
            <p>
              Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO sowie zur Vertragsanbahnung gemäß Art. 6 Abs. 1 lit. b DSGVO.
            </p>
          </section>

          <section>
            <h2 className="font-display font-medium text-[20px] text-chestnut mb-2">Speicherdauer</h2>
            <p>
              Reservierungsdaten werden bis zur Abwicklung Ihres Besuchs gespeichert und danach gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten (z.B. steuerrechtliche) entgegenstehen.
            </p>
          </section>

          <section>
            <h2 className="font-display font-medium text-[20px] text-chestnut mb-2">Cookies & Tracking</h2>
            <p>
              Diese Website verwendet keine Tracking-Cookies und keine Analyse-Tools. Lediglich technisch notwendige Cookies (z.B. zur Sprachauswahl) können gesetzt werden.
            </p>
          </section>

          <section>
            <h2 className="font-display font-medium text-[20px] text-chestnut mb-2">Google Maps</h2>
            <p>
              Wir betten auf der Kontaktseite eine Karte von Google Maps ein. Beim Aufruf werden Daten an Google übertragen (IP-Adresse, Browser-Informationen). Anbieter: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
            </p>
          </section>

          <section>
            <h2 className="font-display font-medium text-[20px] text-chestnut mb-2">Ihre Rechte</h2>
            <p>
              Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Beschwerderecht bei der österreichischen Datenschutzbehörde (
              <a
                href="https://www.dsb.gv.at/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-deep hover:underline"
              >
                www.dsb.gv.at
              </a>
              ).
            </p>
          </section>

          <section>
            <h2 className="font-display font-medium text-[20px] text-chestnut mb-2">Kontakt</h2>
            <p>
              Für Datenschutzanfragen schreiben Sie uns bitte an{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-chestnut hover:text-amber transition-colors">
                {CONTACT_EMAIL}
              </a>.
            </p>
          </section>

          <p className="italic text-ink/50 text-[13px] mt-10">
            Stand: Mai 2026. Diese Erklärung wird laufend an aktuelle rechtliche Vorgaben angepasst.
          </p>

        </div>
      </div>
    </main>
  )
}

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'kontakt@gasthaus-stern.at'

export default function Impressum() {
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
          Impressum
        </h1>

        <div className="font-sans text-[16px] text-ink leading-relaxed space-y-6 max-w-[60ch]">

          <p className="italic text-ink/60 text-[14px]">
            Offenlegung gemäß § 5 ECG (Österreichisches E-Commerce-Gesetz) und § 25 Mediengesetz.
          </p>

          <section>
            <h2 className="font-display font-medium text-[20px] text-chestnut mb-2">Anbieter</h2>
            <p>
              Gasthaus Stern<br />
              Sieglinde Baumann e.U.<br />
              St.-Peter-Straße 31<br />
              6700 Bludenz<br />
              Vorarlberg, Österreich
            </p>
          </section>

          <section>
            <h2 className="font-display font-medium text-[20px] text-chestnut mb-2">Kontakt</h2>
            <p>
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
            <h2 className="font-display font-medium text-[20px] text-chestnut mb-2">Unternehmensgegenstand</h2>
            <p>Gastronomie — gutbürgerliches Gasthaus</p>
          </section>

          <section>
            <h2 className="font-display font-medium text-[20px] text-chestnut mb-2">Berufsrechtliche Vorschriften</h2>
            <p>
              Gewerbeordnung 1994 (GewO){' '}
              <a
                href="https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10007517"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-deep hover:underline"
              >
                www.ris.bka.gv.at
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-display font-medium text-[20px] text-chestnut mb-2">UID-Nummer & Firmenbuch</h2>
            <p className="italic text-ink/60">
              {/* TODO: UID-Nummer, Firmenbuchnummer und Firmenbuchgericht vom Inhaber einsetzen */}
              UID-Nummer: ATU__________ <br />
              Firmenbuchnummer: __________ <br />
              Firmenbuchgericht: Landesgericht Feldkirch
            </p>
          </section>

          <section>
            <h2 className="font-display font-medium text-[20px] text-chestnut mb-2">Zuständige Aufsichtsbehörde</h2>
            <p>Bezirkshauptmannschaft Bludenz</p>
          </section>

          <section>
            <h2 className="font-display font-medium text-[20px] text-chestnut mb-2">Haftungsausschluss</h2>
            <p>
              Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="font-display font-medium text-[20px] text-chestnut mb-2">Urheberrecht</h2>
            <p>
              Alle Inhalte dieser Website unterliegen dem österreichischen Urheberrecht. Jede Verwertung außerhalb der engen Grenzen des Urheberrechtsgesetzes bedarf der schriftlichen Zustimmung des Betreibers.
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}

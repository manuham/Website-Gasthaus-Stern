// Öffnungszeiten des Gasthaus Stern Bludenz
// Quelle: Google Business Profile (aktuell gepflegt)

export const OEFFNUNGSZEITEN = [
  { tag: 'Montag',     ruhetag: true },
  { tag: 'Dienstag',   ruhetag: true },
  { tag: 'Mittwoch',   von: '09:00', bis: '22:00' },
  { tag: 'Donnerstag', von: '09:00', bis: '22:00' },
  { tag: 'Freitag',    von: '09:00', bis: '22:00' },
  { tag: 'Samstag',    von: '09:00', bis: '22:00' },
  { tag: 'Sonntag',    von: '09:00', bis: '14:00' },
]

/**
 * Prüft, ob das Gasthaus zum aktuellen Zeitpunkt geöffnet ist.
 * @returns {{ offen: boolean, bisUhr: string|null }}
 */
export function isOpenNow() {
  const now = new Date()
  // js: 0=Sonntag, 1=Montag, ... 6=Samstag
  const jsToDe = [6, 0, 1, 2, 3, 4, 5] // konvertiert JS-Wochentag → DE-Index (0=Mo)
  const deIdx = jsToDe[now.getDay()]
  const eintrag = OEFFNUNGSZEITEN[deIdx]

  if (!eintrag || eintrag.ruhetag) return { offen: false, bisUhr: null }

  const [vonH, vonM] = eintrag.von.split(':').map(Number)
  const [bisH, bisM] = eintrag.bis.split(':').map(Number)
  const aktuelleMinuten = now.getHours() * 60 + now.getMinutes()
  const vonMinuten = vonH * 60 + vonM
  const bisMinuten = bisH * 60 + bisM

  if (aktuelleMinuten >= vonMinuten && aktuelleMinuten < bisMinuten) {
    return { offen: true, bisUhr: eintrag.bis }
  }
  return { offen: false, bisUhr: null }
}

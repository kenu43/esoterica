export type Arcana = 'major' | 'minor'
export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles'
export type Element = 'fuego' | 'agua' | 'aire' | 'tierra'

export interface TarotCard {
  /** Identificador estable, coincide con el nombre de la imagen: major-00, cups-01… */
  id: string
  name: string
  arcana: Arcana
  suit?: Suit
  /** Número romano (arcanos mayores) o rango (As, 2…Rey). */
  numeral: string
  image: string
  keywords: string[]
  upright: string
  reversed: string
  /** Lectura en temas de amor (arcanos mayores). */
  love?: string
  /** Lectura en trabajo y dinero (arcanos mayores). */
  career?: string
  /** Consejo breve para la "carta del día". */
  advice: string
  element?: Element
  astrology?: string
}

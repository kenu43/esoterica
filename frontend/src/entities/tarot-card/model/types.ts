export type Arcana = 'major' | 'minor'
export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles'
export type Element = 'fuego' | 'agua' | 'aire' | 'tierra'

export interface TarotCard {
  id: string
  name: string
  arcana: Arcana
  suit?: Suit
  numeral: string
  image: string
  keywords: string[]
  upright: string
  reversed: string
  love?: string
  career?: string
  advice: string
  element?: Element
  astrology?: string
}

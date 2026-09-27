import { hashString, dayKey } from '@/shared/lib'
import { MAJOR_ARCANA } from './major-arcana.data'
import { MINOR_ARCANA } from './minor-arcana.data'
import type { TarotCard } from './types'

export const TAROT_DECK: TarotCard[] = [...MAJOR_ARCANA, ...MINOR_ARCANA]

export const getTarotCard = (id: string) => TAROT_DECK.find((c) => c.id === id)

/**
 * Carta del día determinista (misma para todos en la misma fecha).
 * Solo arcanos mayores: son los de mayor peso simbólico para una lectura diaria.
 * `reversed` se calcula con otra semilla para variar la orientación.
 */
export function getDailyCard(date = new Date()) {
  const key = dayKey(date)
  const card = MAJOR_ARCANA[hashString(`${key}:tarot`) % MAJOR_ARCANA.length]
  const reversed = hashString(`${key}:orientation`) % 5 === 0 // ~20 % invertida
  return { card, reversed }
}

/** Tirada aleatoria de N cartas sin repetir (para la tirada interactiva). */
export function drawCards(count: number, pool: TarotCard[] = TAROT_DECK) {
  const copy = [...pool]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, count).map((card) => ({ card, reversed: Math.random() < 0.25 }))
}

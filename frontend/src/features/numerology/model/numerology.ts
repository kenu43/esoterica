import type { CategoryId } from '@/entities/category'

export interface NumberProfile {
  title: string
  essence: string
  meaning: string
  ally: string
  color: string
  category: CategoryId
}

export const PROFILES: Record<number, NumberProfile> = {
  1: {
    title: 'El que abre camino',
    essence: 'Iniciativa, valentía y liderazgo.',
    meaning:
      'Llegaste a empezar cosas, no a seguir. Tienes fuerza para levantar un negocio o cambiar de rumbo, pero a veces cargas solo y eso te cansa. Aprende a pedir ayuda.',
    ally: 'Citrino o pirita para la confianza y el dinero',
    color: 'Dorado',
    category: 'suerte',
  },
  2: {
    title: 'El pacificador',
    essence: 'Sensibilidad, unión y paciencia.',
    meaning:
      'Eres el que arregla y une. Percibes lo que otros no dicen, y por eso absorbes la energía de todos. Necesitas limpiarte seguido para no cargar lo ajeno.',
    ally: 'Cuarzo rosado y baños de limpieza',
    color: 'Plateado',
    category: 'riegos',
  },
  3: {
    title: 'El comunicador',
    essence: 'Alegría, creatividad y palabra.',
    meaning:
      'Tu fuerza está en lo que dices y en lo que creas. Cuando estás bien, contagias a todo el mundo; cuando dispersas la energía, se te va en chismes y afanes.',
    ally: 'Velón amarillo para abrir caminos',
    color: 'Amarillo',
    category: 'velas',
  },
  4: {
    title: 'El constructor',
    essence: 'Orden, esfuerzo y estabilidad.',
    meaning:
      'Lo tuyo es levantar cosas firmes, ladrillo por ladrillo. Eres confiable, pero te cuesta soltar el control. Protege lo que construyes de la envidia.',
    ally: 'Obsidiana o azabache de protección',
    color: 'Verde',
    category: 'bisuteria',
  },
  5: {
    title: 'El aventurero',
    essence: 'Libertad, cambio y movimiento.',
    meaning:
      'No aguantas la rutina. Tu vida trae viajes, cambios y giros inesperados. Necesitas un ancla para no perder el rumbo en medio de tanto movimiento.',
    ally: 'Tetragramatón para caminar protegido',
    color: 'Azul',
    category: 'bisuteria',
  },
  6: {
    title: 'El protector del hogar',
    essence: 'Amor, familia y responsabilidad.',
    meaning:
      'Cuidas a los tuyos primero. Tu energía sostiene la casa, pero te olvidas de ti. Mantén tu espacio limpio y armonioso para recargarte.',
    ally: 'Sahumerio de copal y palo santo',
    color: 'Rosado',
    category: 'inciensos',
  },
  7: {
    title: 'El buscador',
    essence: 'Intuición, silencio y espiritualidad.',
    meaning:
      'Vas más profundo que los demás: te gusta el misterio, el tarot y entender el porqué de las cosas. Necesitas tiempo a solas para escuchar tu intuición.',
    ally: 'Péndulo de cuarzo y tarot',
    color: 'Morado',
    category: 'libreria',
  },
  8: {
    title: 'El de la abundancia',
    essence: 'Poder, dinero y logros.',
    meaning:
      'Tienes talla para los negocios y el manejo del dinero, y también atraes envidias. Equilibra lo material con lo espiritual y protege tu prosperidad.',
    ally: 'Duende de la suerte y riego de la abundancia',
    color: 'Dorado',
    category: 'suerte',
  },
  9: {
    title: 'El que cierra ciclos',
    essence: 'Entrega, sabiduría y desapego.',
    meaning:
      'Vienes a cerrar ciclos y a servir. Sueltas con dificultad lo que ya cumplió su función. Un buen despojo te ayuda a empezar de cero.',
    ally: 'Baño de despojo y salvia blanca',
    color: 'Blanco',
    category: 'riegos',
  },
  11: {
    title: 'El mensajero (número maestro)',
    essence: 'Intuición fuerte y luz para otros.',
    meaning:
      'Traes una sensibilidad especial: sientes y sabes cosas sin que nadie te las diga. Es un don, pero también te agota, así que cuida tu energía y rodéate de protección.',
    ally: 'Amatista o cuarzo y un buen resguardo',
    color: 'Plateado',
    category: 'bisuteria',
  },
  22: {
    title: 'El gran constructor (número maestro)',
    essence: 'Sueños grandes hechos realidad.',
    meaning:
      'Combinas visión y capacidad de ejecución: puedes levantar algo que trascienda. Lo difícil es no abrumarte con tanta responsabilidad.',
    ally: 'Ganesha para quitar obstáculos',
    color: 'Naranja',
    category: 'piedras',
  },
  33: {
    title: 'El maestro sanador (número maestro)',
    essence: 'Servicio, compasión y entrega.',
    meaning:
      'Naciste para acompañar y sanar a otros. Eres el más generoso, pero corres el riesgo de dar hasta agotarte. Recuerda recargarte tú también.',
    ally: 'Cuenco tibetano e inciensos',
    color: 'Blanco',
    category: 'piedras',
  },
}

const MASTER = new Set([11, 22, 33])

const sumDigits = (n: number) =>
  String(n)
    .split('')
    .reduce((acc, d) => acc + Number(d), 0)

function reduce(n: number): number {
  let value = n
  while (value > 9 && !MASTER.has(value)) value = sumDigits(value)
  return value
}

/** Número de vida (camino de vida): suma de todos los dígitos de la fecha de nacimiento. */
export function lifePathNumber(day: number, month: number, year: number) {
  return reduce(sumDigits(day) + sumDigits(month) + sumDigits(year))
}

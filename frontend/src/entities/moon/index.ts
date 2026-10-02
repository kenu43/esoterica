import type { BranchId } from '@/entities/branch'
import type { CategoryId } from '@/entities/category'

const SYNODIC_MONTH = 29.530588853
const rad = (deg: number) => (deg * Math.PI) / 180

function elongation(date: Date) {
  const jd = date.getTime() / 86_400_000 + 2440587.5
  const t = (jd - 2451545) / 36525
  const d = 297.8501921 + 445267.1114034 * t - 0.0018819 * t * t
  const m = 357.5291092 + 35999.0502909 * t
  const mp = 134.9633964 + 477198.8675055 * t + 0.0087414 * t * t
  const e =
    d +
    6.289 * Math.sin(rad(mp)) -
    2.1 * Math.sin(rad(m)) +
    1.274 * Math.sin(rad(2 * d - mp)) +
    0.658 * Math.sin(rad(2 * d)) +
    0.214 * Math.sin(rad(2 * mp)) +
    0.11 * Math.sin(rad(d))
  return ((e % 360) + 360) % 360
}

export interface MoonPhase {
  fraction: number
  illumination: number
  age: number
  name: string
  energy: string
  advice: string
  store: BranchId
  category: CategoryId
}

type PhaseInfo = Omit<MoonPhase, 'fraction' | 'illumination' | 'age'> & { until: number }

const NEW_MOON: Omit<PhaseInfo, 'until'> = {
  name: 'Luna nueva',
  energy: 'Siembra de intenciones y nuevos comienzos.',
  advice: 'Momento ideal para encender un velón con una petición nueva. Encuéntralo en El Sortilegio.',
  store: 'el-sortilegio',
  category: 'velas',
}

const PHASES: PhaseInfo[] = [
  { until: 1.84, ...NEW_MOON },
  {
    until: 5.53,
    name: 'Luna creciente',
    energy: 'Impulso, crecimiento y atracción.',
    advice: 'La energía crece: es tiempo de riegos de abundancia y abre caminos de La Colonia.',
    store: 'la-colonia',
    category: 'riegos',
  },
  {
    until: 9.22,
    name: 'Cuarto creciente',
    energy: 'Decisiones y superación de obstáculos.',
    advice: 'Buen momento para activar tu duende o tu Ganesha de Loto & Nirvana y mover el dinero.',
    store: 'loto-nirvana',
    category: 'suerte',
  },
  {
    until: 12.91,
    name: 'Gibosa creciente',
    energy: 'Paciencia y constancia antes de la cosecha.',
    advice: 'Refuerza tus peticiones con un velón preparado de El Sortilegio.',
    store: 'el-sortilegio',
    category: 'velas',
  },
  {
    until: 16.61,
    name: 'Luna llena',
    energy: 'Máxima energía, gratitud y poder.',
    advice: 'Carga tus amuletos y figuras bajo la luna. Consagra tu tetragramatón en El Sortilegio.',
    store: 'el-sortilegio',
    category: 'bisuteria',
  },
  {
    until: 20.3,
    name: 'Gibosa menguante',
    energy: 'Soltar lo que ya no sirve.',
    advice: 'Empieza a limpiar: un sahumerio de copal de La Colonia deja la casa liviana.',
    store: 'la-colonia',
    category: 'inciensos',
  },
  {
    until: 23.99,
    name: 'Cuarto menguante',
    energy: 'Cortar, perdonar y liberar.',
    advice: 'Momento ideal para limpiezas energéticas con los baños de despojo de La Colonia.',
    store: 'la-colonia',
    category: 'riegos',
  },
  {
    until: 27.68,
    name: 'Luna menguante',
    energy: 'Descanso, protección y cierre de ciclos.',
    advice: 'Hoy es luna menguante: tiempo de tumbar trabajos y protegerte con los productos de La Colonia.',
    store: 'la-colonia',
    category: 'riegos',
  },
  { until: SYNODIC_MONTH + 1, ...NEW_MOON },
]

export function getMoonPhase(date = new Date()): MoonPhase {
  const e = elongation(date)
  const fraction = e / 360
  const age = fraction * SYNODIC_MONTH
  const illumination = Math.round(((1 - Math.cos(rad(e))) / 2) * 100)
  const { until: _until, ...phase } = PHASES.find((p) => age < p.until)!
  return { fraction, illumination, age, ...phase }
}
export { MoonVisual } from './ui/MoonVisual'

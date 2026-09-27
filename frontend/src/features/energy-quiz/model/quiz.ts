import {
  CloudRain,
  Coins,
  Droplets,
  Flame,
  Heart,
  KeyRound,
  Leaf,
  ShieldAlert,
  Shield,
  Waves,
  Wind,
  Mountain,
  Hourglass,
  Flower2,
  type LucideIcon,
} from 'lucide-react'
import type { BranchId } from '@/entities/branch'
import type { CategoryId } from '@/entities/category'

type Weights = Partial<Record<CategoryId, number>>

export interface QuizOption {
  id: string
  label: string
  icon: LucideIcon
  weights: Weights
}

export interface QuizQuestion {
  id: string
  title: string
  options: QuizOption[]
}

export const QUESTIONS: QuizQuestion[] = [
  {
    id: 'feeling',
    title: '¿Cómo te has sentido últimamente?',
    options: [
      { id: 'cargado', label: 'Cargado, como con mala suerte', icon: CloudRain, weights: { banos: 3, sahumerios: 2 } },
      { id: 'estancado', label: 'Estancado con la plata', icon: Hourglass, weights: { suerte: 3, velones: 1 } },
      { id: 'miedo', label: 'Con miedo o envidias cerca', icon: ShieldAlert, weights: { amuletos: 3, figuras: 2 } },
      { id: 'inquieto', label: 'Inquieto, sin paz', icon: Wind, weights: { oriental: 3, sahumerios: 1 } },
    ],
  },
  {
    id: 'attract',
    title: '¿Qué quieres atraer a tu vida?',
    options: [
      { id: 'proteccion', label: 'Protección', icon: Shield, weights: { amuletos: 2, figuras: 2, velones: 1 } },
      { id: 'dinero', label: 'Dinero y clientes', icon: Coins, weights: { suerte: 3, banos: 1 } },
      { id: 'caminos', label: 'Que se abran los caminos', icon: KeyRound, weights: { velones: 3, banos: 1 } },
      { id: 'amor', label: 'Amor y armonía', icon: Heart, weights: { velones: 2, oriental: 1, tarot: 1 } },
    ],
  },
  {
    id: 'element',
    title: '¿Qué elemento te llama más?',
    options: [
      { id: 'fuego', label: 'Fuego', icon: Flame, weights: { velones: 2 } },
      { id: 'agua', label: 'Agua', icon: Waves, weights: { banos: 2 } },
      { id: 'tierra', label: 'Tierra', icon: Mountain, weights: { suerte: 1, amuletos: 1 } },
      { id: 'aire', label: 'Aire', icon: Leaf, weights: { sahumerios: 2, oriental: 1 } },
    ],
  },
]

export interface QuizResult {
  title: string
  message: string
  icon: LucideIcon
  store: BranchId
  categories: CategoryId[]
}

const RESULTS: Partial<Record<CategoryId, Omit<QuizResult, 'categories'>>> = {
  banos: {
    title: 'Necesitas una limpieza',
    message: 'Hay energía acumulada que te está frenando. Un baño de despojo y un buen sahumerio en la casa te van a aliviar.',
    icon: Droplets,
    store: 'la-colonia',
  },
  sahumerios: {
    title: 'Necesitas purificar tu espacio',
    message: 'Tu casa o tu negocio piden aire nuevo. Sahúma de adentro hacia la puerta y abre ventanas al terminar.',
    icon: Wind,
    store: 'la-colonia',
  },
  suerte: {
    title: 'Energía de abundancia',
    message: 'Es momento de mover el dinero. Un amuleto de la suerte cerca de la caja y un riego los viernes ayudan a que fluya.',
    icon: Coins,
    store: 'loto-nirvana',
  },
  amuletos: {
    title: 'Necesitas protección',
    message: 'Cuídate de envidias y malas intenciones. Lleva contigo un amuleto consagrado y refuerza la entrada de tu casa.',
    icon: Shield,
    store: 'el-sortilegio',
  },
  figuras: {
    title: 'Necesitas un guardián',
    message: 'Una devoción fuerte en tu altar te dará respaldo. La Santa Muerte y San Judas son los más buscados para esto.',
    icon: Shield,
    store: 'el-sortilegio',
  },
  velones: {
    title: 'Energía de apertura',
    message: 'Tus caminos quieren abrirse. Un velón preparado con tu petición concreta es el mejor primer paso.',
    icon: Flame,
    store: 'el-sortilegio',
  },
  oriental: {
    title: 'Energía de paz',
    message: 'Tu cuerpo te pide calma. El sonido de un cuenco y un rincón con tu Buda te ayudarán a recuperar el centro.',
    icon: Flower2,
    store: 'loto-nirvana',
  },
  tarot: {
    title: 'Necesitas claridad',
    message: 'Hay preguntas que merecen respuesta. Una lectura de tarot puede mostrarte el camino.',
    icon: Heart,
    store: 'el-sortilegio',
  },
}

/** Suma los pesos de las respuestas y devuelve el perfil energético. */
export function computeResult(answers: QuizOption[]): QuizResult {
  const score: Weights = {}
  for (const a of answers)
    for (const [cat, w] of Object.entries(a.weights) as [CategoryId, number][]) score[cat] = (score[cat] ?? 0) + w
  const ranked = (Object.entries(score) as [CategoryId, number][]).sort((a, b) => b[1] - a[1]).map(([c]) => c)
  const top = ranked[0] ?? 'amuletos'
  return { ...(RESULTS[top] ?? RESULTS.amuletos!), categories: ranked.slice(0, 3) }
}

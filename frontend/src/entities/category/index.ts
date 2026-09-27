import {
  Church,
  Droplets,
  Flame,
  Clover,
  Shield,
  Sparkles,
  Wind,
  Flower2,
  type LucideIcon,
} from 'lucide-react'

export type CategoryId =
  | 'figuras'
  | 'velones'
  | 'banos'
  | 'sahumerios'
  | 'amuletos'
  | 'suerte'
  | 'oriental'
  | 'tarot'

export interface Category {
  id: CategoryId
  name: string
  description: string
  icon: LucideIcon
  image: string
}

/**
 * Categorías del catálogo. Los mismos ids se usan como opciones en Sanity
 * (studio-universo-esoterico/schemaTypes/constants.ts): si agregas una, agrégala en ambos.
 */
export const CATEGORIES: Category[] = [
  {
    id: 'figuras',
    name: 'Figuras y santos',
    description: 'Santa Muerte, San Judas Tadeo, la Virgen, arcángeles y más.',
    icon: Church,
    image: '/images/products/santa-muerte.webp',
  },
  {
    id: 'velones',
    name: 'Velones y velas',
    description: 'Velones preparados, de figura y de colores para cada petición.',
    icon: Flame,
    image: '/images/products/velones.webp',
  },
  {
    id: 'banos',
    name: 'Baños y riegos',
    description: 'Despojos, abre caminos, tumba trabajos y riegos para el negocio.',
    icon: Droplets,
    image: '/images/products/despojo.webp',
  },
  {
    id: 'sahumerios',
    name: 'Sahumerios e inciensos',
    description: 'Copal, salvia, palo santo e inciensos para limpiar espacios.',
    icon: Wind,
    image: '/images/products/incienso-varitas.webp',
  },
  {
    id: 'amuletos',
    name: 'Amuletos y protección',
    description: 'Tetragramatones, azabaches, rosarios y pulseras consagradas.',
    icon: Shield,
    image: '/images/products/amuletos.webp',
  },
  {
    id: 'suerte',
    name: 'Suerte y abundancia',
    description: 'Duendes, gatos de la fortuna y elefantes para atraer el dinero.',
    icon: Clover,
    image: '/images/products/duende.webp',
  },
  {
    id: 'oriental',
    name: 'Oriente y meditación',
    description: 'Budas, Ganesha, cuencos tibetanos y atrapasueños.',
    icon: Flower2,
    image: '/images/products/buda.webp',
  },
  {
    id: 'tarot',
    name: 'Tarot y oráculos',
    description: 'Tarot de la Santa Muerte, Rider-Waite, péndulos y oráculos.',
    icon: Sparkles,
    image: '/images/products/tarot-mazo.webp',
  },
]

export const getCategory = (id: CategoryId) => CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0]

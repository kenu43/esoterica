import type { CategorySeed } from './types'

export const DEFAULT_CATEGORIES: CategorySeed[] = [
  {
    id: 'figuras',
    name: 'Figuras y santos',
    description: 'Santa Muerte, San Judas Tadeo, la Virgen, arcángeles y más.',
    icon: 'church',
    image: '/images/products/santa-muerte.webp',
  },
  {
    id: 'velones',
    name: 'Velones y velas',
    description: 'Velones preparados, de figura y de colores para cada petición.',
    icon: 'flame',
    image: '/images/products/velones.webp',
  },
  {
    id: 'banos',
    name: 'Baños y riegos',
    description: 'Despojos, abre caminos, tumba trabajos y riegos para el negocio.',
    icon: 'droplets',
    image: '/images/products/despojo.webp',
  },
  {
    id: 'sahumerios',
    name: 'Sahumerios e inciensos',
    description: 'Copal, salvia, palo santo e inciensos para limpiar espacios.',
    icon: 'wind',
    image: '/images/products/incienso-varitas.webp',
  },
  {
    id: 'amuletos',
    name: 'Amuletos y protección',
    description: 'Tetragramatones, azabaches, rosarios y pulseras consagradas.',
    icon: 'shield',
    image: '/images/products/amuletos.webp',
  },
  {
    id: 'suerte',
    name: 'Suerte y abundancia',
    description: 'Duendes, gatos de la fortuna y elefantes para atraer el dinero.',
    icon: 'clover',
    image: '/images/products/duende.webp',
  },
  {
    id: 'oriental',
    name: 'Oriente y meditación',
    description: 'Budas, Ganesha, cuencos tibetanos y atrapasueños.',
    icon: 'flower',
    image: '/images/products/buda.webp',
  },
  {
    id: 'tarot',
    name: 'Tarot y oráculos',
    description: 'Tarot de la Santa Muerte, Rider-Waite, péndulos y oráculos.',
    icon: 'sparkles',
    image: '/images/products/tarot-mazo.webp',
  },
]

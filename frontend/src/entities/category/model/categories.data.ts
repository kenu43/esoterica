import type { CategorySeed } from './types'

/** Respaldo local: mismas categorías (grupos del inventario) que en Sanity. Los ids son los slugs. */
export const DEFAULT_CATEGORIES: CategorySeed[] = [
  { id: 'figuras', name: 'Figuras religiosas', description: 'San Judas, la Virgen, arcángeles y más.', icon: 'church', image: '/images/products/san-judas.webp' },
  { id: 'santa-muerte', name: 'Santas Muertes', description: 'La Niña Blanca, la Negra y la Roja en todos los tamaños.', icon: 'skull', image: '/images/products/santa-muerte.webp' },
  { id: 'velas', name: 'Velas y veladoras', description: 'Velones preparados, de figura y de colores para cada petición.', icon: 'flame', image: '/images/products/velones.webp' },
  { id: 'riegos', name: 'Riegos y sales', description: 'Despojos, abre caminos, sales y riegos para el negocio.', icon: 'droplets', image: '/images/products/despojo.webp' },
  { id: 'inciensos', name: 'Inciensos y sahumerios', description: 'Copal, salvia, palo santo e inciensos para limpiar espacios.', icon: 'wind', image: '/images/products/incienso-varitas.webp' },
  { id: 'bisuteria', name: 'Bisutería y accesorios', description: 'Manillas, rosarios, dijes y pulseras para llevar contigo.', icon: 'medal', image: '/images/products/pulsera.webp' },
  { id: 'suerte', name: 'Suerte y Feng Shui', description: 'Pirámides, elefantes y Feng Shui para atraer el dinero.', icon: 'clover', image: '/images/products/elefante.webp' },
  { id: 'duendes', name: 'Duendes', description: 'Duendes guardianes para la prosperidad del hogar y el negocio.', icon: 'sprout', image: '/images/products/duende.webp' },
  { id: 'piedras', name: 'Piedras y cuarzos', description: 'Cuarzos y piedras naturales para energizar y proteger.', icon: 'gem', image: '/images/products/obsidiana.webp' },
  { id: 'san-diego', name: 'San Diego', description: 'La línea de San Diego para el negocio y la prosperidad.', icon: 'crown', image: '/images/products/figuras-tienda.webp' },
  { id: 'rituales', name: 'Rituales y santería', description: 'Todo para tus trabajos y ofrendas.', icon: 'wand', image: '/images/products/velas-rituales.webp' },
  { id: 'perfumeria', name: 'Perfumería', description: 'Lociones, perfumes y aguas con intención.', icon: 'spray-can', image: '/images/products/agua-florida.webp' },
  { id: 'jabones', name: 'Jabones', description: 'Jabones de baño para limpiar y proteger.', icon: 'bath', image: '/images/products/ruda.webp' },
  { id: 'libreria', name: 'Librería y novenas', description: 'Novenas, libros, oraciones y tarot.', icon: 'book', image: '/images/products/tarot-mazo.webp' },
  { id: 'natural', name: 'Sexual y natural', description: 'Productos naturales y de pareja.', icon: 'heart', image: '/images/products/miel.webp' },
  { id: 'trucos', name: 'Químicos y trucos', description: 'Trucos y preparados para el negocio.', icon: 'flask', image: '/images/products/aceites-esenciales.webp' },
  { id: 'extractos', name: 'Extractos', description: 'Extractos para tus rituales.', icon: 'test-tube', image: '/images/products/aceites-esenciales.webp' },
  { id: 'otros', name: 'Otros', description: 'Más productos de nuestras tiendas.', icon: 'star', image: '/images/products/amuletos.webp' },
]

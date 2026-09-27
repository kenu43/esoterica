import type { BranchId } from '@/entities/branch'
import type { CategoryId } from '@/entities/category'

export type ProductBadge = 'nuevo' | 'destacado' | 'oferta' | 'edicion-limitada'

export interface Product {
  id: string
  slug: string
  name: string
  category: CategoryId
  /** Precio en pesos colombianos (COP). */
  price: number
  /** Precio anterior si el producto está en oferta. */
  compareAtPrice?: number
  /** Unidad de venta: "unidad", "100 g", "10 ml"… */
  unit: string
  shortDescription: string
  description: string
  benefits: string[]
  image: string
  /** Sedes donde está disponible. */
  branches: BranchId[]
  badges: ProductBadge[]
  /** Etiquetas libres para búsqueda (intenciones, chakras, signos…). */
  tags: string[]
  /** ISO date: se usa para "Novedades". */
  createdAt: string
  inStock: boolean
  /** Intenciones (amor, protección…): claves de `INTENTIONS`. */
  intentions: string[]
  /** Fase lunar recomendada para usarlo (clave de `MOON_PHASES`). */
  moonPhase?: string
  /** Instrucciones de uso o ritual. */
  usageGuide?: string
  /** Fotos secundarias. */
  gallery: string[]
  /** Temporada (navidad, año nuevo…): clave de `SEASONS`. */
  season?: string
  /** Colores disponibles (velones, velas…). */
  colors: ProductColor[]
  /** Tamaños o presentaciones entre los que el cliente elige (ej.: figuras en varios tamaños). */
  sizes: ProductSize[]
  /** Materiales entre los que el cliente elige (ej.: madera, resina, metal…). */
  materials: ProductMaterial[]
  /**
   * Si tiene texto, el producto se puede personalizar y esta es la instrucción que ve el
   * cliente (ej.: "Nombre a grabar"). Si no, no se ofrece personalización.
   */
  customizationLabel?: string
}

export interface ProductColor {
  name: string
  /** Hex opcional (#RRGGBB); si falta se deduce del nombre. */
  hex?: string
}

export interface ProductSize {
  name: string
  /** Precio de este tamaño; si falta, se usa `Product.price`. */
  price?: number
}

export interface ProductMaterial {
  name: string
  /** Precio de este material; si falta, se usa `Product.price`. */
  price?: number
}

export type ProductSort = 'relevance' | 'price-asc' | 'price-desc' | 'newest'

export interface ProductFilter {
  search?: string
  category?: CategoryId | 'all'
  branch?: BranchId | 'all'
  sort?: ProductSort
  onlyNew?: boolean
}

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
}

export type ProductSort = 'relevance' | 'price-asc' | 'price-desc' | 'newest'

export interface ProductFilter {
  search?: string
  category?: CategoryId | 'all'
  branch?: BranchId | 'all'
  sort?: ProductSort
  onlyNew?: boolean
}

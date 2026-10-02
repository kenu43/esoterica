import type { BranchId } from '@/entities/branch'
import type { CategoryId } from '@/entities/category'

export type ProductBadge = 'nuevo' | 'destacado' | 'oferta' | 'edicion-limitada'

export interface Product {
  id: string
  slug: string
  name: string
  category: CategoryId
  extraCategories: CategoryId[]
  price: number
  compareAtPrice?: number
  unit: string
  shortDescription: string
  description: string
  benefits: string[]
  image: string
  /** Videos del producto: archivos subidos a Sanity o enlaces de YouTube/Vimeo, en el orden del panel. */
  videos?: ProductVideoItem[]
  branches: BranchId[]
  badges: ProductBadge[]
  tags: string[]
  createdAt: string
  inStock: boolean
  intentions: string[]
  moonPhase?: string
  usageGuide?: string
  /** Ficha técnica: pares dato/valor (duración, altura, aroma…). */
  specs?: { label: string; value: string }[]
  /** Advertencia o precaución de uso. */
  warning?: string
  gallery: string[]
  season?: string
  colors: ProductColor[]
  sizes: ProductSize[]
  materials: ProductMaterial[]
  variants: ProductVariant[]
  variantLabel?: string
  customizationLabel?: string
}

export interface ProductColor {
  name: string
  hex?: string
}

export interface ProductSize {
  name: string
  price?: number
}

export interface ProductMaterial {
  name: string
  price?: number
}

export interface ProductVariant {
  name: string
  price?: number
}

export interface ProductVideoItem {
  kind: 'file' | 'embed'
  src: string
}

export type ProductSort = 'relevance' | 'price-asc' | 'price-desc' | 'newest'

export interface ProductFilter {
  search?: string
  category?: CategoryId | 'all'
  branch?: BranchId | 'all'
  sort?: ProductSort
  onlyNew?: boolean
  /** Solo estas categorías (quiz, recomendaciones). */
  categories?: CategoryId[]
  /** Solo estos productos por id (lista de consulta). */
  ids?: string[]
  /** Máximo de resultados cuando no se pagina. */
  limit?: number
}

export interface ProductPage {
  items: Product[]
  total: number
}

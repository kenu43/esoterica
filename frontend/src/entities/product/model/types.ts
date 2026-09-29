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
  branches: BranchId[]
  badges: ProductBadge[]
  tags: string[]
  createdAt: string
  inStock: boolean
  intentions: string[]
  moonPhase?: string
  usageGuide?: string
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

export type ProductSort = 'relevance' | 'price-asc' | 'price-desc' | 'newest'

export interface ProductFilter {
  search?: string
  category?: CategoryId | 'all'
  branch?: BranchId | 'all'
  sort?: ProductSort
  onlyNew?: boolean
}

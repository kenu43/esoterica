import type { SanityImageSource } from '@sanity/image-url'
import { sanityFetch, sanityImage } from '@/shared/api'
import type { BranchId } from '@/entities/branch'
import type { CategoryId } from '@/entities/category'
import type { Product, ProductBadge } from '../model/types'
import { applyFilter, type ProductRepository } from './product.repository'

/** Forma del documento `product` tal como lo devuelve la consulta GROQ. */
interface SanityProduct {
  id: string
  slug: string
  name: string
  category: CategoryId
  price: number
  compareAtPrice?: number
  unit?: string
  shortDescription?: string
  description?: string
  benefits?: string[]
  badges?: ProductBadge[]
  tags?: string[]
  stores?: BranchId[]
  inStock?: boolean
  createdAt: string
  image?: SanityImageSource
}

const PRODUCT_PROJECTION = `{
  "id": _id,
  "slug": slug.current,
  name, category, price, compareAtPrice, unit,
  shortDescription, description, benefits, badges, tags, stores,
  "inStock": coalesce(inStock, true),
  "createdAt": coalesce(releaseDate, _createdAt),
  image
}`

/** Mapper: documento de Sanity → entidad de dominio (la UI nunca ve Sanity). */
const toProduct = (doc: SanityProduct): Product => ({
  id: doc.id,
  slug: doc.slug,
  name: doc.name,
  category: doc.category,
  price: doc.price,
  compareAtPrice: doc.compareAtPrice,
  unit: doc.unit ?? 'unidad',
  shortDescription: doc.shortDescription ?? '',
  description: doc.description ?? doc.shortDescription ?? '',
  benefits: doc.benefits ?? [],
  badges: doc.badges ?? [],
  tags: doc.tags ?? [],
  branches: doc.stores ?? [],
  inStock: doc.inStock ?? true,
  createdAt: doc.createdAt.slice(0, 10),
  image: doc.image ? sanityImage(doc.image, 800) : '/images/products/amuletos.webp',
})

/**
 * Catálogo pequeño (< 500 productos): se descarga completo una vez y se filtra
 * en el cliente; TanStack Query lo cachea. Cero índices ni costos extra.
 */
let cache: { at: number; promise: Promise<Product[]> } | null = null

async function fetchAll(): Promise<Product[]> {
  // Una sola petición compartida por todas las consultas durante 60 s
  if (!cache || Date.now() - cache.at > 60_000) {
    const promise = sanityFetch<SanityProduct[]>(
      `*[_type == "product" && defined(slug.current)] | order(_createdAt desc) ${PRODUCT_PROJECTION}`,
    ).then((docs) => docs.map(toProduct))
    promise.catch(() => (cache = null))
    cache = { at: Date.now(), promise }
  }
  return cache.promise
}

export const sanityProductRepository: ProductRepository = {
  async list(filter) {
    return applyFilter(await fetchAll(), filter)
  },
  async getBySlug(slug) {
    return (await fetchAll()).find((p) => p.slug === slug) ?? null
  },
  async getFeatured(limit = 8) {
    return (await fetchAll()).filter((p) => p.badges.includes('destacado')).slice(0, limit)
  },
  async getNewArrivals(limit = 8) {
    return (await fetchAll()).slice(0, limit)
  },
}

import type { SanityImageSource } from '@sanity/image-url'
import { sanityFetch, sanityImage } from '@/shared/api'
import type { BranchId } from '@/entities/branch'
import type { CategoryId } from '@/entities/category'
import type { Product, ProductBadge, ProductColor } from '../model/types'
import { applyFilter, type ProductRepository } from './product.repository'

/** Forma del documento `product` tal como lo devuelve la consulta GROQ. */
interface SanityProduct {
  id: string
  slug: string
  name: string
  category: CategoryId
  price: number
  compareAtPrice?: number
  discountPercent?: number
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
  intention?: string[]
  moonPhase?: string
  usageGuide?: string
  gallery?: ({ asset?: unknown } & SanityImageSource)[]
  season?: string
  colors?: ProductColor[]
}

const PRODUCT_PROJECTION = `{
  "id": _id,
  "slug": slug.current,
  name, price, compareAtPrice, discountPercent, unit,
  shortDescription, description, benefits, badges, tags, stores,
  "category": coalesce(category->slug.current, category),
  "inStock": coalesce(inStock, true),
  "createdAt": coalesce(releaseDate, _createdAt),
  image, moonPhase, usageGuide, colors, gallery,
  "intention": intention[]->slug.current,
  "season": season->slug.current
}`

/** Mapper: documento de Sanity → entidad de dominio (la UI nunca ve Sanity). */
/** Con descuento en %, el precio del Studio es el normal (queda tachado) y el final se calcula aquí, redondeado a $100. */
function resolvePrices({ price, compareAtPrice, discountPercent }: SanityProduct) {
  if (discountPercent && discountPercent > 0 && discountPercent < 100)
    return { price: Math.round((price * (1 - discountPercent / 100)) / 100) * 100, compareAtPrice: price }
  return { price, compareAtPrice }
}

const toProduct = (doc: SanityProduct): Product => ({
  id: doc.id,
  slug: doc.slug,
  name: doc.name,
  category: typeof doc.category === 'string' ? doc.category : 'otros',
  ...resolvePrices(doc),
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
  intentions: (doc.intention ?? []).filter((v): v is string => !!v),
  moonPhase: doc.moonPhase || undefined,
  usageGuide: doc.usageGuide?.trim() || undefined,
  gallery: (doc.gallery ?? []).filter((g) => !!g?.asset).map((g) => sanityImage(g, 800)),
  season: doc.season || undefined,
  colors: (doc.colors ?? []).filter((c) => c?.name?.trim()),
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

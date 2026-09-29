import type { SanityImageSource } from '@sanity/image-url'
import { sanityFetch, sanityImage } from '@/shared/api'
import type { BranchId } from '@/entities/branch'
import type { CategoryId } from '@/entities/category'
import type { Product, ProductBadge, ProductColor, ProductMaterial, ProductSize, ProductVariant } from '../model/types'
import { applyFilter, type ProductRepository } from './product.repository'

interface SanityProduct {
  id: string
  slug: string
  name: string
  category: CategoryId
  extraCategories?: CategoryId[]
  price?: number
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
  sizes?: ProductSize[]
  materials?: ProductMaterial[]
  variants?: ProductVariant[]
  variantLabel?: string
  customizationLabel?: string
}

const PRODUCT_PROJECTION = `{
  "id": _id,
  "slug": slug.current,
  name, price, compareAtPrice, discountPercent, unit,
  shortDescription, description, benefits, badges, tags, stores,
  "category": coalesce(category->slug.current, category),
  "extraCategories": extraCategories[]->slug.current,
  "inStock": coalesce(inStock, true),
  "createdAt": coalesce(releaseDate, _createdAt),
  image, moonPhase, usageGuide, colors, sizes, materials, variants, variantLabel, customizationLabel, gallery,
  "intention": intention[]->slug.current,
  "season": season->slug.current
}`

function resolvePrices({ price = 0, compareAtPrice, discountPercent }: SanityProduct) {
  if (price > 0 && discountPercent && discountPercent > 0 && discountPercent < 100)
    return { price: Math.round((price * (1 - discountPercent / 100)) / 100) * 100, compareAtPrice: price }
  return { price, compareAtPrice }
}

const toProduct = (doc: SanityProduct): Product => ({
  id: doc.id,
  slug: doc.slug,
  name: doc.name,
  category: typeof doc.category === 'string' ? doc.category : 'otros',
  extraCategories: (doc.extraCategories ?? []).filter((c): c is CategoryId => !!c),
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
  sizes: (doc.sizes ?? []).filter((s) => s?.name?.trim()),
  materials: (doc.materials ?? []).filter((m) => m?.name?.trim()),
  variants: (doc.variants ?? []).filter((v) => v?.name?.trim()),
  variantLabel: doc.variantLabel?.trim() || undefined,
  customizationLabel: doc.customizationLabel?.trim() || undefined,
})

let cache: { at: number; promise: Promise<Product[]> } | null = null

async function fetchAll(): Promise<Product[]> {
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

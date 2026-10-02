import type { SanityImageSource } from '@sanity/image-url'
import { sanityFetch, sanityImage } from '@/shared/api'
import type { BranchId } from '@/entities/branch'
import type { CategoryId } from '@/entities/category'
import type { Product, ProductBadge, ProductColor, ProductFilter, ProductMaterial, ProductPage, ProductSize, ProductVariant } from '../model/types'
import type { ProductRepository } from './product.repository'

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
  specs?: { label?: string; value?: string }[]
  warning?: string
  gallery?: ({ asset?: unknown } & SanityImageSource)[]
  season?: string
  colors?: ProductColor[]
  sizes?: ProductSize[]
  materials?: ProductMaterial[]
  variants?: ProductVariant[]
  variantLabel?: string
  customizationLabel?: string
  videoFiles?: (string | null)[]
  videoUrls?: string[]
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
  image, moonPhase, usageGuide, specs, warning, colors, sizes, materials, variants, variantLabel, customizationLabel, gallery,
  "intention": intention[]->slug.current,
  "season": season->slug.current,
  "videoFiles": videos[].asset->url, videoUrls
}`

function resolvePrices({ price = 0, compareAtPrice, discountPercent }: SanityProduct) {
  if (price > 0 && discountPercent && discountPercent > 0 && discountPercent < 100)
    return { price: Math.round((price * (1 - discountPercent / 100)) / 100) * 100, compareAtPrice: price }
  return { price, compareAtPrice }
}

/** Archivos subidos primero y luego enlaces; los de YouTube/Vimeo se convierten a su URL de incrustación. */
function toVideos(doc: SanityProduct): Product['videos'] {
  const files = (doc.videoFiles ?? []).filter((u): u is string => !!u).map((src) => ({ kind: 'file' as const, src }))
  const embeds = (doc.videoUrls ?? []).flatMap((raw) => {
    const url = raw?.trim() ?? ''
    const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/)
    if (yt) return [{ kind: 'embed' as const, src: `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0&modestbranding=1&playsinline=1` }]
    const tt = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/)
    if (tt) return [{ kind: 'embed' as const, src: `https://www.tiktok.com/embed/v2/${tt[1]}` }]
    const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
    if (vm) return [{ kind: 'embed' as const, src: `https://player.vimeo.com/video/${vm[1]}?title=0&byline=0&portrait=0` }]
    return []
  })
  return [...files, ...embeds]
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
  image: doc.image ? sanityImage(doc.image, 800) : '',
  intentions: (doc.intention ?? []).filter((v): v is string => !!v),
  moonPhase: doc.moonPhase || undefined,
  usageGuide: doc.usageGuide?.trim() || undefined,
  specs: (doc.specs ?? []).filter((s): s is { label: string; value: string } => !!s?.label && !!s?.value),
  warning: doc.warning?.trim() || undefined,
  gallery: (doc.gallery ?? []).filter((g) => !!g?.asset).map((g) => sanityImage(g, 800)),
  season: doc.season || undefined,
  colors: (doc.colors ?? []).filter((c) => c?.name?.trim()),
  sizes: (doc.sizes ?? []).filter((s) => s?.name?.trim()),
  materials: (doc.materials ?? []).filter((m) => m?.name?.trim()),
  variants: (doc.variants ?? []).filter((v) => v?.name?.trim()),
  variantLabel: doc.variantLabel?.trim() || undefined,
  customizationLabel: doc.customizationLabel?.trim() || undefined,
  videos: toVideos(doc),
})

/** Proyección liviana para listados: sin descripción larga, guía de uso ni beneficios. */
const LIST_PROJECTION = `{
  "id": _id,
  "slug": slug.current,
  name, price, compareAtPrice, discountPercent, unit,
  shortDescription, badges, tags, stores,
  "category": coalesce(category->slug.current, category),
  "inStock": coalesce(inStock, true),
  "createdAt": coalesce(releaseDate, _createdAt),
  image
}`

const ORDERS = {
  relevance: `order(select("destacado" in badges => 0, "nuevo" in badges => 1, 2) asc, name asc)`,
  newest: `order(coalesce(releaseDate, _createdAt) desc, name asc)`,
  'price-asc': `order(coalesce(price, 999999999) asc, name asc)`,
  'price-desc': `order(coalesce(price, 0) desc, name asc)`,
} as const

/** Condiciones GROQ + parámetros a partir del filtro; cada palabra buscada debe aparecer en nombre, frase, etiquetas o código. */
function buildFilter(filter: ProductFilter) {
  const terms = (filter.search ?? '').trim().toLowerCase().split(/\s+/).filter(Boolean).slice(0, 5)
  const params: Record<string, unknown> = {
    cat: filter.category ?? 'all',
    branch: filter.branch ?? 'all',
    onlyNew: !!filter.onlyNew,
    cats: filter.categories ?? [],
    ids: filter.ids ?? [],
    hasIds: !!filter.ids,
  }
  const termConds = terms.map((t, i) => {
    params[`t${i}`] = `${t}*`
    return `(name match $t${i} || shortDescription match $t${i} || tags[] match $t${i} || barcode == "${t.replace(/[^a-z0-9]/g, '')}")`
  })
  const conds = [
    '_type == "product" && defined(slug.current) && coalesce(visible, true)',
    '($cat == "all" || category->slug.current == $cat || $cat in extraCategories[]->slug.current)',
    '(count($cats) == 0 || category->slug.current in $cats)',
    '(!$hasIds || _id in $ids)',
    '($branch == "all" || $branch in stores)',
    '(!$onlyNew || "nuevo" in badges)',
    ...termConds,
  ]
  return { where: `*[${conds.join(' && ')}]`, params }
}

async function query(filter: ProductFilter, from: number, to: number): Promise<ProductPage> {
  const { where, params } = buildFilter(filter)
  const order = ORDERS[filter.sort ?? 'relevance']
  const res = await sanityFetch<{ items: SanityProduct[]; total: number }>(
    `{ "items": ${where} | ${order} [${from}...${to}] ${LIST_PROJECTION}, "total": count(${where}) }`,
    params,
  )
  return { items: res.items.map(toProduct), total: res.total }
}

async function one(where: string, params: Record<string, unknown>) {
  const doc = await sanityFetch<SanityProduct | null>(`*[_type == "product" && coalesce(visible, true) && ${where}][0] ${PRODUCT_PROJECTION}`, params)
  return doc ? toProduct(doc) : null
}

export const sanityProductRepository: ProductRepository = {
  async list(filter = {}) {
    return (await query(filter, 0, filter.limit ?? 48)).items
  },
  page(filter, offset, limit) {
    return query(filter, offset, offset + limit)
  },
  async categoryCounts() {
    const rows = await sanityFetch<{ id: string; n: number }[]>(
      `*[_type == "category" && defined(slug.current)]{ "id": slug.current, "n": count(*[_type == "product" && coalesce(visible, true) && references(^._id)]) }`,
    )
    return Object.fromEntries(rows.map((r) => [r.id, r.n]))
  },
  getBySlug(slug) {
    return one('slug.current == $slug', { slug })
  },
  async getFeatured(limit = 8) {
    return (await sanityFetch<SanityProduct[]>(
      `*[_type == "product" && defined(slug.current) && coalesce(visible, true) && "destacado" in badges && coalesce(inStock, true)] | ${ORDERS.relevance} [0...${limit}] ${LIST_PROJECTION}`,
    )).map(toProduct)
  },
  async getNewArrivals(limit = 8) {
    return (await sanityFetch<SanityProduct[]>(
      `*[_type == "product" && defined(slug.current) && coalesce(visible, true) && "nuevo" in badges] | ${ORDERS.newest} [0...${limit}] ${LIST_PROJECTION}`,
    )).map(toProduct)
  },
}

import type { Product, ProductFilter, ProductPage } from '../model/types'

export interface ProductRepository {
  list(filter?: ProductFilter): Promise<Product[]>
  /** Página del catálogo: filtro, orden y corte se resuelven en el servidor. */
  page(filter: ProductFilter, offset: number, limit: number): Promise<ProductPage>
  /** Cantidad de productos por categoría (id = slug). */
  categoryCounts(): Promise<Record<string, number>>
  getBySlug(slug: string): Promise<Product | null>
  getFeatured(limit?: number): Promise<Product[]>
  getNewArrivals(limit?: number): Promise<Product[]>
}

/** Filtro y orden en memoria compartido por las implementaciones. */
export function applyFilter(products: Product[], filter: ProductFilter = {}): Product[] {
  const { search, category = 'all', branch = 'all', sort = 'relevance', onlyNew } = filter
  const term = search?.trim().toLowerCase()

  const result = products.filter((p) => {
    if (category !== 'all' && p.category !== category && !p.extraCategories.includes(category)) return false
    if (filter.categories?.length && !filter.categories.includes(p.category)) return false
    if (filter.ids && !filter.ids.includes(p.id)) return false
    if (branch !== 'all' && !p.branches.includes(branch)) return false
    if (onlyNew && !p.badges.includes('nuevo')) return false
    if (term) {
      const haystack = [p.name, p.shortDescription, p.category, ...p.tags, ...p.intentions, p.season, ...p.colors.map((c) => c.name)]
        .join(' ')
        .toLowerCase()
      return haystack.includes(term)
    }
    return true
  })

  const sorted = sortProducts(result, sort)
  return filter.limit ? sorted.slice(0, filter.limit) : sorted
}

function sortProducts(result: Product[], sort: ProductFilter['sort']) {
  switch (sort) {
    case 'price-asc':
      return result.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return result.sort((a, b) => b.price - a.price)
    case 'newest':
      return result.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    default:
      return result
  }
}

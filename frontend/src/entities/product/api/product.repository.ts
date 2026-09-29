import type { Product, ProductFilter } from '../model/types'

export interface ProductRepository {
  list(filter?: ProductFilter): Promise<Product[]>
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

import { applyFilter, type ProductRepository } from './product.repository'
import { MOCK_PRODUCTS } from './mockData'

/** Implementación en memoria con mockData.ts: sin red, ideal para desarrollo y respaldo. */
export const mockProductRepository: ProductRepository = {
  async list(filter) {
    return applyFilter([...MOCK_PRODUCTS], filter)
  },
  async getBySlug(slug) {
    return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null
  },
  async getFeatured(limit = 8) {
    return MOCK_PRODUCTS.filter((p) => p.badges.includes('destacado')).slice(0, limit)
  },
  async getNewArrivals(limit = 8) {
    return [...MOCK_PRODUCTS].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit)
  },
}

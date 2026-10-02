import { applyFilter, type ProductRepository } from './product.repository'
import { MOCK_PRODUCTS } from './mockData'

export const mockProductRepository: ProductRepository = {
  async list(filter) {
    return applyFilter([...MOCK_PRODUCTS], filter)
  },
  async page(filter, offset, limit) {
    const all = applyFilter([...MOCK_PRODUCTS], { ...filter, limit: undefined })
    return { items: all.slice(offset, offset + limit), total: all.length }
  },
  async categoryCounts() {
    return MOCK_PRODUCTS.reduce<Record<string, number>>((acc, p) => ({ ...acc, [p.category]: (acc[p.category] ?? 0) + 1 }), {})
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

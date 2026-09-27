import { env } from '@/shared/config'
import { mockProductRepository } from './mock.repository'
import type { ProductRepository } from './product.repository'
import { sanityProductRepository } from './sanity.repository'

/**
 * Decorador de respaldo: si Sanity falla o aún no tiene productos,
 * se usan los datos de mockData.ts para que la tienda nunca quede vacía.
 */
function withFallback(primary: ProductRepository, fallback: ProductRepository): ProductRepository {
  const guard =
    <A extends unknown[], R>(fn: (r: ProductRepository) => (...a: A) => Promise<R>) =>
    async (...args: A): Promise<R> => {
      try {
        const result = await fn(primary)(...args)
        const empty = result == null || (Array.isArray(result) && result.length === 0)
        return empty ? fn(fallback)(...args) : result
      } catch (err) {
        console.warn('[catálogo] Sanity no respondió, usando mockData', err)
        return fn(fallback)(...args)
      }
    }
  return {
    list: guard((r) => r.list),
    getBySlug: guard((r) => r.getBySlug),
    getFeatured: guard((r) => r.getFeatured),
    getNewArrivals: guard((r) => r.getNewArrivals),
  }
}

/** Punto único de inyección: VITE_DATA_SOURCE decide la fuente sin tocar componentes. */
export const productRepository: ProductRepository =
  env.VITE_DATA_SOURCE === 'sanity'
    ? withFallback(sanityProductRepository, mockProductRepository)
    : mockProductRepository

export type { ProductRepository } from './product.repository'
export { MOCK_PRODUCTS, mockProductsByStore } from './mockData'

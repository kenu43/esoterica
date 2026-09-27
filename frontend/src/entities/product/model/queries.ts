import { queryOptions, useQuery } from '@tanstack/react-query'
import { productRepository } from '../api'
import type { ProductFilter } from './types'

/** Query key factory: claves tipadas y centralizadas para invalidar caché con precisión. */
export const productKeys = {
  all: ['products'] as const,
  list: (filter: ProductFilter) => [...productKeys.all, 'list', filter] as const,
  detail: (slug: string) => [...productKeys.all, 'detail', slug] as const,
  featured: () => [...productKeys.all, 'featured'] as const,
  newArrivals: () => [...productKeys.all, 'new'] as const,
}

export const productQueries = {
  list: (filter: ProductFilter = {}) =>
    queryOptions({
      queryKey: productKeys.list(filter),
      queryFn: () => productRepository.list(filter),
      placeholderData: (prev) => prev,
    }),
  detail: (slug: string) =>
    queryOptions({
      queryKey: productKeys.detail(slug),
      queryFn: () => productRepository.getBySlug(slug),
    }),
  featured: () =>
    queryOptions({ queryKey: productKeys.featured(), queryFn: () => productRepository.getFeatured() }),
  newArrivals: () =>
    queryOptions({
      queryKey: productKeys.newArrivals(),
      queryFn: () => productRepository.getNewArrivals(),
    }),
}

export const useProducts = (filter?: ProductFilter) => useQuery(productQueries.list(filter))
export const useProduct = (slug: string) => useQuery(productQueries.detail(slug))
export const useFeaturedProducts = () => useQuery(productQueries.featured())
export const useNewArrivals = () => useQuery(productQueries.newArrivals())

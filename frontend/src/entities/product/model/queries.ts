import { keepPreviousData, infiniteQueryOptions, queryOptions, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { productRepository } from '../api'
import type { ProductFilter } from './types'

export const productKeys = {
  all: ['products'] as const,
  list: (filter: ProductFilter) => [...productKeys.all, 'list', filter] as const,
  detail: (slug: string) => [...productKeys.all, 'detail', slug] as const,
  feed: (filter: ProductFilter) => [...productKeys.all, 'feed', filter] as const,
  counts: () => [...productKeys.all, 'counts'] as const,
  featured: () => [...productKeys.all, 'featured'] as const,
  newArrivals: () => [...productKeys.all, 'new'] as const,
}

const PAGE_SIZE = 24

export const productQueries = {
  list: (filter: ProductFilter = {}) =>
    queryOptions({
      queryKey: productKeys.list(filter),
      queryFn: () => productRepository.list(filter),
      placeholderData: (prev) => prev,
    }),
  feed: (filter: ProductFilter = {}) =>
    infiniteQueryOptions({
      queryKey: productKeys.feed(filter),
      queryFn: ({ pageParam }) => productRepository.page(filter, pageParam, PAGE_SIZE),
      initialPageParam: 0,
      getNextPageParam: (last, pages) => {
        const loaded = pages.reduce((n, p) => n + p.items.length, 0)
        return loaded < last.total ? loaded : undefined
      },
      placeholderData: keepPreviousData,
    }),
  counts: () => queryOptions({ queryKey: productKeys.counts(), queryFn: () => productRepository.categoryCounts(), staleTime: 5 * 60_000 }),
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
export const useProductFeed = (filter?: ProductFilter) => useInfiniteQuery(productQueries.feed(filter))
export const useCategoryCounts = () => useQuery(productQueries.counts())

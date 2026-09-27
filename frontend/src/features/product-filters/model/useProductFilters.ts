import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import type { BranchId } from '@/entities/branch'
import type { CategoryId } from '@/entities/category'
import type { ProductFilter, ProductSort } from '@/entities/product'

/**
 * Filtros sincronizados con la URL (?q=&cat=&sede=&orden=&nuevo=1):
 * se pueden compartir enlaces y el botón "atrás" funciona.
 */
export function useProductFilters() {
  const [params, setParams] = useSearchParams()

  const filter = useMemo<ProductFilter>(
    () => ({
      search: params.get('q') ?? '',
      category: (params.get('cat') as CategoryId) ?? 'all',
      branch: (params.get('sede') as BranchId) ?? 'all',
      sort: (params.get('orden') as ProductSort) ?? 'relevance',
      onlyNew: params.get('nuevo') === '1',
    }),
    [params],
  )

  const update = useCallback(
    (patch: Partial<ProductFilter>) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          const set = (key: string, value: string | undefined, empty: string) =>
            !value || value === empty ? next.delete(key) : next.set(key, value)
          if ('search' in patch) set('q', patch.search, '')
          if ('category' in patch) set('cat', patch.category, 'all')
          if ('branch' in patch) set('sede', patch.branch, 'all')
          if ('sort' in patch) set('orden', patch.sort, 'relevance')
          if ('onlyNew' in patch) set('nuevo', patch.onlyNew ? '1' : '', '')
          return next
        },
        { replace: true, preventScrollReset: true },
      )
    },
    [setParams],
  )

  const reset = useCallback(() => setParams({}, { replace: true }), [setParams])

  const activeCount =
    Number(!!filter.search) +
    Number(filter.category !== 'all') +
    Number(filter.branch !== 'all') +
    Number(!!filter.onlyNew)

  return { filter, update, reset, activeCount }
}

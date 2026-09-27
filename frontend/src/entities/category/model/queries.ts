import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from '../api/sanity.repository'
import { DEFAULT_CATEGORIES } from './categories.data'
import { resolveCategoryIcon } from './icons'
import type { Category, CategoryId } from './types'

export const categoryKeys = { all: ['categories'] as const }

/** Lista completa (mientras carga devuelve las de respaldo, así la UI nunca queda vacía). */
export function useCategories(): Category[] {
  const { data } = useQuery({
    queryKey: categoryKeys.all,
    queryFn: fetchCategories,
    staleTime: 5 * 60_000,
  })
  return data ?? DEFAULT_CATEGORIES.map((c) => ({ ...c, icon: resolveCategoryIcon(c.icon) }))
}

const UNKNOWN: Category = {
  id: 'otros',
  name: 'Otros',
  description: '',
  icon: resolveCategoryIcon(),
  image: '/images/products/amuletos.webp',
}

/** Categoría por id; si el producto apunta a una categoría borrada, cae en "Otros". */
export function useCategory(id?: CategoryId): Category {
  const categories = useCategories()
  return categories.find((c) => c.id === id) ?? UNKNOWN
}

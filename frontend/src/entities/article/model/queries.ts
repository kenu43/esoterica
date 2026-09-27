import { useQuery } from '@tanstack/react-query'
import { fetchArticles } from '../api/sanity.repository'

/** Todos los artículos (una sola consulta cacheada; la lista es corta). */
export function useArticles() {
  return useQuery({ queryKey: ['articles'], queryFn: fetchArticles, staleTime: 5 * 60_000 })
}

export function useArticle(slug: string) {
  const { data, isPending } = useArticles()
  return { article: data?.find((a) => a.slug === slug) ?? null, isPending }
}

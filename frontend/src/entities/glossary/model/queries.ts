import { useQuery } from '@tanstack/react-query'
import { fetchGlossary } from '../api/sanity.repository'
import { DEFAULT_GLOSSARY } from './glossary.data'
import type { GlossaryTerm } from './types'

/** Términos del glosario (mientras carga devuelve los de respaldo). */
export function useGlossary(): GlossaryTerm[] {
  const { data } = useQuery({ queryKey: ['glossary'], queryFn: fetchGlossary, staleTime: 5 * 60_000 })
  return data ?? DEFAULT_GLOSSARY
}

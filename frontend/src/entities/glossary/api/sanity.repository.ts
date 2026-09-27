import { sanityFetch } from '@/shared/api'
import { env } from '@/shared/config'
import { DEFAULT_GLOSSARY } from '../model/glossary.data'
import type { GlossaryGroup, GlossaryTerm } from '../model/types'

interface SanityTerm {
  id: string
  term: string
  group: GlossaryGroup
  summary?: string
  detail?: string
  category?: string
}

/** Glosario desde Sanity; si falla o está vacío se usa el de `glossary.data.ts`. */
export async function fetchGlossary(): Promise<GlossaryTerm[]> {
  if (env.VITE_DATA_SOURCE !== 'sanity') return DEFAULT_GLOSSARY
  try {
    const docs = await sanityFetch<SanityTerm[]>(
      `*[_type == "glossaryTerm" && defined(slug.current)] | order(term asc) {
        "id": slug.current, term, group, summary, detail, "category": category->slug.current
      }`,
    )
    if (!docs.length) return DEFAULT_GLOSSARY
    return docs.map((d) => ({
      id: d.id,
      term: d.term,
      group: d.group,
      summary: d.summary ?? '',
      detail: d.detail ?? '',
      category: d.category,
    }))
  } catch (err) {
    console.warn('[glosario] Sanity no respondió, usando el de respaldo', err)
    return DEFAULT_GLOSSARY
  }
}

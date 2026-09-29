import { useQuery } from '@tanstack/react-query'
import { sanityFetch } from '@/shared/api'
import { env } from '@/shared/config'
import { INTENTIONS, SEASONS } from './taxonomy'

interface Option {
  value: string
  label: string
}

interface Taxonomy {
  seasons: Option[]
  intentions: Option[]
}

const defaults: Taxonomy = { seasons: [...SEASONS], intentions: [...INTENTIONS] }

async function fetchTaxonomy(): Promise<Taxonomy> {
  if (env.VITE_DATA_SOURCE !== 'sanity') return defaults
  try {
    const data = await sanityFetch<{ seasons: Option[]; intentions: Option[] }>(
      `{
        "seasons": *[_type == "season" && defined(slug.current)] | order(name asc) { "value": slug.current, "label": name },
        "intentions": *[_type == "intention" && defined(slug.current)] | order(name asc) { "value": slug.current, "label": name }
      }`,
    )
    return {
      seasons: data.seasons.length ? data.seasons : defaults.seasons,
      intentions: data.intentions.length ? data.intentions : defaults.intentions,
    }
  } catch {
    return defaults
  }
}

const humanize = (slug: string) => {
  const text = slug.replace(/-/g, ' ')
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/** Funciones para traducir el slug de una temporada o intención a su nombre visible. */
export function useTaxonomyLabels() {
  const { data = defaults } = useQuery({ queryKey: ['taxonomy'], queryFn: fetchTaxonomy, staleTime: 5 * 60_000 })
  const label = (list: Option[]) => (slug?: string | null) =>
    slug ? (list.find((o) => o.value === slug)?.label ?? humanize(slug)) : ''
  return { season: label(data.seasons), intention: label(data.intentions) }
}

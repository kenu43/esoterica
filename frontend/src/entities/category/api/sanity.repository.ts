import { sanityFetch, sanityImage } from '@/shared/api'
import { env } from '@/shared/config'
import { DEFAULT_CATEGORIES } from '../model/categories.data'
import { resolveCategoryIcon } from '../model/icons'
import type { Category } from '../model/types'

interface SanityCategory {
  id: string
  name: string
  description?: string
  icon?: string
  image?: Parameters<typeof sanityImage>[0]
}

const fallbackImage = (id: string) =>
  DEFAULT_CATEGORIES.find((c) => c.id === id)?.image ?? '/images/products/amuletos.webp'

const toCategory = (doc: SanityCategory): Category => ({
  id: doc.id,
  name: doc.name,
  description: doc.description ?? '',
  icon: resolveCategoryIcon(doc.icon),
  image: doc.image ? sanityImage(doc.image, 900) : fallbackImage(doc.id),
})

const defaults = (): Category[] =>
  DEFAULT_CATEGORIES.map((c) => ({ ...c, icon: resolveCategoryIcon(c.icon) }))

/** Categorías desde Sanity; si falla o está vacío se usan las de `categories.data.ts`. */
export async function fetchCategories(): Promise<Category[]> {
  if (env.VITE_DATA_SOURCE !== 'sanity') return defaults()
  try {
    const docs = await sanityFetch<SanityCategory[]>(
      `*[_type == "category" && defined(slug.current)] | order(order asc, name asc) {
        "id": slug.current, name, description, icon, image
      }`,
    )
    return docs.length ? docs.map(toCategory) : defaults()
  } catch (err) {
    console.warn('[categorías] Sanity no respondió, usando las de respaldo', err)
    return defaults()
  }
}

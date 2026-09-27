import { sanityFetch, sanityImage } from '@/shared/api'
import { env } from '@/shared/config'
import { DEFAULT_ARTICLES } from '../model/articles.data'
import type { Article, ArticleBlock, Inline } from '../model/types'

type ImageSource = Parameters<typeof sanityImage>[0]

interface PortableSpan {
  text?: string
  marks?: string[]
}
interface PortableBlock {
  _type: string
  style?: string
  listItem?: 'bullet' | 'number'
  children?: PortableSpan[]
  asset?: unknown
  alt?: string
}
interface SanityArticle {
  id: string
  slug: string
  title: string
  excerpt?: string
  topic?: string
  publishedAt: string
  cover?: ImageSource
  body?: PortableBlock[]
}

const toInline = (spans: PortableSpan[] = []): Inline[] =>
  spans
    .filter((s) => s.text)
    .map((s) => ({ text: s.text!, strong: s.marks?.includes('strong'), em: s.marks?.includes('em') }))

/** Portable Text de Sanity → bloques simples que la UI sabe pintar. */
function toBlocks(body: PortableBlock[] = []): ArticleBlock[] {
  return body.flatMap<ArticleBlock>((b) => {
    if (b._type === 'image' && b.asset)
      return [{ kind: 'image', src: sanityImage(b as ImageSource, 1200, 700), alt: b.alt ?? '' }]
    if (b._type !== 'block') return []
    const inline = toInline(b.children)
    if (!inline.length) return []
    if (b.listItem) return [{ kind: b.listItem, inline }]
    if (b.style === 'h2' || b.style === 'h3') return [{ kind: b.style, inline }]
    if (b.style === 'blockquote') return [{ kind: 'quote', inline }]
    return [{ kind: 'p', inline }]
  })
}

const toArticle = (d: SanityArticle): Article => ({
  id: d.id,
  slug: d.slug,
  title: d.title,
  excerpt: d.excerpt ?? '',
  cover: d.cover ? sanityImage(d.cover, 1200, 630) : undefined,
  topic: d.topic ?? 'General',
  publishedAt: d.publishedAt.slice(0, 10),
  body: toBlocks(d.body),
})

/** Artículos publicados; si Sanity falla o aún no hay ninguno, se usan los de respaldo. */
export async function fetchArticles(): Promise<Article[]> {
  if (env.VITE_DATA_SOURCE !== 'sanity') return DEFAULT_ARTICLES
  try {
    const docs = await sanityFetch<SanityArticle[]>(
      `*[_type == "article" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc) {
        "id": _id, "slug": slug.current, title, excerpt, topic, publishedAt, "cover": coverImage, body
      }`,
    )
    return docs.length ? docs.map(toArticle) : DEFAULT_ARTICLES
  } catch (err) {
    console.warn('[artículos] Sanity no respondió, usando los de respaldo', err)
    return DEFAULT_ARTICLES
  }
}

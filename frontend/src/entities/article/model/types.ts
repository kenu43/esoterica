/** Texto con negrita/cursiva (lo que el editor marca en Sanity). */
export interface Inline {
  text: string
  strong?: boolean
  em?: boolean
}

export type ArticleBlock =
  | { kind: 'h2' | 'h3' | 'p' | 'quote'; inline: Inline[] }
  | { kind: 'bullet' | 'number'; inline: Inline[] }
  | { kind: 'image'; src: string; alt: string }

export interface Article {
  id: string
  slug: string
  title: string
  /** Resumen de 1-2 frases: sale en el listado y como descripción de Google. */
  excerpt: string
  cover?: string
  topic: string
  /** ISO date. */
  publishedAt: string
  body: ArticleBlock[]
}

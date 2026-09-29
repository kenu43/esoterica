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
  excerpt: string
  cover?: string
  topic: string
  publishedAt: string
  body: ArticleBlock[]
}

/**
 * Genera seed/data.ndjson a partir de los datos de ejemplo del frontend
  * (categorías, productos con sus fotos, glosario y opiniones). Luego `sanity dataset import`
 * sube todo, incluidas las imágenes, en un solo paso.
 *
 * Uso: pnpm seed   (requiere `pnpm sanity login` antes)
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { DEFAULT_CATEGORIES } from '../../frontend/src/entities/category/model/categories.data.ts'
import { DEFAULT_ARTICLES } from '../../frontend/src/entities/article/model/articles.data.ts'
import { DEFAULT_GLOSSARY } from '../../frontend/src/entities/glossary/model/glossary.data.ts'
import { INTENTIONS, SEASONS } from '../../frontend/src/entities/product/model/taxonomy.ts'
import { MOCK_PRODUCTS } from '../../frontend/src/entities/product/api/mockData.ts'
import { MOCK_TESTIMONIALS } from '../../frontend/src/entities/testimonial/model/testimonials.data.ts'

const root = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(root, '../../frontend/public')

const imageRef = (path: string) => ({
  _type: 'image',
  _sanityAsset: `image@${pathToFileURL(resolve(publicDir, path.replace(/^\//, ''))).href}`,
})

const categories = DEFAULT_CATEGORIES.map((c, i) => ({
  _id: `category-${c.id}`,
  _type: 'category',
  name: c.name,
  slug: { _type: 'slug', current: c.id },
  description: c.description,
  icon: c.icon,
  image: imageRef(c.image),
  order: (i + 1) * 10,
}))

const seasons = SEASONS.map((s) => ({
  _id: `season-${s.value}`,
  _type: 'season',
  name: s.label,
  slug: { _type: 'slug', current: s.value },
}))

const intentions = INTENTIONS.map((s) => ({
  _id: `intention-${s.value}`,
  _type: 'intention',
  name: s.label,
  slug: { _type: 'slug', current: s.value },
}))

const glossary = DEFAULT_GLOSSARY.map((t) => ({
  _id: `glossary-${t.id}`,
  _type: 'glossaryTerm',
  term: t.term,
  slug: { _type: 'slug', current: t.id },
  group: t.group,
  summary: t.summary,
  detail: t.detail,
  ...(t.category && { category: { _type: 'reference', _ref: `category-${t.category}` } }),
}))

const products = MOCK_PRODUCTS.map((p) => ({
  _id: `product-${p.id}`,
  _type: 'product',
  name: p.name,
  slug: { _type: 'slug', current: p.slug },
  image: { ...imageRef(p.image), alt: p.name },
  price: p.price,
  compareAtPrice: p.compareAtPrice,
  unit: p.unit,
  stores: p.branches,
  category: { _type: 'reference', _ref: `category-${p.category}` },
  inStock: p.inStock,
  shortDescription: p.shortDescription,
  description: p.description,
  benefits: p.benefits,
  badges: p.badges,
  tags: p.tags,
  releaseDate: p.createdAt,
  ...(p.intentions.length && {
    intention: p.intentions.map((v) => ({ _type: 'reference', _key: `i-${v}`, _ref: `intention-${v}` })),
  }),
  ...(p.moonPhase && { moonPhase: p.moonPhase }),
  ...(p.usageGuide && { usageGuide: p.usageGuide }),
  ...(p.season && { season: { _type: 'reference', _ref: `season-${p.season}` } }),
  ...(p.colors.length && {
    colors: p.colors.map((c, i) => ({ _type: 'productColor', _key: `c${i}`, name: c.name, hex: c.hex })),
  }),
  ...(p.gallery.length && {
    gallery: p.gallery.map((g, i) => ({ ...imageRef(g), _key: `g${i}`, alt: p.name })),
  }),
}))

/** Bloques simples del frontend → Portable Text de Sanity. */
const articles = DEFAULT_ARTICLES.map((a) => ({
  _id: `article-${a.id}`,
  _type: 'article',
  title: a.title,
  slug: { _type: 'slug', current: a.slug },
  excerpt: a.excerpt,
  topic: a.topic,
  publishedAt: `${a.publishedAt}T12:00:00Z`,
  ...(a.cover && { coverImage: imageRef(a.cover) }),
  body: a.body.flatMap((b, i) =>
    b.kind === 'image'
      ? []
      : [
          {
            _type: 'block',
            _key: `b${i}`,
            style: b.kind === 'bullet' || b.kind === 'number' ? 'normal' : b.kind === 'quote' ? 'blockquote' : b.kind,
            ...(b.kind === 'bullet' || b.kind === 'number' ? { listItem: b.kind, level: 1 } : {}),
            markDefs: [],
            children: b.inline.map((s, j) => ({
              _type: 'span',
              _key: `s${i}-${j}`,
              text: s.text,
              marks: [s.strong && 'strong', s.em && 'em'].filter(Boolean),
            })),
          },
        ],
  ),
}))

const testimonials = MOCK_TESTIMONIALS.map((t, i) => ({
  _id: `testimonial-${i + 1}`,
  _type: 'testimonial',
  name: t.name,
  city: t.city,
  store: t.store,
  text: t.text,
  rating: t.rating,
}))

mkdirSync(resolve(root, '../seed'), { recursive: true })
writeFileSync(
  resolve(root, '../seed/data.ndjson'),
  [...categories, ...seasons, ...intentions, ...products, ...glossary, ...articles, ...testimonials].map((d) => JSON.stringify(d)).join('\n') + '\n',
)
console.log(
  `✓ seed/data.ndjson: ${categories.length} categorías, ${seasons.length} temporadas, ${intentions.length} intenciones, ${products.length} productos, ${glossary.length} términos, ${articles.length} artículos y ${testimonials.length} opiniones`,
)

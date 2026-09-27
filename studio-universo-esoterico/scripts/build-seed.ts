/**
 * Genera seed/data.ndjson a partir de los datos de ejemplo del frontend
 * (productos con sus fotos + opiniones). Luego `sanity dataset import`
 * sube todo, incluidas las imágenes, en un solo paso.
 *
 * Uso: pnpm seed   (requiere `pnpm sanity login` antes)
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { MOCK_PRODUCTS } from '../../frontend/src/entities/product/api/mockData.ts'
import { MOCK_TESTIMONIALS } from '../../frontend/src/entities/testimonial/model/testimonials.data.ts'

const root = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(root, '../../frontend/public')

const products = MOCK_PRODUCTS.map((p) => ({
  _id: `product-${p.id}`,
  _type: 'product',
  name: p.name,
  slug: { _type: 'slug', current: p.slug },
  image: {
    _type: 'image',
    _sanityAsset: `image@${pathToFileURL(resolve(publicDir, p.image.replace(/^\//, ''))).href}`,
    alt: p.name,
  },
  price: p.price,
  compareAtPrice: p.compareAtPrice,
  unit: p.unit,
  stores: p.branches,
  category: p.category,
  inStock: p.inStock,
  shortDescription: p.shortDescription,
  description: p.description,
  benefits: p.benefits,
  badges: p.badges,
  tags: p.tags,
  releaseDate: p.createdAt,
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
  [...products, ...testimonials].map((d) => JSON.stringify(d)).join('\n') + '\n',
)
console.log(`✓ seed/data.ndjson: ${products.length} productos y ${testimonials.length} opiniones`)

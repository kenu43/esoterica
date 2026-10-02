import { writeFileSync } from 'node:fs'

const SITE = process.env.VITE_SITE_URL ?? 'https://esoterica-app.web.app'
const today = new Date().toISOString().slice(0, 10)
const pad = (n) => String(n).padStart(2, '0')

const tarot = [
  ...Array.from({ length: 22 }, (_, i) => `major-${pad(i)}`),
  ...['wands', 'cups', 'swords', 'pents'].flatMap((s) => Array.from({ length: 14 }, (_, i) => `${s}-${pad(i + 1)}`)),
]

const articles = [
  'como-limpiar-las-energias-de-una-casa-con-sahumerios',
  'diferencia-entre-riego-bano-de-despojo-y-velacion',
  'beneficios-naturistas-del-palo-santo-y-la-salvia',
]

// Productos, categorías y artículos salen de Sanity (dataset público). Si Sanity no responde, se usa la lista fija.
const PROJECT = process.env.VITE_SANITY_PROJECT_ID ?? 'rx1vv2w8'
const DATASET = process.env.VITE_SANITY_DATASET ?? 'production'
async function sanity(query) {
  const url = `https://${PROJECT}.apicdn.sanity.io/v2025-02-19/data/query/${DATASET}?query=${encodeURIComponent(query)}`
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) })
  if (!res.ok) throw new Error(`Sanity ${res.status}`)
  return (await res.json()).result
}
let products = []
let cats = []
let sanityArticles = []
try {
  ;[products, cats, sanityArticles] = await Promise.all([
    sanity(`*[_type == "product" && defined(slug.current) && coalesce(visible, true)]{ "slug": slug.current, "at": _updatedAt } | order(slug asc)`),
    sanity(`*[_type == "category" && defined(slug.current)]{ "slug": slug.current } | order(order asc)`),
    sanity(`*[_type == "article" && defined(slug.current)]{ "slug": slug.current, "at": _updatedAt }`).catch(() => []),
  ])
} catch (err) {
  console.warn(`! Sitemap sin productos de Sanity (${err.message}); se usa solo la lista fija`)
}

const legal = ['terminos-y-condiciones', 'politica-de-privacidad', 'politica-de-envios', 'cambios-devoluciones-y-garantia', 'pqr', 'politica-de-cookies']
const esc = (v) => v.replace(/&/g, '&amp;')

const routes = [
  ['/', '1.0', 'daily'],
  ['/productos', '0.9', 'daily'],
  ['/tiendas', '0.8', 'monthly'],
  ['/encargos', '0.7', 'monthly'],
  ['/glosario', '0.8', 'monthly'],
  ['/aprende', '0.8', 'weekly'],
  ...[...new Set([...articles, ...sanityArticles.map((a) => a.slug)])].map((slug) => [`/aprende/${slug}`, '0.7', 'monthly']),
  ...cats.map((c) => [`/productos?cat=${c.slug}`, '0.8', 'daily']),
  ...products.map((p) => [`/productos/${p.slug}`, '0.6', 'weekly', p.at?.slice(0, 10)]),
  ...legal.map((slug) => [`/legal/${slug}`, '0.3', 'yearly']),
  ['/tarot', '0.8', 'daily'],
  ['/duendes-abundancia', '0.7', 'weekly'],
  ['/nosotros', '0.6', 'yearly'],
  ['/contacto', '0.6', 'yearly'],
  ...tarot.map((id) => [`/tarot/${id}`, '0.5', 'yearly']),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(([path, priority, freq, lastmod]) => `  <url><loc>${esc(SITE + path)}</loc><lastmod>${lastmod ?? today}</lastmod><changefreq>${freq}</changefreq><priority>${priority}</priority></url>`).join('\n')}
</urlset>
`
writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log(`✓ sitemap.xml con ${routes.length} URLs`)

// Genera public/sitemap.xml en cada build (rutas estáticas + las 78 cartas del tarot).
import { writeFileSync } from 'node:fs'

const SITE = process.env.VITE_SITE_URL ?? 'https://esoterica-app.web.app'
const today = new Date().toISOString().slice(0, 10)
const pad = (n) => String(n).padStart(2, '0')

const tarot = [
  ...Array.from({ length: 22 }, (_, i) => `major-${pad(i)}`),
  ...['wands', 'cups', 'swords', 'pents'].flatMap((s) => Array.from({ length: 14 }, (_, i) => `${s}-${pad(i + 1)}`)),
]

// Artículos de respaldo; los escritos en Sanity se agregan aquí al publicarlos
const articles = [
  'como-limpiar-las-energias-de-una-casa-con-sahumerios',
  'diferencia-entre-riego-bano-de-despojo-y-velacion',
  'beneficios-naturistas-del-palo-santo-y-la-salvia',
]

const routes = [
  ['/', '1.0', 'daily'],
  ['/productos', '0.9', 'daily'],
  ['/tiendas', '0.8', 'monthly'],
  ['/encargos', '0.7', 'monthly'],
  ['/glosario', '0.8', 'monthly'],
  ['/aprende', '0.8', 'weekly'],
  ...articles.map((slug) => [`/aprende/${slug}`, '0.7', 'monthly']),
  ['/tarot', '0.8', 'daily'],
  ['/nosotros', '0.6', 'yearly'],
  ['/contacto', '0.6', 'yearly'],
  ...tarot.map((id) => [`/tarot/${id}`, '0.5', 'yearly']),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(([path, priority, freq]) => `  <url><loc>${SITE}${path}</loc><lastmod>${today}</lastmod><changefreq>${freq}</changefreq><priority>${priority}</priority></url>`).join('\n')}
</urlset>
`
writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log(`✓ sitemap.xml con ${routes.length} URLs`)

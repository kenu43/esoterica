import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getCliClient } from 'sanity/cli'
import * as XLSX from 'xlsx'
import { STORES } from '../schemaTypes/constants.ts'

const client = getCliClient({ apiVersion: '2025-02-19' })
const root = dirname(fileURLToPath(import.meta.url))

interface Row {
  name: string
  price?: number
  compareAtPrice?: number
  discountPercent?: number
  unit?: string
  shortDescription?: string
  description?: string
  benefits?: string[]
  category?: string
  extraCategories?: string[]
  stores?: string[]
  inStock?: boolean
  intention?: string[]
  moonPhase?: string
  season?: string
  usageGuide?: string
  customizationLabel?: string
  variantLabel?: string
  variants?: { name: string; price?: number }[]
  sizes?: { name: string; price?: number }[]
  materials?: { name: string; price?: number }[]
  colors?: { name: string; hex?: string }[]
  tags?: string[]
  slug: string
}

const serializeOptions = (list?: { name: string; price?: number }[]) =>
  (list ?? []).map((o) => (o.price != null ? `${o.name}:${o.price}` : o.name)).join('; ')

const storeTitle = (value: string) => STORES.find((s) => s.value === value)?.title ?? value

const products = await client.fetch<Row[]>(`*[_type == "product"] | order(name asc) {
  name, price, compareAtPrice, discountPercent, unit, shortDescription, description, benefits,
  "category": category->name, "extraCategories": extraCategories[]->name, stores, inStock, "intention": intention[]->name, moonPhase,
  "season": season->name, usageGuide, customizationLabel, variantLabel, variants, sizes, materials, colors, tags,
  "slug": slug.current
}`)

const rows = products.map((p) => ({
  'Enlace (no editar)': p.slug,
  Nombre: p.name,
  'Precio (COP)': p.price ?? '',
  'Precio antes': p.compareAtPrice ?? '',
  'Descuento %': p.discountPercent ?? '',
  Presentación: p.unit ?? '',
  'Frase corta': p.shortDescription ?? '',
  'Descripción completa': p.description ?? '',
  'Puntos clave (separados por ;)': (p.benefits ?? []).join('; '),
  Categoría: p.category ?? '',
  'Categorías adicionales (separadas por ;)': (p.extraCategories ?? []).join('; '),
  'Tiendas (separadas por ;)': (p.stores ?? []).map(storeTitle).join('; '),
  Disponible: p.inStock === false ? 'No' : 'Sí',
  'Intenciones (separadas por ;)': (p.intention ?? []).join('; '),
  'Fase lunar': p.moonPhase ?? '',
  Temporada: p.season ?? '',
  'Cómo se usa': p.usageGuide ?? '',
  Personalización: p.customizationLabel ?? '',
  'Nombre de la opción (ej. Aroma)': p.variantLabel ?? '',
  'Opciones (nombre:precio; nombre:precio)': serializeOptions(p.variants),
  'Tamaños (nombre:precio; ...)': serializeOptions(p.sizes),
  'Materiales (nombre:precio; ...)': serializeOptions(p.materials),
  'Colores (separados por ;)': (p.colors ?? []).map((c) => c.name).join('; '),
  'Palabras de búsqueda (separadas por ;)': (p.tags ?? []).join('; '),
}))

const sheet = XLSX.utils.json_to_sheet(rows)
sheet['!cols'] = Object.keys(rows[0] ?? {}).map((k) => ({ wch: Math.min(Math.max(k.length, 14), 42) }))
const book = XLSX.utils.book_new()
XLSX.utils.book_append_sheet(book, sheet, 'Productos')

const outDir = resolve(root, '../export')
mkdirSync(outDir, { recursive: true })
const outPath = resolve(outDir, 'productos.xlsx')
XLSX.writeFile(book, outPath)

console.log(`✓ ${rows.length} productos exportados a export/productos.xlsx`)
console.log('  Ábrelo en Excel/Google Sheets, edítalo y sube los cambios con: pnpm import:products')

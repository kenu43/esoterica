import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getCliClient } from 'sanity/cli'
import * as XLSX from 'xlsx'
import { STORES } from '../schemaTypes/constants.ts'

const client = getCliClient({ apiVersion: '2025-02-19' })
const filePath = resolve(fileURLToPath(new URL('.', import.meta.url)), '..', process.argv[2] ?? 'export/productos.xlsx')

const slugify = (s: string) =>
  s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 96)

const parseOptions = (raw: string | undefined, type: string, prefix: string) =>
  (raw ?? '')
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s, i) => {
      const [name, price] = s.split(':').map((v) => v.trim())
      return {
        _type: type,
        _key: `${prefix}${i}`,
        name,
        ...(price && !Number.isNaN(Number(price)) ? { price: Number(price) } : {}),
      }
    })

const splitList = (raw?: string) =>
  (raw ?? '')
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)

const book = XLSX.readFile(filePath)
const sheet = book.Sheets[book.SheetNames[0]]
const rows = XLSX.utils.sheet_to_json<Record<string, string | number | undefined>>(sheet, { defval: '' })

const [categories, intentions, seasons, existing] = await Promise.all([
  client.fetch<{ _id: string; name: string }[]>(`*[_type == "category"]{ _id, name }`),
  client.fetch<{ _id: string; name: string }[]>(`*[_type == "intention"]{ _id, name }`),
  client.fetch<{ _id: string; name: string }[]>(`*[_type == "season"]{ _id, name }`),
  client.fetch<{ _id: string; slug: string }[]>(`*[_type == "product" && defined(slug.current)]{ _id, "slug": slug.current }`),
])

const findRef = (list: { _id: string; name: string }[], name?: string) =>
  name ? list.find((x) => x.name.trim().toLowerCase() === name.trim().toLowerCase())?._id : undefined

let created = 0
let updated = 0
let skipped = 0

for (const [i, row] of rows.entries()) {
  const name = String(row['Nombre'] ?? '').trim()
  if (!name) continue

  const rawPrice = String(row['Precio (COP)'] ?? '').trim()
  const price = rawPrice ? Number(rawPrice) : 0
  if (Number.isNaN(price) || price < 0) {
    console.warn(`· fila ${i + 2}: "${name}" tiene un precio inválido ("${row['Precio (COP)']}"), se omite`)
    skipped++
    continue
  }

  const categoryId = findRef(categories, String(row['Categoría'] ?? ''))
  if (!categoryId) {
    console.warn(`· fila ${i + 2}: "${name}" tiene una categoría desconocida ("${row['Categoría']}"), se omite`)
    skipped++
    continue
  }

  const shortDescription = String(row['Frase corta'] ?? '').trim()
  if (!shortDescription) {
    console.warn(`· fila ${i + 2}: "${name}" no tiene "Frase corta" (obligatoria), se omite`)
    skipped++
    continue
  }

  const slugFromFile = String(row['Enlace (no editar)'] ?? '').trim()
  const slug = slugFromFile || slugify(name)
  const storeTitles = splitList(String(row['Tiendas (separadas por ;)'] ?? ''))
  const stores = STORES.filter((s) => storeTitles.some((t) => t.toLowerCase() === s.title.toLowerCase())).map((s) => s.value)
  const intentionRefs = splitList(String(row['Intenciones (separadas por ;)'] ?? ''))
    .map((n) => findRef(intentions, n))
    .filter((v): v is string => !!v)
    .map((ref, k) => ({ _type: 'reference', _key: `i${k}`, _ref: ref }))
  const seasonId = findRef(seasons, String(row['Temporada'] ?? ''))
  const extraCategoryIds = splitList(String(row['Categorías adicionales (separadas por ;)'] ?? ''))
    .map((n) => findRef(categories, n))
    .filter((v): v is string => !!v && v !== categoryId)
    .map((ref, k) => ({ _type: 'reference', _key: `ec${k}`, _ref: ref }))
  const colors = splitList(String(row['Colores (separados por ;)'] ?? '')).map((n, k) => ({ _type: 'productColor', _key: `c${k}`, name: n }))

  const doc = {
    _type: 'product',
    name,
    slug: { _type: 'slug', current: slug },
    price,
    ...(Number(row['Precio antes']) > 0 && { compareAtPrice: Number(row['Precio antes']) }),
    ...(Number(row['Descuento %']) > 0 && { discountPercent: Number(row['Descuento %']) }),
    unit: String(row['Presentación'] ?? '') || undefined,
    shortDescription,
    description: String(row['Descripción completa'] ?? '') || undefined,
    benefits: splitList(String(row['Puntos clave (separados por ;)'] ?? '')),
    category: { _type: 'reference', _ref: categoryId },
    ...(extraCategoryIds.length && { extraCategories: extraCategoryIds }),
    stores,
    inStock: String(row['Disponible'] ?? 'Sí').trim().toLowerCase() !== 'no',
    ...(intentionRefs.length && { intention: intentionRefs }),
    moonPhase: String(row['Fase lunar'] ?? '') || undefined,
    ...(seasonId && { season: { _type: 'reference', _ref: seasonId } }),
    usageGuide: String(row['Cómo se usa'] ?? '') || undefined,
    customizationLabel: String(row['Personalización'] ?? '') || undefined,
    variantLabel: String(row['Nombre de la opción (ej. Aroma)'] ?? '') || undefined,
    variants: parseOptions(String(row['Opciones (nombre:precio; nombre:precio)'] ?? ''), 'productVariant', 'v'),
    sizes: parseOptions(String(row['Tamaños (nombre:precio; ...)'] ?? ''), 'productSize', 'sz'),
    materials: parseOptions(String(row['Materiales (nombre:precio; ...)'] ?? ''), 'productMaterial', 'm'),
    colors,
    tags: splitList(String(row['Palabras de búsqueda (separadas por ;)'] ?? '')),
  }

  const existingId = existing.find((p) => p.slug === slug)?._id
  if (existingId) {
    await client.patch(existingId).set(doc).commit()
    updated++
  } else {
    await client.create({ _id: `product-${slug}`, ...doc })
    existing.push({ _id: `product-${slug}`, slug })
    created++
  }
}

console.log(`✓ ${created} productos creados, ${updated} actualizados, ${skipped} omitidos (revisa los avisos arriba)`)

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { getCliClient } from 'sanity/cli'
import * as XLSXns from 'xlsx'
import { CAT_BY_GROUP, CATEGORIES, descriptionFor, intentionsFor, pickBadges, seasonFor, shortFor, tagsFor, type CatDef } from './enrich.ts'

const XLSX = ((XLSXns as unknown as { default?: typeof XLSXns }).default ?? XLSXns) as typeof XLSXns

/**
 * Sincroniza un Excel de inventario con Sanity. Lee las columnas básicas (Grupo, Nombre, Código de barras, Precio de venta)
 * y, si existen, las columnas de la plantilla (Categoría, Frase corta, Descripción, Intención 1-3, Temporada, Etiqueta…).
 * Una celda vacía NUNCA borra ni cambia el dato que ya está en Sanity.
 *
 *   (sin flag)  actualiza por código/nombre y crea los que no existan. No toca fotos.
 *   --remove    elimina de Sanity todos los productos que aparezcan en el Excel.
 *   --replace   BORRA todos los productos y categorías y los crea de nuevo desde el Excel.
 *   --dry       solo muestra qué haría.
 *
 * Los productos cuyo nombre contiene "sin especificar" se ignoran (y se borran si ya estaban).
 * Uso: pnpm sync:referencias "C:\ruta\Archivo.xlsx" [flags]
 */
const client = getCliClient({ apiVersion: '2025-02-19' })
const raw = client.withConfig({ perspective: 'raw' })
type Tx = ReturnType<typeof client.transaction>
const args = process.argv.slice(2)
const flag = (f: string) => args.includes(f)
const file = resolve(args.find((a) => !a.startsWith('--')) ?? 'Referencias.xlsx')
const ALL_STORES = [
  { col: 'El Sortilegio', id: 'el-sortilegio' },
  { col: 'La Colonia', id: 'la-colonia' },
  { col: 'Loto & Nirvana', id: 'loto-nirvana' },
]
const BADGE_BY_LABEL: Record<string, string> = { nuevo: 'nuevo', 'mas pedido': 'destacado', oferta: 'oferta', 'edicion limitada': 'edicion-limitada' }
const MOON_BY_LABEL: Record<string, string> = { 'luna nueva': 'nueva', 'luna creciente': 'creciente', 'luna llena': 'llena', 'luna menguante': 'menguante' }

const norm = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim()
const slugify = (s: string) => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 80)
const SMALL = new Set(['de', 'del', 'la', 'las', 'el', 'los', 'y', 'e', 'o', 'en', 'con', 'para', 'por', 'a', 'al', 'un', 'una'])
const ROMAN = /^(i|ii|iii|iv|vi|vii|viii|ix|xi|xii|xiii|xiv|xv)$/
const smartCase = (text: string) => {
  const s = text.trim().replace(/\s+/g, ' ')
  if (s !== s.toUpperCase()) return s
  return s
    .toLowerCase()
    .split(' ')
    .map((w, i) => (i > 0 && SMALL.has(w) ? w : ROMAN.test(w) ? w.toUpperCase() : w.replace(/^(\p{L})/u, (c) => c.toUpperCase())))
    .join(' ')
}
const validCode = (c: string) => /[a-z0-9]/i.test(c)
const cell = (row: Record<string, unknown>, key: string) => String(row[key] ?? '').trim()
const list = (v: string) => v.split(';').map((x) => x.trim()).filter(Boolean)
const yes = (v: string) => (v === '' ? undefined : /^(si|s|x|1|true|yes)$/.test(norm(v)))

// ── Listas de Sanity (para convertir nombres en referencias) ──
const [dbCats, dbInts, dbSeasons] = await Promise.all([
  client.fetch<{ _id: string; name: string }[]>(`*[_type == "category"]{ _id, name }`),
  client.fetch<{ _id: string; name: string }[]>(`*[_type == "intention"]{ _id, name }`),
  client.fetch<{ _id: string; name: string }[]>(`*[_type == "season"]{ _id, name }`),
])
const byName = (items: { _id: string; name: string }[], v: string) => items.find((x) => norm(x.name) === norm(v))?._id
const catNames = new Map([...CATEGORIES.map((c) => [norm(c.name), `category-${c.id}`] as const), ...dbCats.map((c) => [norm(c.name), c._id] as const)])

// ── Lectura del Excel ──
const book = XLSX.read(readFileSync(file))
const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(book.Sheets[book.SheetNames.includes("Productos") ? "Productos" : book.SheetNames[0]], { defval: '' })

interface Row {
  name: string
  slug: string
  barcode: string
  price: number
  cat: CatDef
  catId: string
  /** Campos opcionales de la plantilla; solo se aplican si la celda tiene algo. */
  extra: Record<string, unknown>
}
const seen = new Set<string>()
const items: Row[] = []
const skipped: string[] = []
for (const row of rows) {
  const rawName = cell(row, 'Nombre')
  if (!rawName) continue
  if (/sin especificar/.test(norm(rawName))) {
    skipped.push(rawName)
    continue
  }
  const chosen = cell(row, 'Categoría')
  const catRef = chosen ? catNames.get(norm(chosen)) : undefined
  if (chosen && !catRef) console.warn(`· "${rawName}": la categoría "${chosen}" no existe, se usa el grupo`)
  const cat = CAT_BY_GROUP.get(cell(row, 'Grupo').toUpperCase()) ?? CATEGORIES.find((c) => `category-${c.id}` === catRef) ?? CAT_BY_GROUP.get('OTROS')!
  const name = smartCase(rawName).slice(0, 80)
  const code = cell(row, 'Código de barras')
  const barcode = validCode(code) ? code : ''
  let slug = slugify(name)
  for (let n = 2; seen.has(slug); n++) slug = `${slugify(name)}-${n}`
  seen.add(slug)

  const extra: Record<string, unknown> = {}
  const put = (k: string, v: unknown) => v !== undefined && v !== '' && (extra[k] = v)
  put('shortDescription', cell(row, 'Frase corta').slice(0, 110))
  put('description', cell(row, 'Descripción completa'))
  put('usageGuide', cell(row, 'Cómo se usa'))
  put('unit', cell(row, 'Presentación'))
  const videoUrls = list(cell(row, 'Enlaces de video (YouTube o Vimeo, separados por ;)'))
  if (videoUrls.length) extra.videoUrls = videoUrls
  const benefits = list(cell(row, 'Puntos clave (separados por ;)'))
  if (benefits.length) extra.benefits = benefits.slice(0, 6)
  const tags = list(cell(row, 'Palabras de búsqueda (separadas por ;)'))
  if (tags.length) extra.tags = tags
  const colors = list(cell(row, 'Colores (separados por ;)'))
  if (colors.length) extra.colors = colors.map((n, k) => ({ _type: 'productColor', _key: `c${k}`, name: n }))
  const ints = ['Intención 1', 'Intención 2', 'Intención 3']
    .map((c) => cell(row, c))
    .filter(Boolean)
    .map((n) => ({ n, id: byName(dbInts, n) }))
  ints.filter((i) => !i.id).forEach((i) => console.warn(`· "${rawName}": la intención "${i.n}" no existe`))
  const intIds = [...new Set(ints.flatMap((i) => (i.id ? [i.id] : [])))]
  if (intIds.length) extra.intention = intIds.map((id, k) => ({ _type: 'reference', _key: `i${k}`, _ref: id }))
  const seasonName = cell(row, 'Temporada')
  if (seasonName) {
    const id = byName(dbSeasons, seasonName)
    if (id) extra.season = { _type: 'reference', _ref: id }
    else console.warn(`· "${rawName}": la temporada "${seasonName}" no existe`)
  }
  const moon = MOON_BY_LABEL[norm(cell(row, 'Fase lunar'))]
  if (moon) extra.moonPhase = moon
  const storeFlags = ALL_STORES.map((s) => ({ ...s, v: yes(cell(row, s.col)) }))
  if (storeFlags.some((s) => s.v !== undefined)) extra.stores = storeFlags.filter((s) => s.v).map((s) => s.id)
  const inStock = yes(cell(row, 'Disponible'))
  if (inStock !== undefined) extra.inStock = inStock
  const visible = yes(cell(row, 'Mostrar en la página'))
  if (visible !== undefined) extra.visible = visible
  const badgeLabel = norm(cell(row, 'Etiqueta'))
  if (BADGE_BY_LABEL[badgeLabel]) extra.badges = [BADGE_BY_LABEL[badgeLabel]]
  else if (badgeLabel === 'ninguna') extra.badges = []
  const before = Math.round(Number(cell(row, 'Precio antes')) || 0)
  if (before > 0) extra.compareAtPrice = before
  const disc = Math.round(Number(cell(row, 'Descuento %')) || 0)
  if (disc > 0) extra.discountPercent = Math.min(disc, 90)

  items.push({
    name,
    slug,
    barcode,
    price: Math.round(Number(cell(row, 'Precio de venta')) || 0),
    cat,
    catId: catRef ?? `category-${cat.id}`,
    extra,
  })
}
if (skipped.length) console.log(`Ignorados "sin especificar": ${skipped.length}`)

// ── Documentos existentes ──
interface Existing { _id: string; name: string; barcode?: string }
const existing = flag('--replace') ? [] : await client.fetch<Existing[]>(`*[_type == "product"]{ _id, name, barcode }`)
const byCode = new Map<string, Existing[]>()
for (const d of existing) if (d.barcode) byCode.set(d.barcode, [...(byCode.get(d.barcode) ?? []), d])
const codeCount = new Map<string, number>()
for (const i of items) if (i.barcode) codeCount.set(i.barcode, (codeCount.get(i.barcode) ?? 0) + 1)
const byNameSlug = new Map(existing.map((d) => [slugify(d.name), d]))
const byId = new Map(existing.map((d) => [d._id, d]))

/** El código identifica el producto; si está repetido (en el Excel o en Sanity) se desempata por nombre. */
function match(i: Row): Existing | undefined {
  const docs = i.barcode ? byCode.get(i.barcode) ?? [] : []
  if (docs.length === 1 && codeCount.get(i.barcode) === 1) return docs[0]
  return docs.find((d) => slugify(d.name) === i.slug) ?? byId.get(`product-${i.slug}`) ?? byNameSlug.get(i.slug)
}

const matched = items.map((i) => ({ i, doc: match(i) }))
const chunks = async (ops: ((tx: Tx) => void)[]) => {
  for (let k = 0; k < ops.length; k += 100) {
    const tx = client.transaction()
    ops.slice(k, k + 100).forEach((op) => op(tx))
    await tx.commit()
    console.log(`  ${Math.min(k + 100, ops.length)}/${ops.length}`)
  }
}
/** Borra el publicado y su borrador (si existe). */
const del = (id: string) => (tx: Tx) => void tx.delete(id)
const withDrafts = async (ids: string[]) => {
  const drafts = await raw.fetch<string[]>(`*[_id in $ids]._id`, { ids: ids.map((id) => `drafts.${id}`) })
  return [...ids, ...drafts]
}

// ── Eliminar ──
if (flag('--remove')) {
  const ids = [...new Set(matched.flatMap((m) => (m.doc ? [m.doc._id] : [])))]
  console.log(`Se eliminarían ${ids.length} de ${items.length} productos del Excel (${items.length - ids.length} no se encontraron).`)
  if (flag('--dry')) process.exit(0)
  await chunks((await withDrafts(ids)).map(del))
  console.log('Listo.')
  process.exit(0)
}

// ── Crear / actualizar ──
const badges = pickBadges(items.map((i) => ({ key: i.slug, name: i.name, price: i.price, cat: i.cat.id })))
const toCreate = matched.filter((m) => !m.doc)
const toUpdate = matched.filter((m) => m.doc)
const junk = flag('--replace') ? [] : existing.filter((d) => /sin especificar/.test(norm(d.name)))
console.log(`${items.length} filas · ${toCreate.length} nuevos · ${toUpdate.length} a actualizar · ${junk.length} "sin especificar" a borrar`)
if (flag('--dry')) process.exit(0)

const OLD_TO_NEW: Record<string, string> = { amuletos: 'bisuteria', banos: 'riegos', velones: 'velas', sahumerios: 'inciensos', oriental: 'piedras', tarot: 'libreria' }

if (flag('--replace')) {
  const prods = await raw.fetch<string[]>(`*[_type == "product"]._id`)
  console.log(`Borrando ${prods.length} productos anteriores (incluye borradores)…`)
  await chunks(prods.map(del))
}

const keptCats = flag('--replace') ? new Set<string>() : new Set(dbCats.map((c) => c._id))
await chunks(
  CATEGORIES.filter((c) => flag('--replace') || !keptCats.has(`category-${c.id}`)).map((c) => (tx: Tx) =>
    void tx.createOrReplace({
      _id: `category-${c.id}`,
      _type: 'category',
      name: c.name,
      slug: { _type: 'slug', current: c.id },
      description: c.description,
      icon: c.icon,
      order: c.order,
    }),
  ),
)

if (flag('--replace')) {
  // Otros documentos (glosario) que apuntaban a categorías viejas pasan a la equivalente; luego se borran las viejas.
  const newIds = new Set(CATEGORIES.map((c) => `category-${c.id}`))
  const olds = (await client.fetch<{ _id: string }[]>(`*[_type == "category"]{ _id }`)).map((c) => c._id).filter((id) => !newIds.has(id))
  const refs = await raw.fetch<{ _id: string; cat: string }[]>(`*[defined(category._ref) && category._ref in $olds]{ _id, "cat": category._ref }`, { olds })
  await chunks(
    refs.map((r) => (tx: Tx) =>
      void tx.patch(r._id, { set: { category: { _type: 'reference', _ref: `category-${OLD_TO_NEW[r.cat.replace('category-', '')] ?? 'otros'}` } } }),
    ),
  )
  await chunks(olds.map(del))
}

const ref = (type: string, id: string, k: number) => ({ _type: 'reference', _key: `${type[0]}${k}`, _ref: `${type}-${id}` })
const ALL_STORE_IDS = ALL_STORES.map((s) => s.id)

await chunks([
  ...(await withDrafts(junk.map((d) => d._id))).map(del),
  ...toCreate.map(({ i }) => (tx: Tx) => {
    const ints = intentionsFor(i.name, i.cat)
    const season = seasonFor(i.name)
    void tx.createOrReplace({
      _id: `product-${i.slug}`,
      _type: 'product',
      name: i.name,
      slug: { _type: 'slug', current: i.slug },
      ...(i.price > 0 && { price: i.price }),
      ...(i.barcode && { barcode: i.barcode }),
      shortDescription: shortFor(i.name, i.cat),
      description: descriptionFor(i.name, i.cat),
      benefits: i.cat.benefits.slice(0, 3),
      usageGuide: i.cat.usage,
      stores: ALL_STORE_IDS,
      category: { _type: 'reference', _ref: i.catId },
      inStock: true,
      visible: true,
      ...(ints.length && { intention: ints.map((x, k) => ref('intention', x, k)) }),
      ...(season && { season: { _type: 'reference', _ref: `season-${season}` } }),
      tags: tagsFor(i.name, i.cat),
      ...(badges.has(i.slug) && { badges: badges.get(i.slug) }),
      ...i.extra,
    })
  }),
  ...toUpdate.map(({ i, doc }) => (tx: Tx) => {
    void tx.patch(doc!._id, {
      set: {
        name: i.name,
        category: { _type: 'reference', _ref: i.catId },
        ...(i.barcode && { barcode: i.barcode }),
        ...(i.price > 0 && { price: i.price }),
        ...i.extra,
      },
      ...(i.price === 0 && { unset: ['price'] }),
    })
  }),
])
console.log('Listo.')

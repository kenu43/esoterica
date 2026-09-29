import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2025-02-19' })

const products = await client.fetch<{ _id: string; category: string }[]>(
  `*[_type == "product" && defined(category) && category._type != "reference"]{ _id, "category": category }`,
)

const known = new Set(await client.fetch<string[]>(`*[_type == "category"]._id`))
let done = 0
for (const p of products) {
  const ref = `category-${p.category}`
  if (!known.has(ref)) {
    console.warn(`· ${p._id}: no existe la categoría "${p.category}", se omite`)
    continue
  }
  await client.patch(p._id).set({ category: { _type: 'reference', _ref: ref } }).commit()
  done++
}
console.log(`✓ ${done} productos actualizados (${products.length - done} omitidos)`)

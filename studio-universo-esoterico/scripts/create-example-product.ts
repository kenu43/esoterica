import { createReadStream } from 'node:fs'
import { resolve } from 'node:path'
import { getCliClient } from 'sanity/cli'

/**
 * Crea un producto de ejemplo con TODOS los campos llenos (fotos, variantes, tamaños, materiales, colores, intenciones…)
 * para que quien administre el panel vea cómo se carga un producto completo.
 * Queda OCULTO de la web ("Mostrar en la página" apagado): enciéndelo si quieres verlo publicado.
 *
 * Uso: pnpm exec sanity exec scripts/create-example-product.ts --with-user-token
 */
const client = getCliClient({ apiVersion: '2025-02-19' })
const images = resolve(import.meta.dirname ?? '.', '..', '..', 'frontend', 'public', 'images', 'products')

const upload = async (name: string) => {
  const asset = await client.assets.upload('image', createReadStream(resolve(images, name)), { filename: name })
  return asset._id
}
const img = (assetId: string, alt: string, key?: string) => ({
  ...(key && { _key: key }),
  _type: 'image',
  asset: { _type: 'reference', _ref: assetId },
  alt,
})

const [main, g1, g2] = await Promise.all([upload('santa-muerte.webp'), upload('calaveras.webp'), upload('vela-negra.webp')])
const ref = (type: string, id: string, k: string) => ({ _key: k, _type: 'reference', _ref: `${type}-${id}` })

await client.createOrReplace({
  _id: 'product-ejemplo-santa-muerte-nina-blanca',
  _type: 'product',
  name: 'Ejemplo: Santa Muerte Niña Blanca decorada',
  slug: { _type: 'slug', current: 'ejemplo-santa-muerte-nina-blanca' },
  image: img(main, 'Santa Muerte Niña Blanca con túnica blanca y guadaña'),
  gallery: [img(g1, 'Detalle de calavera decorativa', 'g1'), img(g2, 'Vela negra para acompañar el altar', 'g2')],
  price: 85000,
  discountPercent: 10,
  unit: 'figura en resina, 20 cm',
  stores: ['el-sortilegio', 'la-colonia', 'loto-nirvana'],
  category: { _type: 'reference', _ref: 'category-santa-muerte' },
  extraCategories: [ref('category', 'figuras', 'ec1')],
  inStock: true,
  visible: false,
  shortDescription: 'Niña Blanca decorada a mano, para protección y peticiones.',
  description:
    'La Niña Blanca es la imagen más pedida para empezar la devoción: se le piden limpieza, protección, caminos abiertos y gratitud. Esta figura viene decorada a mano, lista para tu altar.\n\nEscríbenos por WhatsApp y te contamos disponibilidad, tamaños y colores.',
  benefits: ['Decorada a mano', 'Varios tamaños y colores', 'Lista para el altar', 'Incluye oración'],
  usageGuide:
    'Ponla en un lugar alto y limpio con un vaso de agua y una vela blanca. Háblale con respeto y renueva el agua cada semana.',
  variantLabel: 'Color',
  variants: [
    { _key: 'v1', _type: 'productVariant', name: 'Blanca', price: 85000 },
    { _key: 'v2', _type: 'productVariant', name: 'Negra', price: 90000 },
    { _key: 'v3', _type: 'productVariant', name: 'Roja', price: 90000 },
  ],
  sizes: [
    { _key: 's1', _type: 'productSize', name: '20 cm', price: 85000 },
    { _key: 's2', _type: 'productSize', name: '30 cm', price: 140000 },
    { _key: 's3', _type: 'productSize', name: '40 cm', price: 210000 },
  ],
  materials: [
    { _key: 'm1', _type: 'productMaterial', name: 'Resina', price: 85000 },
    { _key: 'm2', _type: 'productMaterial', name: 'Yeso', price: 60000 },
  ],
  customizationLabel: 'Nombre o dedicatoria para la figura',
  colors: [
    { _key: 'c1', _type: 'productColor', name: 'Blanco', hex: '#F5F5F0' },
    { _key: 'c2', _type: 'productColor', name: 'Negro', hex: '#1A1A1A' },
    { _key: 'c3', _type: 'productColor', name: 'Rojo', hex: '#B3202A' },
  ],
  intention: [ref('intention', 'proteccion', 'i1'), ref('intention', 'justicia', 'i2'), ref('intention', 'trabajo', 'i3')],
  moonPhase: 'llena',
  badges: ['destacado'],
  tags: ['santa muerte', 'niña blanca', 'protección', 'altar', 'figura'],
  barcode: 'EJEMPLO001',
  releaseDate: '2026-10-02',
})
console.log('Producto de ejemplo creado (oculto en la web).')

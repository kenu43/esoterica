import { TagIcon } from '@sanity/icons/Tag'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { BADGES, CATEGORIES, STORES } from './constants'

const formatCOP = (value?: number) =>
  typeof value === 'number'
    ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)
    : 'Sin precio'

/** Producto del catálogo. Pensado para editarse sin conocimientos técnicos. */
export const product = defineType({
  name: 'product',
  title: 'Producto',
  type: 'document',
  icon: TagIcon,
  groups: [
    { name: 'basico', title: 'Lo básico', default: true },
    { name: 'detalle', title: 'Descripción' },
    { name: 'extra', title: 'Etiquetas y extras' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del producto',
      type: 'string',
      group: 'basico',
      validation: (r) => r.required().min(3).max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Enlace (se genera solo)',
      description: 'Pulsa "Generar" después de escribir el nombre.',
      type: 'slug',
      group: 'basico',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Foto',
      description: 'Foto cuadrada o vertical, buena luz. Toca la foto para elegir el punto central.',
      type: 'image',
      group: 'basico',
      options: { hotspot: true },
      validation: (r) => r.required(),
      fields: [
        defineField({ name: 'alt', title: 'Texto alternativo (qué se ve en la foto)', type: 'string' }),
      ],
    }),
    defineField({
      name: 'price',
      title: 'Precio (COP)',
      description: 'Solo números, sin puntos. Ej.: 45000',
      type: 'number',
      group: 'basico',
      validation: (r) => r.required().min(0).integer(),
    }),
    defineField({
      name: 'compareAtPrice',
      title: 'Precio antes (opcional)',
      description: 'Si lo llenas, se muestra tachado y aparece el % de descuento.',
      type: 'number',
      group: 'basico',
      validation: (r) =>
        r.min(0).integer().custom((value, ctx) => {
          const price = (ctx.document as { price?: number })?.price
          return !value || !price || value > price || 'Debe ser mayor que el precio actual'
        }),
    }),
    defineField({
      name: 'unit',
      title: 'Presentación',
      description: 'Ej.: "figura en resina, 30 cm", "botella 500 ml", "paquete x 7".',
      type: 'string',
      group: 'basico',
    }),
    defineField({
      name: 'stores',
      title: '¿En qué tienda está?',
      type: 'array',
      group: 'basico',
      of: [defineArrayMember({ type: 'string' })],
      options: { list: STORES, layout: 'grid' },
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      group: 'basico',
      options: { list: CATEGORIES, layout: 'dropdown' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'inStock',
      title: 'Disponible',
      description: 'Apágalo cuando se agote; el producto sigue visible como "Agotado por ahora".',
      type: 'boolean',
      group: 'basico',
      initialValue: true,
    }),
    defineField({
      name: 'shortDescription',
      title: 'Frase corta',
      description: 'Aparece en la tarjeta del producto. Máximo 110 letras.',
      type: 'string',
      group: 'detalle',
      validation: (r) => r.required().max(110),
    }),
    defineField({
      name: 'description',
      title: 'Descripción completa',
      type: 'text',
      rows: 5,
      group: 'detalle',
    }),
    defineField({
      name: 'benefits',
      title: 'Puntos clave',
      description: 'Frases cortas, ej.: "Pintada a mano", "Incluye oración".',
      type: 'array',
      group: 'detalle',
      of: [defineArrayMember({ type: 'string' })],
      validation: (r) => r.max(6),
    }),
    defineField({
      name: 'badges',
      title: 'Etiquetas visibles',
      type: 'array',
      group: 'extra',
      of: [defineArrayMember({ type: 'string' })],
      options: { list: BADGES, layout: 'grid' },
    }),
    defineField({
      name: 'tags',
      title: 'Palabras de búsqueda',
      description: 'Ayudan al buscador: santo, intención, color… Escribe y presiona Enter.',
      type: 'array',
      group: 'extra',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'releaseDate',
      title: 'Fecha de llegada',
      description: 'Se usa para ordenar las novedades. Si la dejas vacía se usa la fecha de creación.',
      type: 'date',
      group: 'extra',
    }),
  ],
  orderings: [
    { title: 'Precio: menor a mayor', name: 'priceAsc', by: [{ field: 'price', direction: 'asc' }] },
    { title: 'Más recientes', name: 'newest', by: [{ field: '_createdAt', direction: 'desc' }] },
    { title: 'Nombre A-Z', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', price: 'price', media: 'image', inStock: 'inStock', stores: 'stores' },
    prepare({ title, price, media, inStock, stores }) {
      const store = STORES.filter((s) => (stores as string[] | undefined)?.includes(s.value))
        .map((s) => s.title)
        .join(', ')
      return {
        title,
        subtitle: `${formatCOP(price)}${inStock === false ? ' · AGOTADO' : ''}${store ? ` · ${store}` : ''}`,
        media,
      }
    },
  },
})

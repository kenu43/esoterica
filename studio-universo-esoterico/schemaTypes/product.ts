import { TagIcon } from '@sanity/icons/Tag'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { BADGES, MOON_PHASES, STORES } from './constants'

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
    { name: 'detalle', title: 'Descripción y uso' },
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
      name: 'gallery',
      title: 'Más fotos (opcional)',
      description: 'Otros ángulos o detalles. Aparecen como miniaturas debajo de la foto principal.',
      type: 'array',
      group: 'basico',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' })],
        }),
      ],
      validation: (r) => r.max(8),
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
      name: 'discountPercent',
      title: 'Descuento (%) (opcional)',
      description:
        'Ej.: 20. La web calcula el precio final sola: el "Precio (COP)" es el normal, se muestra tachado y el cliente ve el precio con el descuento. Tiene prioridad sobre "Precio antes".',
      type: 'number',
      group: 'basico',
      validation: (r) => r.min(1).max(90).integer(),
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
      description: '¿No está la categoría? Créala en el menú "Categorías" y vuelve aquí.',
      type: 'reference',
      group: 'basico',
      to: [{ type: 'category' }],
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
      name: 'usageGuide',
      title: 'Cómo se usa (ritual)',
      description: 'Instrucciones paso a paso. Aparece en el producto como "Cómo se usa".',
      type: 'text',
      rows: 5,
      group: 'detalle',
    }),
    defineField({
      name: 'sizes',
      title: 'Tamaños o presentaciones',
      description:
        'Si el producto viene en varios tamaños (ej.: 15 cm, 30 cm, 60 cm) y el cliente debe elegir uno. Si tiene un solo tamaño, usa mejor "Presentación" y deja esto vacío.',
      type: 'array',
      group: 'detalle',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'productSize',
          fields: [
            defineField({ name: 'name', title: 'Nombre del tamaño', description: 'Ej.: "15 cm", "Paquete x 10".', type: 'string', validation: (r) => r.required().max(30) }),
            defineField({
              name: 'price',
              title: 'Precio de este tamaño (opcional)',
              description: 'Si lo dejas vacío, usa el "Precio (COP)" de arriba para este tamaño.',
              type: 'number',
              validation: (r) => r.min(0).integer(),
            }),
          ],
          preview: {
            select: { title: 'name', price: 'price' },
            prepare: ({ title, price }) => ({ title, subtitle: price ? formatCOP(price) : undefined }),
          },
        }),
      ],
      validation: (r) => r.max(8),
    }),
    defineField({
      name: 'materials',
      title: 'Materiales disponibles',
      description:
        'Si el mismo diseño existe en varios materiales (ej.: madera, resina, metal) y el cliente debe elegir uno.',
      type: 'array',
      group: 'detalle',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'productMaterial',
          fields: [
            defineField({ name: 'name', title: 'Nombre del material', description: 'Ej.: "Madera", "Resina", "Plata 925".', type: 'string', validation: (r) => r.required().max(30) }),
            defineField({
              name: 'price',
              title: 'Precio de este material (opcional)',
              description: 'Si lo dejas vacío, usa el "Precio (COP)" de arriba para este material.',
              type: 'number',
              validation: (r) => r.min(0).integer(),
            }),
          ],
          preview: {
            select: { title: 'name', price: 'price' },
            prepare: ({ title, price }) => ({ title, subtitle: price ? formatCOP(price) : undefined }),
          },
        }),
      ],
      validation: (r) => r.max(8),
    }),
    defineField({
      name: 'customizationLabel',
      title: 'Se puede personalizar (opcional)',
      description:
        'Actívalo escribiendo lo que el cliente debe indicar, ej.: "Nombre a grabar" o "Color del listón". En la ficha aparece un campo de texto para que lo escriba antes de agregarlo a su lista. Deja vacío si no aplica.',
      type: 'string',
      group: 'detalle',
      validation: (r) => r.max(60),
    }),
    defineField({
      name: 'colors',
      title: 'Colores disponibles',
      description: 'Para velones, velas, pulseras… Escribe el nombre (Rojo, Verde…). El color exacto es opcional.',
      type: 'array',
      group: 'detalle',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'productColor',
          fields: [
            defineField({ name: 'name', title: 'Nombre del color', type: 'string', validation: (r) => r.required().max(24) }),
            defineField({
              name: 'hex',
              title: 'Color exacto (opcional)',
              description: 'Código como #C0392B. Si lo dejas vacío, la web deduce el color por el nombre.',
              type: 'string',
              validation: (r) => r.regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, { name: 'hex', invert: false }).warning('Usa el formato #RRGGBB'),
            }),
          ],
          preview: { select: { title: 'name', subtitle: 'hex' } },
        }),
      ],
      validation: (r) => r.max(12),
    }),
    defineField({
      name: 'intention',
      title: 'Intención',
      description: '¿Para qué se usa? Agrega todas las que apliquen. ¿Falta una? Créala en el menú "Intenciones".',
      type: 'array',
      group: 'extra',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'intention' }] })],
    }),
    defineField({
      name: 'moonPhase',
      title: 'Fase lunar recomendada (opcional)',
      type: 'string',
      group: 'extra',
      options: { list: MOON_PHASES, layout: 'radio' },
    }),
    defineField({
      name: 'season',
      title: 'Temporada (opcional)',
      description: 'Para productos de una fecha especial, ej.: Navidad. Sale como etiqueta en la tarjeta. Créalas en el menú "Temporadas".',
      type: 'reference',
      group: 'extra',
      to: [{ type: 'season' }],
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

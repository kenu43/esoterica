import { CommentIcon } from '@sanity/icons/Comment'
import { defineField, defineType } from 'sanity'
import { STORES } from './constants'

/** Opiniones de clientes para la sección "Altar de experiencias". */
export const testimonial = defineType({
  name: 'testimonial',
  title: 'Opinión de cliente',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({ name: 'name', title: 'Nombre (ej.: "Luz Marina R.")', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'city', title: 'Ciudad', type: 'string', initialValue: 'Ibagué' }),
    defineField({
      name: 'store',
      title: 'Tienda',
      type: 'string',
      options: { list: STORES, layout: 'radio' },
    }),
    defineField({
      name: 'text',
      title: 'Lo que dijo',
      description: 'Cópialo tal cual lo escribió el cliente (WhatsApp, Google, Facebook).',
      type: 'text',
      rows: 4,
      validation: (r) => r.required().max(320),
    }),
    defineField({
      name: 'rating',
      title: 'Estrellas',
      type: 'number',
      initialValue: 5,
      options: { list: [5, 4, 3], layout: 'radio', direction: 'horizontal' },
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'text' },
  },
})

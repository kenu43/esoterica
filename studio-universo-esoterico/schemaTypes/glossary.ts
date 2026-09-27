import { BookIcon } from '@sanity/icons/Book'
import { defineField, defineType } from 'sanity'
import { GLOSSARY_GROUPS } from './constants'

/** Términos del glosario místico (santos, amuletos, plantas, rituales). */
export const glossaryTerm = defineType({
  name: 'glossaryTerm',
  title: 'Término del glosario',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'term',
      title: 'Término',
      description: 'Ej.: "Tetragramatón".',
      type: 'string',
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: 'slug',
      title: 'Enlace (se genera solo)',
      type: 'slug',
      options: { source: 'term', maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'group',
      title: 'Tema',
      type: 'string',
      options: { list: GLOSSARY_GROUPS, layout: 'dropdown' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Respuesta corta',
      description: 'Una frase: lo que la gente busca en Google. Ej.: "Amuleto contra la envidia".',
      type: 'string',
      validation: (r) => r.required().max(160),
    }),
    defineField({
      name: 'detail',
      title: 'Explicación y uso',
      description: 'Significado y forma de uso tradicional.',
      type: 'text',
      rows: 5,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría relacionada (opcional)',
      description: 'Muestra el enlace "Ver productos" al final del término.',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
  ],
  orderings: [{ title: 'A-Z', name: 'termAsc', by: [{ field: 'term', direction: 'asc' }] }],
  preview: { select: { title: 'term', subtitle: 'group' } },
})

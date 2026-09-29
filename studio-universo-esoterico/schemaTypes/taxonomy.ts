import { defineField, defineType } from 'sanity'
import { emojiIcon } from './emojiIcon'

export const season = defineType({
  name: 'season',
  title: 'Temporada',
  type: 'document',
  icon: emojiIcon('🎉'),
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      description: 'Ej.: "Navidad", "Día del Padre".',
      type: 'string',
      validation: (r) => r.required().max(40),
    }),
    defineField({
      name: 'slug',
      title: 'Enlace (se genera solo)',
      type: 'slug',
      options: { source: 'name', maxLength: 48 },
      validation: (r) => r.required(),
    }),
  ],
  orderings: [{ title: 'A-Z', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] }],
  preview: { select: { title: 'name' } },
})

export const intention = defineType({
  name: 'intention',
  title: 'Intención',
  type: 'document',
  icon: emojiIcon('✨'),
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      description: 'Ej.: "Amor", "Protección", "Abundancia".',
      type: 'string',
      validation: (r) => r.required().max(40),
    }),
    defineField({
      name: 'slug',
      title: 'Enlace (se genera solo)',
      type: 'slug',
      options: { source: 'name', maxLength: 48 },
      validation: (r) => r.required(),
    }),
  ],
  orderings: [{ title: 'A-Z', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] }],
  preview: { select: { title: 'name' } },
})

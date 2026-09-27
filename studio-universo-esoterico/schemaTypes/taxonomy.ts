import { CalendarIcon } from '@sanity/icons/Calendar'
import { SparkleIcon } from '@sanity/icons/Sparkle'
import { defineField, defineType } from 'sanity'

/** Temporadas (Navidad, Amor y Amistad…): se crean y editan desde el panel. */
export const season = defineType({
  name: 'season',
  title: 'Temporada',
  type: 'document',
  icon: CalendarIcon,
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

/** Intenciones (Amor, Protección, Abundancia…): también editables. */
export const intention = defineType({
  name: 'intention',
  title: 'Intención',
  type: 'document',
  icon: SparkleIcon,
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

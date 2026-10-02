import { defineField, defineType } from 'sanity'
import { CATEGORY_EMOJIS, CATEGORY_ICONS } from './constants'
import { emojiIcon } from './emojiIcon'

export const category = defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  icon: emojiIcon('🗂️'),
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      description: 'Ej.: "Velones y velas".',
      type: 'string',
      validation: (r) => r.required().min(3).max(40),
    }),
    defineField({
      name: 'slug',
      title: 'Enlace (se genera solo)',
      description: 'Pulsa "Generar". No lo cambies después de publicar: los enlaces compartidos dejarían de funcionar.',
      type: 'slug',
      options: { source: 'name', maxLength: 48 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Frase corta',
      description: 'Aparece en la portada, sobre la foto de la categoría.',
      type: 'string',
      validation: (r) => r.required().max(90),
    }),
    defineField({
      name: 'icon',
      title: 'Ícono',
      type: 'string',
      options: { list: CATEGORY_ICONS, layout: 'dropdown' },
      initialValue: 'sparkles',
    }),
    defineField({
      name: 'image',
      title: 'Foto de portada',
      description: 'Se muestra en la portada de la web. Mejor horizontal, con buena luz.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      description: 'El número más bajo sale primero. La primera categoría se muestra más grande en la portada.',
      type: 'number',
      initialValue: 50,
      validation: (r) => r.integer().min(0),
    }),
  ],
  orderings: [{ title: 'Orden en la web', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'description', media: 'image', icon: 'icon' },
    prepare: ({ title, subtitle, media, icon }) => ({
      title,
      subtitle,
      media: media ?? (() => <span style={{ fontSize: '1.4em', lineHeight: 1 }}>{CATEGORY_EMOJIS[icon as string] ?? '✨'}</span>),
    }),
  },
})

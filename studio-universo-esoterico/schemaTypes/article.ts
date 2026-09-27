import { DocumentTextIcon } from '@sanity/icons/DocumentText'
import { defineArrayMember, defineField, defineType } from 'sanity'

const TOPICS = ['Limpieza', 'Rituales', 'Plantas y resinas', 'Santos y devociones', 'Suerte y abundancia', 'Tarot', 'Numerología'].map(
  (t) => ({ title: t, value: t }),
)

/** Artículos de "Aprende y Sanar": responden lo que la gente busca en Google. */
export const article = defineType({
  name: 'article',
  title: 'Artículo (Aprende y Sanar)',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      description: 'Escríbelo como lo buscaría la gente. Ej.: "¿Cómo limpiar las energías de una casa con sahumerios?"',
      type: 'string',
      validation: (r) => r.required().min(10).max(110),
    }),
    defineField({
      name: 'slug',
      title: 'Enlace (se genera solo)',
      description: 'Pulsa "Generar". No lo cambies después de publicar.',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumen',
      description: '1 o 2 frases. Sale en el listado y es lo que Google muestra debajo del título.',
      type: 'text',
      rows: 3,
      validation: (r) => r.required().min(50).max(180),
    }),
    defineField({
      name: 'topic',
      title: 'Tema',
      type: 'string',
      options: { list: TOPICS, layout: 'dropdown' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Foto de portada',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      description: 'Si pones una fecha futura, el artículo aparece ese día.',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'body',
      title: 'Contenido',
      description: 'Usa "Título" para las secciones, listas para pasos y negrita para resaltar.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Párrafo', value: 'normal' },
            { title: 'Título de sección', value: 'h2' },
            { title: 'Subtítulo', value: 'h3' },
            { title: 'Cita', value: 'blockquote' },
          ],
          lists: [
            { title: 'Viñetas', value: 'bullet' },
            { title: 'Pasos numerados', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Negrita', value: 'strong' },
              { title: 'Cursiva', value: 'em' },
            ],
            annotations: [],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' })],
        }),
      ],
      validation: (r) => r.required().min(3),
    }),
  ],
  orderings: [{ title: 'Más recientes', name: 'newest', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'topic', media: 'coverImage' } },
})

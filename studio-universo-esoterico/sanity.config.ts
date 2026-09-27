import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { defineLocations, presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'

/**
 * Vista previa ("Presentation"): abre la web real dentro del panel, mostrando también lo
 * que aún no se ha publicado. Necesita que la web tenga `VITE_SANITY_PREVIEW_TOKEN` en su
 * build — ver `frontend/.env.example`.
 */
const SITE_URL = 'https://esoterica-app.web.app'

export default defineConfig({
  name: 'default',
  title: 'Universo Esotérico',
  projectId: 'rx1vv2w8',
  dataset: 'production',
  plugins: [
    structureTool({ structure, title: 'Catálogo' }),
    presentationTool({
      previewUrl: { initial: `${SITE_URL}/?preview=1`, previewMode: { enable: `${SITE_URL}/?preview=1` } },
      resolve: {
        locations: {
          product: defineLocations({
            select: { name: 'name', slug: 'slug.current' },
            resolve: (doc) => ({
              locations: [{ title: doc?.name ?? 'Producto', href: `/productos/${doc?.slug}` }],
            }),
          }),
          category: defineLocations({
            select: { name: 'name', slug: 'slug.current' },
            resolve: (doc) => ({
              locations: [{ title: doc?.name ?? 'Categoría', href: `/productos?cat=${doc?.slug}` }],
            }),
          }),
          article: defineLocations({
            select: { title: 'title', slug: 'slug.current' },
            resolve: (doc) => ({
              locations: [{ title: doc?.title ?? 'Artículo', href: `/aprende/${doc?.slug}` }],
            }),
          }),
        },
      },
    }),
    // Vision (consultas GROQ) solo para desarrolladores
    ...(process.env.NODE_ENV === 'development' ? [visionTool()] : []),
  ],
  schema: { types: schemaTypes },
})

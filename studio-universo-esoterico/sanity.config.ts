import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { defineLocations, presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'
import { StudioBrand } from './src/StudioBrand'

const SITE_URL = 'https://esoterica-app.web.app'

export default defineConfig({
  name: 'default',
  title: 'Panel de catálogo · El Sortilegio, La Colonia y Loto & Nirvana',
  projectId: 'rx1vv2w8',
  dataset: 'production',
  components: {
    Brand: StudioBrand,
  },
  plugins: [
    structureTool({ structure, title: 'Panel de catálogo' }),
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
    ...(process.env.NODE_ENV === 'development' ? [visionTool()] : []),
  ],
  schema: { types: schemaTypes },
})

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'

export default defineConfig({
  name: 'default',
  title: 'Universo Esotérico',
  projectId: 'rx1vv2w8',
  dataset: 'production',
  plugins: [
    structureTool({ structure, title: 'Catálogo' }),
    // Vision (consultas GROQ) solo para desarrolladores
    ...(process.env.NODE_ENV === 'development' ? [visionTool()] : []),
  ],
  schema: { types: schemaTypes },
})

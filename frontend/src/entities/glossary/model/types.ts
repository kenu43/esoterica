import type { CategoryId } from '@/entities/category'

export type GlossaryGroup = 'Santos y devociones' | 'Protección' | 'Limpieza' | 'Suerte y abundancia' | 'Oriente' | 'Plantas y resinas'

export interface GlossaryTerm {
  id: string
  term: string
  group: GlossaryGroup
  /** Respuesta corta (lo que la gente busca en Google). */
  summary: string
  /** Explicación y forma de uso tradicional. */
  detail: string
  /** Categoría del catálogo relacionada, para llevar a comprar. */
  category?: CategoryId
}

export const GLOSSARY_GROUPS: GlossaryGroup[] = [
  'Santos y devociones',
  'Protección',
  'Limpieza',
  'Suerte y abundancia',
  'Oriente',
  'Plantas y resinas',
]

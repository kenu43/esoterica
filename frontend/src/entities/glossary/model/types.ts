import type { CategoryId } from '@/entities/category'

export type GlossaryGroup = 'Santos y devociones' | 'Protección' | 'Limpieza' | 'Suerte y abundancia' | 'Oriente' | 'Plantas y resinas'

export interface GlossaryTerm {
  id: string
  term: string
  group: GlossaryGroup
  summary: string
  detail: string
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

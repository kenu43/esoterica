import type { LucideIcon } from 'lucide-react'

/** Identificador (slug) de la categoría. Viene de Sanity, por eso es un string libre. */
export type CategoryId = string

export interface Category {
  id: CategoryId
  name: string
  description: string
  icon: LucideIcon
  image: string
}

/** Categoría sin componentes de UI: sirve de respaldo y de semilla para Sanity. */
export interface CategorySeed {
  id: CategoryId
  name: string
  description: string
  /** Clave de `CATEGORY_ICONS` (también se elige por nombre en el Studio). */
  icon: string
  image: string
}

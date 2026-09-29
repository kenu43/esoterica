import type { LucideIcon } from 'lucide-react'

export type CategoryId = string

export interface Category {
  id: CategoryId
  name: string
  description: string
  icon: LucideIcon
  image: string
}

export interface CategorySeed {
  id: CategoryId
  name: string
  description: string
  icon: string
  image: string
}

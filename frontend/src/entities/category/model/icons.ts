import {
  Church,
  Clover,
  Droplets,
  Flame,
  Flower2,
  Gem,
  Heart,
  Leaf,
  Moon,
  Shield,
  Sparkles,
  Star,
  Sun,
  Wind,
  type LucideIcon,
} from 'lucide-react'

/**
 * Íconos que se pueden elegir desde el Studio. Las mismas claves están en
 * `studio-universo-esoterico/schemaTypes/constants.ts` (CATEGORY_ICONS).
 */
export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  church: Church,
  flame: Flame,
  droplets: Droplets,
  wind: Wind,
  shield: Shield,
  clover: Clover,
  flower: Flower2,
  sparkles: Sparkles,
  gem: Gem,
  heart: Heart,
  leaf: Leaf,
  moon: Moon,
  sun: Sun,
  star: Star,
}

export const resolveCategoryIcon = (key?: string): LucideIcon => CATEGORY_ICONS[key ?? ''] ?? Sparkles

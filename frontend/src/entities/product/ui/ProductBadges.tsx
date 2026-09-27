import { Crown, Percent, Sparkles, Star } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/shared/lib'
import type { ProductBadge } from '../model/types'

const BADGES: Record<ProductBadge, { label: string; icon: LucideIcon; className: string }> = {
  nuevo: { label: 'Nuevo', icon: Sparkles, className: 'bg-[oklch(0.42_0.1_155)] text-white' },
  destacado: { label: 'Más pedido', icon: Star, className: 'bg-[oklch(0.3_0.1_300)] text-[oklch(0.9_0.1_85)]' },
  oferta: { label: 'Oferta', icon: Percent, className: 'bg-[oklch(0.5_0.19_25)] text-white' },
  'edicion-limitada': { label: 'Edición limitada', icon: Crown, className: 'bg-[oklch(0.8_0.13_82)] text-[oklch(0.2_0.05_290)]' },
}

interface ProductBadgesProps {
  badges: ProductBadge[]
  discount?: number
  className?: string
}

/** Etiquetas sólidas con contraste AA sobre cualquier foto. */
export function ProductBadges({ badges, discount = 0, className }: ProductBadgesProps) {
  if (!badges.length && !discount) return null
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {badges.map((b) => {
        const { label, icon: Icon, className: tone } = BADGES[b]
        return (
          <span
            key={b}
            className={cn('inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold shadow-md shadow-black/20', tone)}
          >
            <Icon className="size-3" aria-hidden />
            {label}
          </span>
        )
      })}
      {discount > 0 && (
        <span className="inline-flex items-center rounded-md bg-white px-2 py-1 text-xs font-bold text-[oklch(0.5_0.19_25)] shadow-md shadow-black/20">
          -{discount}%
        </span>
      )}
    </div>
  )
}

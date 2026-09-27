import { BookOpen, Church, Droplets, Flame, Gift, Shield, Truck, Clover } from 'lucide-react'
import { Marquee } from '@/shared/ui'

const ITEMS = [
  { icon: Truck, label: 'Envíos a toda Colombia' },
  { icon: Flame, label: 'Velones preparados a pedido' },
  { icon: Church, label: 'Figuras de santos y Santa Muerte' },
  { icon: Droplets, label: 'Baños, riegos y despojos' },
  { icon: Shield, label: 'Amuletos consagrados' },
  { icon: BookOpen, label: 'Lecturas de tarot' },
  { icon: Clover, label: 'Suerte y abundancia' },
  { icon: Gift, label: 'Ventas al por mayor' },
]

/** Franja de servicios: sobria, recta y legible, con íconos de línea. */
export function IntentionsMarquee() {
  return (
    <div className="border-y border-separator bg-surface/60 py-4 backdrop-blur">
      <Marquee duration={45} gap="2.5rem">
        {ITEMS.map(({ icon: Icon, label }) => (
          <span key={label} className="flex items-center gap-2.5 whitespace-nowrap text-sm font-medium text-foreground/80">
            <Icon className="size-4 text-gold" aria-hidden />
            {label}
            <span className="ml-8 size-1 rounded-full bg-gold/50" aria-hidden />
          </span>
        ))}
      </Marquee>
    </div>
  )
}

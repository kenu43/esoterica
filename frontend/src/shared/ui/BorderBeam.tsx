import type { CSSProperties } from 'react'
import { cn } from '@/shared/lib'

interface BorderBeamProps {
  className?: string
  size?: number
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
}

/** Haz de luz que recorre el borde del contenedor (Magic UI "Border Beam"). */
export function BorderBeam({
  className,
  size = 120,
  duration = 8,
  delay = 0,
  colorFrom = 'var(--gold)',
  colorTo = 'var(--mystic)',
}: BorderBeamProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit] border-2 border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
    >
      <div
        className={cn('absolute aspect-square animate-border-beam', className)}
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            background: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
            '--beam-duration': duration,
            animationDelay: `${-delay}s`,
          } as CSSProperties
        }
      />
    </div>
  )
}

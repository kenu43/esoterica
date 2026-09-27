import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/shared/lib'

interface MarqueeProps {
  children: ReactNode
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  duration?: number
  gap?: string
}

/** Cinta infinita horizontal (Magic UI "Marquee"), 100% CSS. */
export function Marquee({
  children,
  className,
  reverse,
  pauseOnHover = true,
  duration = 40,
  gap = '1.5rem',
}: MarqueeProps) {
  return (
    <div
      className={cn('group flex overflow-hidden mask-fade-x', className)}
      style={{ '--marquee-duration': `${duration}s`, '--marquee-gap': gap, gap } as CSSProperties}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={cn(
            'flex shrink-0 items-center justify-around',
            reverse ? 'animate-marquee-reverse' : 'animate-marquee',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
          )}
          style={{ gap }}
        >
          {children}
        </div>
      ))}
    </div>
  )
}

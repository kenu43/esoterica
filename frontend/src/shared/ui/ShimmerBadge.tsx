import type { ReactNode } from 'react'
import { cn } from '@/shared/lib'

/** Píldora con brillo animado (Magic UI "Animated Shiny Text"). */
export function ShimmerBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-gold/30 bg-surface/60 px-4 py-1.5 text-xs font-medium backdrop-blur sm:text-sm',
        className,
      )}
    >
      <span className="text-gradient-gold inline-flex items-center gap-2 animate-shimmer">{children}</span>
    </span>
  )
}

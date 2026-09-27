import { useRef, type ComponentProps, type MouseEvent } from 'react'
import { cn } from '@/shared/lib'

/**
 * Tarjeta con un halo de luz que sigue al cursor (Aceternity "Card Spotlight").
 * Usa variables CSS para no provocar re-renders de React.
 */
export function SpotlightCard({
  className,
  contentClassName,
  children,
  ...props
}: ComponentProps<'div'> & { contentClassName?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        'group/spot relative overflow-hidden rounded-2xl border border-border bg-surface',
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), var(--glow), transparent 60%)',
        }}
      />
      <div className={cn('relative z-10 h-full', contentClassName)}>{children}</div>
    </div>
  )
}

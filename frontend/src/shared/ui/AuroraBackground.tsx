import { cn } from '@/shared/lib'

/**
 * Manchas de luz que se mueven lentamente (aurora mística).
 * Usan degradados radiales en vez de `blur`: un filtro de 120 px sobre elementos
 * gigantes obligaba a la GPU a repintar cada cuadro y volvía lentos los menús.
 */
export function AuroraBackground({ className }: { className?: string }) {
  const blob = (color: string) => ({
    background: `radial-gradient(closest-side, color-mix(in oklab, ${color} 100%, transparent), transparent)`,
  })
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div className="absolute -left-[10%] -top-[20%] size-[60vmax] rounded-full opacity-30 will-change-transform animate-aurora" style={blob('var(--mystic)')} />
      <div
        className="absolute -right-[15%] top-[10%] size-[50vmax] rounded-full opacity-20 will-change-transform animate-aurora"
        style={{ ...blob('var(--gold)'), animationDelay: '-6s' }}
      />
      <div
        className="absolute bottom-[-25%] left-[25%] size-[45vmax] rounded-full opacity-20 will-change-transform animate-aurora"
        style={{ ...blob('var(--sage)'), animationDelay: '-12s' }}
      />
    </div>
  )
}

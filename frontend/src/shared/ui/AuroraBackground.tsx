import { cn } from '@/shared/lib'

/** Manchas de luz difuminadas que se mueven lentamente (aurora mística). */
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div className="absolute -left-[10%] -top-[20%] size-[55vmax] rounded-full bg-mystic/25 blur-[120px] animate-aurora" />
      <div
        className="absolute -right-[15%] top-[10%] size-[45vmax] rounded-full bg-gold/15 blur-[120px] animate-aurora"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="absolute bottom-[-25%] left-[25%] size-[40vmax] rounded-full bg-sage/15 blur-[120px] animate-aurora"
        style={{ animationDelay: '-12s' }}
      />
    </div>
  )
}

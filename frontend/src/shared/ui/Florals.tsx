import { useId } from 'react'
import { cn } from '@/shared/lib'

/**
 * Decoraciones florales de inspiración japonesa (loto y sakura) en SVG puro.
 * Usan currentColor/tokens para adaptarse a claro/oscuro y pesan casi nada.
 */

/** Ícono de loto de línea fina (sustituye a los emojis y destellos genéricos). */
export function LotusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cn('size-5', className)} aria-hidden>
      <path d="M12 20c-4 0-7.5-2.2-8.5-5.5 2.7-.4 5.3.3 7 2" />
      <path d="M12 20c4 0 7.5-2.2 8.5-5.5-2.7-.4-5.3.3-7 2" />
      <path d="M12 20c-2.4-2-3.6-4.7-3.6-7.6 0-2.3 1.3-4.8 3.6-6.9 2.3 2.1 3.6 4.6 3.6 6.9 0 2.9-1.2 5.6-3.6 7.6Z" />
      <path d="M8.6 14.5C6.5 13.2 5 11 4.6 8.4c1.8 0 3.4.5 4.6 1.4" />
      <path d="M15.4 14.5c2.1-1.3 3.6-3.5 4-6.1-1.8 0-3.4.5-4.6 1.4" />
    </svg>
  )
}

/** Flor de loto grande y detallada para fondos de sección. */
export function LotusBloom({ className }: { className?: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 200 120" className={cn('pointer-events-none', className)} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--rose)" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${id})`} strokeWidth="1.2" strokeLinecap="round">
        <path d="M100 110C88 92 84 70 100 30c16 40 12 62 0 80Z" />
        <path d="M100 110C80 100 64 80 66 46c22 14 34 38 34 64Z" />
        <path d="M100 110c20-10 36-30 34-64-22 14-34 38-34 64Z" />
        <path d="M100 110C74 108 48 94 38 66c26 2 48 18 62 44Z" />
        <path d="M100 110c26-2 52-16 62-44-26 2-48 18-62 44Z" />
        <path d="M100 110C70 114 36 108 14 88c28-6 60 2 86 22Z" />
        <path d="M100 110c30 4 64-2 86-22-28-6-60 2-86 22Z" />
        <path d="M30 114h140" strokeOpacity="0.4" />
      </g>
    </svg>
  )
}

/** Rama de sakura para esquinas decorativas. */
export function SakuraBranch({ className, flip }: { className?: string; flip?: boolean }) {
  const blossoms: [number, number, number][] = [
    [62, 40, 1],
    [104, 30, 0.8],
    [140, 58, 1.1],
    [178, 44, 0.7],
    [90, 72, 0.6],
    [196, 84, 0.9],
  ]
  return (
    <svg
      viewBox="0 0 240 140"
      className={cn('pointer-events-none', flip && '-scale-x-100', className)}
      aria-hidden
    >
      <path
        d="M0 10c40 10 70 30 96 40s60 10 86 30 40 40 58 56"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M96 50c6-14 18-22 30-24M150 76c10-6 22-8 34-4" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.4" strokeLinecap="round" />
      {blossoms.map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          {[0, 72, 144, 216, 288].map((r) => (
            <path
              key={r}
              transform={`rotate(${r})`}
              d="M0 0c-4-4-5-10-2-13 1-1 2-1 2 1 0-2 1-2 2-1 3 3 2 9-2 13Z"
              fill="var(--rose)"
              fillOpacity="0.55"
            />
          ))}
          <circle r="1.6" fill="var(--gold)" />
        </g>
      ))}
    </svg>
  )
}

/** Separador elegante: línea – loto – línea. */
export function LotusDivider({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center gap-4 text-gold/70', className)} aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-current sm:w-28" />
      <LotusIcon className="size-5" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-current sm:w-28" />
    </div>
  )
}

import { useId } from 'react'
import { cn } from '@/shared/lib'
import { LogoMark } from '@/shared/ui'

/** Reverso de carta diseñado en SVG: sol, luna y estrellas en oro sobre índigo. */
export function TarotCardBack({ className }: { className?: string }) {
  const id = useId()
  return (
    <div
      className={cn(
        'relative size-full overflow-hidden rounded-[inherit] bg-[oklch(0.2_0.08_290)] ring-1 ring-[oklch(0.82_0.13_82/0.5)]',
        className,
      )}
    >
      <svg viewBox="0 0 200 340" className="size-full" aria-hidden>
        <defs>
          <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.88 0.12 85)" />
            <stop offset="100%" stopColor="oklch(0.65 0.13 65)" />
          </linearGradient>
          <radialGradient id={`${id}-bg`} cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="oklch(0.32 0.14 295)" />
            <stop offset="100%" stopColor="oklch(0.16 0.06 285)" />
          </radialGradient>
          <pattern id={`${id}-p`} width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.8" fill="oklch(0.85 0.1 85 / 0.35)" />
          </pattern>
        </defs>
        <rect width="200" height="340" fill={`url(#${id}-bg)`} />
        <rect width="200" height="340" fill={`url(#${id}-p)`} />
        <rect x="10" y="10" width="180" height="320" rx="10" fill="none" stroke={`url(#${id}-g)`} strokeWidth="1.5" />
        <rect x="16" y="16" width="168" height="308" rx="7" fill="none" stroke={`url(#${id}-g)`} strokeWidth="0.6" opacity="0.7" />
        <g transform="translate(100 170)" stroke={`url(#${id}-g)`} fill="none">
          <circle r="54" strokeWidth="0.8" />
          <circle r="44" strokeWidth="0.5" strokeDasharray="2 3" />
          {Array.from({ length: 16 }, (_, i) => (
            <line
              key={i}
              x1="0"
              y1="-58"
              x2="0"
              y2={i % 2 ? '-66' : '-74'}
              strokeWidth="1"
              transform={`rotate(${i * 22.5})`}
            />
          ))}
        </g>
        {[
          [40, 52],
          [160, 52],
          [40, 288],
          [160, 288],
        ].map(([x, y]) => (
          <path
            key={`${x}-${y}`}
            transform={`translate(${x} ${y})`}
            d="m0-8 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z"
            fill={`url(#${id}-g)`}
          />
        ))}
        <text
          x="100"
          y="305"
          textAnchor="middle"
          fontFamily="Unbounded, sans-serif"
          fontSize="11"
          letterSpacing="4"
          fill={`url(#${id}-g)`}
        >
          UNIVERSO
        </text>
      </svg>
      <LogoMark className="absolute left-1/2 top-1/2 size-[42%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_14px_rgba(232,196,110,0.55)]" />
    </div>
  )
}

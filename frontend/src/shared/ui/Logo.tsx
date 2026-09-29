import { cn } from '@/shared/lib'

const GOLD = '#c4a668'

/** Emblema: ojo protector dentro de un rombo dorado y un círculo ornamentado. Los azules lo hacen legible en claro y oscuro. */
export function LogoMark({ className }: { className?: string }) {
  const leaf = 'M24 21 Q37 22 40 35 Q30 32 24 21Z'
  return (
    <svg viewBox="0 0 100 100" className={cn('size-9', className)} aria-hidden>
      <circle cx="50" cy="50" r="45" fill="none" stroke={GOLD} strokeWidth="3.4" />
      {[
        '',
        'translate(100 0) scale(-1 1)',
        'translate(0 100) scale(1 -1)',
        'translate(100 100) scale(-1 -1)',
      ].map((t) => (
        <g key={t} transform={t || undefined}>
          <path d={leaf} fill={GOLD} opacity="0.85" />
          <circle cx="18" cy="40" r="2.3" fill="#2740d6" />
          <circle cx="13.5" cy="45" r="1.7" fill="#19a9e6" />
        </g>
      ))}
      <path d="M50 6 L94 50 L50 94 L6 50 Z" fill="none" stroke={GOLD} strokeWidth="3.4" strokeLinejoin="round" />
      {[-16, -8, 0, 8, 16].map((dx) => (
        <g key={dx} stroke={GOLD} strokeWidth="1.7" strokeLinecap="round">
          <line x1={50 + dx * 0.28} y1="10" x2={50 + dx} y2="31" />
          <line x1={50 + dx * 0.28} y1="90" x2={50 + dx} y2="69" />
        </g>
      ))}
      <path d="M17 50 Q50 26 83 50 Q50 74 17 50Z" fill="none" stroke={GOLD} strokeWidth="2.6" strokeLinejoin="round" />
      <circle cx="50" cy="50" r="13" fill="#2740d6" />
      <circle cx="50" cy="50" r="8.6" fill="#ffffff" />
      <circle cx="50" cy="50" r="5.6" fill="#19a9e6" />
      <circle cx="50" cy="50" r="2.7" fill="#0b0b18" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <LogoMark className="size-9 shrink-0 sm:size-10" />
      <span className="flex flex-col leading-none">
        <span className="whitespace-nowrap font-display text-[15px] font-medium tracking-tight sm:text-lg">Universo Esotérico</span>
        <span className="mt-1 hidden text-xs text-muted sm:block">Ibagué, Tolima</span>
      </span>
    </span>
  )
}

import { useId } from 'react'
import { cn } from '@/shared/lib'

/** Isotipo: luna creciente + estrella de cuatro puntas. */
export function LogoMark({ className }: { className?: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 48 48" className={cn('size-9', className)} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--gold)" />
          <stop offset="100%" stopColor="var(--mystic)" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="none" stroke={`url(#${id})`} strokeWidth="1.2" opacity="0.6" />
      <path d="M29 9a15 15 0 1 0 10 26A13 13 0 1 1 29 9Z" fill={`url(#${id})`} />
      <path d="m31 17 1.3 3.2 3.2 1.3-3.2 1.3L31 26l-1.3-3.2-3.2-1.3 3.2-1.3Z" fill="var(--gold)" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark className="size-8 shrink-0 sm:size-9" />
      <span className="flex min-w-0 flex-col leading-none">
        <span className="truncate font-display text-[15px] font-medium tracking-tight sm:text-lg">Universo Esotérico</span>
        <span className="mt-1 hidden text-xs text-muted sm:block">Ibagué · desde 1981</span>
      </span>
    </span>
  )
}

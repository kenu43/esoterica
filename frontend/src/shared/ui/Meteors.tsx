import { useState } from 'react'
import { cn } from '@/shared/lib'

const METEOR_KEYFRAMES =
  '@keyframes meteor{0%{transform:rotate(215deg) translateX(0);opacity:1}70%{opacity:1}100%{transform:rotate(215deg) translateX(-600px);opacity:0}}'

/** Lluvia de meteoritos en CSS (Magic UI "Meteors"). */
export function Meteors({ number = 14, className }: { number?: number; className?: string }) {
  const [meteors] = useState(() =>
    Array.from({ length: number }, (_, i) => ({
      id: i,
      left: `${Math.floor(Math.random() * 100)}%`,
      delay: `${(Math.random() * 6).toFixed(2)}s`,
      duration: `${(Math.random() * 6 + 4).toFixed(2)}s`,
    })),
  )

  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <style>{METEOR_KEYFRAMES}</style>
      {meteors.map((m) => (
        <span
          key={m.id}
          className="absolute top-[-5%] size-0.5 rounded-full bg-gold shadow-[0_0_6px_1px_var(--gold)]"
          style={{ left: m.left, animation: `meteor ${m.duration} linear ${m.delay} infinite` }}
        >
          <span className="absolute left-0 top-1/2 h-px w-[60px] -translate-y-1/2 bg-gradient-to-r from-gold to-transparent" />
        </span>
      ))}
    </div>
  )
}

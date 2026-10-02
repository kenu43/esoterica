import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { cn, playCardFlip } from '@/shared/lib'
import type { TarotCard } from '../model/types'
import { TarotCardBack } from './TarotCardBack'

interface FlipTarotCardProps {
  card: TarotCard
  flipped: boolean
  reversed?: boolean
  onFlip?: () => void
  /** Posición en la secuencia de sonidos (0, 1, 2) y si es la última de la tirada. */
  soundOrder?: number
  soundFinale?: boolean
  className?: string
}

const SPARKS = [
  { x: '-6%', y: '8%', d: 0 },
  { x: '96%', y: '22%', d: 0.7 },
  { x: '-4%', y: '70%', d: 1.4 },
  { x: '94%', y: '86%', d: 2.1 },
]

/** Carta con giro 3D. Sin voltear, brilla con un haz dorado y destellos para invitar al toque; al revelarse suelta un destello de luz. */
export function FlipTarotCard({ card, flipped, reversed, onFlip, soundOrder = 0, soundFinale = false, className }: FlipTarotCardProps) {
  const invite = !flipped && Boolean(onFlip)
  const wasFlipped = useRef(flipped)

  // Suena cuando la carta pasa de oculta a revelada (no al montar una carta ya abierta).
  useEffect(() => {
    if (flipped && !wasFlipped.current) playCardFlip(soundOrder, soundFinale)
    wasFlipped.current = flipped
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipped])

  return (
    <button
      type="button"
      onClick={onFlip}
      disabled={!onFlip}
      aria-label={flipped ? card.name : 'Revelar carta'}
      className={cn(
        'group relative aspect-[7/12] w-full rounded-2xl transition-transform duration-300 [perspective:1400px] enabled:cursor-pointer enabled:hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold',
        className,
      )}
    >
      {invite && (
        <>
          <span aria-hidden className="pointer-events-none absolute -inset-[3px] overflow-hidden rounded-[1.15rem]">
            <motion.span
              className="absolute -inset-[60%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_55%,var(--gold)_78%,#fff7d1_86%,transparent_100%)]"
              animate={{ rotate: 360 }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
            />
          </span>
          <motion.span
            aria-hidden
            className="pointer-events-none absolute -inset-3 rounded-[1.6rem] bg-gold/25 blur-xl"
            animate={{ opacity: [0.25, 0.75, 0.25], scale: [0.98, 1.03, 0.98] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          {SPARKS.map((s) => (
            <motion.span
              key={s.d}
              aria-hidden
              className="pointer-events-none absolute z-10 text-lg leading-none text-[#fff3b0] drop-shadow-[0_0_6px_rgba(255,220,120,0.9)]"
              style={{ left: s.x, top: s.y }}
              animate={{ opacity: [0, 1, 0], scale: [0.3, 1.2, 0.3], rotate: [0, 45, 90] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: s.d }}
            >
              ✦
            </motion.span>
          ))}
        </>
      )}

      {flipped && (
        <motion.span
          key="burst"
          aria-hidden
          className="pointer-events-none absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(255,236,160,0.95),rgba(232,196,110,0.4)_40%,transparent_70%)]"
          initial={{ opacity: 0.95, scale: 0.4 }}
          animate={{ opacity: 0, scale: 1.7 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
      )}

      <motion.div
        className="relative size-full rounded-2xl [transform-style:preserve-3d]"
        initial={false}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 60, damping: 14, mass: 1 }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-2xl shadow-mystic/30 [backface-visibility:hidden]">
          <TarotCardBack />
          {invite && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
              animate={{ x: ['0%', '520%'] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.2, ease: 'easeInOut' }}
            />
          )}
        </div>
        <div className="absolute inset-0 overflow-hidden rounded-2xl bg-[#f3ead3] shadow-2xl shadow-gold/20 ring-1 ring-gold/40 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <img
            src={card.image}
            alt={card.name}
            className={cn('size-full object-cover', reversed && 'rotate-180')}
            draggable={false}
          />
        </div>
      </motion.div>
    </button>
  )
}

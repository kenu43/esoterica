import { motion } from 'motion/react'
import { cn } from '@/shared/lib'
import type { TarotCard } from '../model/types'
import { TarotCardBack } from './TarotCardBack'

interface FlipTarotCardProps {
  card: TarotCard
  flipped: boolean
  reversed?: boolean
  onFlip?: () => void
  className?: string
}

/** Carta con giro 3D: reverso → anverso. Accesible como botón. */
export function FlipTarotCard({ card, flipped, reversed, onFlip, className }: FlipTarotCardProps) {
  return (
    <button
      type="button"
      onClick={onFlip}
      disabled={!onFlip}
      aria-label={flipped ? card.name : 'Revelar carta'}
      className={cn(
        'group relative aspect-[7/12] w-full rounded-2xl [perspective:1400px] enabled:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold',
        className,
      )}
    >
      <motion.div
        className="relative size-full rounded-2xl [transform-style:preserve-3d]"
        initial={false}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 60, damping: 14, mass: 1 }}
      >
        <div className="absolute inset-0 rounded-2xl shadow-2xl shadow-mystic/30 [backface-visibility:hidden]">
          <TarotCardBack />
          <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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

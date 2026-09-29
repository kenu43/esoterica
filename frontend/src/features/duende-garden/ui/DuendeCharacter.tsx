import { motion } from 'motion/react'

/** Duende del huerto. Salta cuando algo le alegra. */
export function DuendeCharacter({ cheer }: { cheer: boolean }) {
  return (
    <motion.img
      src='/images/duende/gnomo.png'
      alt='El duende'
      draggable={false}
      className="h-40 w-auto drop-shadow-[0_10px_16px_rgba(0,0,0,0.5)] sm:h-52"
      animate={cheer ? { y: [0, -18, 0], rotate: [0, -3, 3, 0] } : { y: [0, -4, 0] }}
      transition={cheer ? { duration: 0.6, ease: 'easeOut' } : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

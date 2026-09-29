import { motion } from 'motion/react'
import type { ElementType } from 'react'
import { cn } from '@/shared/lib'

interface BlurTextProps {
  text: string
  as?: ElementType
  className?: string
  highlight?: string[]
  delay?: number
  stagger?: number
  animateOnMount?: boolean
}

/** Revela un título palabra por palabra con desenfoque (estilo Magic UI). */
export function BlurText({
  text,
  as: Tag = 'h2',
  className,
  highlight = [],
  delay = 0,
  stagger = 0.06,
  animateOnMount = false,
}: BlurTextProps) {
  const words = text.split(' ')
  const trigger = animateOnMount
    ? { animate: 'visible' as const }
    : { whileInView: 'visible' as const, viewport: { once: true, margin: '-60px' } }

  return (
    <Tag className={cn(className)} aria-label={text}>
      <motion.span
        className="inline"
        initial="hidden"
        {...trigger}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
        aria-hidden
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className={cn(
              'inline-block will-change-[filter,transform]',
              highlight.includes(word.replace(/[.,!?¿¡]/g, '')) && 'text-gradient-gold',
            )}
            variants={{
              hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {word}
            {i < words.length - 1 && ' '}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  )
}

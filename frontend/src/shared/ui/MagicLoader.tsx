import { motion } from 'motion/react'
import { cn } from '@/shared/lib'
import { LotusIcon } from './Florals'

/** Indicador de carga: loto con halo dorado que respira y chispas que suben. */
export function MagicLoader({ label = 'Preparando tus productos…', className }: { label?: string; className?: string }) {
  return (
    <div role="status" className={cn('flex flex-col items-center gap-4 py-10 text-center', className)}>
      <div className="relative grid size-20 place-items-center">
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-gold/25 blur-xl"
          animate={{ scale: [0.8, 1.25, 0.8], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute bottom-3 size-1.5 rounded-full bg-gold"
            style={{ left: `${30 + i * 20}%` }}
            animate={{ y: [0, -34], opacity: [0, 1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }}
          />
        ))}
        <motion.div animate={{ rotate: [-4, 4, -4] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
          <LotusIcon className="relative size-10 text-gold" />
        </motion.div>
      </div>
      <p className="text-sm text-muted">{label}</p>
    </div>
  )
}

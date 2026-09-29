import { buttonVariants, Chip } from '@heroui/react'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Link } from 'react-router'
import { FlipTarotCard, getPersonalDailyCard } from '@/entities/tarot-card'
import { seekerSeed, useSeekerStore } from '@/features/seeker'
import { ROUTES } from '@/shared/config'
import { cn, formatLongDate } from '@/shared/lib'
import { Container, Meteors, SectionHeading, TiltCard } from '@/shared/ui'

/** Tu carta de hoy: distinta para cada visitante (y para cada día); se voltea y se revela su mensaje. */
export function DailyTarot() {
  const visitorId = useSeekerStore((s) => s.visitorId)
  const name = useSeekerStore((s) => s.name)
  const birth = useSeekerStore((s) => s.birth)
  const { card, reversed } = getPersonalDailyCard(seekerSeed({ visitorId, name, birth }, 'daily'))
  const [flipped, setFlipped] = useState(false)

  return (
    <section className="relative overflow-hidden py-24">
      <Meteors number={8} className="opacity-40" />
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div className="order-2 space-y-6 lg:order-1">
          <SectionHeading
            align="left"
            eyebrow={`Tu lectura de hoy · ${formatLongDate(new Date())}`}
            title={name ? `${name}, esta es tu carta de hoy` : 'Tu carta de hoy'}
            highlight={['carta']}
            description="La baraja eligió una carta solo para ti. Respira profundo, piensa en cómo te sientes hoy y tócala para revelarla."
          />

          <motion.div layout transition={{ layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}>
          <AnimatePresence mode="wait">
            {flipped ? (
              <motion.div
                key="meaning"
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="glass space-y-4 rounded-3xl p-6"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm text-gold">Arcano {card.numeral}</span>
                  <h3 className="text-2xl sm:text-3xl">{card.name}</h3>
                  {reversed && (
                    <Chip color="warning" variant="soft" size="sm">
                      Invertida
                    </Chip>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {card.keywords.map((k) => (
                    <Chip key={k} size="sm" variant="secondary">
                      {k}
                    </Chip>
                  ))}
                </div>
                <p className="text-muted">{reversed ? card.reversed : card.upright}</p>
                <blockquote className="border-l-2 border-gold pl-4 text-lg italic">
                  “{card.advice}”
                </blockquote>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    to={ROUTES.tarotCard(card.id)}
                    className={cn(buttonVariants({ variant: 'primary' }), 'group gap-2')}
                  >
                    Significado completo
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setFlipped(false)}
                    className={cn(buttonVariants({ variant: 'ghost' }), 'gap-2')}
                  >
                    <RotateCcw className="size-4" /> Voltear de nuevo
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-sm text-muted"
              >
                <motion.span animate={{ x: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="hidden lg:inline">
                  →
                </motion.span>
                <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="lg:hidden">
                  ↓
                </motion.span>
                Toca la carta para descubrir tu mensaje
              </motion.p>
            )}
          </AnimatePresence>
          </motion.div>
        </div>

        <div className="order-1 flex justify-center lg:order-2">
          <div className="relative w-64 sm:w-72">
            <div aria-hidden className="absolute -inset-10 rounded-full bg-gold/20 blur-3xl animate-pulse-glow" />
            <motion.div
              animate={flipped ? { y: 0 } : { y: [0, -12, 0] }}
              transition={flipped ? { duration: 0.3 } : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <TiltCard max={12} className="rounded-2xl">
                <FlipTarotCard card={card} reversed={reversed} flipped={flipped} onFlip={() => setFlipped((v) => !v)} />
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}

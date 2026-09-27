import { Button, Chip } from '@heroui/react'
import { Shuffle, Sparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Link } from 'react-router'
import { drawCards, FlipTarotCard, type TarotCard } from '@/entities/tarot-card'
import { ROUTES } from '@/shared/config'
import { SpotlightCard } from '@/shared/ui'

const POSITIONS = ['Pasado', 'Presente', 'Futuro']

type Draw = { card: TarotCard; reversed: boolean }[]

/** Tirada interactiva de tres cartas: barajar → revelar una a una. */
export function TarotSpread() {
  const [draw, setDraw] = useState<Draw | null>(null)
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false])
  const [shuffling, setShuffling] = useState(false)

  const shuffle = () => {
    setShuffling(true)
    setRevealed([false, false, false])
    setTimeout(() => {
      setDraw(drawCards(3))
      setShuffling(false)
    }, 900)
  }

  return (
    <SpotlightCard className="p-6 sm:p-10">
      <div className="mb-10 flex flex-col items-center gap-4 text-center">
        <h2 className="text-2xl sm:text-4xl">Tirada de tres cartas</h2>
        <p className="max-w-xl text-muted">
          Piensa en una situación concreta. Baraja el mazo y revela, en orden, las cartas de tu pasado,
          presente y futuro.
        </p>
        <Button variant="primary" size="lg" onPress={shuffle} isDisabled={shuffling} className="gap-2">
          <Shuffle className={shuffling ? 'size-4 animate-spin' : 'size-4'} />
          {draw ? 'Barajar de nuevo' : 'Barajar y tirar'}
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-8">
        {POSITIONS.map((pos, i) => {
          const item = draw?.[i]
          return (
            <div key={pos} className="flex flex-col items-center gap-4">
              <span className="text-sm font-medium text-gold">{pos}</span>
              <motion.div
                className="w-full max-w-[220px]"
                animate={
                  shuffling
                    ? { x: [0, (1 - i) * 60, 0], rotate: [0, (i - 1) * 12, 0], y: [0, -20, 0] }
                    : { x: 0, rotate: 0, y: 0 }
                }
                transition={{ duration: 0.9, ease: 'easeInOut' }}
              >
                {item ? (
                  <FlipTarotCard
                    card={item.card}
                    reversed={item.reversed}
                    flipped={revealed[i]}
                    onFlip={() => setRevealed((r) => r.map((v, j) => (j === i ? true : v)))}
                  />
                ) : (
                  <div className="grid aspect-[7/12] w-full place-items-center rounded-2xl border-2 border-dashed border-border text-muted">
                    <Sparkles className="size-6" />
                  </div>
                )}
              </motion.div>
              <AnimatePresence>
                {item && revealed[i] && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.5 }}
                    className="hidden max-w-[240px] space-y-2 text-center sm:block"
                  >
                    <Link to={ROUTES.tarotCard(item.card.id)} className="font-display text-lg hover:text-gold">
                      {item.card.name}
                    </Link>
                    {item.reversed && (
                      <Chip size="sm" color="warning" variant="soft" className="mx-auto">
                        Invertida
                      </Chip>
                    )}
                    <p className="text-sm text-muted">{item.reversed ? item.card.reversed : item.card.upright}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* En móvil el detalle va debajo para no estrechar las cartas */}
      {draw && revealed.some(Boolean) && (
        <div className="mt-8 space-y-4 sm:hidden">
          {draw.map((item, i) =>
            revealed[i] ? (
              <div key={item.card.id} className="rounded-2xl bg-surface-secondary p-4">
                <p className="text-xs font-medium text-gold">{POSITIONS[i]}</p>
                <Link to={ROUTES.tarotCard(item.card.id)} className="font-display text-lg">
                  {item.card.name} {item.reversed && '(invertida)'}
                </Link>
                <p className="text-sm text-muted">{item.reversed ? item.card.reversed : item.card.upright}</p>
              </div>
            ) : null,
          )}
        </div>
      )}
    </SpotlightCard>
  )
}

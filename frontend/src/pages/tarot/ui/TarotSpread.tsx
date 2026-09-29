import { Button, Chip } from '@heroui/react'
import { Shuffle, Sparkles, Timer, WandSparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Link } from 'react-router'
import { drawCards, FlipTarotCard, type TarotCard } from '@/entities/tarot-card'
import { isAssistantEnabled, useAssistantStore } from '@/features/ai-assistant'
import { SeekerForm, seededRandom, seekerSeed, useSeekerStore } from '@/features/seeker'
import { ROUTES } from '@/shared/config'
import { useCountdownToMidnight } from '@/shared/hooks'
import { dayKey } from '@/shared/lib'
import { SpotlightCard } from '@/shared/ui'

const POSITIONS = ['Pasado', 'Presente', 'Futuro']

type Draw = { card: TarotCard; reversed: boolean }[]

/** Tirada interactiva de tres cartas: pide tu nombre y fecha, baraja y revela una a una. */
export function TarotSpread() {
  const [draw, setDraw] = useState<Draw | null>(null)
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false])
  const [shuffling, setShuffling] = useState(false)
  const askWithMessage = useAssistantStore((s) => s.askWithMessage)
  const seeker = useSeekerStore()
  const known = Boolean(seeker.name && seeker.birth)
  const countdown = useCountdownToMidnight()
  const doneToday = known && seeker.doneOn.spread === dayKey()

  const shuffle = () => {
    setShuffling(true)
    setRevealed([false, false, false])
    const rng = seededRandom(seekerSeed(seeker, 'spread'))
    setTimeout(() => {
      setDraw(drawCards(3, undefined, rng))
      setShuffling(false)
      seeker.markDone('spread')
    }, 1100)
  }

  const askForReading = () => {
    if (!draw) return
    const lines = draw
      .map(
        (item, i) =>
          `${POSITIONS[i]}: ${item.card.name}${item.reversed ? ' (invertida)' : ''} — ${
            item.reversed ? item.card.reversed : item.card.upright
          }`,
      )
      .join('\n')
    askWithMessage(
      `Saqué esta tirada de tres cartas (pasado, presente, futuro) para mi situación actual:\n${lines}\n\nDame una lectura breve que una estas tres cartas para mi situación.`,
    )
  }

  return (
    <SpotlightCard className="p-6 sm:p-10">
      <div className="mb-10 flex flex-col items-center gap-4 text-center">
        <h2 className="text-2xl sm:text-4xl">Tirada de tres cartas</h2>
        <p className="max-w-xl text-muted">
          {known
            ? `${seeker.name}, baraja el mazo y revela, en orden, las cartas de tu pasado, presente y futuro.`
            : 'Cuéntanos quién eres para que la baraja lea tu energía: la tirada sale de tu nombre y tu fecha de nacimiento.'}
        </p>
        {known ? (
          <div className="flex flex-col items-center gap-2">
            {draw && !shuffling ? (
              <p className="inline-flex items-center gap-1.5 text-sm text-muted">
                <Timer className="size-4" aria-hidden /> Nueva tirada en <strong className="tabular-nums text-foreground">{countdown.label}</strong>
              </p>
            ) : (
              <Button variant="primary" size="lg" onPress={shuffle} isDisabled={shuffling} className="gap-2">
                <Shuffle className={shuffling ? 'size-4 animate-spin' : 'size-4'} />
                {doneToday ? 'Ver mi tirada de hoy' : 'Barajar y tirar'}
              </Button>
            )}
            <button
              type="button"
              onClick={() => {
                seeker.setSeeker('', '')
                setDraw(null)
              }}
              className="text-xs text-muted underline-offset-2 hover:underline"
            >
              Barajar para alguien más
            </button>
          </div>
        ) : (
          <SeekerForm cta="Continuar" />
        )}
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
                    ? {
                        x: [0, (1 - i) * 70, (i - 1) * 50, (1 - i) * 30, 0],
                        y: [0, -30, -8, -18, 0],
                        rotate: [0, (i - 1) * 16, (1 - i) * 10, (i - 1) * 6, 0],
                        scale: [1, 0.94, 1.02, 0.97, 1],
                      }
                    : { x: 0, y: 0, rotate: 0, scale: 1 }
                }
                transition={{ duration: 1.1, ease: 'easeInOut', times: [0, 0.3, 0.55, 0.8, 1] }}
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

      {isAssistantEnabled && draw && revealed.every(Boolean) && (
        <div className="mt-8 flex justify-center">
          <Button variant="outline" size="lg" onPress={askForReading} className="gap-2">
            <WandSparkles className="size-4" />
            Pedir explicación a Merlín
          </Button>
        </div>
      )}
    </SpotlightCard>
  )
}

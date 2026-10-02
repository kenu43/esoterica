import { Button, buttonVariants } from '@heroui/react'
import { ArrowRight, Gem, MessageCircle, Palette, Sparkles, Timer } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import { useCategory } from '@/entities/category'
import { SeekerForm, seededRandom, seekerSeed, useSeekerStore } from '@/features/seeker'
import { ROUTES, SITE } from '@/shared/config'
import { useCountdownToMidnight } from '@/shared/hooks'
import { buildWhatsAppUrl, cn, dayKey } from '@/shared/lib'
import { Confetti } from '@/shared/ui'
import { lifePathNumber, PROFILES } from '../model/numerology'

const DIGITS = 4
const STRIP = 40
const SPIN_S = 2.2
const STAGGER_S = 0.9

function RouletteReel({ final, index, spin, instant }: { final: number; index: number; spin: number; instant: boolean }) {
  const end = `-${((30 + final) / STRIP) * 100}%`
  const running = spin > 0 || instant
  return (
    <div className="relative h-20 w-14 overflow-hidden rounded-xl border-2 border-gold bg-[oklch(0.15_0.03_285)] shadow-[inset_0_0_18px_rgba(0,0,0,0.7),0_0_18px_var(--gold-soft)] sm:h-24 sm:w-[4.25rem]">
      <motion.div
        key={spin}
        initial={{ y: '0%' }}
        animate={{ y: running ? end : '0%' }}
        transition={instant && spin === 0 ? { duration: 0 } : { duration: SPIN_S + index * STAGGER_S, ease: [0.1, 0.75, 0.2, 1] }}
        className="flex flex-col"
        style={{ height: `${STRIP * 100}%` }}
      >
        {Array.from({ length: STRIP }, (_, i) => (
          <div
            key={i}
            className="grid flex-1 place-items-center font-display text-4xl tabular-nums text-[oklch(0.92_0.12_88)] sm:text-5xl"
          >
            {i % 10}
          </div>
        ))}
      </motion.div>
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70" />
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gold/50" />
    </div>
  )
}

/** Números de la suerte personales: salen de tu nombre, tu fecha de nacimiento y el día. Una tirada por día. */
export function LuckyNumbers() {
  const seeker = useSeekerStore()
  const known = Boolean(seeker.name && seeker.birth)
  const doneToday = known && seeker.doneOn.lucky === dayKey()
  const [spin, setSpin] = useState(0)
  const [finished, setFinished] = useState(0)
  const countdown = useCountdownToMidnight()

  const numbers = useMemo(() => {
    if (!known) return Array<number>(DIGITS).fill(0)
    const rng = seededRandom(seekerSeed(seeker, 'lucky'))
    return Array.from({ length: DIGITS }, () => Math.floor(rng() * 10))
  }, [known, seeker])

  const life = useMemo(() => {
    if (!known) return 1
    const [y, m, d] = seeker.birth.split('-').map(Number)
    return lifePathNumber(d, m, y)
  }, [known, seeker.birth])
  const profile = PROFILES[life]
  const category = useCategory(profile.category)
  const justDone = spin > 0 && finished === spin
  const revealed = justDone || (doneToday && spin === 0)

  // El fin de la tirada lo marca un temporizador, no los eventos de la animación: así nunca queda "girando" si el
  // teléfono pausa o recorta la animación (ahorro de batería, pestaña en segundo plano, movimiento reducido).
  useEffect(() => {
    if (spin === 0) return
    const total = (SPIN_S + (DIGITS - 1) * STAGGER_S) * 1000 + 300
    const t = setTimeout(() => setFinished(spin), total)
    return () => clearTimeout(t)
  }, [spin])

  useEffect(() => {
    if (justDone) seeker.markDone('lucky')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [justDone])

  const draw = () => {
    setSpin((s) => s + 1)
  }

  const message = `Hola, en la página me salió los números de la suerte y del chance ${numbers.join('')} y quiero mi aliado: ${profile.ally}. ¿Me ayudan?`

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="rounded-2xl border border-border bg-surface p-6 text-center sm:p-8">
        {!known ? (
          <div className="space-y-6">
            <p className="text-muted">Dinos tu nombre y cuándo naciste. Con eso mezclamos los números y sacamos los tuyos de hoy.</p>
            <SeekerForm cta="Sacar mis números" onDone={() => setSpin(1)} />
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-muted">
              {revealed
                ? `${seeker.name}, estos son tus números de la suerte y del chance de hoy.`
                : spin > 0
                  ? 'La ruleta está girando…'
                  : `${seeker.name}, gira la ruleta y descubre tus números.`}
            </p>

            <div className="relative flex justify-center gap-2.5 sm:gap-3" aria-live="polite">
              {numbers.map((n, i) => (
                <RouletteReel key={i} final={n} index={i} spin={spin} instant={doneToday} />
              ))}
              {justDone && <Confetti />}
            </div>

            {!revealed && (
              <Button variant="primary" size="lg" onPress={draw} isDisabled={spin > 0 && !justDone} className="gap-2">
                <Sparkles className={cn('size-4', spin > 0 && 'animate-spin')} />
                {spin > 0 ? 'Girando…' : 'Girar la ruleta'}
              </Button>
            )}

            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: justDone ? 0.5 : 0 }}
                  className="space-y-5 border-t border-separator pt-6 text-left"
                >
                  <p className="text-sm leading-relaxed text-muted">
                    Tu número guía es el <strong className="text-foreground">{life}</strong>, {profile.title.toLowerCase()}:{' '}
                    {profile.essence.toLowerCase()}
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-surface-secondary p-4">
                      <Gem className="mb-2 size-5 text-gold" aria-hidden />
                      <p className="text-xs text-muted">Tu aliado de la suerte</p>
                      <p className="mt-1 font-medium">{profile.ally}</p>
                    </div>
                    <div className="rounded-xl bg-surface-secondary p-4">
                      <Palette className="mb-2 size-5 text-gold" aria-hidden />
                      <p className="text-xs text-muted">Tu color de hoy</p>
                      <p className="mt-1 font-medium">{profile.color}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link to={`${ROUTES.products}?cat=${category.id}`} className={cn(buttonVariants({ variant: 'primary' }), 'group gap-2')}>
                      Ver {category.name.toLowerCase()}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <a
                      href={buildWhatsAppUrl(SITE.whatsapp, message)}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(buttonVariants({ variant: 'outline' }), 'gap-2')}
                    >
                      <MessageCircle className="size-4" /> Preguntar por WhatsApp
                    </a>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Timer className="size-3.5" aria-hidden /> Nuevos números en <strong className="tabular-nums text-foreground">{countdown.label}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        seeker.setSeeker('', '')
                        setSpin(0)
                        setFinished(0)
                      }}
                      className="underline-offset-2 hover:underline"
                    >
                      Girar para alguien más
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}

import { Button } from '@heroui/react'
import { Droplets, Quote, Sprout, Timer } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { useCountdownToMidnight } from '@/shared/hooks'
import { dayKey, pick } from '@/shared/lib'
import { Confetti, NumberTicker, SectionHeading } from '@/shared/ui'
import { CONSEJOS, type Consejo } from '../model/consejos.data'
import { DAYS_TO_HARVEST, SEEDS, STAGE_LABELS, WATER_LINES } from '../model/garden.data'
import { useGardenStore } from '../model/garden.store'
import { DuendeCharacter } from './DuendeCharacter'
import { Plant } from './Plant'

interface Reward {
  consejo: Consejo
  seedName: string
}

/** La Cosecha del Duende: siembra, riega una vez al día y cosecha a los 5 días. Vuelve mañana. */
export function DuendeGarden() {
  const plots = useGardenStore((s) => s.plots)
  const harvests = useGardenStore((s) => s.harvests)
  const { plant, water, harvest } = useGardenStore()
  const seen = useGardenStore((s) => s.seen)
  const countdown = useCountdownToMidnight()
  const [cheer, setCheer] = useState(false)
  const [line, setLine] = useState<string | null>(null)
  const [reward, setReward] = useState<Reward | null>(null)

  const today = dayKey()
  const wateredToday = plots.filter((p) => p.days.includes(today)).length

  const doWater = (i: number) => {
    water(i)
    setLine(pick(WATER_LINES))
    setCheer(true)
    setTimeout(() => setCheer(false), 650)
  }

  const doHarvest = (i: number) => {
    const seed = SEEDS.find((s) => s.id === plots[i].seed)
    if (!seed) return
    const unseen = CONSEJOS.map((_, idx) => idx).filter((idx) => !seen.includes(idx))
    const pool = unseen.length ? unseen : CONSEJOS.map((_, idx) => idx)
    const themed = pool.filter((idx) => CONSEJOS[idx].intention === seed.intention || CONSEJOS[idx].intention === 'sabiduria')
    const chosen = pick(themed.length ? themed : pool)
    harvest(i, chosen, CONSEJOS.length)
    setReward({ consejo: CONSEJOS[chosen], seedName: seed.name })
    setCheer(true)
    setTimeout(() => setCheer(false), 650)
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl space-y-8 px-4">
        <SectionHeading
          eyebrow="El huerto del duende"
          title="La Cosecha del Duende"
          highlight={['Cosecha']}
          description="Siembra una semilla de suerte y riégala una vez al día. A los 5 días florece y el duende te entrega la cosecha. Vuelve mañana."
        />

        <div className="relative overflow-hidden rounded-3xl border border-gold/20">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ backgroundImage: 'url(/images/duende/fondo.jpg)', backgroundSize: 'cover', backgroundPosition: 'center bottom' }}
          />
          <div aria-hidden className="absolute inset-0 opacity-60">
            {Array.from({ length: 26 }, (_, i) => (
              <span
                key={i}
                className="absolute size-[3px] rounded-full bg-white"
                style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 55}%`, opacity: 0.3 + ((i * 17) % 60) / 100 }}
              />
            ))}
          </div>

          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(ellipse_at_bottom,oklch(0.38_0.12_145),transparent_70%)]" />
          {Array.from({ length: 16 }, (_, i) => (
            <motion.span
              key={`ff-${i}`}
              aria-hidden
              className="pointer-events-none absolute size-1.5 rounded-full bg-[#f6f08a] shadow-[0_0_8px_3px_rgba(246,240,138,0.7)]"
              style={{ left: `${(i * 61) % 96}%`, top: `${35 + ((i * 29) % 60)}%` }}
              animate={{ opacity: [0.15, 1, 0.15], y: [0, -10, 0], x: [0, 6, 0] }}
              transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.4 }}
            />
          ))}

          <div className="relative space-y-6 px-4 pb-6 pt-8 text-white sm:px-8">
            <div className="flex items-end justify-center gap-4">
              <DuendeCharacter cheer={cheer} />
              <div className="mb-6 min-h-16 max-w-[13rem] rounded-2xl rounded-bl-none bg-white/10 p-3 text-sm backdrop-blur">
                <AnimatePresence mode="wait">
                  <motion.p key={line ?? 'hola'} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    {line ?? 'Elige una semilla y siémbrala. ¡Yo la cuido contigo!'}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {plots.map((plot, i) => {
                const seed = SEEDS.find((s) => s.id === plot.seed)
                const stage = plot.days.length
                const ready = stage >= DAYS_TO_HARVEST
                const wateredNow = plot.days.includes(today)
                return (
                  <div key={i} className="flex flex-col items-center gap-2 rounded-2xl p-1 text-center">
                    <Plant stage={stage} art={seed?.art ?? null} />
                    {!seed ? (
                      <div className="grid w-full gap-1.5">
                        <p className="text-xs text-white/60">Parcela vacía · elige qué sembrar</p>
                        {SEEDS.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => plant(i, s.id)}
                            className="flex items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-2 py-1.5 text-xs transition-colors hover:border-gold/60 hover:bg-white/10"
                          >
                            <Sprout className="size-3.5 text-gold" aria-hidden /> {s.name}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <>
                        <div>
                          <p className="text-sm font-medium">{seed.name}</p>
                          <p className="text-xs text-white/60">{STAGE_LABELS[stage]} · {Math.min(stage, DAYS_TO_HARVEST)}/{DAYS_TO_HARVEST}</p>
                          <div className="mx-auto mt-1.5 h-1.5 w-24 overflow-hidden rounded-full bg-white/15">
                            <motion.div className="h-full bg-gold" animate={{ width: `${(stage / DAYS_TO_HARVEST) * 100}%` }} />
                          </div>
                        </div>
                        {ready ? (
                          <Button size="sm" variant="primary" onPress={() => doHarvest(i)} className="gap-1.5">
                            <Sprout className="size-4" /> Cosechar
                          </Button>
                        ) : wateredNow ? (
                          <p className="inline-flex items-center gap-1 text-xs text-white/70">
                            <Timer className="size-3.5" aria-hidden /> Riega en <span className="tabular-nums">{countdown.label}</span>
                          </p>
                        ) : (
                          <Button size="sm" variant="secondary" onPress={() => doWater(i)} className="gap-1.5">
                            <Droplets className="size-4" /> Regar
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="mx-auto grid max-w-sm grid-cols-2 gap-3 text-center">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#59635b] to-[#333a35] p-3 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),0_6px_14px_rgba(0,0,0,0.4)]">
                <p className="font-display text-2xl text-gold"><NumberTicker value={harvests} /></p>
                <p className="text-xs text-white/60">Cosechas del duende</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#59635b] to-[#333a35] p-3 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),0_6px_14px_rgba(0,0,0,0.4)]">
                <p className="font-display text-2xl text-gold">{wateredToday}/{plots.filter((p) => p.seed).length || 0}</p>
                <p className="text-xs text-white/60">Regadas hoy</p>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {reward && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative space-y-4 overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-b from-surface to-gold-soft p-8 text-center"
            >
              <Confetti />
              <Quote className="mx-auto size-8 text-gold" aria-hidden />
              <p className="text-sm font-medium text-gold">El duende te susurra, al cosechar tu {reward.seedName}:</p>
              <p className="font-display text-2xl leading-snug sm:text-3xl">“{reward.consejo.text}”</p>
              {reward.consejo.author && <p className="text-sm text-muted">— {reward.consejo.author}</p>}
              <button type="button" onClick={() => setReward(null)} className="text-xs text-muted hover:underline">
                Seguir sembrando
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

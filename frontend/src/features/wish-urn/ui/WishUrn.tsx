import { Button } from '@heroui/react'
import { PenLine, Sparkles, Timer, Trash2 } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState, type FormEvent } from 'react'
import { useCountdownTo } from '@/shared/hooks'
import { formatDate, pick } from '@/shared/lib'
import { Confetti, SectionHeading } from '@/shared/ui'
import { useWishStore, WISH_COOLDOWN_MS, type Wish } from '../model/wish.store'

const IDEAS = ['Salud para mi familia', 'Un trabajo estable', 'Que mi negocio prospere', 'Paz en mi hogar', 'Encontrar el amor', 'Cerrar un ciclo que me pesa']
const MAX = 240
const DUENDE_SAYS = [
  'Lo guardo entre mis cosas más queridas. Ahora déjaselo al tiempo.',
  'Bien dicho, y mejor sentido. Ya quedó sellado en la urna.',
  'Un deseo escrito con el corazón pesa menos y vuela más lejos.',
  'La esmeralda ya lo escuchó. Vuelve la próxima semana con otro.',
]

type Phase = 'write' | 'sealing' | 'saved'

function WaxSeal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden>
      <defs>
        <radialGradient id="wax" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#c8494a" />
          <stop offset="60%" stopColor="#8f1f27" />
          <stop offset="100%" stopColor="#5e1018" />
        </radialGradient>
      </defs>
      <path d="M30 3c6 0 8 4 13 5s10 4 9 10 4 9 0 14 0 9-6 12-7 7-13 8-9-4-14-6-10-5-9-11-4-9-1-15 2-9 8-11 7-6 13-6z" fill="url(#wax)" />
      <circle cx="30" cy="30" r="15" fill="none" stroke="#5e1018" strokeWidth="1.6" opacity="0.7" />
      <path d="m30 19 3 8 8 .5-6.3 5 2.2 8L30 36l-6.9 4.5 2.2-8-6.3-5 8-.5z" fill="#a83239" stroke="#5e1018" strokeWidth="0.8" />
      <ellipse cx="22" cy="17" rx="7" ry="3.5" fill="#fff" opacity="0.18" transform="rotate(-30 22 17)" />
    </svg>
  )
}

function ParchmentWish({ wish, celebrating, onGrant, onRemove }: { wish: Wish; celebrating: boolean; onGrant: () => void; onRemove: () => void }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 14, rotate: -1.5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative"
    >
      {celebrating && <Confetti count={26} />}
      <div className="absolute inset-x-1 top-0 h-3 rounded-full bg-gradient-to-b from-[#d9c39a] to-[#efe1c3] shadow-md" />
      <div className="absolute inset-x-1 bottom-0 h-3 rounded-full bg-gradient-to-t from-[#d9c39a] to-[#efe1c3] shadow-md" />
      <div className="relative mx-2 my-2 space-y-3 bg-gradient-to-b from-[#f6ead0] via-[#f1e2c0] to-[#e9d7b0] px-5 pb-9 pt-6 text-[#3b2a1d] shadow-[inset_0_0_26px_rgba(120,80,30,0.25)]">
        <p className="text-xs tracking-wide text-[#3b2a1d]/60">
          {wish.granted ? 'Deseo cumplido' : `Sellado el ${formatDate(wish.createdAt)}`}
        </p>
        <p className="font-display text-base italic leading-relaxed">“{wish.text}”</p>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {!wish.granted && (
            <button type="button" onClick={onGrant} className="rounded-full bg-[#8f1f27] px-3 py-1 font-medium text-[#f6ead0] hover:bg-[#a83239]">
              Se cumplió
            </button>
          )}
          <button type="button" onClick={onRemove} className="inline-flex items-center gap-1 text-[#3b2a1d]/60 hover:text-[#8f1f27]">
            <Trash2 className="size-3.5" aria-hidden /> Soltar
          </button>
        </div>
        <WaxSeal className={`absolute -bottom-3 right-5 size-14 drop-shadow-[0_3px_3px_rgba(0,0,0,0.4)] ${wish.granted ? 'hue-rotate-[80deg]' : ''}`} />
      </div>
    </motion.li>
  )
}

/** La Urna de los Deseos: un deseo por semana, sellado con cera y guardado por el duende. */
export function WishUrn() {
  const wishes = useWishStore((s) => s.wishes)
  const lastWishAt = useWishStore((s) => s.lastWishAt)
  const { add, grant, remove } = useWishStore()
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<Phase>('write')
  const [said, setSaid] = useState(DUENDE_SAYS[0])
  const [error, setError] = useState('')
  const [celebrate, setCelebrate] = useState<string | null>(null)

  const wait = useCountdownTo(lastWishAt ? lastWishAt + WISH_COOLDOWN_MS : null)
  const waiting = wait.left > 0 && phase !== 'sealing'

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (text.trim().length < 8) return setError('Cuéntale un poquito más al duende: escribe al menos unas palabras.')
    setError('')
    setPhase('sealing')
    setTimeout(() => {
      add(text)
      setSaid(pick(DUENDE_SAYS))
      setText('')
      setPhase('saved')
    }, 2100)
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl space-y-8 px-4">
        <SectionHeading
          eyebrow="La urna del duende"
          title="La Urna de los Deseos"
          highlight={['Deseos']}
          description="Escribe una petición, el duende la sella con cera y la guarda en su urna. Puedes pedir un deseo por semana: piénsalo bien."
        />

        <div className="relative overflow-hidden rounded-3xl border border-gold/20">
          <div aria-hidden className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/urna/fondo.jpg)' }} />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/55" />

          <div className="relative grid items-center gap-6 px-4 py-8 sm:px-8 md:grid-cols-[1fr_1.1fr]">
            <div className="relative mx-auto flex w-full max-w-xs flex-col items-center">
              <motion.span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[18%] size-40 -translate-x-1/2 rounded-full bg-emerald-300/40 blur-3xl"
                animate={phase === 'sealing' ? { opacity: [0.2, 0.2, 1, 0.5], scale: [1, 1, 1.6, 1.2] } : { opacity: [0.15, 0.35, 0.15] }}
                transition={phase === 'sealing' ? { duration: 2.1, times: [0, 0.5, 0.7, 1] } : { duration: 3, repeat: Infinity }}
              />
              {phase === 'sealing' &&
                [0, 1].map((i) => (
                  <motion.span
                    key={i}
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-[34%] size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-emerald-200"
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: [0, 0.9, 0], scale: [0.4, 3.2] }}
                    transition={{ duration: 1.1, delay: 1.1 + i * 0.25, ease: 'easeOut' }}
                  />
                ))}
              <motion.img
                src="/images/urna/urna.png"
                alt="La urna del duende"
                draggable={false}
                className="relative w-56 drop-shadow-[0_22px_18px_rgba(0,0,0,0.55)] sm:w-64"
                animate={
                  phase === 'sealing'
                    ? { y: [0, 0, 6, -4, 0], scale: [1, 1, 0.98, 1.04, 1], rotate: [0, 0, -1.5, 1.5, 0], filter: ['brightness(1)', 'brightness(1)', 'brightness(1.5)', 'brightness(1.25)', 'brightness(1)'] }
                    : { y: [0, -5, 0] }
                }
                transition={phase === 'sealing' ? { duration: 2.1, times: [0, 0.5, 0.62, 0.78, 1] } : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span aria-hidden className="pointer-events-none -mt-3 h-4 w-48 rounded-[50%] bg-black/45 blur-md" />
              <AnimatePresence>
                {phase === 'sealing' && (
                  <motion.img
                    key="papiro"
                    src="/images/urna/papiro.png"
                    alt=""
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-0 w-24 -translate-x-1/2 drop-shadow-[0_0_14px_rgba(255,236,160,0.9)]"
                    initial={{ y: -170, opacity: 0, rotate: -40, scale: 0.5 }}
                    animate={{ y: [-170, -70, 40], opacity: [0, 1, 1, 0], rotate: [-40, 12, 0], scale: [0.5, 1.05, 0.85] }}
                    transition={{ duration: 1.5, times: [0, 0.5, 1], ease: 'easeInOut' }}
                  />
                )}
                {phase === 'sealing' &&
                  Array.from({ length: 14 }, (_, i) => (
                    <motion.span
                      key={`sp-${i}`}
                      aria-hidden
                      className="pointer-events-none absolute left-1/2 top-[34%] size-1.5 rounded-full bg-[#fff3b0] shadow-[0_0_8px_3px_rgba(255,240,150,0.9)]"
                      initial={{ opacity: 0, x: 0, y: 0 }}
                      animate={{ opacity: [0, 1, 0], x: (i % 2 ? 1 : -1) * (20 + ((i * 23) % 70)), y: -50 - ((i * 37) % 120) }}
                      transition={{ duration: 1.3, delay: 1.2 + (i % 5) * 0.06, ease: 'easeOut' }}
                    />
                  ))}
              </AnimatePresence>
              {phase === 'saved' && <Confetti count={30} />}
            </div>

            <div className="text-white">
              <AnimatePresence mode="wait">
                {phase === 'saved' || waiting ? (
                  <motion.div
                    key="saved"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 rounded-2xl bg-black/45 p-6 text-center backdrop-blur"
                  >
                    <img src="/images/urna/gnomo-carta.png" alt="" draggable={false} className="mx-auto h-28 w-auto" />
                    <p className="font-display text-xl">{phase === 'saved' ? 'Tu deseo quedó sellado' : 'El duende ya guardó tu deseo'}</p>
                    <p className="text-sm text-white/80">{phase === 'saved' ? said : 'Mientras se cumple, deja que la esmeralda haga su trabajo.'}</p>
                    <p className="inline-flex items-center justify-center gap-1.5 text-sm text-gold">
                      <Timer className="size-4" aria-hidden /> Otro deseo en <strong className="tabular-nums">{wait.label}</strong>
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="write"
                    onSubmit={submit}
                    noValidate
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3 rounded-2xl border border-amber-900/20 bg-[#f4e8cf] p-5 text-[#3b2a1d] shadow-xl shadow-black/40"
                  >
                    <label htmlFor="deseo" className="flex items-center gap-2 font-display text-lg">
                      <img src="/images/urna/tinta.png" alt="" aria-hidden className="h-8 w-auto" /> Mi deseo
                    </label>
                    <textarea
                      id="deseo"
                      value={text}
                      onChange={(e) => setText(e.target.value.slice(0, MAX))}
                      disabled={phase === 'sealing'}
                      rows={5}
                      placeholder="Escríbelo con calma, en presente y con agradecimiento…"
                      className="w-full resize-none rounded-lg border border-amber-900/25 bg-[#fbf3df] p-3 text-sm leading-relaxed outline-none placeholder:text-[#3b2a1d]/50 focus:border-amber-700"
                    />
                    <p className="text-right text-xs text-[#3b2a1d]/70">{text.length}/{MAX}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {IDEAS.map((idea) => (
                        <button
                          key={idea}
                          type="button"
                          onClick={() => setText(idea)}
                          className="rounded-full border border-amber-900/25 px-2.5 py-1 text-xs transition-colors hover:bg-amber-900/10"
                        >
                          {idea}
                        </button>
                      ))}
                    </div>
                    {error && <p className="text-sm text-red-800">{error}</p>}
                    <Button type="submit" variant="primary" isDisabled={phase === 'sealing'} className="gap-2">
                      {phase === 'sealing' ? <Sparkles className="size-4 animate-spin" /> : <PenLine className="size-4" />}
                      {phase === 'sealing' ? 'El duende lo está sellando…' : 'Sellar y guardar en la urna'}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {wishes.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-display text-xl">Tus deseos sellados</h3>
            <ul className="grid gap-5 sm:grid-cols-2">
              <AnimatePresence initial={false}>
                {wishes.map((w) => (
                  <ParchmentWish
                    key={w.id}
                    wish={w}
                    celebrating={celebrate === w.id}
                    onGrant={() => {
                      grant(w.id)
                      setCelebrate(w.id)
                      setTimeout(() => setCelebrate(null), 1800)
                    }}
                    onRemove={() => remove(w.id)}
                  />
                ))}
              </AnimatePresence>
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

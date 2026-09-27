import { Breadcrumbs, buttonVariants, Chip } from '@heroui/react'
import { ArrowLeft, ArrowRight, Briefcase, Heart, Sparkles, SunMedium, Undo2 } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { FlipTarotCard, SUITS, TAROT_DECK, getTarotCard, type TarotCard } from '@/entities/tarot-card'
import { ROUTES } from '@/shared/config'
import { useSeo } from '@/shared/hooks'
import { cn } from '@/shared/lib'
import { AuroraBackground, Container, StarField, TiltCard } from '@/shared/ui'
import { NotFoundPage } from '@/pages/not-found'

export function TarotCardPage() {
  const { id = '' } = useParams()
  const card = getTarotCard(id)
  useSeo({
    title: card ? `${card.name}: significado en el tarot` : 'Tarot',
    description: card ? `${card.name} en el tarot: ${card.keywords.join(', ')}. ${card.upright.slice(0, 110)}…` : undefined,
    image: card?.image,
  })

  if (!card) return <NotFoundPage />

  const index = TAROT_DECK.findIndex((c) => c.id === card.id)
  const prev = TAROT_DECK[(index - 1 + TAROT_DECK.length) % TAROT_DECK.length]
  const next = TAROT_DECK[(index + 1) % TAROT_DECK.length]
  const group = card.arcana === 'major' ? 'Arcano mayor' : `Arcano menor · ${SUITS[card.suit!].name}`

  return (
    <section className="relative isolate min-h-screen overflow-hidden pb-24 pt-32 sm:pt-36">
      <AuroraBackground className="-z-10 opacity-60" />
      <StarField className="-z-10" density={0.0001} />
      <Container>
        <Breadcrumbs className="mb-10">
          <Breadcrumbs.Item href={ROUTES.home}>Inicio</Breadcrumbs.Item>
          <Breadcrumbs.Item href={ROUTES.tarot}>Tarot</Breadcrumbs.Item>
          <Breadcrumbs.Item>{card.name}</Breadcrumbs.Item>
        </Breadcrumbs>

        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,380px)_1fr]">
          <div className="mx-auto w-full max-w-[340px] lg:sticky lg:top-28">
            <TiltCard max={10} className="rounded-2xl">
              {/* key: al cambiar de carta se reinicia el estado y vuelve a voltearse */}
              <AutoFlipCard key={card.id} card={card} />
            </TiltCard>
          </div>

          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <p className="text-sm font-medium text-gold">
                {group} · {card.numeral}
              </p>
              <h1 className="text-4xl sm:text-5xl">{card.name}</h1>
              <div className="flex flex-wrap gap-2">
                {card.keywords.map((k) => (
                  <Chip key={k} variant="secondary">
                    {k}
                  </Chip>
                ))}
                {card.element && <Chip variant="soft">Elemento: {card.element}</Chip>}
                {card.astrology && <Chip variant="soft">Astrología: {card.astrology}</Chip>}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border border-border bg-surface p-6">
                <h2 className="mb-3 flex items-center gap-2 font-sans text-sm font-semibold text-gold">
                  <SunMedium className="size-4" /> Al derecho
                </h2>
                <p className="leading-relaxed">{card.upright}</p>
              </article>
              <article className="rounded-2xl border border-border bg-surface p-6">
                <h2 className="mb-3 flex items-center gap-2 font-sans text-sm font-semibold text-mystic">
                  <Undo2 className="size-4" /> Invertida
                </h2>
                <p className="leading-relaxed">{card.reversed}</p>
              </article>
            </div>

            {(card.love || card.career) && (
              <div className="grid gap-4 md:grid-cols-2">
                {card.love && (
                  <article className="rounded-2xl border border-border bg-surface p-6">
                    <h2 className="mb-3 flex items-center gap-2 font-sans text-sm font-semibold text-rose">
                      <Heart className="size-4" /> En el amor
                    </h2>
                    <p className="leading-relaxed">{card.love}</p>
                  </article>
                )}
                {card.career && (
                  <article className="rounded-2xl border border-border bg-surface p-6">
                    <h2 className="mb-3 flex items-center gap-2 font-sans text-sm font-semibold text-sage">
                      <Briefcase className="size-4" /> Trabajo y dinero
                    </h2>
                    <p className="leading-relaxed">{card.career}</p>
                  </article>
                )}
              </div>
            )}

            <blockquote className="relative overflow-hidden rounded-2xl border border-gold/30 bg-gold-soft p-8">
              <Sparkles className="absolute right-6 top-6 size-6 text-gold/60" aria-hidden />
              <p className="text-sm font-semibold text-gold">Consejo</p>
              <p className="mt-2 text-xl italic">“{card.advice}”</p>
            </blockquote>

            <nav aria-label="Otras cartas" className="flex items-center justify-between gap-3 border-t border-separator pt-6">
              <Link to={ROUTES.tarotCard(prev.id)} className={cn(buttonVariants({ variant: 'ghost' }), 'gap-2')}>
                <ArrowLeft className="size-4" /> <span className="max-w-[9rem] truncate">{prev.name}</span>
              </Link>
              <Link to={ROUTES.tarotCard(next.id)} className={cn(buttonVariants({ variant: 'ghost' }), 'gap-2')}>
                <span className="max-w-[9rem] truncate">{next.name}</span> <ArrowRight className="size-4" />
              </Link>
            </nav>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

/** Carta que se voltea sola poco después de montarse. */
function AutoFlipCard({ card }: { card: TarotCard }) {
  const [flipped, setFlipped] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setFlipped(true), 350)
    return () => clearTimeout(t)
  }, [])
  return <FlipTarotCard card={card} flipped={flipped} onFlip={() => setFlipped((v) => !v)} />
}

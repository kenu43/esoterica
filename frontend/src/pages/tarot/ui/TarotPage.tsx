import { SearchField } from '@heroui/react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { SUITS, TAROT_DECK, type Suit } from '@/entities/tarot-card'
import { ROUTES } from '@/shared/config'
import { useDebouncedValue, useSeo } from '@/shared/hooks'
import { cn } from '@/shared/lib'
import { Container, SectionHeading } from '@/shared/ui'
import { DailyTarot } from '@/widgets/daily-tarot'
import { PageHeader } from '@/widgets/page-header'
import { TarotSpread } from './TarotSpread'

type Group = 'major' | Suit

const GROUPS: { id: Group; label: string; description: string }[] = [
  { id: 'major', label: 'Arcanos mayores', description: 'Las 22 cartas del viaje del alma: grandes lecciones y etapas de la vida.' },
  ...(Object.entries(SUITS) as [Suit, (typeof SUITS)[Suit]][]).map(([id, s]) => ({
    id,
    label: s.name,
    description: `${s.theme} Elemento ${s.element}.`,
  })),
]

export function TarotPage() {
  useSeo({
    title: 'Significado de las cartas del tarot',
    description: 'Significado de las 78 cartas del tarot Rider-Waite: al derecho, invertidas, en el amor y en el trabajo. Carta del día y tirada gratis de 3 cartas.',
  })
  const [group, setGroup] = useState<Group>('major')
  const [search, setSearch] = useState('')
  // Debounce: el filtrado de 78 cartas (con animaciones) espera a que termines de escribir
  const query = useDebouncedValue(search, 250)

  const cards = useMemo(() => {
    const term = query.trim().toLowerCase()
    return TAROT_DECK.filter((c) => {
      if (term) return [c.name, ...c.keywords].join(' ').toLowerCase().includes(term)
      return group === 'major' ? c.arcana === 'major' : c.suit === group
    })
  }, [group, query])

  const current = GROUPS.find((g) => g.id === group)!

  return (
    <>
      <PageHeader
        eyebrow="Oráculo"
        title="Significado de las cartas del tarot"
        highlight={['tarot']}
        description="Las 78 cartas del Rider–Waite con su significado al derecho, invertido, en el amor y en el trabajo."
      />

      <DailyTarot />

      <Container className="py-12">
        <TarotSpread />
      </Container>

      <section className="py-16">
        <Container className="space-y-10">
          <SectionHeading eyebrow="Enciclopedia" title="Explora el mazo completo" highlight={['mazo']} />

          <div className="flex flex-col items-center gap-5">
            <SearchField value={search} onChange={setSearch} aria-label="Buscar carta" className="w-full max-w-md">
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder="Buscar por nombre o palabra clave (amor, cambio…)" />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>

            {!query && (
              <div role="tablist" aria-label="Grupos de cartas" className="flex flex-wrap justify-center gap-2">
                {GROUPS.map((g) => (
                  <button
                    key={g.id}
                    role="tab"
                    aria-selected={g.id === group}
                    onClick={() => setGroup(g.id)}
                    className={cn(
                      'relative rounded-full px-5 py-2 text-sm font-semibold transition-colors',
                      g.id === group ? 'text-accent-foreground' : 'border border-border text-muted hover:text-foreground',
                    )}
                  >
                    {g.id === group && (
                      <motion.span layoutId="tarot-group" className="absolute inset-0 rounded-full bg-accent" />
                    )}
                    <span className="relative">{g.label}</span>
                  </button>
                ))}
              </div>
            )}
            <p className="max-w-xl text-center text-sm text-muted">
              {query ? `${cards.length} cartas coinciden con “${query}”` : current.description}
            </p>
          </div>

          <motion.div layout className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <AnimatePresence mode="popLayout">
              {cards.map((card, i) => (
                <motion.div
                  key={card.id}
                  layout
                  initial={{ opacity: 0, y: 30, rotateY: 90 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: Math.min(i, 12) * 0.03 }}
                  style={{ transformPerspective: 800 }}
                >
                  <Link
                    to={ROUTES.tarotCard(card.id)}
                    className="group block space-y-2 outline-none"
                    aria-label={card.name}
                  >
                    <div className="relative aspect-[7/12] overflow-hidden rounded-lg border border-border bg-[#f3ead3] shadow-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:border-gold group-hover:shadow-[0_20px_40px_-12px_var(--glow)] group-focus-visible:ring-2 group-focus-visible:ring-gold">
                      <img src={card.image} alt="" loading="lazy" className="size-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="absolute inset-x-0 bottom-0 translate-y-full p-3 transition-transform duration-500 group-hover:translate-y-0">
                        <p className="text-xs text-white/85">{card.keywords.slice(0, 2).join(' · ')}</p>
                      </div>
                    </div>
                    <p className="text-center text-sm font-medium leading-tight transition-colors group-hover:text-gold">
                      {card.name}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </section>
    </>
  )
}

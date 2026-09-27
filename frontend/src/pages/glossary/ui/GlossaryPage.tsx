import { SearchField } from '@heroui/react'
import { ArrowRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { getCategory } from '@/entities/category'
import { GLOSSARY, GLOSSARY_GROUPS, type GlossaryGroup } from '@/entities/glossary'
import { ROUTES, SITE } from '@/shared/config'
import { useDebouncedValue, useSeo } from '@/shared/hooks'
import { cn } from '@/shared/lib'
import { Container } from '@/shared/ui'
import { PageHeader } from '@/widgets/page-header'

export function GlossaryPage() {
  const [group, setGroup] = useState<GlossaryGroup | 'Todos'>('Todos')
  const [search, setSearch] = useState('')
  const query = useDebouncedValue(search, 200)
  const { hash } = useLocation()

  useSeo({
    title: 'Glosario esotérico: significado de santos, amuletos y rituales',
    description:
      '¿Qué es un tetragramatón? ¿Para qué sirve la ruda? ¿Qué significa la Santa Muerte? Significados y uso tradicional de santos, amuletos, plantas y rituales.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      name: 'Glosario esotérico de Universo Esotérico',
      url: `${SITE.url}${ROUTES.glossary}`,
      hasDefinedTerm: GLOSSARY.map((t) => ({
        '@type': 'DefinedTerm',
        name: t.term,
        description: `${t.summary} ${t.detail}`,
        url: `${SITE.url}${ROUTES.glossary}#${t.id}`,
      })),
    },
  })

  // Si llegan desde un enlace con #término, lo enfocamos y resaltamos
  useEffect(() => {
    if (!hash) return
    const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 400)
    return () => clearTimeout(t)
  }, [hash])

  const terms = useMemo(() => {
    const q = query.trim().toLowerCase()
    return GLOSSARY.filter((t) => {
      if (q) return `${t.term} ${t.summary} ${t.detail}`.toLowerCase().includes(q)
      return group === 'Todos' || t.group === group
    })
  }, [group, query])

  return (
    <>
      <PageHeader
        eyebrow="Glosario místico"
        title="Significados que debes conocer"
        highlight={['Significados']}
        description="Santos, amuletos, plantas y rituales explicados de forma sencilla, con su uso tradicional."
      />

      <Container className="space-y-8 pb-16">
        <div className="flex flex-col items-center gap-4">
          <SearchField value={search} onChange={setSearch} aria-label="Buscar en el glosario" className="w-full max-w-md">
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="Buscar: ruda, tetragramatón, despojo…" />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
          {!query && (
            <div role="tablist" aria-label="Temas" className="flex flex-wrap justify-center gap-2">
              {(['Todos', ...GLOSSARY_GROUPS] as const).map((g) => (
                <button
                  key={g}
                  role="tab"
                  aria-selected={g === group}
                  onClick={() => setGroup(g)}
                  className={cn(
                    'relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                    g === group ? 'text-accent-foreground' : 'border border-border text-muted hover:text-foreground',
                  )}
                >
                  {g === group && <motion.span layoutId="glossary-group" className="absolute inset-0 rounded-lg bg-accent" />}
                  <span className="relative">{g}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <motion.dl layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {terms.map((t) => {
              const category = t.category ? getCategory(t.category) : undefined
              const highlighted = hash === `#${t.id}`
              return (
                <motion.div
                  key={t.id}
                  id={t.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    'flex scroll-mt-32 flex-col rounded-2xl border bg-surface p-5',
                    highlighted ? 'border-gold shadow-[0_0_0_1px_var(--gold)]' : 'border-border',
                  )}
                >
                  <span className="text-xs text-gold">{t.group}</span>
                  <dt className="mt-1 font-display text-lg">{t.term}</dt>
                  <dd className="mt-2 flex flex-1 flex-col gap-2 text-sm">
                    <p className="font-medium">{t.summary}</p>
                    <p className="text-muted">{t.detail}</p>
                    {category && (
                      <Link
                        to={`${ROUTES.products}?cat=${category.id}`}
                        className="group mt-auto inline-flex items-center gap-1 pt-2 text-gold hover:underline"
                      >
                        Ver {category.name.toLowerCase()}
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    )}
                  </dd>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.dl>
        {terms.length === 0 && <p className="text-center text-muted">No encontramos ese término. Pregúntanos por WhatsApp.</p>}
      </Container>
    </>
  )
}

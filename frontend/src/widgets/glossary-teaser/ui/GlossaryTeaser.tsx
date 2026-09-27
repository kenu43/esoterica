import { buttonVariants } from '@heroui/react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { useGlossary } from '@/entities/glossary'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Container, Reveal, SectionHeading } from '@/shared/ui'

const FEATURED = ['santa-muerte', 'tetragramaton', 'bano-de-despojo', 'ruda', 'duende-de-la-suerte', 'ganesha']

/** Adelanto del glosario en la portada: responde dudas frecuentes y lleva tráfico de Google. */
export function GlossaryTeaser() {
  const glossary = useGlossary()
  const featured = FEATURED.map((id) => glossary.find((t) => t.id === id)).filter((t) => !!t)
  // Si el editor borró alguno de los destacados, se completa con los primeros del glosario
  const terms = featured.length >= 3 ? featured : glossary.slice(0, 6)
  return (
    <section className="py-24">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Glosario místico"
          title="¿Para qué sirve cada cosa?"
          highlight={['cada']}
          description="Significados y uso tradicional de santos, amuletos, plantas y rituales."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {terms.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.05}>
              <Link
                to={`${ROUTES.glossary}#${t.id}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-gold/40"
              >
                <span className="text-xs text-gold">{t.group}</span>
                <h3 className="mt-1 text-lg transition-colors group-hover:text-gold">{t.term}</h3>
                <p className="mt-2 text-sm text-muted">{t.summary}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="flex justify-center">
          <Link to={ROUTES.glossary} className={cn(buttonVariants({ variant: 'outline' }), 'group gap-2')}>
            Ver todo el glosario
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  )
}

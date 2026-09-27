import { Star } from 'lucide-react'
import { getBranch } from '@/entities/branch'
import { useTestimonials, type Testimonial } from '@/entities/testimonial'
import { AuroraBackground, Container, Marquee, SectionHeading } from '@/shared/ui'

function ExperienceCard({ t }: { t: Testimonial }) {
  const store = t.store ? getBranch(t.store) : undefined
  return (
    <figure className="glass flex w-[300px] shrink-0 flex-col rounded-2xl p-5 shadow-lg shadow-black/5 sm:w-[340px]">
      <div className="mb-3 flex gap-0.5 text-gold" aria-label={`${t.rating} de 5 estrellas`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={i < t.rating ? 'size-4 fill-current' : 'size-4 opacity-30'} aria-hidden />
        ))}
      </div>
      <blockquote className="flex-1 text-[15px] leading-relaxed">“{t.text}”</blockquote>
      <figcaption className="mt-4 flex items-center gap-3 border-t border-separator pt-4">
        <span className="grid size-9 place-items-center rounded-full bg-mystic-soft text-sm font-semibold text-mystic">
          {t.name[0]}
        </span>
        <span className="text-sm">
          <span className="block font-medium">{t.name}</span>
          <span className="text-muted">
            {t.city}
            {store && ` · ${store.name}`}
          </span>
        </span>
      </figcaption>
    </figure>
  )
}

/** "Altar de experiencias": carrusel infinito (Aceternity Infinite Moving Cards) con tarjetas de cristal. */
export function Testimonials() {
  const { data = [] } = useTestimonials()
  // Cada fila muestra opiniones distintas para que no se sientan repetidas
  const half = Math.ceil(data.length / 2)
  const rows = [data.slice(0, half), data.slice(half)]

  return (
    <section className="relative isolate overflow-hidden py-24">
      <AuroraBackground className="-z-10 opacity-40" />
      <Container>
        <SectionHeading
          eyebrow="Altar de experiencias"
          title="Lo que cuentan nuestros clientes"
          highlight={['clientes']}
          description="Más de cuatro décadas acompañando a familias de Ibagué y de toda Colombia."
        />
      </Container>
      <div className="mt-12 space-y-4">
        {rows.map((row, i) =>
          row.length ? (
            <Marquee key={i} duration={60 + i * 8} reverse={i === 1} gap="1rem">
              {row.map((t) => (
                <ExperienceCard key={`${t.name}-${t.text.slice(0, 12)}`} t={t} />
              ))}
            </Marquee>
          ) : null,
        )}
      </div>
    </section>
  )
}

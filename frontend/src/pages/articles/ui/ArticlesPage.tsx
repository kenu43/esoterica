import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { useArticles } from '@/entities/article'
import { ROUTES } from '@/shared/config'
import { useSeo } from '@/shared/hooks'
import { formatDate } from '@/shared/lib'
import { Container, Reveal } from '@/shared/ui'
import { PageHeader } from '@/widgets/page-header'

export function ArticlesPage() {
  useSeo({
    title: 'Aprende y sana: guías de limpieza, rituales y plantas',
    description:
      'Artículos sencillos sobre limpieza energética, sahumerios, baños de despojo, riegos, velaciones y plantas, escritos por la familia de El Sortilegio, La Colonia y Loto & Nirvana en Ibagué.',
  })
  const { data: articles = [] } = useArticles()

  return (
    <>
      <PageHeader
        eyebrow="Aprende y sana"
        title="Sabiduría esotérica explicada fácil"
        highlight={['sabiduría']}
        description="Guías cortas para limpiar tu casa, entender los rituales y usar bien cada producto."
      />
      <Container className="grid gap-5 pb-20 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, i) => (
          <Reveal key={a.id} delay={i * 0.05}>
            <Link
              to={ROUTES.article(a.slug)}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-gold/40"
            >
              {a.cover && (
                <img src={a.cover} alt="" loading="lazy" className="aspect-[1.9/1] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              )}
              <div className="flex flex-1 flex-col gap-2 p-5">
                <span className="text-xs text-gold">
                  {a.topic} · {formatDate(a.publishedAt)}
                </span>
                <h2 className="text-lg leading-snug transition-colors group-hover:text-gold">{a.title}</h2>
                <p className="text-sm text-muted">{a.excerpt}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm text-gold">
                  Leer artículo <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </Container>
    </>
  )
}

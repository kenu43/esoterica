import { ArrowRight, FileText } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { NotFoundPage } from '@/pages/not-found'
import { ROUTES, SITE } from '@/shared/config'
import { useSeo } from '@/shared/hooks'
import { Container } from '@/shared/ui'
import { PageHeader } from '@/widgets/page-header'
import { getLegalDoc, LEGAL_DOCS, LEGAL_UPDATED } from '../model/legal.data'

/** Índice de documentos legales o un documento (según el :slug). */
export function LegalPage() {
  const { slug } = useParams()
  const doc = getLegalDoc(slug)
  useSeo({
    title: doc ? doc.title : 'Políticas y términos',
    description: doc ? doc.description : 'Términos y condiciones, tratamiento de datos, envíos, cambios y garantía, PQR y cookies de Universo Esotérico.',
  })

  if (slug && !doc) return <NotFoundPage />

  if (!doc) {
    return (
      <>
        <PageHeader eyebrow="Transparencia" title="Políticas y términos" highlight={['términos']} description="Lo que necesitas saber para comprar con tranquilidad en Universo Esotérico." />
        <Container className="max-w-3xl space-y-3 pb-24">
          {LEGAL_DOCS.map((d) => (
            <Link
              key={d.slug}
              to={ROUTES.legalDoc(d.slug)}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-gold/50"
            >
              <FileText className="size-5 shrink-0 text-gold" aria-hidden />
              <span className="flex-1">
                <span className="block font-medium">{d.title}</span>
                <span className="text-sm text-muted">{d.short}</span>
              </span>
              <ArrowRight className="size-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-gold" aria-hidden />
            </Link>
          ))}
        </Container>
      </>
    )
  }

  return (
    <>
      <PageHeader eyebrow="Políticas" title={doc.title} description={`Última actualización: ${LEGAL_UPDATED}`} />
      <Container className="max-w-3xl pb-24">
        <article className="space-y-8 text-[0.95rem] leading-relaxed text-muted">
          {(SITE.legal.owner || SITE.legal.nit) && (
            <p className="rounded-xl border border-border bg-surface p-4 text-sm">
              {SITE.legal.owner && <>Titular: <strong className="text-foreground">{SITE.legal.owner}</strong>. </>}
              {SITE.legal.nit && <>NIT: <strong className="text-foreground">{SITE.legal.nit}</strong>.</>}
            </p>
          )}
          {doc.sections.map((s) => (
            <section key={s.heading} className="space-y-3">
              <h2 className="font-display text-xl text-foreground">{s.heading}</h2>
              {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
              {s.bullets && (
                <ul className="list-disc space-y-1.5 pl-5 marker:text-gold">
                  {s.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              )}
            </section>
          ))}
        </article>

        <nav aria-label="Otros documentos" className="mt-14 border-t border-separator pt-8">
          <p className="mb-3 text-sm font-medium text-foreground">Otros documentos</p>
          <ul className="flex flex-wrap gap-2">
            {LEGAL_DOCS.filter((d) => d.slug !== doc.slug).map((d) => (
              <li key={d.slug}>
                <Link to={ROUTES.legalDoc(d.slug)} className="inline-block rounded-full border border-border px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-gold/50 hover:text-gold">
                  {d.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </>
  )
}

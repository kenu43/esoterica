import { ArrowLeft, MessageCircle } from 'lucide-react'
import { Fragment } from 'react'
import { Link, useParams } from 'react-router'
import { useArticle, type ArticleBlock, type Inline } from '@/entities/article'
import { ROUTES, SITE } from '@/shared/config'
import { useSeo } from '@/shared/hooks'
import { buildWhatsAppUrl, formatDate } from '@/shared/lib'
import { Container } from '@/shared/ui'
import { NotFoundPage } from '@/pages/not-found'

const renderInline = (inline: Inline[]) =>
  inline.map((s, i) => {
    const text = s.strong ? <strong key={i}>{s.text}</strong> : s.text
    return s.em ? <em key={i}>{text}</em> : <Fragment key={i}>{text}</Fragment>
  })

/** Agrupa los ítems de lista consecutivos para pintar un solo <ul>/<ol>. */
function Body({ blocks }: { blocks: ArticleBlock[] }) {
  const out: React.ReactNode[] = []
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i]
    if (b.kind === 'bullet' || b.kind === 'number') {
      const items: ArticleBlock[] = []
      while (i < blocks.length && blocks[i].kind === b.kind) items.push(blocks[i++])
      i--
      const List = b.kind === 'bullet' ? 'ul' : 'ol'
      out.push(
        <List key={i} className={b.kind === 'bullet' ? 'list-disc space-y-1.5 pl-6' : 'list-decimal space-y-1.5 pl-6'}>
          {items.map((it, j) => it.kind !== 'image' && <li key={j}>{renderInline(it.inline)}</li>)}
        </List>,
      )
    } else if (b.kind === 'h2') out.push(<h2 key={i} className="mt-4 text-2xl">{renderInline(b.inline)}</h2>)
    else if (b.kind === 'h3') out.push(<h3 key={i} className="mt-2 text-xl">{renderInline(b.inline)}</h3>)
    else if (b.kind === 'quote')
      out.push(<blockquote key={i} className="border-l-2 border-gold pl-4 italic text-muted">{renderInline(b.inline)}</blockquote>)
    else if (b.kind === 'image')
      out.push(<img key={i} src={b.src} alt={b.alt} loading="lazy" className="w-full rounded-2xl border border-border" />)
    else out.push(<p key={i}>{renderInline(b.inline)}</p>)
  }
  return <div className="space-y-5 text-[17px] leading-relaxed">{out}</div>
}

export function ArticleDetailPage() {
  const { slug = '' } = useParams()
  const { article, isPending } = useArticle(slug)

  useSeo({
    title: article?.title,
    description: article?.excerpt,
    image: article?.cover,
    jsonLd: article
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.excerpt,
          datePublished: article.publishedAt,
          image: article.cover,
          author: { '@type': 'Organization', name: SITE.name },
          publisher: { '@type': 'Organization', name: SITE.name },
          mainEntityOfPage: `${SITE.url}${ROUTES.article(article.slug)}`,
        }
      : undefined,
  })

  if (isPending) return <Container className="pt-40">Cargando…</Container>
  if (!article) return <NotFoundPage />

  return (
    <Container className="max-w-3xl pb-24 pt-32 sm:pt-40">
      <Link to={ROUTES.learn} className="mb-8 inline-flex items-center gap-2 text-sm text-gold hover:underline">
        <ArrowLeft className="size-4" /> Todos los artículos
      </Link>
      <article className="space-y-8">
        <header className="space-y-3">
          <p className="text-sm text-gold">
            {article.topic} · {formatDate(article.publishedAt)}
          </p>
          <h1 className="text-3xl sm:text-5xl">{article.title}</h1>
          <p className="text-lg text-muted">{article.excerpt}</p>
        </header>
        {article.cover && <img src={article.cover} alt="" className="w-full rounded-2xl border border-border" />}
        <Body blocks={article.body} />
      </article>

      <aside className="mt-14 flex flex-col items-start gap-3 rounded-2xl border border-border bg-surface p-6">
        <p className="font-display text-xl">¿Necesitas ayuda con tu caso?</p>
        <p className="text-muted">Cuéntanos qué necesitas y te orientamos con los productos indicados.</p>
        <a
          href={buildWhatsAppUrl(SITE.ordersWhatsapp, `¡Hola! Vengo de la página web, leí "${article.title}" y quiero una asesoría.`)}
          target="_blank"
          rel="noreferrer"
          className="button button--primary gap-2"
        >
          <MessageCircle className="size-4" /> Escribir por WhatsApp
        </a>
      </aside>
    </Container>
  )
}

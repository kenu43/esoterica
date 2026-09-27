import type { ReactNode } from 'react'
import { AuroraBackground, Container, SectionHeading, StarField } from '@/shared/ui'

interface PageHeaderProps {
  eyebrow: string
  title: string
  highlight?: string[]
  description?: ReactNode
  children?: ReactNode
}

/** Cabecera común de las páginas internas: cielo estrellado + título animado. */
export function PageHeader({ eyebrow, title, highlight, description, children }: PageHeaderProps) {
  return (
    <header className="relative isolate overflow-hidden pb-16 pt-36 sm:pt-44">
      <div aria-hidden className="absolute inset-0 -z-10" style={{ background: 'var(--hero-gradient)' }} />
      <AuroraBackground className="-z-10 opacity-70" />
      <StarField className="-z-10" density={0.00012} />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-background to-transparent" />
      <Container className="flex flex-col items-center gap-8">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} highlight={highlight} description={description} />
        {children}
      </Container>
    </header>
  )
}

import type { ReactNode } from 'react'
import { cn } from '@/shared/lib'
import { BlurText } from './BlurText'
import { LotusIcon } from './Florals'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  highlight?: string[]
  description?: ReactNode
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  as = 'h2',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex max-w-3xl flex-col gap-4',
        align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <Reveal y={10} blur={false}>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-gold">
            <LotusIcon className="size-4" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <BlurText
        as={as}
        text={title}
        highlight={highlight}
        animateOnMount={as === 'h1'}
        className={cn(
          as === 'h1' ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-3xl sm:text-4xl lg:text-5xl',
        )}
      />
      {description && (
        <Reveal delay={0.15}>
          <p className="text-base leading-relaxed text-muted sm:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  )
}

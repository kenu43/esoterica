import NumberFlow from '@number-flow/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'

interface NumberTickerProps {
  value: number
  prefix?: string
  suffix?: string
  className?: string
}

/** Contador animado (dígitos rodando) que arranca al entrar en pantalla. */
export function NumberTicker({ value, prefix = '', suffix = '', className }: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <span ref={ref} className={className}>
      <NumberFlow value={inView ? value : 0} prefix={prefix} suffix={suffix} locales="es-CO" />
    </span>
  )
}

import NumberFlow from '@number-flow/react'

/** Número con dígitos que ruedan al cambiar (cantidades, conteos). */
export function AnimatedNumber({ value, className, suffix }: { value: number; className?: string; suffix?: string }) {
  return <NumberFlow value={value} locales="es-CO" suffix={suffix} className={className} />
}

/** Precio en COP con dígitos rodantes; si no hay precio muestra "Precio a consultar". */
export function AnimatedPrice({ value, className }: { value: number; className?: string }) {
  if (!(value > 0)) return <span className={className}>Precio a consultar</span>
  return (
    <NumberFlow
      value={value}
      locales="es-CO"
      format={{ style: 'currency', currency: 'COP', maximumFractionDigits: 0 }}
      className={className}
    />
  )
}

import { useInView, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useRef } from 'react'

interface NumberTickerProps {
  value: number
  prefix?: string
  suffix?: string
  className?: string
}

/** Contador animado que arranca al entrar en pantalla. */
export function NumberTicker({ value, prefix = '', suffix = '', className }: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { damping: 40, stiffness: 90 })
  const inView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (inView) motionValue.set(value)
  }, [inView, motionValue, value])

  useEffect(
    () =>
      spring.on('change', (latest) => {
        if (ref.current)
          ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString('es-CO')}${suffix}`
      }),
    [spring, prefix, suffix],
  )

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}

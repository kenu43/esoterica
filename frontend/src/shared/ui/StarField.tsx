import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { cn } from '@/shared/lib'

interface Star {
  x: number
  y: number
  r: number
  phase: number
  speed: number
}

interface Shooting {
  x: number
  y: number
  len: number
  vx: number
  vy: number
  life: number
}

interface StarFieldProps {
  className?: string
  density?: number
  shootingStars?: boolean
}

/**
 * Cielo estrellado en canvas: estrellas que titilan + estrellas fugaces.
 * El color se lee de la variable CSS --star-color para respetar el tema.
 */
export function StarField({ className, density = 0.00018, shootingStars = true }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let stars: Star[] = []
    const shooting: Shooting[] = []
    let raf = 0
    let width = 0
    let height = 0
    let visible = true
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const readColor = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--star-color').trim() ||
      '255, 255, 255'
    let rgb = readColor()

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.floor(width * height * density)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.3 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.004,
      }))
      if (reduce) draw(0)
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)
      for (const s of stars) {
        const alpha = reduce ? 0.7 : 0.3 + (Math.sin(s.phase + t * s.speed * 0.06) + 1) * 0.35
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb}, ${alpha})`
        ctx.fill()
      }

      if (!shootingStars || reduce) return
      if (Math.random() < 0.006 && shooting.length < 2) {
        shooting.push({
          x: Math.random() * width * 0.8 + width * 0.2,
          y: Math.random() * height * 0.4,
          len: Math.random() * 8 + 6,
          vx: -(Math.random() * 6 + 6),
          vy: Math.random() * 3 + 2,
          life: 1,
        })
      }
      for (let i = shooting.length - 1; i >= 0; i--) {
        const m = shooting[i]
        const tailX = m.x - m.vx * m.len
        const tailY = m.y - m.vy * m.len
        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY)
        grad.addColorStop(0, `rgba(${rgb}, ${m.life})`)
        grad.addColorStop(1, `rgba(${rgb}, 0)`)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.4
        ctx.beginPath()
        ctx.moveTo(m.x, m.y)
        ctx.lineTo(tailX, tailY)
        ctx.stroke()
        m.x += m.vx
        m.y += m.vy
        m.life -= 0.012
        if (m.life <= 0 || m.x < -100 || m.y > height + 100) shooting.splice(i, 1)
      }
    }

    const loop = (t: number) => {
      if (visible) draw(t)
      raf = requestAnimationFrame(loop)
    }

    resize()
    if (!reduce) raf = requestAnimationFrame(loop)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Pausa el render cuando el canvas no se ve (ahorra batería)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(canvas)

    // Re-lee el color cuando cambia el tema
    const mo = new MutationObserver(() => {
      rgb = readColor()
      if (reduce) draw(0)
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] })

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
    }
  }, [density, shootingStars, reduce])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 size-full', className)}
    />
  )
}

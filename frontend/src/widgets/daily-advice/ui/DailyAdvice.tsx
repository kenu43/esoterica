import { buttonVariants } from '@heroui/react'
import { ArrowRight, Flame, Gem, Moon, Quote } from 'lucide-react'
import { motion } from 'motion/react'
import { Link } from 'react-router'
import { getDailyAdvice } from '@/entities/advice'
import { getBranch } from '@/entities/branch'
import { getMoonPhase } from '@/entities/moon'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Container, NumberTicker, Reveal, SectionHeading } from '@/shared/ui'

/**
 * Luna dibujada en SVG con la sombra de la fase real.
 * El lado oscuro conserva un contorno tenue ("luz cenicienta") para que
 * el disco completo se vea centrado aunque solo una parte esté iluminada.
 */
function MoonVisual({ fraction }: { fraction: number }) {
  const waxing = fraction < 0.5
  const k = Math.cos(fraction * 2 * Math.PI) // 1 nueva → -1 llena
  const rx = Math.abs(k) * 60
  const lit = 'oklch(0.95 0.03 85)'
  const dark = 'oklch(0.3 0.03 280)'
  return (
    <svg viewBox="0 0 140 140" className="size-full" aria-hidden>
      <defs>
        <radialGradient id="moon-tex" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="white" stopOpacity="0.3" />
          <stop offset="100%" stopColor="black" stopOpacity="0.18" />
        </radialGradient>
        <clipPath id="moon-clip">
          <circle cx="70" cy="70" r="60" />
        </clipPath>
      </defs>
      <g clipPath="url(#moon-clip)">
        <rect width="140" height="140" fill={dark} />
        <path d={waxing ? 'M70 10 A60 60 0 0 1 70 130 Z' : 'M70 10 A60 60 0 0 0 70 130 Z'} fill={lit} />
        <ellipse cx="70" cy="70" rx={rx} ry="60" fill={k > 0 ? dark : lit} />
        <circle cx="52" cy="50" r="8" fill="black" opacity="0.07" />
        <circle cx="86" cy="84" r="12" fill="black" opacity="0.06" />
        <circle cx="80" cy="42" r="5" fill="black" opacity="0.07" />
        <circle cx="70" cy="70" r="60" fill="url(#moon-tex)" />
      </g>
      <circle cx="70" cy="70" r="60" fill="none" stroke={lit} strokeOpacity="0.25" strokeWidth="1" />
    </svg>
  )
}

/** "Energía de hoy": fase lunar en tiempo real + consejo del día. */
export function DailyAdvice() {
  const advice = getDailyAdvice()
  const moon = getMoonPhase()
  const store = getBranch(moon.store)

  return (
    <section className="relative py-24">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Energía de hoy"
          title="La luna marca el momento"
          highlight={['luna']}
          description="Cada fase favorece un tipo de trabajo. Te contamos qué hacer hoy según la luna y el consejo del día."
        />

        <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
          {/* Fase lunar */}
          <Reveal>
            <article className="relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-border bg-[oklch(0.16_0.04_285)] p-8 text-center text-white">
              <p className="flex items-center gap-2 text-sm text-white/70">
                <Moon className="size-4 text-[oklch(0.82_0.13_82)]" aria-hidden /> Fase lunar en Ibagué
              </p>
              <div className="relative my-8 grid place-items-center">
                <span aria-hidden className="absolute size-56 rounded-full bg-[oklch(0.9_0.08_85/0.18)] blur-3xl animate-pulse-glow" />
                <span aria-hidden className="absolute size-44 rounded-full bg-[oklch(0.95_0.05_85/0.12)] blur-xl" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative size-40"
                >
                  <MoonVisual fraction={moon.fraction} />
                </motion.div>
              </div>
              <h3 className="text-2xl">{moon.name}</h3>
              <p className="mt-1 text-sm text-white/70">
                <NumberTicker value={moon.illumination} suffix="%" className="font-semibold text-[oklch(0.82_0.13_82)]" />{' '}
                iluminada · día {Math.floor(moon.age) + 1} del ciclo
              </p>
              <p className="mt-2 text-sm text-white/80">{moon.energy}</p>
              <p className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed">
                {moon.advice}
              </p>
              <Link
                to={`${ROUTES.products}?cat=${moon.category}&sede=${moon.store}`}
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'group mt-5 gap-2 border-white/20 text-white hover:bg-white/10')}
              >
                Ver productos de {store?.name}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          </Reveal>

          {/* Consejo del día */}
          <Reveal delay={0.1}>
            <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-8">
              <p className="flex items-center gap-2 text-sm text-gold">
                <Quote className="size-4" aria-hidden /> Consejo del día
              </p>
              <p className="mt-4 text-xl leading-snug sm:text-2xl">{advice.message}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-surface-secondary p-4">
                  <Flame className="mb-2 size-5 text-gold" aria-hidden />
                  <p className="text-xs text-muted">Ritual</p>
                  <p className="mt-1 text-sm">{advice.ritual}</p>
                </div>
                <div className="rounded-xl bg-surface-secondary p-4">
                  <Gem className="mb-2 size-5 text-gold" aria-hidden />
                  <p className="text-xs text-muted">Aliado</p>
                  <p className="mt-1 font-medium">{advice.crystal}</p>
                </div>
                <div className="rounded-xl bg-surface-secondary p-4">
                  <span className="mb-2 block size-5 rounded-full ring-2 ring-border" style={{ background: advice.color.value }} aria-hidden />
                  <p className="text-xs text-muted">Color del día</p>
                  <p className="mt-1 font-medium">{advice.color.name}</p>
                </div>
              </div>
              <p className="mt-auto border-t border-separator pt-6 text-center italic text-muted">“{advice.affirmation}”</p>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

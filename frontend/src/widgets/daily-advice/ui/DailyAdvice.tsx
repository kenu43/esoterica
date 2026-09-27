import { buttonVariants } from '@heroui/react'
import { ArrowRight, Flame, Gem, Moon, Quote } from 'lucide-react'
import { motion } from 'motion/react'
import { Link } from 'react-router'
import { getDailyAdvice } from '@/entities/advice'
import { getBranch } from '@/entities/branch'
import { getMoonPhase, MoonVisual } from '@/entities/moon'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Container, NumberTicker, Reveal, SectionHeading } from '@/shared/ui'

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
                <span aria-hidden className="absolute size-72 rounded-full bg-[oklch(0.9_0.08_85/0.18)] blur-3xl animate-pulse-glow" />
                <span aria-hidden className="absolute size-56 rounded-full bg-[oklch(0.95_0.05_85/0.12)] blur-xl" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative size-48"
                >
                  <MoonVisual fraction={moon.fraction} className="size-full drop-shadow-[0_0_24px_oklch(0.95_0.05_85/0.35)]" />
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
            <article className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-border bg-surface p-8">
              <div>
                <p className="flex items-center gap-2 text-sm text-gold">
                  <Quote className="size-4" aria-hidden /> Consejo del día
                </p>
                <p className="mt-5 text-2xl leading-snug sm:text-3xl">{advice.message}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-surface-secondary p-5">
                  <Flame className="mb-3 size-6 text-gold" aria-hidden />
                  <p className="text-xs text-muted">Ritual</p>
                  <p className="mt-1 text-sm leading-relaxed">{advice.ritual}</p>
                </div>
                <div className="rounded-xl bg-surface-secondary p-5">
                  <Gem className="mb-3 size-6 text-gold" aria-hidden />
                  <p className="text-xs text-muted">Aliado</p>
                  <p className="mt-1 font-medium">{advice.crystal}</p>
                </div>
                <div className="rounded-xl bg-surface-secondary p-5">
                  <span className="mb-3 block size-6 rounded-full ring-2 ring-border" style={{ background: advice.color.value }} aria-hidden />
                  <p className="text-xs text-muted">Color del día</p>
                  <p className="mt-1 font-medium">{advice.color.name}</p>
                </div>
              </div>

              <p className="border-t border-separator pt-6 text-center text-lg italic text-muted">“{advice.affirmation}”</p>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

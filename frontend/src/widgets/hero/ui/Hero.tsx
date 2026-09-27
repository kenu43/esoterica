import { buttonVariants } from '@heroui/react'
import { ArrowRight, MapPin, Truck } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Link } from 'react-router'
import { getDailyCard, MAJOR_ARCANA } from '@/entities/tarot-card'
import { ZODIAC } from '@/entities/zodiac'
import { ROUTES, SITE } from '@/shared/config'
import { cn } from '@/shared/lib'
import { AuroraBackground, BlurText, Container, LotusIcon, SakuraBranch, StarField } from '@/shared/ui'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yDeck = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120])
  const yText = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const { card: daily } = getDailyCard()
  const deck = [MAJOR_ARCANA[13], MAJOR_ARCANA[17], daily, MAJOR_ARCANA[19], MAJOR_ARCANA[10]].filter(
    (c, i, arr) => arr.findIndex((x) => x.id === c.id) === i,
  )
  const years = new Date().getFullYear() - SITE.foundedYear

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28">
      <div aria-hidden className="absolute inset-0 -z-10" style={{ background: 'var(--hero-gradient)' }} />
      <AuroraBackground className="-z-10 opacity-70" />
      <StarField className="-z-10" />
      <SakuraBranch className="absolute -left-10 top-20 -z-10 hidden w-72 text-foreground/60 opacity-60 md:block" />
      <SakuraBranch flip className="absolute -right-8 bottom-10 -z-10 hidden w-80 text-foreground/60 opacity-50 lg:block" />

      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
        <motion.div style={{ y: yText, opacity }} className="flex flex-col items-start gap-7">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-surface/60 px-4 py-1.5 text-sm backdrop-blur"
          >
            <LotusIcon className="size-5 text-gold" />
            {years} años de tradición familiar en Ibagué
          </motion.p>

          <BlurText
            as="h1"
            animateOnMount
            delay={0.2}
            text="Protección, suerte y fe para tu camino"
            highlight={['suerte']}
            className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="max-w-xl text-lg leading-relaxed text-muted"
          >
            Productos esotéricos de alta calidad, seleccionados e importados con el cuidado de siempre:
            figuras, velones, baños, riegos, amuletos y tarot, con envíos a toda Colombia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            <Link to={ROUTES.products} className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'group gap-2')}>
              Ver el catálogo
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to={ROUTES.stores} className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'gap-2')}>
              <MapPin className="size-4" /> Cómo llegar
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-2 flex w-full max-w-lg flex-col gap-4 border-t border-separator pt-6"
          >
            <dl className="grid grid-cols-2 items-start gap-6">
              {[
                [String(SITE.foundedYear), 'Desde'],
                ['24 h', 'Respuesta por WhatsApp'],
              ].map(([n, l]) => (
                <div key={l} className="flex flex-col gap-1">
                  <dd className="order-first font-display text-2xl leading-none text-gold sm:text-3xl">{n}</dd>
                  <dt className="text-sm text-muted">{l}</dt>
                </div>
              ))}
            </dl>
            <p className="flex items-center gap-2 text-sm text-muted">
              <Truck className="size-4 text-gold" aria-hidden /> Envíos a toda Colombia
            </p>
          </motion.div>
        </motion.div>

        {/* Baraja: al pasar el cursor, cada carta sube suavemente como si la sacaras del mazo */}
        <motion.div style={{ y: yDeck }} className="relative mx-auto aspect-square w-full max-w-[540px]">
          <div aria-hidden className="absolute inset-[4%] rounded-full border border-gold/20 animate-spin-slow">
            {ZODIAC.map((z, i) => {
              const a = (i * 30 * Math.PI) / 180
              return (
                <span
                  key={z.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 text-lg text-gold/60"
                  style={{ left: `${50 + 50 * Math.sin(a)}%`, top: `${50 - 50 * Math.cos(a)}%` }}
                >
                  {z.symbol}
                </span>
              )
            })}
          </div>
          <div aria-hidden className="absolute inset-[28%] rounded-full bg-mystic/25 blur-3xl animate-pulse-glow" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-[58%] w-[32%]">
              {deck.map((card, i) => {
                const offset = i - (deck.length - 1) / 2
                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="pointer-events-none absolute inset-0"
                    style={{ zIndex: i }}
                  >
                    {/* El contenedor exterior (con la rotación) nunca se mueve: así el cursor no "salta" entre cartas */}
                    <div
                      className="group pointer-events-auto size-full origin-bottom"
                      style={{ transform: `translateX(${offset * 42}%) rotate(${offset * 9}deg)` }}
                    >
                      <div className="size-full overflow-hidden rounded-xl bg-[#f3ead3] shadow-2xl shadow-black/40 ring-1 ring-black/10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform [backface-visibility:hidden] group-hover:-translate-y-8">
                        <img src={card.image} alt={card.name} width={360} height={620} className="size-full object-cover" draggable={false} />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

import { useGSAP } from '@gsap/react'
import { buttonVariants, Chip } from '@heroui/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Droplets, Flame, Mountain, Wind } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { useProducts } from '@/entities/product'
import { getCurrentSignIndex, ZODIAC } from '@/entities/zodiac'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Container, SectionHeading } from '@/shared/ui'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const ELEMENT_STYLE = {
  fuego: { label: 'Fuego', icon: Flame, className: 'text-rose' },
  agua: { label: 'Agua', icon: Droplets, className: 'text-mystic' },
  aire: { label: 'Aire', icon: Wind, className: 'text-gold' },
  tierra: { label: 'Tierra', icon: Mountain, className: 'text-sage' },
} as const

/**
 * Rueda zodiacal animada con GSAP ScrollTrigger: gira mientras el usuario
 * hace scroll y cada signo recomienda un cristal y un producto del catálogo.
 */
export function ZodiacWheel() {
  const scope = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState(getCurrentSignIndex)
  const sign = ZODIAC[selected]
  const { data: products = [] } = useProducts()
  const product = products.find((p) => p.slug === sign.productSlug)
  const element = ELEMENT_STYLE[sign.element]

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to('.zodiac-ring', {
          rotate: 180,
          ease: 'none',
          scrollTrigger: { trigger: scope.current, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
        })
        gsap.to('.zodiac-ring-inner', {
          rotate: -120,
          ease: 'none',
          scrollTrigger: { trigger: scope.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        })
        gsap.to('.zodiac-glyph > span', {
          rotate: -180,
          ease: 'none',
          scrollTrigger: { trigger: scope.current, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
        })
        gsap.from('.zodiac-glyph > span', {
          scale: 0,
          opacity: 0,
          stagger: 0.05,
          duration: 0.6,
          ease: 'back.out(2)',
          scrollTrigger: { trigger: scope.current, start: 'top 75%' },
        })
      })
    },
    { scope },
  )

  return (
    <section ref={scope} className="relative overflow-hidden py-24">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          <div aria-hidden className="absolute inset-[20%] rounded-full bg-mystic/25 blur-3xl" />

          <div className="zodiac-ring absolute inset-0 rounded-full border border-gold/30">
            <svg viewBox="0 0 400 400" className="absolute inset-0 size-full text-gold/40" aria-hidden>
              <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="0.6" />
              {Array.from({ length: 72 }, (_, i) => (
                <line
                  key={i}
                  x1="200"
                  y1="6"
                  x2="200"
                  y2={i % 6 === 0 ? 24 : 14}
                  stroke="currentColor"
                  strokeWidth={i % 6 === 0 ? 1.2 : 0.6}
                  transform={`rotate(${i * 5} 200 200)`}
                />
              ))}
              {Array.from({ length: 12 }, (_, i) => (
                <line
                  key={`d${i}`}
                  x1="200"
                  y1="50"
                  x2="200"
                  y2="120"
                  stroke="currentColor"
                  strokeWidth="0.6"
                  transform={`rotate(${i * 30 + 15} 200 200)`}
                />
              ))}
            </svg>

            {ZODIAC.map((z, i) => {
              const angle = i * 30
              const active = i === selected
              return (
                <button
                  key={z.id}
                  type="button"
                  onClick={() => setSelected(i)}
                  aria-pressed={active}
                  aria-label={`${z.name}, ${z.dates}`}
                  className="zodiac-glyph group/glyph absolute -ml-5 -mt-5 size-10 outline-none sm:-ml-6 sm:-mt-6 sm:size-12"
                  style={{
                    left: `${50 + 40 * Math.sin((angle * Math.PI) / 180)}%`,
                    top: `${50 - 40 * Math.cos((angle * Math.PI) / 180)}%`,
                  }}
                >
                  {/* Este span se contrarrota junto con su contenido: el nombre queda anidado
                      dentro para heredar la misma corrección y no desplazarse hacia un lado. */}
                  <span className="relative grid size-full place-items-center">
                    <span
                      className={cn(
                        'grid size-full place-items-center rounded-full border text-lg transition-[scale,background-color,border-color,color,box-shadow] duration-300 sm:text-xl',
                        active
                          ? 'scale-125 border-gold bg-gold text-[oklch(0.18_0.04_290)] shadow-[0_0_24px_var(--gold-soft)]'
                          : 'border-border bg-surface/90 text-foreground backdrop-blur group-hover/glyph:border-gold group-hover/glyph:text-gold',
                      )}
                    >
                      {z.symbol}
                    </span>
                    <span
                      className={cn(
                        'absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium transition-colors duration-300 sm:text-xs',
                        active ? 'text-gold' : 'text-muted',
                      )}
                    >
                      {z.name}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          <div aria-hidden className="zodiac-ring-inner absolute inset-[26%] rounded-full border border-dashed border-mystic/40" />

          <div className="absolute inset-[30%] grid place-items-center rounded-full border border-gold/30 bg-surface/70 text-center backdrop-blur-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={sign.id}
                initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.7, rotate: 20 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              >
                <span className="block text-5xl text-gold sm:text-6xl">{sign.symbol}</span>
                <span className="mt-1 block font-display text-lg sm:text-xl">{sign.name}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            align="left"
            eyebrow="Tu signo"
            title="Energía escrita en las estrellas"
            highlight={['estrellas']}
            description="Toca tu signo en la rueda y descubre su elemento, su piedra afín y el producto que más le conviene."
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={sign.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass space-y-5 rounded-3xl p-6"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Chip variant="secondary">{sign.dates}</Chip>
                <Chip variant="secondary">
                  <element.icon className={cn('inline size-3.5', element.className)} aria-hidden /> {element.label}
                </Chip>
                <Chip variant="secondary">Regente: {sign.ruler}</Chip>
              </div>
              <p className="text-lg">{sign.trait}</p>
              <p className="text-sm text-muted">
                Piedra afín: <span className="font-semibold text-gold">{sign.crystal}</span>
              </p>
              {product && (
                <Link
                  to={ROUTES.product(product.slug)}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-3 transition-colors hover:border-gold/50"
                >
                  <img src={product.image} alt="" className="size-16 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="text-xs text-muted">Recomendado para {sign.name}</p>
                    <p className="font-semibold">{product.name}</p>
                  </div>
                  <span className={cn(buttonVariants({ variant: 'ghost', isIconOnly: true }))}>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}

import { buttonVariants } from '@heroui/react'
import { ArrowRight, Wand2 } from 'lucide-react'
import { Link } from 'react-router'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { BlurText, Container, Meteors, Reveal, SakuraBranch } from '@/shared/ui'

export function CustomOrderCta() {
  return (
    <section className="py-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-[oklch(0.25_0.1_295)] via-[oklch(0.18_0.06_290)] to-[oklch(0.14_0.04_280)] px-6 py-16 text-center text-white sm:px-16 sm:py-24">
          <Meteors number={10} />
          <SakuraBranch className="absolute -left-6 -top-4 -z-10 w-64 text-white/40 opacity-60" />
          <div aria-hidden className="absolute -top-24 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-[oklch(0.82_0.13_82/0.25)] blur-3xl" />
          
          <Reveal>
            <Wand2 className="mx-auto mb-6 size-10 text-[oklch(0.82_0.13_82)]" aria-hidden />
          </Reveal>
          <BlurText
            text="¿No encuentras lo que buscas?"
            highlight={['buscas?']}
            className="mx-auto max-w-3xl text-3xl sm:text-5xl"
          />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/75">
              Una figura en otro tamaño, el tarot de la Santa Muerte, un velón preparado para tu caso o un
              kit a tu medida. Haz tu encargo y te enviamos la cotización por WhatsApp.
            </p>
            <Link
              to={ROUTES.customOrder}
              className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'group mt-8 gap-2 bg-[oklch(0.82_0.13_82)] text-[oklch(0.18_0.04_290)]')}
            >
              Hacer un encargo
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

import { buttonVariants } from '@heroui/react'
import { motion } from 'motion/react'
import { Link } from 'react-router'
import { TarotCardBack } from '@/entities/tarot-card'
import { ROUTES } from '@/shared/config'
import { useSeo } from '@/shared/hooks'
import { Container, StarField } from '@/shared/ui'

export function NotFoundPage() {
  useSeo({ title: 'Página no encontrada' })
  return (
    <section className="relative isolate grid min-h-[100svh] place-items-center overflow-hidden pt-24">
      <StarField className="-z-10" />
      <Container className="flex flex-col items-center gap-8 text-center">
        <motion.div
          initial={{ rotate: -8, y: 30, opacity: 0 }}
          animate={{ rotate: [-8, 8, -8], y: 0, opacity: 1 }}
          transition={{ rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' }, default: { duration: 0.8 } }}
          className="aspect-[7/12] w-40 rounded-2xl shadow-2xl shadow-mystic/40"
        >
          <TarotCardBack />
        </motion.div>
        <p className="font-display text-7xl text-gradient-mystic">404</p>
        <h1 className="text-2xl sm:text-3xl">Las cartas no encontraron este camino</h1>
        <p className="max-w-md text-muted">
          La página que buscas se desvaneció entre la niebla. Volvamos a un lugar con buena energía.
        </p>
        <Link to={ROUTES.home} className={buttonVariants({ variant: 'primary', size: 'lg' })}>
          Volver al inicio
        </Link>
      </Container>
    </section>
  )
}

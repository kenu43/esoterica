import { buttonVariants } from '@heroui/react'
import { ArrowRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Link } from 'react-router'
import { AddToInquiryButton } from '@/features/whatsapp-inquiry'
import { ProductCard, ProductCardSkeleton, useFeaturedProducts, useNewArrivals } from '@/entities/product'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Container, SectionHeading } from '@/shared/ui'

const TABS = [
  { id: 'new', label: 'Novedades' },
  { id: 'featured', label: 'Los más pedidos' },
] as const

type TabId = (typeof TABS)[number]['id']

export function ProductShowcase() {
  const [tab, setTab] = useState<TabId>('new')
  const newArrivals = useNewArrivals()
  const featured = useFeaturedProducts()
  const query = tab === 'new' ? newArrivals : featured

  return (
    <section className="relative py-24">
            <Container className="space-y-12">
        <div className="flex flex-col items-center gap-8">
          <SectionHeading
            eyebrow="Vitrina"
            title="Lo nuevo y lo más pedido"
            highlight={['pedido']}
            description="Agrega lo que te interese a tu lista y te confirmamos disponibilidad y precio final por WhatsApp."
          />
          <div role="tablist" aria-label="Colecciones" className="glass relative flex rounded-full p-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  'relative rounded-full px-6 py-2.5 text-sm font-semibold transition-colors',
                  tab === t.id ? 'text-accent-foreground' : 'text-muted hover:text-foreground',
                )}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="showcase-tab"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {query.isPending
            ? Array.from({ length: 8 }, (_, i) => <ProductCardSkeleton key={i} />)
            : (
              <AnimatePresence mode="popLayout">
                {query.data?.map((p, i) => (
                  <ProductCard key={`${tab}-${p.id}`} product={p} index={i} action={<AddToInquiryButton product={p} />} />
                ))}
              </AnimatePresence>
            )}
        </div>

        <div className="flex justify-center">
          <Link to={ROUTES.products} className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'group gap-2')}>
            Ver todo el catálogo
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  )
}

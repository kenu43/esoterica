import { Button } from '@heroui/react'
import { SearchX } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { ProductCard, ProductCardSkeleton, useProducts } from '@/entities/product'
import { ProductFilters, useProductFilters } from '@/features/product-filters'
import { AddToInquiryButton } from '@/features/whatsapp-inquiry'
import { useSeo } from '@/shared/hooks'
import { Container } from '@/shared/ui'
import { CustomOrderCta } from '@/widgets/custom-order-cta'
import { PageHeader } from '@/widgets/page-header'

export function ProductsPage() {
  useSeo({
    title: 'Productos esotéricos: Santa Muerte, velones, baños y amuletos',
    description: 'Catálogo de figuras de santos, Santa Muerte, velones, baños de despojo, riegos, sahumerios, amuletos y artículos de la suerte. Precios en COP y envíos a toda Colombia.',
  })
  const { filter, reset } = useProductFilters()
  const { data = [], isPending, isFetching } = useProducts(filter)

  return (
    <>
      <PageHeader
        eyebrow="Catálogo"
        title="Catálogo de las tres tiendas"
        highlight={['tres']}
        description="Precios de referencia en pesos colombianos. Arma tu lista y te confirmamos disponibilidad, precio final y envío por WhatsApp."
      />

      <Container className="space-y-8">
        <div className="glass sticky top-20 z-30 -mx-2 rounded-2xl p-4 sm:mx-0 sm:p-5">
          <ProductFilters />
        </div>

        <p className="text-sm text-muted" aria-live="polite">
          {isPending ? 'Cargando productos…' : `${data.length} producto${data.length === 1 ? '' : 's'} encontrado${data.length === 1 ? '' : 's'}`}
        </p>

        {isPending ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : data.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center"
          >
            <SearchX className="size-12 text-muted" aria-hidden />
            <p className="font-display text-xl">No encontramos coincidencias</p>
            <p className="max-w-md text-muted">
              Prueba con otra palabra o categoría. Si no está, lo conseguimos por encargo.
            </p>
            <Button variant="secondary" onPress={reset}>
              Limpiar filtros
            </Button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 gap-3 transition-opacity sm:gap-5 lg:grid-cols-3 xl:grid-cols-4"
            style={{ opacity: isFetching ? 0.7 : 1 }}
          >
            <AnimatePresence mode="popLayout">
              {data.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} action={<AddToInquiryButton product={p} />} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </Container>

      <CustomOrderCta />
    </>
  )
}

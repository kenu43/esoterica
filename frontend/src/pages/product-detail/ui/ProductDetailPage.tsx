import { Breadcrumbs, Button, Chip, Skeleton } from '@heroui/react'
import { Check, Clock, MapPin, MessageCircle, Truck } from 'lucide-react'
import { motion } from 'motion/react'
import { Link, useParams } from 'react-router'
import { getBranch } from '@/entities/branch'
import { getCategory } from '@/entities/category'
import { ProductBadges, ProductCard, useProduct, useProducts } from '@/entities/product'
import { AddToInquiryButton, buildSingleProductMessage } from '@/features/whatsapp-inquiry'
import { ROUTES, SITE } from '@/shared/config'
import { useSeo } from '@/shared/hooks'
import { buildWhatsAppUrl, formatPrice } from '@/shared/lib'
import { Container, Reveal, SectionHeading } from '@/shared/ui'
import { NotFoundPage } from '@/pages/not-found'

export function ProductDetailPage() {
  const { slug = '' } = useParams()
  const { data: product, isPending } = useProduct(slug)
  const { data: related = [] } = useProducts({ category: product?.category })

  useSeo({
    title: product ? `${product.name} en Ibagué` : undefined,
    description: product ? `${product.shortDescription} ${formatPrice(product.price)}. Envíos a toda Colombia.` : undefined,
    image: product?.image,
    jsonLd: product
      ? {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description,
          image: product.image.startsWith('http') ? product.image : `${SITE.url}${product.image}`,
          category: getCategory(product.category).name,
          brand: { '@type': 'Brand', name: SITE.name },
          offers: {
            '@type': 'Offer',
            priceCurrency: 'COP',
            price: product.price,
            availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            url: `${SITE.url}${ROUTES.product(product.slug)}`,
          },
        }
      : undefined,
  })

  if (isPending) {
    return (
      <Container className="grid gap-10 pt-36 lg:grid-cols-2">
        <Skeleton className="aspect-square rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-2/3 rounded-xl" />
          <Skeleton className="h-6 w-1/3 rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </Container>
    )
  }

  if (!product) return <NotFoundPage />

  const category = getCategory(product.category)
  const branches = product.branches.map(getBranch).filter((b) => !!b)
  const main = branches[0]
  const whatsappUrl = buildWhatsAppUrl(main?.whatsapp ?? SITE.whatsapp, buildSingleProductMessage(product))
  const discount = product.compareAtPrice ? Math.round((1 - product.price / product.compareAtPrice) * 100) : 0

  return (
    <>
      <Container className="pt-32 sm:pt-36">
        <Breadcrumbs className="mb-8">
          <Breadcrumbs.Item href={ROUTES.home}>Inicio</Breadcrumbs.Item>
          <Breadcrumbs.Item href={ROUTES.products}>Productos</Breadcrumbs.Item>
          <Breadcrumbs.Item href={`${ROUTES.products}?cat=${category.id}`}>{category.name}</Breadcrumbs.Item>
          <Breadcrumbs.Item>{product.name}</Breadcrumbs.Item>
        </Breadcrumbs>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl border border-border bg-surface-secondary lg:sticky lg:top-28 lg:self-start"
          >
            <img src={product.image} alt={product.name} width={800} height={800} className="aspect-square w-full object-cover" />
            <ProductBadges badges={product.badges} discount={discount} className="absolute left-4 top-4 right-4" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="space-y-3">
              <Link to={`${ROUTES.products}?cat=${category.id}`} className="inline-flex items-center gap-2 text-sm text-gold hover:underline">
                <category.icon className="size-4" aria-hidden /> {category.name}
              </Link>
              <h1 className="text-3xl sm:text-4xl">{product.name}</h1>
              <p className="text-lg text-muted">{product.shortDescription}</p>
            </div>

            <div className="flex flex-wrap items-end gap-3">
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="pb-1 text-lg text-muted line-through">{formatPrice(product.compareAtPrice)}</span>
              )}
              <span className="pb-1.5 text-sm text-muted">{product.unit}</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <AddToInquiryButton product={product} variant="full" />
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                onPress={() => window.open(whatsappUrl, '_blank', 'noopener,noreferrer')}
              >
                <MessageCircle className="size-4" /> Preguntar ahora
              </Button>
            </div>

            <ul className="grid gap-2 rounded-xl border border-border bg-surface p-4 text-sm sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <Truck className="size-4 text-gold" aria-hidden /> Envíos a toda Colombia
              </li>
              <li className="flex items-center gap-2">
                <Clock className="size-4 text-gold" aria-hidden /> Respuesta el mismo día
              </li>
            </ul>

            <p className="leading-relaxed">{product.description}</p>

            {product.benefits.length > 0 && (
              <ul className="grid gap-2 sm:grid-cols-2">
                {product.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gold-soft text-gold">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            )}

            {branches.length > 0 && (
              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="mb-3 flex items-center gap-2 text-sm font-medium">
                  <MapPin className="size-4 text-gold" aria-hidden /> Disponible en
                </p>
                <ul className="space-y-2 text-sm">
                  {branches.map((b) => (
                    <li key={b.id} className="flex flex-wrap items-center justify-between gap-2">
                      <span>
                        <span className="font-medium">{b.name}</span>
                        <span className="text-muted"> · {b.address}</span>
                      </span>
                      <a href={b.mapsUrl} target="_blank" rel="noreferrer" className="text-gold hover:underline">
                        Cómo llegar
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {product.tags.map((t) => (
                  <Link key={t} to={`${ROUTES.products}?q=${encodeURIComponent(t)}`}>
                    <Chip size="sm" variant="secondary">
                      {t}
                    </Chip>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </Container>

      {related.length > 1 && (
        <section className="py-24">
          <Container className="space-y-10">
            <SectionHeading title="También te puede servir" highlight={['servir']} />
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {related
                .filter((p) => p.id !== product.id)
                .slice(0, 4)
                .map((p, i) => (
                  <Reveal key={p.id} delay={i * 0.05}>
                    <ProductCard product={p} action={<AddToInquiryButton product={p} />} />
                  </Reveal>
                ))}
            </div>
          </Container>
        </section>
      )}
    </>
  )
}

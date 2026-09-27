import { Breadcrumbs, Button, Chip, Skeleton } from '@heroui/react'
import { Check, ChevronLeft, ChevronRight, Clock, MapPin, MessageCircle, Moon, ScrollText, Truck } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { getBranch } from '@/entities/branch'
import { useCategory } from '@/entities/category'
import {
  moonPhaseLabel,
  ProductBadges,
  ProductCard,
  resolveColor,
  useTaxonomyLabels,
  useProduct,
  useProducts,
} from '@/entities/product'
import { AddToInquiryButton, buildSingleProductMessage } from '@/features/whatsapp-inquiry'
import { ROUTES, SITE } from '@/shared/config'
import { useSeo } from '@/shared/hooks'
import { buildWhatsAppUrl, cn, formatPrice } from '@/shared/lib'
import { Container, Reveal, SectionHeading } from '@/shared/ui'
import { NotFoundPage } from '@/pages/not-found'

export function ProductDetailPage() {
  const { slug = '' } = useParams()
  const { data: product, isPending } = useProduct(slug)
  const { data: related = [] } = useProducts({ category: product?.category })
  const category = useCategory(product?.category)
  const labels = useTaxonomyLabels()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [direction, setDirection] = useState(1)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)
  const [customText, setCustomText] = useState('')
  const [quantity, setQuantity] = useState(1)

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
          category: category.name,
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

  const branches = product.branches.map(getBranch).filter((b) => !!b)
  const main = branches[0]
  const sizePrice = product.sizes.find((s) => s.name === selectedSize)?.price
  const materialPrice = product.materials.find((m) => m.name === selectedMaterial)?.price
  const variantPrice = sizePrice ?? materialPrice
  const displayPrice = variantPrice ?? product.price
  const whatsappUrl = buildWhatsAppUrl(
    main?.whatsapp ?? SITE.whatsapp,
    buildSingleProductMessage(product, main, {
      color: selectedColor ?? undefined,
      size: selectedSize ?? undefined,
      material: selectedMaterial ?? undefined,
      customText: customText.trim() || undefined,
      price: variantPrice,
    }),
  )
  const hasDiscount = !variantPrice && !!product.compareAtPrice && product.compareAtPrice > product.price
  const discount = hasDiscount ? Math.round((1 - product.price / product.compareAtPrice!) * 100) : 0
  const photos = [product.image, ...product.gallery]
  const activePhoto = selectedImage && photos.includes(selectedImage) ? selectedImage : product.image
  const activeIndex = photos.indexOf(activePhoto)
  const goTo = (step: number) => {
    setDirection(step > 0 ? 1 : -1)
    setSelectedImage(photos[(activeIndex + step + photos.length) % photos.length])
  }

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
            className="space-y-3 lg:sticky lg:top-28 lg:self-start"
          >
            <div
              className="relative overflow-hidden rounded-2xl border border-border bg-surface-secondary"
              tabIndex={photos.length > 1 ? 0 : undefined}
              onKeyDown={(e) => {
                if (photos.length < 2) return
                if (e.key === 'ArrowLeft') goTo(-1)
                if (e.key === 'ArrowRight') goTo(1)
              }}
            >
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.img
                  key={activePhoto}
                  src={activePhoto}
                  alt={product.name}
                  width={800}
                  height={800}
                  custom={direction}
                  initial={{ x: `${direction * 60}%`, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: `${direction * -60}%`, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 aspect-square w-full touch-pan-y object-cover"
                  drag={photos.length > 1 ? 'x' : false}
                  dragElastic={0.2}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    // Deslizar con el dedo en celular: umbral de 60 px o un gesto rápido
                    if (info.offset.x < -60 || info.velocity.x < -400) goTo(1)
                    else if (info.offset.x > 60 || info.velocity.x > 400) goTo(-1)
                  }}
                />
              </AnimatePresence>
              <img src={activePhoto} alt="" aria-hidden className="invisible aspect-square w-full object-cover" />
              <ProductBadges badges={product.badges} discount={discount} className="absolute left-4 top-4 right-4" />
              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => goTo(-1)}
                    aria-label="Foto anterior"
                    className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(1)}
                    aria-label="Foto siguiente"
                    className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                  <span className="absolute bottom-3 right-3 rounded-full bg-black/55 px-2.5 py-1 text-xs text-white">
                    {activeIndex + 1} / {photos.length}
                  </span>
                </>
              )}
              {!product.inStock && (
                <span className="absolute inset-x-4 bottom-4 rounded-lg bg-black/75 py-2 text-center text-sm font-semibold text-white">
                  Agotado por ahora
                </span>
              )}
            </div>
            {photos.length > 1 && (
              <ul className="grid grid-cols-5 gap-2" aria-label="Más fotos">
                {photos.map((src, i) => (
                  <li key={src}>
                    <button
                      type="button"
                      onClick={() => setSelectedImage(src)}
                      aria-label={`Ver foto ${i + 1}`}
                      aria-pressed={src === activePhoto}
                      className={cn(
                        'block w-full overflow-hidden rounded-xl border-2 transition-colors',
                        src === activePhoto ? 'border-gold' : 'border-transparent hover:border-gold/40',
                      )}
                    >
                      <img src={src} alt="" loading="lazy" className="aspect-square w-full object-cover" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
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
              <span className="text-3xl font-bold">{formatPrice(displayPrice)}</span>
              {hasDiscount && (
                <span className="pb-1 text-lg text-muted line-through">{formatPrice(product.compareAtPrice!)}</span>
              )}
              <span className="pb-1.5 text-sm text-muted">{product.unit}</span>
            </div>

            {product.sizes.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-medium">
                  Tamaño{selectedSize ? `: ${selectedSize}` : ' (opcional)'}
                </p>
                <div role="radiogroup" aria-label="Tamaño" className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => {
                    const active = selectedSize === s.name
                    return (
                      <button
                        key={s.name}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setSelectedSize(active ? null : s.name)}
                        className={cn(
                          'flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors',
                          active ? 'border-gold bg-gold-soft shadow-[0_0_0_1px_var(--gold)]' : 'border-border bg-surface hover:border-gold/40',
                        )}
                      >
                        {s.name}
                        {s.price != null && <span className="text-xs text-muted">{formatPrice(s.price)}</span>}
                        {active && <Check className="size-3.5 text-gold" strokeWidth={3} aria-hidden />}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {product.materials.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-medium">
                  Material{selectedMaterial ? `: ${selectedMaterial}` : ' (opcional)'}
                </p>
                <div role="radiogroup" aria-label="Material" className="flex flex-wrap gap-2">
                  {product.materials.map((m) => {
                    const active = selectedMaterial === m.name
                    return (
                      <button
                        key={m.name}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setSelectedMaterial(active ? null : m.name)}
                        className={cn(
                          'flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors',
                          active ? 'border-gold bg-gold-soft shadow-[0_0_0_1px_var(--gold)]' : 'border-border bg-surface hover:border-gold/40',
                        )}
                      >
                        {m.name}
                        {m.price != null && <span className="text-xs text-muted">{formatPrice(m.price)}</span>}
                        {active && <Check className="size-3.5 text-gold" strokeWidth={3} aria-hidden />}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {product.customizationLabel && (
              <label className="block space-y-2">
                <span className="text-sm font-medium">{product.customizationLabel}</span>
                <input
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  maxLength={60}
                  placeholder="Escribe aquí (opcional)"
                  className="h-10 w-full rounded-xl border border-field-border bg-field-background px-3 text-sm outline-none focus:border-gold"
                />
              </label>
            )}

            {product.colors.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-medium">
                  Color{selectedColor ? `: ${selectedColor}` : ' (opcional)'}
                </p>
                <div role="radiogroup" aria-label="Color" className="flex flex-wrap gap-2">
                  {product.colors.map((c) => {
                    const swatch = resolveColor(c.name, c.hex)
                    const active = selectedColor === c.name
                    return (
                      <button
                        key={c.name}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setSelectedColor(active ? null : c.name)}
                        className={cn(
                          'flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors',
                          active ? 'border-gold bg-gold-soft shadow-[0_0_0_1px_var(--gold)]' : 'border-border bg-surface hover:border-gold/40',
                        )}
                      >
                        {swatch && <span className="size-4 rounded-full ring-1 ring-border" style={{ background: swatch }} aria-hidden />}
                        {c.name}
                        {active && <Check className="size-3.5 text-gold" strokeWidth={3} aria-hidden />}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Cantidad</span>
              <div className="flex items-center rounded-full border border-border">
                <button
                  type="button"
                  aria-label="Quitar una unidad"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="grid size-9 place-items-center text-lg text-muted transition-colors hover:text-foreground"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-semibold tabular-nums">{quantity}</span>
                <button
                  type="button"
                  aria-label="Agregar una unidad"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="grid size-9 place-items-center text-lg text-muted transition-colors hover:text-foreground"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <AddToInquiryButton
                product={product}
                variant="full"
                color={selectedColor ?? undefined}
                size={selectedSize ?? undefined}
                material={selectedMaterial ?? undefined}
                customText={customText.trim() || undefined}
                quantity={quantity}
              />
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                onPress={() => window.open(whatsappUrl, '_blank', 'noopener,noreferrer')}
              >
                <MessageCircle className="size-4" /> {product.inStock ? 'Preguntar ahora' : 'Preguntar cuándo llega'}
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

            {(product.intentions.length > 0 || product.season || product.moonPhase) && (
              <div className="flex flex-wrap items-center gap-2">
                {product.intentions.map((v) => (
                  <Chip key={v} size="sm" variant="soft" color="accent">
                    {labels.intention(v)}
                  </Chip>
                ))}
                {product.season && (
                  <Chip size="sm" variant="secondary">
                    Temporada: {labels.season(product.season)}
                  </Chip>
                )}
                {product.moonPhase && (
                  <Chip size="sm" variant="secondary">
                    <Moon className="size-3" aria-hidden /> {moonPhaseLabel(product.moonPhase)}
                  </Chip>
                )}
              </div>
            )}

            {product.usageGuide && (
              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <ScrollText className="size-4 text-gold" aria-hidden /> Cómo se usa
                </p>
                <p className="whitespace-pre-line text-sm leading-relaxed text-muted">{product.usageGuide}</p>
              </div>
            )}

            {product.benefits.length > 0 && (
              <ul className="grid gap-2 sm:grid-cols-2">
                {product.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-sm leading-5">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-gold-soft text-gold">
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

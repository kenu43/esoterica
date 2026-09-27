import { MapPin } from 'lucide-react'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { getBranch } from '@/entities/branch'
import { useCategory } from '@/entities/category'
import { ROUTES } from '@/shared/config'
import { formatPrice } from '@/shared/lib'
import { useTaxonomyLabels } from '../model/taxonomy-queries'
import type { Product } from '../model/types'
import { ProductBadges } from './ProductBadges'

interface ProductCardProps {
  product: Product
  /** Slot de acciones (p. ej. "Agregar a mi consulta") inyectado desde features. */
  action?: ReactNode
  index?: number
}

export function ProductCard({ product, action, index = 0 }: ProductCardProps) {
  const category = useCategory(product.category)
  const labels = useTaxonomyLabels()
  const store = product.branches[0] ? getBranch(product.branches[0]) : undefined
  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0
  const minOf = (list: { price?: number }[]) =>
    list.reduce<number | null>((min, v) => (v.price != null && (min === null || v.price < min) ? v.price : min), null)
  const variantPrices = [minOf(product.sizes), minOf(product.materials)].filter((v): v is number => v != null)
  const minVariantPrice = variantPrices.length ? Math.min(...variantPrices) : null

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, delay: Math.min(index, 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl hover:shadow-mystic/10"
    >
      <Link
        to={ROUTES.product(product.slug)}
        className="relative block aspect-[4/5] overflow-hidden bg-surface-secondary"
        aria-label={`Ver ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          width={400}
          height={500}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <ProductBadges badges={product.badges} discount={discount} className="absolute left-3 top-3 right-3" />
        {product.season && (
          <span className="absolute bottom-3 left-3 rounded-md bg-white/90 px-2 py-1 text-xs font-semibold text-[oklch(0.3_0.1_300)] shadow">
            {labels.season(product.season)}
          </span>
        )}
        {!product.inStock && (
          <span className="absolute inset-x-3 bottom-3 rounded-md bg-black/75 py-1 text-center text-xs font-semibold text-white">
            Agotado por ahora
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="flex items-center gap-1.5 text-xs font-medium text-muted">
          <category.icon className="size-3.5 text-gold" aria-hidden />
          {category.name}
        </p>
        <Link to={ROUTES.product(product.slug)} className="outline-none">
          <h3 className="text-base font-medium leading-snug transition-colors group-hover:text-gold sm:text-lg">
            {product.name}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm text-muted">{product.shortDescription}</p>
        {store && (
          <p className="flex items-center gap-1 text-xs text-muted">
            <MapPin className="size-3" aria-hidden /> {store.name}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <div className="flex flex-col">
            {product.compareAtPrice && (
              <span className="text-xs text-muted line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
            <span className="text-xl font-bold tracking-tight">
              {minVariantPrice != null && minVariantPrice < product.price && 'Desde '}
              {formatPrice(minVariantPrice != null ? Math.min(minVariantPrice, product.price) : product.price)}
            </span>
            <span className="text-xs text-muted">{product.unit}</span>
          </div>
          {action}
        </div>
      </div>
    </motion.article>
  )
}

import { useCategory } from '@/entities/category'
import { cn } from '@/shared/lib'
import { LotusIcon } from '@/shared/ui/Florals'
import type { Product } from '../model/types'

interface ProductImageProps {
  product: Pick<Product, 'name' | 'image' | 'category'>
  className?: string
  alt?: string
  loading?: 'lazy' | 'eager'
  width?: number
  height?: number
}

/** Foto del producto; si aún no tiene, muestra un fondo con loto y el ícono de su categoría. */
export function ProductImage({ product, className, alt = '', loading = 'lazy', width, height }: ProductImageProps) {
  const category = useCategory(product.category)
  if (product.image) {
    return <img src={product.image} alt={alt} width={width} height={height} loading={loading} decoding="async" className={className} />
  }
  return (
    <div
      role="img"
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      className={cn(
        'relative isolate flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_30%_20%,oklch(0.42_0.1_300),oklch(0.22_0.07_295)_70%)] text-[oklch(0.85_0.1_85)]',
        className,
      )}
    >
      <LotusIcon className="absolute size-[70%] max-h-52 max-w-52 text-[oklch(0.85_0.1_85)] opacity-[0.12]" />
      <category.icon className="relative size-[28%] max-h-12 min-h-5 min-w-5 max-w-12 opacity-80" aria-hidden />
    </div>
  )
}

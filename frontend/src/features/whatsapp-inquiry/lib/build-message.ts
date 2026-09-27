import type { Branch } from '@/entities/branch'
import type { Product } from '@/entities/product'
import { buildFormMessage, formatPrice } from '@/shared/lib'

interface Line {
  product: Product
  quantity: number
  color?: string
  size?: string
  material?: string
  customText?: string
}

export const SHIPPING_OPTIONS = [
  { value: 'recoger', label: 'Recoger en tienda' },
  { value: 'domicilio', label: 'Domicilio en Ibagué' },
  { value: 'nacional', label: 'Envío nacional' },
] as const

export type ShippingId = (typeof SHIPPING_OPTIONS)[number]['value']

interface InquiryOptions {
  branch: Branch
  /** El cliente eligió "La que tenga disponibilidad". */
  anyBranch?: boolean
  shipping: ShippingId
  note?: string
}

/** Precio unitario real: el del tamaño o material elegido si tiene uno propio, si no el del producto. */
const unitPrice = (l: Line) =>
  l.product.sizes.find((s) => s.name === l.size)?.price ?? l.product.materials.find((m) => m.name === l.material)?.price ?? l.product.price

const variantParts = (l: Pick<Line, 'color' | 'size' | 'material' | 'customText'>) =>
  [
    l.color && `color ${l.color}`,
    l.size && `tamaño ${l.size}`,
    l.material && `material ${l.material}`,
    l.customText && `personalizado: "${l.customText}"`,
  ].filter(Boolean)

/** Mensaje de pedido para la lista de consulta. */
export function buildInquiryMessage(lines: Line[], { branch, anyBranch, shipping, note }: InquiryOptions) {
  const total = lines.reduce((acc, l) => acc + unitPrice(l) * l.quantity, 0)
  const variant = (l: Line) => {
    const parts = variantParts(l)
    return parts.length ? `, ${parts.join(', ')}` : ''
  }
  const items = lines
    .map((l) => `   • ${l.quantity} x ${l.product.name} (${l.product.unit})${variant(l)} — ${formatPrice(unitPrice(l) * l.quantity)}`)
    .join('\n')
  const shippingLabel = SHIPPING_OPTIONS.find((s) => s.value === shipping)?.label

  return buildFormMessage([
    { icon: '🛍️', label: 'Pedido', value: `\n${items}` },
    { icon: '💰', label: 'Total estimado', value: formatPrice(total) },
    { icon: '📍', label: 'Sede elegida', value: anyBranch ? 'La que tenga disponibilidad' : `${branch.name} (${branch.city})` },
    { icon: '🚚', label: 'Envío', value: shippingLabel },
    { icon: '📝', label: 'Nota', value: note },
  ])
}

interface SingleProductOptions {
  color?: string
  size?: string
  material?: string
  customText?: string
  /** Precio del tamaño o material elegido, si tiene uno propio. */
  price?: number
}

/** Mensaje rápido para consultar un solo producto. */
export function buildSingleProductMessage(product: Product, branch?: Branch, options: SingleProductOptions = {}) {
  const { color, size, material, customText, price } = options
  return buildFormMessage([
    { icon: '🛍️', label: 'Pedido', value: `${product.name} (${product.unit})` },
    { icon: '🎨', label: 'Color', value: color },
    { icon: '📏', label: 'Tamaño', value: size },
    { icon: '🧱', label: 'Material', value: material },
    { icon: '✏️', label: 'Personalización', value: customText },
    { icon: '💰', label: 'Precio', value: formatPrice(price ?? product.price) },
    { icon: '📍', label: 'Sede', value: branch ? `${branch.name} (${branch.city})` : undefined },
  ])
}

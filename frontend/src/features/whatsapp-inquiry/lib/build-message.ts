import type { Branch } from '@/entities/branch'
import type { Product } from '@/entities/product'
import { buildFormMessage, formatPrice } from '@/shared/lib'

interface Line {
  product: Product
  quantity: number
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

/** Mensaje de pedido para la lista de consulta. */
export function buildInquiryMessage(lines: Line[], { branch, anyBranch, shipping, note }: InquiryOptions) {
  const total = lines.reduce((acc, l) => acc + l.product.price * l.quantity, 0)
  const items = lines
    .map((l) => `   • ${l.quantity} x ${l.product.name} (${l.product.unit}) — ${formatPrice(l.product.price * l.quantity)}`)
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

/** Mensaje rápido para consultar un solo producto. */
export function buildSingleProductMessage(product: Product, branch?: Branch) {
  return buildFormMessage([
    { icon: '🛍️', label: 'Pedido', value: `${product.name} (${product.unit})` },
    { icon: '💰', label: 'Precio', value: formatPrice(product.price) },
    { icon: '📍', label: 'Sede', value: branch ? `${branch.name} (${branch.city})` : undefined },
  ])
}

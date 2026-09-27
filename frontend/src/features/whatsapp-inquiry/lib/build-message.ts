import type { Branch } from '@/entities/branch'
import type { Product } from '@/entities/product'
import { formatPrice } from '@/shared/lib'

interface Line {
  product: Product
  quantity: number
}

/** Genera el mensaje de WhatsApp con formato legible (negritas y viñetas). */
export function buildInquiryMessage(lines: Line[], branch: Branch, note?: string) {
  const total = lines.reduce((acc, l) => acc + l.product.price * l.quantity, 0)
  const body = lines
    .map((l) => `• ${l.quantity} x *${l.product.name}* (${l.product.unit}) — ${formatPrice(l.product.price * l.quantity)}`)
    .join('\n')

  return [
    `Hola, ${branch.name}. Vi estos productos en la página de Universo Esotérico:`,
    '',
    body,
    '',
    `*Total estimado:* ${formatPrice(total)}`,
    note ? `\nNota: ${note}` : '',
    '',
    '¿Me confirman disponibilidad y el costo del envío? Gracias.',
  ]
    .filter((line, i, arr) => !(line === '' && arr[i - 1] === ''))
    .join('\n')
}

/** Mensaje rápido para consultar un solo producto. */
export function buildSingleProductMessage(product: Product) {
  return `Hola, vi en la página *${product.name}* (${product.unit}) a ${formatPrice(product.price)}. ¿Lo tienen disponible?`
}

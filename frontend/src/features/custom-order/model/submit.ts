import { SITE } from '@/shared/config'
import { buildFormMessage, openWhatsApp } from '@/shared/lib'
import { BUDGETS, DELIVERY, STORE_OPTIONS, SUGGESTIONS, type CustomOrderValues } from './schema'

const labelOf = (list: readonly { value: string; label: string }[], value?: string) =>
  list.find((i) => i.value === value)?.label ?? value ?? ''

/** Abre WhatsApp (La Colonia) con el encargo ya escrito. */
export function submitCustomOrder(values: CustomOrderValues) {
  const store = labelOf(STORE_OPTIONS, values.store)
  const delivery = labelOf(DELIVERY, values.delivery)
  const message = buildFormMessage(
    [
      { icon: '🛍️', label: 'Encargo', value: values.request },
      { icon: '🔮', label: 'Tipo', value: values.suggestions.map((v) => labelOf(SUGGESTIONS, v)).join(', ') },
      { icon: '🔢', label: 'Cantidad', value: values.quantity },
      { icon: '📍', label: 'Sede elegida', value: values.store === 'cualquiera' ? store : `${store} (Ibagué)` },
      { icon: '💰', label: 'Presupuesto', value: labelOf(BUDGETS, values.budget) },
      { icon: '🚚', label: 'Envío', value: values.delivery === 'recoger' ? delivery : `${delivery} · ${values.address}` },
      { icon: '🏙️', label: 'Ciudad', value: values.city },
      { icon: '👤', label: 'Nombre', value: values.name },
      { icon: '📱', label: 'WhatsApp', value: values.phone },
      { icon: '📝', label: 'Notas', value: values.notes },
    ],
    '¡Hola! Vengo de la página web y quiero hacer un encargo.',
  )
  openWhatsApp(SITE.ordersWhatsapp, message)
}

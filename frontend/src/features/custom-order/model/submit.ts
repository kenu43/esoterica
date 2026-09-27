import { mailService } from '@/shared/api'
import { BUDGETS, DELIVERY, STORE_OPTIONS, SUGGESTIONS, type CustomOrderValues } from './schema'

const labelOf = (list: readonly { value: string; label: string }[], value?: string) =>
  list.find((i) => i.value === value)?.label ?? value ?? ''

/** Traduce el formulario al mensaje del backend (Cloud Function + Resend). */
export async function submitCustomOrder(values: CustomOrderValues) {
  await mailService.send({
    kind: 'encargo',
    subject: `Nuevo encargo de ${values.name} (${values.city})`,
    replyTo: values.email,
    fromName: values.name,
    website: values.website,
    fields: {
      'Tipo de encargo': values.suggestions.map((v) => labelOf(SUGGESTIONS, v)).join(', ') || 'Otro',
      'Qué necesita': values.request,
      Cantidad: values.quantity ?? '',
      'Tienda preferida': labelOf(STORE_OPTIONS, values.store),
      Presupuesto: labelOf(BUDGETS, values.budget),
      Nombre: values.name,
      'WhatsApp / teléfono': values.phone,
      Correo: values.email,
      Ciudad: values.city,
      Entrega: values.delivery === 'envio' ? `Envío a: ${values.address}` : labelOf(DELIVERY, values.delivery),
      Notas: values.notes ?? '',
    },
  })
}

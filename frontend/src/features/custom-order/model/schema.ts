import { BookOpen, Boxes, Church, Droplets, Flame, Shield, Sparkles, type LucideIcon } from 'lucide-react'
import { z } from 'zod'

/** Encargos sugeridos: lo que más piden los clientes y hay que conseguir o preparar. */
export const SUGGESTIONS: { value: string; label: string; icon: LucideIcon }[] = [
  { value: 'tarot-santa-muerte', label: 'Tarot de la Santa Muerte', icon: Sparkles },
  { value: 'figura-especial', label: 'Figura o santo en tamaño especial', icon: Church },
  { value: 'velon-preparado', label: 'Velón preparado para mi petición', icon: Flame },
  { value: 'kit-bano-riego', label: 'Kit de baño o riego personalizado', icon: Droplets },
  { value: 'amuleto-consagrado', label: 'Amuleto o resguardo consagrado', icon: Shield },
  { value: 'lectura-tarot', label: 'Lectura de tarot', icon: BookOpen },
  { value: 'por-mayor', label: 'Compra al por mayor', icon: Boxes },
]

export const STORE_OPTIONS = [
  { value: 'cualquiera', label: 'La que tenga disponibilidad' },
  { value: 'el-sortilegio', label: 'El Sortilegio' },
  { value: 'la-colonia', label: 'La Colonia' },
  { value: 'loto-nirvana', label: 'Loto & Nirvana' },
]

export const BUDGETS = [
  { value: 'sin-definir', label: 'Prefiero que me coticen' },
  { value: 'menos-50', label: 'Menos de $50.000' },
  { value: '50-150', label: '$50.000 – $150.000' },
  { value: '150-300', label: '$150.000 – $300.000' },
  { value: 'mas-300', label: 'Más de $300.000' },
]

export const DELIVERY = [
  { value: 'recoger', label: 'Recoger en la tienda (Ibagué)' },
  { value: 'envio', label: 'Envío a domicilio' },
]

const phoneRegex = /^[+\d\s()-]{7,20}$/

export const customOrderSchema = z
  .object({
    // Paso 1 · ¿Qué necesitas?
    suggestions: z.array(z.string()),
    request: z.string().trim().min(10, 'Cuéntanos con un poco más de detalle (mín. 10 caracteres)').max(1500),
    quantity: z.string().trim().max(40).optional(),
    store: z.string().min(1, 'Elige una opción'),
    budget: z.string().min(1, 'Elige una opción'),
    // Paso 2 · Tus datos
    name: z.string().trim().min(3, 'Escribe tu nombre completo'),
    phone: z.string().trim().regex(phoneRegex, 'Número no válido'),
    email: z.email('Correo no válido'),
    city: z.string().min(1, 'Elige tu ciudad'),
    delivery: z.string().min(1, 'Elige cómo quieres recibirlo'),
    address: z.string().optional(),
    // Paso 3 · Confirmar
    notes: z.string().max(1000).optional(),
    consent: z.literal(true, 'Debes aceptar para enviar el encargo'),
    website: z.string().optional(), // honeypot
  })
  .superRefine((data, ctx) => {
    if (data.delivery === 'envio' && (data.address ?? '').trim().length < 6)
      ctx.addIssue({ code: 'custom', path: ['address'], message: 'Escribe la dirección de entrega' })
  })

export type CustomOrderValues = z.input<typeof customOrderSchema>

/** Campos a validar antes de avanzar en cada paso del asistente. */
export const STEP_FIELDS: (keyof CustomOrderValues)[][] = [
  ['suggestions', 'request', 'quantity', 'store', 'budget'],
  ['name', 'phone', 'email', 'city', 'delivery', 'address'],
  ['consent'],
]

export const defaultValues: CustomOrderValues = {
  suggestions: [],
  request: '',
  quantity: '',
  store: 'cualquiera',
  budget: 'sin-definir',
  name: '',
  phone: '',
  email: '',
  city: 'Ibagué',
  delivery: '',
  address: '',
  notes: '',
  consent: false as unknown as true,
  website: '',
}

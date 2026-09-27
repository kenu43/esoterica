import { Button } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { MessageCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { SITE } from '@/shared/config'
import { buildFormMessage, openWhatsApp } from '@/shared/lib'
import { FormSelect, FormTextField } from '@/shared/ui'

const TOPICS = [
  { value: 'productos', label: 'Precios y disponibilidad' },
  { value: 'envios', label: 'Envíos a otras ciudades' },
  { value: 'lecturas', label: 'Lecturas de tarot' },
  { value: 'mayoristas', label: 'Ventas al por mayor' },
  { value: 'otro', label: 'Otro tema' },
]

const schema = z.object({
  name: z.string().trim().min(3, 'Escribe tu nombre'),
  topic: z.string().min(1, 'Elige un tema'),
  message: z.string().trim().min(10, 'Cuéntanos un poco más (mín. 10 caracteres)'),
})

type Values = z.infer<typeof schema>

/** Arma el mensaje y abre WhatsApp (La Colonia): no hay correos ni servidor de por medio. */
export function ContactForm() {
  const { control, handleSubmit } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', topic: '', message: '' },
    mode: 'onTouched',
  })

  const onSubmit = handleSubmit((v) => {
    const topic = TOPICS.find((t) => t.value === v.topic)?.label ?? v.topic
    openWhatsApp(SITE.ordersWhatsapp, buildFormMessage([
        { icon: '👤', label: 'Nombre', value: v.name },
        { icon: '💬', label: 'Tema', value: topic },
        { icon: '📝', label: 'Mensaje', value: v.message },
      ]),)
  })

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <FormTextField control={control} name="name" label="Nombre" isRequired autoComplete="name" />
      <FormSelect control={control} name="topic" label="Tema" options={TOPICS} isRequired />
      <FormTextField control={control} name="message" label="Mensaje" multiline rows={5} isRequired />
      <Button type="submit" variant="primary" className="gap-2 justify-self-start">
        <MessageCircle className="size-4" />
        Enviar por WhatsApp
      </Button>
    </form>
  )
}

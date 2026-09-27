import { Button, toast } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Send } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { mailService } from '@/shared/api'
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
  email: z.email('Correo no válido'),
  topic: z.string().min(1, 'Elige un tema'),
  message: z.string().trim().min(10, 'Cuéntanos un poco más (mín. 10 caracteres)'),
  website: z.string().optional(),
})

type Values = z.infer<typeof schema>

export function ContactForm() {
  const { control, handleSubmit, formState, reset } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', topic: '', message: '', website: '' },
    mode: 'onTouched',
  })

  const onSubmit = handleSubmit(async (v) => {
    const topic = TOPICS.find((t) => t.value === v.topic)?.label ?? v.topic
    try {
      await mailService.send({
        kind: 'contacto',
        subject: `Contacto web: ${topic}`,
        replyTo: v.email,
        fromName: v.name,
        website: v.website,
        fields: { Nombre: v.name, Correo: v.email, Tema: topic, Mensaje: v.message },
      })
      toast.success('Mensaje enviado', { description: 'Te respondemos lo antes posible.' })
      reset()
    } catch {
      toast.danger('No se pudo enviar el mensaje', { description: 'Inténtalo de nuevo o escríbenos por WhatsApp.' })
    }
  })

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <Controller
        control={control}
        name="website"
        render={({ field }) => (
          <input {...field} value={field.value ?? ''} tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
        )}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <FormTextField control={control} name="name" label="Nombre" isRequired autoComplete="name" />
        <FormTextField control={control} name="email" label="Correo" type="email" isRequired autoComplete="email" />
      </div>
      <FormSelect control={control} name="topic" label="Tema" options={TOPICS} isRequired />
      <FormTextField control={control} name="message" label="Mensaje" multiline rows={5} isRequired />
      <Button type="submit" variant="primary" isPending={formState.isSubmitting} className="gap-2 justify-self-start">
        {formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        Enviar mensaje
      </Button>
    </form>
  )
}

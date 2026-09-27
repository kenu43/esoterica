import { z } from 'zod'

/**
 * Solicitud que llega desde un formulario del sitio (encargo o contacto).
 * Dominio puro: sin dependencias de Firebase ni de Resend.
 */
export const requestSchema = z.object({
  kind: z.enum(['encargo', 'contacto']),
  subject: z.string().trim().min(3).max(160),
  replyTo: z.email(),
  fromName: z.string().trim().min(2).max(80),
  fields: z
    .record(z.string().max(60), z.string().max(3000))
    .refine((f) => Object.keys(f).length <= 20, 'Demasiados campos'),
  /** Honeypot: si viene lleno es un bot. */
  website: z.string().max(0).optional(),
})

export type ContactRequest = z.infer<typeof requestSchema>

/** Puerto de salida: cualquier servicio capaz de enviar el correo. */
export interface Mailer {
  send(request: ContactRequest): Promise<void>
}

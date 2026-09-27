import { env } from '@/shared/config'

/** Mensaje genérico que cualquier formulario envía al backend. */
export interface MailMessage {
  kind: 'encargo' | 'contacto'
  subject: string
  replyTo: string
  fromName: string
  /** Campos clave/valor que se muestran en el correo. */
  fields: Record<string, string>
  /** Campo trampa anti-spam: los humanos lo dejan vacío. */
  website?: string
}

export interface MailProvider {
  send(message: MailMessage): Promise<void>
}

/**
 * Envía el formulario a la Cloud Function `sendRequest`, que usa Resend.
 * La API key de Resend nunca llega al navegador.
 */
export const mailService: MailProvider = {
  async send(message) {
    const res = await fetch(`${env.VITE_API_URL}/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    })
    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      throw new Error(`No se pudo enviar (${res.status}) ${detail}`)
    }
  },
}

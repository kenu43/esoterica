import { defineSecret, defineString } from 'firebase-functions/params'
import { onRequest } from 'firebase-functions/v2/https'
import { logger } from 'firebase-functions'
import { ZodError } from 'zod'
import { SendRequestUseCase } from '../application/send-request.usecase.js'
import { ResendMailer } from './resend.mailer.js'

/** Secreto: se define con `firebase functions:secrets:set RESEND_API_KEY`. */
const RESEND_API_KEY = defineSecret('RESEND_API_KEY')
/** Correo(s) que reciben los formularios, separados por coma. */
const MAIL_TO = defineString('MAIL_TO')
/** Remitente. Sin dominio verificado en Resend solo funciona onboarding@resend.dev. */
const MAIL_FROM = defineString('MAIL_FROM', { default: 'Universo Esotérico <onboarding@resend.dev>' })

// Límite básico anti-abuso por IP (por instancia): 5 envíos cada 10 minutos
const hits = new Map<string, number[]>()
const isRateLimited = (ip: string) => {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 5
}

/**
 * POST /api/requests  (Firebase Hosting reescribe /api/** hacia esta función)
 * Composition root: aquí se conectan el caso de uso y el adaptador de Resend.
 */
export const sendRequest = onRequest(
  {
    region: 'us-central1',
    secrets: [RESEND_API_KEY],
    cors: [/localhost:\d+$/, /esoterica-app\.(web\.app|firebaseapp\.com)$/],
    maxInstances: 5,
  },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Método no permitido' })
      return
    }
    if (isRateLimited(req.ip ?? 'unknown')) {
      res.status(429).json({ error: 'Demasiadas solicitudes, intenta en unos minutos' })
      return
    }
    // Bots que llenan el campo trampa: respondemos OK sin enviar nada
    if (req.body?.website) {
      res.status(200).json({ ok: true })
      return
    }

    const mailer = new ResendMailer(
      RESEND_API_KEY.value(),
      MAIL_FROM.value(),
      MAIL_TO.value().split(',').map((s) => s.trim()),
    )
    try {
      await new SendRequestUseCase(mailer).execute(req.body)
      res.status(200).json({ ok: true })
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ error: 'Datos inválidos', issues: err.issues })
        return
      }
      logger.error('Error enviando correo', err)
      res.status(500).json({ error: 'No se pudo enviar el correo' })
    }
  },
)

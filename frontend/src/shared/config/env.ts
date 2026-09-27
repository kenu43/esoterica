import { z } from 'zod'

/**
 * Variables de entorno validadas al arrancar.
 * Solo contienen valores públicos: las claves secretas (Resend) viven en el backend.
 */
const envSchema = z.object({
  /** "sanity" lee del CMS (con respaldo en mockData si falla); "mock" usa solo los datos locales. */
  VITE_DATA_SOURCE: z.enum(['sanity', 'mock']).default('mock'),

  VITE_SANITY_PROJECT_ID: z.string().default('rx1vv2w8'),
  VITE_SANITY_DATASET: z.string().default('production'),
  VITE_SANITY_API_VERSION: z.string().default('2025-02-19'),

  /** Endpoint de la Cloud Function que envía correos con Resend. */
  VITE_API_URL: z.string().default('/api'),

  VITE_FIREBASE_API_KEY: z.string().optional(),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().optional(),
  VITE_FIREBASE_PROJECT_ID: z.string().optional(),
  VITE_FIREBASE_STORAGE_BUCKET: z.string().optional(),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().optional(),
  VITE_FIREBASE_APP_ID: z.string().optional(),
  VITE_FIREBASE_MEASUREMENT_ID: z.string().optional(),

  VITE_SITE_URL: z.string().default('https://esoterica-app.web.app'),
})

// Vacíos en .env se tratan como "no definidos"
const raw = Object.fromEntries(Object.entries(import.meta.env).filter(([, v]) => v !== ''))

export const env = envSchema.parse(raw)

export const isFirebaseConfigured = Boolean(
  env.VITE_FIREBASE_API_KEY && env.VITE_FIREBASE_PROJECT_ID && env.VITE_FIREBASE_APP_ID,
)

import type { SanityClient } from '@sanity/client'
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
import { env } from '@/shared/config'

const config = {
  projectId: env.VITE_SANITY_PROJECT_ID,
  dataset: env.VITE_SANITY_DATASET,
}

let clientPromise: Promise<SanityClient> | null = null

/**
 * Cliente de lectura de Sanity, importado bajo demanda para no inflar el bundle inicial.
 * `useCdn` sirve desde la CDN global de Sanity. El dataset "production" es público: no hace falta token.
 */
export function getSanityClient() {
  clientPromise ??= import('@sanity/client').then(({ createClient }) =>
    createClient({ ...config, apiVersion: env.VITE_SANITY_API_VERSION, useCdn: true, perspective: 'published' }),
  )
  return clientPromise
}

/**
 * Circuit breaker: si Sanity falla (sin red, CORS sin configurar…), las siguientes
 * consultas durante 60 s fallan al instante y la app usa sus datos de respaldo
 * sin llenar la consola de peticiones fallidas.
 */
let circuitOpenUntil = 0

/** Atajo para consultas GROQ. */
export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}) {
  if (Date.now() < circuitOpenUntil) throw new Error('Sanity no disponible temporalmente')
  try {
    const client = await getSanityClient()
    return await client.fetch<T>(query, params)
  } catch (err) {
    circuitOpenUntil = Date.now() + 60_000
    throw err
  }
}

const builder = createImageUrlBuilder(config)

/** URL optimizada (WebP/AVIF automático, recorte al punto central elegido en el Studio). */
export const sanityImage = (source: SanityImageSource, width = 800) =>
  builder.image(source).width(width).height(width).fit('crop').auto('format').quality(78).url()

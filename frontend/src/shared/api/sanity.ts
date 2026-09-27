import type { SanityClient } from '@sanity/client'
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
import { env } from '@/shared/config'

const config = {
  projectId: env.VITE_SANITY_PROJECT_ID,
  dataset: env.VITE_SANITY_DATASET,
}

/**
 * Vista previa: la abre el Studio (herramienta "Presentation") con `?preview=1` en la URL.
 * Mientras está activa, la web muestra los borradores sin publicar, no el catálogo público.
 * Requiere `VITE_SANITY_PREVIEW_TOKEN` (token "Viewer", de solo lectura) en el build.
 */
export const isPreviewMode = () =>
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('preview') === '1' && !!env.VITE_SANITY_PREVIEW_TOKEN

let clientPromise: Promise<SanityClient> | null = null
let previewClientPromise: Promise<SanityClient> | null = null

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

/** Cliente de vista previa: lee también los borradores. La CDN no los sirve, por eso `useCdn: false`. */
function getPreviewSanityClient() {
  previewClientPromise ??= import('@sanity/client').then(({ createClient }) =>
    createClient({
      ...config,
      apiVersion: env.VITE_SANITY_API_VERSION,
      useCdn: false,
      perspective: 'previewDrafts',
      token: env.VITE_SANITY_PREVIEW_TOKEN,
    }),
  )
  return previewClientPromise
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
    const client = await (isPreviewMode() ? getPreviewSanityClient() : getSanityClient())
    return await client.fetch<T>(query, params)
  } catch (err) {
    circuitOpenUntil = Date.now() + 60_000
    throw err
  }
}

const builder = createImageUrlBuilder(config)

/** URL optimizada (WebP/AVIF automático, recorte al punto central elegido en el Studio). */
export const sanityImage = (source: SanityImageSource, width = 800, height = width) =>
  builder.image(source).width(width).height(height).fit('crop').auto('format').quality(78).url()

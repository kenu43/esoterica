import type { SanityClient } from '@sanity/client'
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
import { env } from '@/shared/config'

const config = {
  projectId: env.VITE_SANITY_PROJECT_ID,
  dataset: env.VITE_SANITY_DATASET,
}

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

export const sanityImage = (source: SanityImageSource, width = 800, height = width) =>
  builder.image(source).width(width).height(height).fit('crop').auto('format').quality(78).url()

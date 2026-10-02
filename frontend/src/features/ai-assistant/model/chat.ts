import { productRepository, type Product } from '@/entities/product'
import { env } from '@/shared/config'

export interface ChatMessage {
  role: 'user' | 'assistant'
  text: string
  productSlugs?: string[]
}

export const isAssistantEnabled = Boolean(env.VITE_CHAT_URL)

const STOP = new Set(['para', 'que', 'con', 'una', 'uno', 'los', 'las', 'del', 'por', 'mis', 'mas', 'muy', 'como', 'quiero', 'busco', 'tengo', 'siento', 'estoy', 'algo', 'cuando', 'porque', 'pero', 'esta', 'este', 'hola', 'necesito'])
const norm = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

/** Palabras del último mensaje que sirven de búsqueda. */
const keywords = (text: string) =>
  [...new Set(norm(text).split(/[^a-z0-9]+/).filter((w) => w.length > 3 && !STOP.has(w)))].slice(0, 4)

/** Trae del servidor solo los productos relacionados con la charla (no todo el catálogo): payload chico y respuestas rápidas. */
export async function relatedProducts(messages: ChatMessage[]): Promise<Product[]> {
  const lastUser = [...messages].reverse().find((m) => m.role === 'user')?.text ?? ''
  const [byWord, popular] = await Promise.all([
    Promise.all(keywords(lastUser).map((w) => productRepository.list({ search: w, limit: 6 }).catch(() => []))),
    productRepository.list({ limit: 8 }).catch(() => []),
  ])
  const seen = new Map<string, Product>()
  for (const p of [...byWord.flat(), ...popular]) if (p.inStock && !seen.has(p.slug)) seen.set(p.slug, p)
  return [...seen.values()].slice(0, 20)
}

const toCatalog = (products: Product[]) =>
  products.map((p) => ({
    slug: p.slug,
    name: p.name,
    price: p.price,
    category: p.category,
    about: [p.shortDescription, ...p.intentions].join(' · ').slice(0, 90),
  }))

class ChatError extends Error {
  retryable: boolean
  constructor(message: string, retryable: boolean) {
    super(message)
    this.retryable = retryable
  }
}

async function request(messages: ChatMessage[], products: Product[]) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), 25_000)
  try {
    const res = await fetch(env.VITE_CHAT_URL!, {
      method: 'POST',
      signal: ctrl.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messages.map(({ role, text }) => ({ role, text })), catalog: toCatalog(products) }),
    })
    const data = (await res.json().catch(() => ({}))) as { reply?: string; productSlugs?: string[]; error?: string }
    if (!res.ok || !data.reply)
      throw new ChatError(data.error ?? 'Merlín tiene interferencias mágicas justo ahora. Intenta de nuevo.', res.status >= 500 || res.status === 429)
    return { reply: data.reply, productSlugs: data.productSlugs ?? [] }
  } catch (err) {
    if (err instanceof ChatError) throw err
    throw new ChatError('No pude conectar con Merlín. Revisa tu internet e intenta de nuevo.', true)
  } finally {
    clearTimeout(timer)
  }
}

/** Pregunta al asesor (Cloudflare Worker → Groq). Reintenta solo una vez si el fallo es pasajero. */
export async function askAssistant(messages: ChatMessage[]) {
  const products = await relatedProducts(messages)
  try {
    return { ...(await request(messages, products)), products }
  } catch (err) {
    if (!(err instanceof ChatError) || !err.retryable) throw err
    await new Promise((r) => setTimeout(r, 1800))
    return { ...(await request(messages, products)), products }
  }
}

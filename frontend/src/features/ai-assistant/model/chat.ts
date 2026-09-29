import type { Product } from '@/entities/product'
import { env } from '@/shared/config'

export interface ChatMessage {
  role: 'user' | 'assistant'
  text: string
  productSlugs?: string[]
}

export const isAssistantEnabled = Boolean(env.VITE_CHAT_URL)

const toCatalog = (products: Product[]) =>
  products
    .filter((p) => p.inStock)
    .slice(0, 80)
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      price: p.price,
      category: p.category,
      about: [p.shortDescription, ...p.intentions].join(' · '),
    }))

/** Pregunta al asesor (Cloudflare Worker → Groq). Lanza Error con un mensaje listo para mostrar. */
export async function askAssistant(messages: ChatMessage[], products: Product[]) {
  const res = await fetch(env.VITE_CHAT_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: messages.map(({ role, text }) => ({ role, text })),
      catalog: toCatalog(products),
    }),
  })
  const data = (await res.json().catch(() => ({}))) as { reply?: string; productSlugs?: string[]; error?: string }
  if (!res.ok || !data.reply) throw new Error(data.error ?? 'Merlín tiene interferencias mágicas justo ahora. Intenta de nuevo.')
  return { reply: data.reply, productSlugs: data.productSlugs ?? [] }
}

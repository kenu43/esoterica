import { Button } from '@heroui/react'
import { Loader2, MessageCircle, Send, Sparkles, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { useProducts } from '@/entities/product'
import { ROUTES, SITE } from '@/shared/config'
import { buildWhatsAppUrl, cn, formatPrice } from '@/shared/lib'
import { askAssistant, isAssistantEnabled, type ChatMessage } from '../model/chat'

const GREETING: ChatMessage = {
  role: 'assistant',
  text: 'Hola, soy el asesor de Universo Esotérico. Cuéntame qué está pasando en tu vida o en tu casa y te oriento con lo que tenemos.',
}

const SUGGESTIONS = ['Siento mala energía en mi casa', 'Quiero proteger mi negocio', 'Busco atraer el amor', 'Llevo una mala racha']

/** Asesor con IA: pregunta qué le pasa al cliente y recomienda productos reales del catálogo. */
export function AssistantChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { data: products = [] } = useProducts()
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, loading, open])

  if (!isAssistantEnabled) return null

  const send = async (text: string) => {
    const clean = text.trim()
    if (!clean || loading) return
    const next: ChatMessage[] = [...messages, { role: 'user', text: clean }]
    setMessages(next)
    setInput('')
    setError('')
    setLoading(true)
    try {
      // La IA no necesita el saludo inicial: la conversación real empieza con el usuario
      const { reply, productSlugs } = await askAssistant(next.slice(1), products)
      setMessages([...next, { role: 'assistant', text: reply, productSlugs }])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No pude responder. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const userTexts = messages.filter((m) => m.role === 'user').map((m) => m.text)
  const whatsappUrl = buildWhatsAppUrl(
    SITE.ordersWhatsapp,
    `¡Hola! Vengo de la página web y hablé con el asesor.\n📝 Mi caso: ${userTexts.join(' / ') || 'quiero una asesoría'}`,
  )

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label="Asesor con IA"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-40 z-50 flex max-h-[min(560px,calc(100svh-11rem))] flex-col overflow-hidden rounded-2xl border border-border bg-overlay shadow-2xl shadow-black/30 sm:inset-x-auto sm:right-8 sm:w-[380px]"
          >
            <header className="flex items-center gap-3 border-b border-separator px-4 py-3">
              <span className="grid size-9 place-items-center rounded-full bg-gold-soft text-gold">
                <Sparkles className="size-5" aria-hidden />
              </span>
              <div className="flex-1">
                <p className="font-display text-base leading-none">Asesor con IA</p>
                <p className="mt-1 text-xs text-muted">Te orienta y recomienda productos</p>
              </div>
              <Button isIconOnly size="sm" variant="ghost" aria-label="Cerrar asesor" onPress={() => setOpen(false)}>
                <X className="size-4" />
              </Button>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div key={i} className={cn('flex flex-col gap-2', m.role === 'user' ? 'items-end' : 'items-start')}>
                  <p
                    className={cn(
                      'max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-sm leading-relaxed',
                      m.role === 'user' ? 'bg-accent text-accent-foreground' : 'bg-surface-secondary',
                    )}
                  >
                    {m.text}
                  </p>
                  {m.productSlugs?.map((slug) => {
                    const p = products.find((x) => x.slug === slug)
                    return p ? (
                      <Link
                        key={slug}
                        to={ROUTES.product(slug)}
                        onClick={() => setOpen(false)}
                        className="flex w-full items-center gap-3 rounded-xl border border-border bg-surface p-2 transition-colors hover:border-gold/40"
                      >
                        <img src={p.image} alt="" className="size-12 rounded-lg object-cover" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium">{p.name}</span>
                          <span className="text-xs text-muted">{formatPrice(p.price)}</span>
                        </span>
                      </Link>
                    ) : null
                  })}
                </div>
              ))}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-border px-3 py-1.5 text-xs transition-colors hover:border-gold/40"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {loading && (
                <p className="flex items-center gap-2 text-sm text-muted">
                  <Loader2 className="size-4 animate-spin" aria-hidden /> Pensando…
                </p>
              )}
              {error && <p className="text-sm text-danger">{error}</p>}
              <div ref={endRef} />
            </div>

            <div className="space-y-2 border-t border-separator p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  send(input)
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={400}
                  placeholder="Escribe tu situación…"
                  aria-label="Tu mensaje"
                  className="h-10 min-w-0 flex-1 rounded-xl border border-field-border bg-field-background px-3 text-sm outline-none focus:border-gold"
                />
                <Button type="submit" isIconOnly variant="primary" aria-label="Enviar" isDisabled={loading || !input.trim()}>
                  <Send className="size-4" />
                </Button>
              </form>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 text-xs text-muted transition-colors hover:text-foreground"
              >
                <MessageCircle className="size-3.5" aria-hidden /> Prefiero hablar con una persona por WhatsApp
              </a>
              <p className="text-center text-[11px] text-muted">
                Orientación general. No reemplaza a un médico ni a un profesional.
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, type: 'spring', stiffness: 260, damping: 18 }}
        whileTap={{ scale: 0.92 }}
        aria-label={open ? 'Cerrar asesor con IA' : 'Hablar con el asesor con IA'}
        className="fixed bottom-[5.5rem] right-5 z-40 grid size-12 place-items-center rounded-full border border-gold/40 bg-surface text-gold shadow-lg sm:bottom-[6.5rem] sm:right-8"
      >
        <Sparkles className="size-5" />
      </motion.button>
    </>
  )
}

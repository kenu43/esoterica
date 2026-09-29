import { Button } from '@heroui/react'
import { Check, MessageCircle, Plus, RotateCw, Send, Sparkles, Trash2, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { useProducts, type Product } from '@/entities/product'
import { useInquiryStore } from '@/features/whatsapp-inquiry'
import { ROUTES, SITE } from '@/shared/config'
import { buildWhatsAppUrl, cn, formatPrice } from '@/shared/lib'
import merlinIcon from '@/shared/ui/merlin-icon.png'
import { useAssistantStore } from '../model/assistant.store'
import { askAssistant, isAssistantEnabled, type ChatMessage } from '../model/chat'

const GREETING: ChatMessage = {
  role: 'assistant',
  text: '¡Bienvenido(a)! Soy Merlín. Contame qué está pasando en tu vida o en tu casa, y vemos juntos qué te conviene.',
}

const SUGGESTIONS = ['Siento mala energía en mi casa', 'Quiero proteger mi negocio', 'Busco atraer el amor', 'Llevo una mala racha']

const THINKING_PHRASES = ['Alineando los astros…', 'Leyendo tu energía…', 'Consultando las cartas…', 'Un momento, dejame ver…']

/** Merlín: pregunta qué le pasa al cliente y recomienda productos reales del catálogo. */
export function AssistantChat() {
  const open = useAssistantStore((s) => s.isOpen)
  const setOpen = useAssistantStore((s) => s.setOpen)
  const pendingMessage = useAssistantStore((s) => s.pendingMessage)
  const clearPendingMessage = useAssistantStore((s) => s.clearPendingMessage)
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [thinkingPhrase, setThinkingPhrase] = useState(THINKING_PHRASES[0])
  const { data: products = [] } = useProducts()
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, loading, open])

  useEffect(() => {
    if (!loading) return
    setThinkingPhrase(THINKING_PHRASES[Math.floor(Math.random() * THINKING_PHRASES.length)])
    const id = setInterval(() => {
      setThinkingPhrase((prev) => {
        const rest = THINKING_PHRASES.filter((p) => p !== prev)
        return rest[Math.floor(Math.random() * rest.length)]
      })
    }, 1800)
    return () => clearInterval(id)
  }, [loading])

  const send = async (text: string, retry = false) => {
    const clean = text.trim()
    if (!clean || loading) return
    const next: ChatMessage[] = retry ? messages : [...messages, { role: 'user', text: clean }]
    setMessages(next)
    setInput('')
    setError('')
    setLoading(true)
    try {
      const { reply, productSlugs } = await askAssistant(next.slice(1), products)
      setMessages([...next, { role: 'assistant', text: reply, productSlugs }])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Merlín tiene interferencias mágicas justo ahora. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!pendingMessage || loading) return
    clearPendingMessage()
    send(pendingMessage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingMessage, loading])

  if (!isAssistantEnabled) return null

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
            aria-label="Merlín"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-[10.5rem] z-50 flex max-h-[min(560px,calc(100svh-12rem))] flex-col overflow-hidden rounded-2xl border border-border bg-overlay shadow-2xl shadow-black/30 sm:inset-x-auto sm:right-8 sm:w-[380px]"
          >
            <header className="flex items-center gap-3 border-b border-separator px-4 py-3">
              <span className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-gold-soft">
                <img src={merlinIcon} alt="" className="size-full object-cover" />
              </span>
              <div className="flex-1">
                <p className="font-display text-base leading-none">Merlín</p>
                <p className="mt-1 text-xs text-muted">Te orienta y recomienda productos</p>
              </div>
              <Button
                isIconOnly
                size="sm"
                variant="ghost"
                aria-label="Borrar conversación y empezar de nuevo"
                isDisabled={messages.length <= 1 && !error}
                onPress={() => {
                  setMessages([GREETING])
                  setError('')
                  setInput('')
                }}
              >
                <Trash2 className="size-4" />
              </Button>
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
                    return p ? <RecommendedProduct key={slug} product={p} onNavigate={() => setOpen(false)} /> : null
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
                <div className="flex items-center gap-2 text-sm text-muted">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                    className="grid place-items-center text-gold"
                  >
                    <Sparkles className="size-4" aria-hidden />
                  </motion.span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={thinkingPhrase}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.25 }}
                    >
                      {thinkingPhrase}
                    </motion.span>
                  </AnimatePresence>
                </div>
              )}
              {error && (
                <div className="space-y-2 rounded-xl border border-danger/30 bg-danger/5 p-3">
                  <p className="text-sm text-danger">{error}</p>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="gap-2"
                    onPress={() => send(userTexts[userTexts.length - 1] ?? '', true)}
                  >
                    <RotateCw className="size-3.5" /> Reintentar
                  </Button>
                </div>
              )}
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
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen(!open)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, type: 'spring', stiffness: 260, damping: 18 }}
        whileTap={{ scale: 0.92 }}
        aria-label={open ? 'Cerrar Merlín' : 'Hablar con Merlín'}
        className="fixed bottom-[6rem] right-5 z-40 grid size-14 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-[oklch(0.42_0.2_300)] to-[oklch(0.3_0.16_290)] shadow-lg shadow-[oklch(0.42_0.2_300)]/40 ring-1 ring-gold/50 sm:bottom-[7rem] sm:right-8"
      >
        <span className="absolute inset-0 animate-pulse-glow rounded-full bg-gold/20" aria-hidden />
        <img src={merlinIcon} alt="" className="relative size-9" />
      </motion.button>
    </>
  )
}

function RecommendedProduct({ product, onNavigate }: { product: Product; onNavigate: () => void }) {
  const add = useInquiryStore((st) => st.add)
  const setOpen = useInquiryStore((st) => st.setOpen)
  const [added, setAdded] = useState(false)
  const needsColor = product.colors.length > 0 || product.sizes.length > 0 || product.materials.length > 0 || product.variants.length > 0

  return (
    <div className="flex w-full items-center gap-3 rounded-xl border border-border bg-surface p-2">
      <Link to={ROUTES.product(product.slug)} onClick={onNavigate} className="flex min-w-0 flex-1 items-center gap-3">
        <img src={product.image} alt="" className="size-12 shrink-0 rounded-lg object-cover" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium">{product.name}</span>
          <span className="text-xs text-muted">{formatPrice(product.price)}</span>
        </span>
      </Link>
      {needsColor ? (
        <Link
          to={ROUTES.product(product.slug)}
          onClick={onNavigate}
          className="shrink-0 rounded-lg border border-border px-2.5 py-1.5 text-xs transition-colors hover:border-gold/40"
        >
          Elegir opciones
        </Link>
      ) : added ? (
        <Button size="sm" variant="secondary" className="shrink-0 gap-1" onPress={() => setOpen(true)}>
          <Check className="size-3.5" /> Ver lista
        </Button>
      ) : (
        <Button
          size="sm"
          variant="primary"
          className="shrink-0 gap-1"
          onPress={() => {
            add(product.id)
            setAdded(true)
          }}
        >
          <Plus className="size-3.5" /> Agregar
        </Button>
      )}
    </div>
  )
}

import { Button } from '@heroui/react'
import { MessageCircle, Sparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { GUARDIAN_AFFIRMATIONS, type GuardianAffirmation } from '@/entities/elemental'
import { useProducts, type Product } from '@/entities/product'
import { ROUTES, SITE } from '@/shared/config'
import { buildWhatsAppUrl, formatPrice, pick } from '@/shared/lib'
import { LotusIcon, SectionHeading } from '@/shared/ui'

/** Bloque D: minijuego "consulta al Guardián" → afirmación + producto real + WhatsApp directo. */
export function GuardianCouncil() {
  const { data: products = [] } = useProducts({ category: 'duendes', limit: 60 })
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<{ affirmation: GuardianAffirmation; product: Product | null } | null>(null)

  const inStock = useMemo(() => products.filter((p) => p.inStock), [products])

  const consult = () => {
    if (spinning) return
    setSpinning(true)
    setResult(null)
    setTimeout(() => {
      const affirmation = pick(GUARDIAN_AFFIRMATIONS)
      const matches = inStock.filter((p) => p.intentions.includes(affirmation.intention))
      const pool = matches.length > 0 ? matches : inStock
      const product = pool.length > 0 ? pick(pool) : null
      setResult({ affirmation, product })
      setSpinning(false)
    }, 1400)
  }

  const whatsappUrl = result?.product
    ? buildWhatsAppUrl(
        SITE.ordersWhatsapp,
        `¡Hola! Me salió el consejo del guardián y quiero pedir ${result.product.name}.`,
      )
    : undefined

  return (
    <section className="py-16">
      <div className="mx-auto max-w-2xl space-y-10 px-4 text-center">
        <SectionHeading
          eyebrow="Bloque místico"
          title="El Consejo del Guardián"
          highlight={['Guardián']}
          description="Pídele consejo al guardián de la abundancia: te trae una afirmación y un aliado del catálogo."
        />

        <div className="flex flex-col items-center gap-6">
          <motion.div
            animate={
              spinning
                ? { rotate: [0, -12, 12, -8, 8, -4, 4, 0], scale: [1, 1.08, 0.96, 1.05, 1] }
                : { rotate: 0, scale: 1 }
            }
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="grid size-24 place-items-center rounded-full bg-mystic-soft text-gold shadow-[0_0_40px_-8px_var(--mystic)]"
            aria-hidden
          >
            <LotusIcon className="size-12" />
          </motion.div>

          <Button size="lg" variant="primary" onPress={consult} isDisabled={spinning} className="gap-2">
            <Sparkles className={spinning ? 'size-4 animate-spin' : 'size-4'} />
            {spinning ? 'Consultando…' : 'Consultar al Guardián'}
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key={result.affirmation.text}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5 rounded-2xl border border-gold/30 bg-surface p-6 sm:p-8"
            >
              <p className="font-display text-xl leading-snug text-gold">"{result.affirmation.text}"</p>

              {result.product ? (
                <>
                  <Link to={ROUTES.product(result.product.slug)} className="flex items-center gap-3 rounded-xl border border-border bg-surface-secondary p-3 text-left transition-colors hover:border-gold/40">
                    <img src={result.product.image} alt="" className="size-14 shrink-0 rounded-lg object-cover" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">{result.product.name}</span>
                      <span className="text-sm text-muted">{formatPrice(result.product.price)}</span>
                    </span>
                  </Link>
                  <Button
                    size="lg"
                    className="w-full gap-2 bg-[#25D366] font-semibold text-white hover:bg-[#1ebe5a]"
                    onPress={() => whatsappUrl && window.open(whatsappUrl, '_blank', 'noopener,noreferrer')}
                  >
                    <MessageCircle className="size-4" /> Pedir este consejo por WhatsApp
                  </Button>
                </>
              ) : (
                <p className="text-sm text-muted">No encontramos un aliado disponible ahora mismo; escríbenos por WhatsApp y te ayudamos.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

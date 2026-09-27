import { Button } from '@heroui/react'
import { ArrowLeft, MessageCircle, RotateCcw } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { getBranch } from '@/entities/branch'
import { useProducts, type Product } from '@/entities/product'
import { ROUTES } from '@/shared/config'
import { buildWhatsAppUrl, cn, formatPrice } from '@/shared/lib'
import { LotusIcon } from '@/shared/ui'
import { computeResult, QUESTIONS, type QuizOption } from '../model/quiz'

/** Elige hasta 3 productos: el mejor de cada categoría del perfil, priorizando los más pedidos. */
function pickProducts(products: Product[], categories: string[]) {
  const ranked = [...products].sort(
    (a, b) => Number(b.badges.includes('destacado')) - Number(a.badges.includes('destacado')),
  )
  const picks: Product[] = []
  for (const cat of [...categories, ...categories]) {
    const next = ranked.find((p) => p.category === cat && p.inStock && !picks.includes(p))
    if (next) picks.push(next)
    if (picks.length === 3) break
  }
  return picks
}

/**
 * Quiz de 3 preguntas presentado como una baraja: cada respuesta desliza la carta
 * y al final se recomienda un kit real del catálogo (embudo de venta hacia WhatsApp).
 */
export function EnergyQuiz() {
  const [answers, setAnswers] = useState<QuizOption[]>([])
  const { data: products = [] } = useProducts()
  const step = answers.length
  const done = step === QUESTIONS.length
  const result = useMemo(() => (done ? computeResult(answers) : null), [done, answers])
  const picks = useMemo(() => (result ? pickProducts(products, result.categories) : []), [result, products])

  const branch = result ? getBranch(result.store) : undefined
  const whatsapp =
    result && branch
      ? buildWhatsAppUrl(
          branch.whatsapp,
          `Hola, hice el test de energía en la página y me salió "${result.title}". Me recomendaron: ${picks.map((p) => p.name).join(', ')}. ¿Me ayudan?`,
        )
      : ''

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      {/* Cartas "detrás" para dar sensación de baraja */}
      {!done &&
        [2, 1].map((i) =>
          step + i <= QUESTIONS.length ? (
            <div
              key={i}
              aria-hidden
              className="absolute inset-0 rounded-2xl border border-border bg-surface"
              style={{ transform: `translateY(${i * 10}px) scale(${1 - i * 0.03})`, opacity: 1 - i * 0.3 }}
            />
          ) : null,
        )}

      <AnimatePresence mode="wait" initial={false}>
        {!done ? (
          <motion.div
            key={QUESTIONS[step].id}
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -140, rotate: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl border border-border bg-surface p-6 shadow-xl shadow-mystic/10 sm:p-8"
          >
            <div className="mb-6 flex items-center justify-between text-sm text-muted">
              <span>
                Pregunta {step + 1} de {QUESTIONS.length}
              </span>
              <div className="flex gap-1.5" aria-hidden>
                {QUESTIONS.map((q, i) => (
                  <span key={q.id} className={cn('h-1.5 w-6 rounded-full', i <= step ? 'bg-gold' : 'bg-border')} />
                ))}
              </div>
            </div>
            <h3 className="mb-6 text-xl sm:text-2xl">{QUESTIONS[step].title}</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {QUESTIONS[step].options.map((opt) => (
                <motion.button
                  key={opt.id}
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setAnswers((a) => [...a, opt])}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background/40 p-4 text-left transition-colors hover:border-gold/50 hover:bg-gold-soft"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-mystic-soft text-mystic">
                    <opt.icon className="size-5" aria-hidden />
                  </span>
                  <span className="font-medium">{opt.label}</span>
                </motion.button>
              ))}
            </div>
            {step > 0 && (
              <button
                type="button"
                onClick={() => setAnswers((a) => a.slice(0, -1))}
                className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
              >
                <ArrowLeft className="size-4" /> Pregunta anterior
              </button>
            )}
          </motion.div>
        ) : (
          result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.96, rotateY: 12 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-2xl border border-gold/40 bg-surface p-6 shadow-xl shadow-gold/10 sm:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gold text-[oklch(0.18_0.04_290)]">
                  <result.icon className="size-6" aria-hidden />
                </span>
                <div>
                  <p className="text-sm text-gold">Tu resultado</p>
                  <h3 className="text-2xl">{result.title}</h3>
                  <p className="mt-2 text-muted">{result.message}</p>
                </div>
              </div>

              <p className="mt-6 flex items-center gap-2 text-sm font-medium">
                <LotusIcon className="size-5 text-gold" /> Lo que te recomendamos
              </p>
              <ul className="mt-3 grid gap-3 sm:grid-cols-3">
                {picks.map((p) => (
                  <li key={p.id}>
                    <Link
                      to={ROUTES.product(p.slug)}
                      className="group block overflow-hidden rounded-xl border border-border transition-colors hover:border-gold/50"
                    >
                      <img src={p.image} alt={p.name} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="p-3">
                        <p className="line-clamp-1 text-sm font-medium">{p.name}</p>
                        <p className="text-sm text-muted">{formatPrice(p.price)}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  onPress={() => window.open(whatsapp, '_blank', 'noopener,noreferrer')}
                  className="gap-2 bg-[#25D366] font-semibold text-white hover:bg-[#1ebe5a]"
                >
                  <MessageCircle className="size-4" /> Pedir asesoría en {branch?.name}
                </Button>
                <Button variant="ghost" onPress={() => setAnswers([])} className="gap-2">
                  <RotateCcw className="size-4" /> Repetir test
                </Button>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  )
}

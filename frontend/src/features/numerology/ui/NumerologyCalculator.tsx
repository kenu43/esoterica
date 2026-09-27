import { Button, buttonVariants } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Gem, MessageCircle, Palette, RotateCcw, Sparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { z } from 'zod'
import { useCategory } from '@/entities/category'
import { ROUTES, SITE } from '@/shared/config'
import { buildWhatsAppUrl, cn } from '@/shared/lib'
import { FormTextField } from '@/shared/ui'
import { isValidBirthDate, lifePathNumber, personalYearNumber, PROFILES } from '../model/numerology'

const thisYear = new Date().getFullYear()

const field = (label: string, min: number, max: number) =>
  z
    .string()
    .trim()
    .regex(/^\d+$/, 'Solo números')
    .refine((v) => Number(v) >= min && Number(v) <= max, `${label} entre ${min} y ${max}`)

const schema = z
  .object({
    day: field('Día', 1, 31),
    month: field('Mes', 1, 12),
    year: field('Año', 1900, thisYear),
  })
  .superRefine((v, ctx) => {
    const [d, m, y] = [Number(v.day), Number(v.month), Number(v.year)]
    const rangesOk = d >= 1 && d <= 31 && m >= 1 && m <= 12 && y >= 1900 && y <= thisYear
    if (rangesOk && !isValidBirthDate(d, m, y))
      ctx.addIssue({ code: 'custom', path: ['day'], message: 'Esa fecha no existe' })
  })

type Values = z.infer<typeof schema>

interface Result {
  life: number
  year: number
}

/** Calcula el número de vida y sugiere el amuleto o cristal aliado. Todo en el navegador. */
export function NumerologyCalculator() {
  const [result, setResult] = useState<Result | null>(null)
  const { control, handleSubmit, reset } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { day: '', month: '', year: '' },
    mode: 'onTouched',
  })

  const onSubmit = handleSubmit((v) => {
    const [d, m, y] = [Number(v.day), Number(v.month), Number(v.year)]
    setResult({ life: lifePathNumber(d, m, y), year: personalYearNumber(d, m) })
  })

  return (
    <div className="mx-auto w-full max-w-3xl">
      <AnimatePresence mode="wait" initial={false}>
        {!result ? (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="grid gap-5 rounded-2xl border border-border bg-surface p-6 sm:p-8"
          >
            <p className="text-muted">Escribe tu fecha de nacimiento y te decimos tu número de vida y tu aliado.</p>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <FormTextField control={control} name="day" label="Día" type="tel" description="De 1 a 31" isRequired />
              <FormTextField control={control} name="month" label="Mes" type="tel" description="De 1 a 12" isRequired />
              <FormTextField control={control} name="year" label="Año" type="tel" description="Cuatro cifras" isRequired />
            </div>
            <Button type="submit" variant="primary" size="lg" className="gap-2 justify-self-start">
              <Sparkles className="size-4" /> Calcular mi número
            </Button>
          </motion.form>
        ) : (
          <ResultCard
            key="result"
            result={result}
            onReset={() => {
              reset()
              setResult(null)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function ResultCard({ result, onReset }: { result: Result; onReset: () => void }) {
  const profile = PROFILES[result.life]
  const category = useCategory(profile.category)
  const message = `Hola, calculé mi número de vida en la página y me salió el ${result.life} (${profile.title}). Me recomendaron: ${profile.ally}. ¿Me ayudan?`

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="overflow-hidden rounded-2xl border border-border bg-surface"
    >
      <div className="flex items-center gap-5 border-b border-separator bg-gold-soft p-6 sm:p-8">
        <motion.span
          initial={{ scale: 0.4, rotate: -20, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14 }}
          className="grid size-20 shrink-0 place-items-center rounded-full border border-gold/50 bg-surface font-display text-4xl text-gold"
        >
          {result.life}
        </motion.span>
        <div>
          <p className="text-sm text-muted">Tu número de vida</p>
          <h3 className="text-2xl sm:text-3xl">{profile.title}</h3>
          <p className="mt-1 text-muted">{profile.essence}</p>
        </div>
      </div>

      <div className="space-y-6 p-6 sm:p-8">
        <p className="leading-relaxed">{profile.meaning}</p>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-surface-secondary p-4">
            <Gem className="mb-2 size-5 text-gold" aria-hidden />
            <p className="text-xs text-muted">Tu aliado</p>
            <p className="mt-1 font-medium">{profile.ally}</p>
          </div>
          <div className="rounded-xl bg-surface-secondary p-4">
            <Palette className="mb-2 size-5 text-gold" aria-hidden />
            <p className="text-xs text-muted">Tu color</p>
            <p className="mt-1 font-medium">{profile.color}</p>
          </div>
        </div>

        <p className="text-sm text-muted">
          Tu número personal para {thisYear} es el <strong className="text-foreground">{result.year}</strong>:{' '}
          {PROFILES[result.year].essence.toLowerCase()}
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            to={`${ROUTES.products}?cat=${category.id}`}
            className={cn(buttonVariants({ variant: 'primary' }), 'group gap-2')}
          >
            Ver {category.name.toLowerCase()}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={buildWhatsAppUrl(SITE.whatsapp, message)}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: 'outline' }), 'gap-2')}
          >
            <MessageCircle className="size-4" /> Preguntar por WhatsApp
          </a>
          <Button variant="ghost" onPress={onReset} className="gap-2">
            <RotateCcw className="size-4" /> Calcular otra fecha
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

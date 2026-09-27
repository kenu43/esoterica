import { Button, Checkbox, Label } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ArrowRight, Check, MessageCircle } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Controller, useForm, useWatch, type Control } from 'react-hook-form'
import { COLOMBIA_CITIES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { FormComboBox, FormSelect, FormTextField } from '@/shared/ui'
import {
  BUDGETS,
  customOrderSchema,
  defaultValues,
  DELIVERY,
  STEP_FIELDS,
  STORE_OPTIONS,
  SUGGESTIONS,
  type CustomOrderValues,
} from '../model/schema'
import { submitCustomOrder } from '../model/submit'

const STEPS = ['Tu encargo', 'Tus datos', 'Confirmar']

const slide = {
  enter: (dir: number) => ({ x: dir * 48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -48, opacity: 0 }),
}

/** Asistente de 3 pasos para encargos. Cada paso se valida antes de avanzar. */
export function CustomOrderForm() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [sent, setSent] = useState(false)

  const { control, handleSubmit, trigger, reset, setValue, getValues } = useForm<CustomOrderValues>({
    resolver: zodResolver(customOrderSchema),
    defaultValues,
    mode: 'onTouched',
  })
  const delivery = useWatch({ control, name: 'delivery' })

  const go = async (next: number) => {
    if (next > step && !(await trigger(STEP_FIELDS[step]))) return
    setDirection(next > step ? 1 : -1)
    setStep(next)
  }

  /** Al tocar una sugerencia se agrega al texto para que el cliente solo complete detalles. */
  const toggleSuggestion = (value: string, label: string, selected: boolean) => {
    const current = getValues('suggestions')
    setValue('suggestions', selected ? current.filter((v) => v !== value) : [...current, value])
    const text = getValues('request') ?? ''
    if (!selected && !text.includes(label)) setValue('request', text ? `${text}\n${label}: ` : `${label}: `)
  }

  const onSubmit = handleSubmit((values) => {
    submitCustomOrder(values)
    setSent(true)
  })

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-surface p-10 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.1 }}
          className="grid size-16 place-items-center rounded-full bg-gold text-[oklch(0.18_0.04_290)]"
        >
          <Check className="size-8" strokeWidth={3} />
        </motion.div>
        <h3 className="text-2xl">Tu encargo va por WhatsApp</h3>
        <p className="max-w-md text-muted">
          Se abrió WhatsApp con tu pedido ya escrito: solo dale enviar y te respondemos con la cotización.
          Si no se abrió, toca el botón de abajo.
        </p>
        <Button variant="primary" onPress={() => submitCustomOrder(getValues())} className="gap-2">
          <MessageCircle className="size-4" /> Abrir WhatsApp de nuevo
        </Button>
        <Button
          variant="secondary"
          onPress={() => {
            reset(defaultValues)
            setStep(0)
            setSent(false)
          }}
        >
          Hacer otro encargo
        </Button>
      </motion.div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-border bg-surface p-6 shadow-xl shadow-mystic/5 sm:p-8"
    >
      <ol className="mb-8 flex items-center gap-2" aria-label="Progreso del encargo">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              aria-current={i === step ? 'step' : undefined}
              className={cn(
                'grid size-8 shrink-0 place-items-center rounded-full border text-sm font-semibold transition-colors duration-300',
                i < step && 'border-gold bg-gold text-[oklch(0.18_0.04_290)]',
                i === step && 'border-gold text-gold',
                i > step && 'border-border text-muted',
              )}
            >
              {i < step ? <Check className="size-4" /> : i + 1}
            </span>
            <span className={cn('hidden text-sm sm:inline', i === step ? 'font-medium text-foreground' : 'text-muted')}>
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <span className="relative h-px flex-1 overflow-hidden bg-border">
                <motion.span
                  className="absolute inset-0 origin-left bg-gold"
                  animate={{ scaleX: i < step ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                />
              </span>
            )}
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div
          key={step}
          custom={direction}
          variants={slide}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-5"
        >
          {step === 0 && (
            <>
              <div>
                <h3 className="text-xl">¿Qué quieres encargar?</h3>
                <p className="mt-1 text-sm text-muted">
                  Toca una sugerencia o descríbelo con tus palabras. Te respondemos con precio y tiempo de entrega.
                </p>
              </div>
              <Controller
                control={control}
                name="suggestions"
                render={({ field }) => (
                  <fieldset>
                    <legend className="sr-only">Encargos sugeridos</legend>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {SUGGESTIONS.map((opt) => {
                        const selected = field.value.includes(opt.value)
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => toggleSuggestion(opt.value, opt.label, selected)}
                            className={cn(
                              'flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors',
                              selected ? 'border-gold bg-gold-soft' : 'border-border hover:border-gold/40 hover:bg-surface-secondary',
                            )}
                          >
                            <span
                              className={cn(
                                'grid size-8 shrink-0 place-items-center rounded-lg',
                                selected ? 'bg-gold text-[oklch(0.18_0.04_290)]' : 'bg-surface-secondary text-gold',
                              )}
                            >
                              <opt.icon className="size-4" aria-hidden />
                            </span>
                            {opt.label}
                          </button>
                        )
                      })}
                    </div>
                  </fieldset>
                )}
              />
              <FormTextField
                control={control}
                name="request"
                label="Describe tu encargo"
                multiline
                rows={4}
                isRequired
                placeholder="Ej.: Una Santa Muerte dorada de 60 cm y un velón preparado para abrir caminos en el negocio."
              />
              <div className="grid gap-5 sm:grid-cols-3">
                <FormTextField control={control} name="quantity" label="Cantidad" placeholder="Ej.: 2" />
                <FormSelect control={control} name="store" label="Tienda" options={STORE_OPTIONS} isRequired />
                <FormSelect control={control} name="budget" label="Presupuesto" options={BUDGETS} isRequired />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h3 className="text-xl">¿A dónde te respondemos?</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                <FormTextField control={control} name="name" label="Nombre completo" isRequired autoComplete="name" />
                <FormTextField
                  control={control}
                  name="phone"
                  label="WhatsApp"
                  type="tel"
                  isRequired
                  autoComplete="tel"
                  placeholder="300 000 0000"
                />
                <FormComboBox control={control} name="city" label="Ciudad" options={COLOMBIA_CITIES} isRequired />
              </div>
              <FormSelect control={control} name="delivery" label="¿Cómo lo recibes?" options={DELIVERY} isRequired />
              <AnimatePresence initial={false}>
                {delivery && delivery !== 'recoger' && (
                  <motion.div
                    key="address"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <FormTextField
                      control={control}
                      name="address"
                      label="Dirección de entrega"
                      isRequired
                      autoComplete="street-address"
                      description="Hacemos envíos a toda Colombia por transportadora."
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

          {step === 2 && (
            <>
              <h3 className="text-xl">Revisa y envía</h3>
              <Summary control={control} />
              <FormTextField
                control={control}
                name="notes"
                label="Algo más que debamos saber (opcional)"
                multiline
                rows={3}
                placeholder="Fecha en que lo necesitas, si es un regalo…"
              />
              <Controller
                control={control}
                name="consent"
                render={({ field, fieldState }) => (
                  <div>
                    {/* Control y texto dentro de Checkbox.Content: toda la fila es clicable */}
                    <Checkbox isSelected={Boolean(field.value)} onChange={field.onChange} isInvalid={fieldState.invalid}>
                      <Checkbox.Content className="flex-row items-center gap-3">
                        <Checkbox.Control>
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Label className="cursor-pointer text-sm">
                          Acepto que me contacten por WhatsApp para cotizar este encargo.
                        </Label>
                      </Checkbox.Content>
                    </Checkbox>
                    {fieldState.error && <p className="mt-1 text-sm text-danger">{fieldState.error.message}</p>}
                  </div>
                )}
              />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between gap-3 border-t border-separator pt-6">
        <Button variant="ghost" onPress={() => go(step - 1)} isDisabled={step === 0} className="gap-2">
          <ArrowLeft className="size-4" /> Atrás
        </Button>
        {step < STEPS.length - 1 ? (
          <Button variant="primary" onPress={() => go(step + 1)} className="gap-2">
            Continuar <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button type="submit" variant="primary" className="gap-2">
            <MessageCircle className="size-4" />
            Enviar por WhatsApp
          </Button>
        )}
      </div>
    </form>
  )
}

function Summary({ control }: { control: Control<CustomOrderValues> }) {
  const v = useWatch({ control }) as CustomOrderValues
  const rows: [string, string | undefined][] = [
    ['Encargo', v.request],
    ['Tienda', STORE_OPTIONS.find((o) => o.value === v.store)?.label],
    ['Presupuesto', BUDGETS.find((o) => o.value === v.budget)?.label],
    ['Contacto', `${v.name} · ${v.phone}`],
    ['Ciudad', v.city],
    ['Entrega', v.delivery && v.delivery !== 'recoger' ? `${DELIVERY.find((o) => o.value === v.delivery)?.label} · ${v.address}` : DELIVERY.find((o) => o.value === v.delivery)?.label],
  ]
  return (
    <dl className="divide-y divide-separator rounded-xl border border-border bg-surface-secondary text-sm">
      {rows.map(([k, val]) => (
        <div key={k} className="grid grid-cols-[110px_1fr] gap-3 px-4 py-2.5">
          <dt className="text-muted">{k}</dt>
          <dd className="whitespace-pre-line break-words">{val || '—'}</dd>
        </div>
      ))}
    </dl>
  )
}

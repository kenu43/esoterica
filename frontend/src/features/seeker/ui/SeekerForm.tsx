import { Button } from '@heroui/react'
import { Sparkles } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useSeekerStore } from '../model/seeker.store'

const today = () => new Date().toISOString().slice(0, 10)
const inputClass =
  'h-11 w-full rounded-xl border border-field-border bg-field-background px-3 text-sm outline-none focus:border-gold'

/** Pide nombre y fecha de nacimiento (con selector de fecha) para que la lectura sea personal. */
export function SeekerForm({ cta, onDone }: { cta: string; onDone?: () => void }) {
  const saved = useSeekerStore()
  const [name, setName] = useState(saved.name)
  const [birth, setBirth] = useState(saved.birth)
  const [error, setError] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (name.trim().length < 2) return setError('Escribe tu nombre para que la lectura sea tuya.')
    if (!birth || birth < '1900-01-01' || birth > today()) return setError('Elige tu fecha de nacimiento.')
    setError('')
    saved.setSeeker(name, birth)
    onDone?.()
  }

  return (
    <form onSubmit={submit} noValidate className="mx-auto grid w-full max-w-md gap-4 text-left">
      <label className="grid gap-1.5 text-sm font-medium">
        Tu nombre
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={40}
          autoComplete="given-name"
          placeholder="Como te dicen en casa"
          className={inputClass}
        />
      </label>
      <label className="grid gap-1.5 text-sm font-medium">
        Fecha de nacimiento
        <input
          type="date"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
          min="1900-01-01"
          max={today()}
          autoComplete="bday"
          className={inputClass}
        />
      </label>
      {error && <p className="text-sm text-danger">{error}</p>}
      <Button type="submit" variant="primary" size="lg" className="justify-self-start gap-2">
        <Sparkles className="size-4" /> {cta}
      </Button>
    </form>
  )
}

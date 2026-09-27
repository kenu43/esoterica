import { Clock, MapPin, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/shared/lib'
import type { Branch } from '../model/types'

const accentClass: Record<Branch['accent'], string> = {
  gold: 'bg-gold',
  mystic: 'bg-mystic',
  sage: 'bg-sage',
}

interface BranchCardProps {
  branch: Branch
  active?: boolean
  onSelect?: () => void
  actions?: ReactNode
  compact?: boolean
}

export function BranchCard({ branch, active, onSelect, actions, compact }: BranchCardProps) {
  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border bg-surface transition-all duration-300',
        active ? 'border-gold/70 shadow-[0_0_0_1px_var(--gold)]' : 'border-border hover:border-gold/40',
      )}
    >
      {!compact && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={branch.image}
            alt={`${branch.name}, tienda esotérica en ${branch.city}`}
            loading="lazy"
            width={640}
            height={360}
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="absolute bottom-3 left-4 rounded-md bg-black/55 px-2 py-1 text-xs font-medium text-white backdrop-blur">
            Desde {branch.foundedYear}
          </span>
        </div>
      )}
      <button
        type="button"
        onClick={onSelect}
        disabled={!onSelect}
        className="flex flex-1 flex-col gap-3 p-5 text-left enabled:cursor-pointer"
      >
        <div className="flex items-center gap-2 text-sm text-muted">
          <span className={cn('size-2.5 rounded-full', accentClass[branch.accent])} aria-hidden />
          {branch.specialty}
          {compact && <span className="ml-auto text-xs">Desde {branch.foundedYear}</span>}
        </div>
        <h3 className="text-xl">{branch.name}</h3>
        {!compact && <p className="text-sm text-muted">{branch.description}</p>}
        <ul className="mt-auto space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
            <span>
              {branch.address}, {branch.neighborhood} · {branch.city}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Clock className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
            <span>
              {branch.hours.map((h) => (
                <span key={h.days} className="block">
                  <span className="text-muted">{h.days}:</span> {h.hours}
                </span>
              ))}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <Phone className="size-4 shrink-0 text-gold" aria-hidden />
            <span>{branch.phone}</span>
          </li>
        </ul>
      </button>
      {actions && <div className="flex flex-wrap gap-2 px-5 pb-5">{actions}</div>}
    </article>
  )
}

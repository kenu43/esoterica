import { cn } from '@/shared/lib'

/** Sombrero de bruja de línea fina (mismo estilo que los íconos de lucide). */
export function WitchHatIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('size-5', className)}
      aria-hidden
    >
      <path d="M7.2 15.6C8.6 11.6 10.2 7.4 12.6 3c.5 3.4 2.2 8.4 4.2 12.6" />
      <path d="M2.8 18.4c0-1.5 4-2.6 9.2-2.6s9.2 1.1 9.2 2.6-4 2.6-9.2 2.6-9.2-1.1-9.2-2.6Z" />
      <path d="M8.2 13.4c2.6.7 5.2.7 7.8 0" />
      <path d="M19.5 4.5v3M18 6h3" />
    </svg>
  )
}

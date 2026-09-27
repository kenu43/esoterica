import { LogoMark } from '@/shared/ui'

/** Pantalla de carga mientras llega el chunk de una página diferida. */
export function PageLoader() {
  return (
    <div className="grid min-h-[70vh] place-items-center" role="status" aria-label="Cargando">
      <div className="relative grid place-items-center">
        <span className="absolute size-24 animate-ping rounded-full bg-gold/20" />
        <LogoMark className="size-14 animate-pulse" />
      </div>
    </div>
  )
}

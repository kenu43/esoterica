import { buttonVariants } from '@heroui/react'
import { isRouteErrorResponse, useRouteError } from 'react-router'
import { NotFoundPage } from '@/pages/not-found'
import { LotusIcon } from '@/shared/ui'

/** Captura errores de render/carga de rutas para no mostrar una pantalla en blanco. */
export function RouteError() {
  const error = useRouteError()
  if (isRouteErrorResponse(error) && error.status === 404) return <NotFoundPage />

  console.error(error)
  return (
    <div className="grid min-h-screen place-items-center p-6 text-center">
      <div className="space-y-4">
        <LotusIcon className="mx-auto size-12 text-gold" />
        <h1 className="text-2xl">Algo se desalineó en el cosmos</h1>
        <p className="text-muted">Recarga la página o vuelve al inicio.</p>
        <a href="/" className={buttonVariants({ variant: 'primary' })}>
          Volver al inicio
        </a>
      </div>
    </div>
  )
}

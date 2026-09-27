import { lazy, Suspense } from 'react'
import { isPreviewMode } from '@/shared/api'

/**
 * Conecta la web con la herramienta "Presentation" del Studio (overlays, navegación
 * sincronizada). Sin esto, Presentation muestra "Unable to connect". Se carga solo en
 * modo vista previa (`?preview=1`), así que los visitantes normales no descargan nada de esto.
 */
const VisualEditing = lazy(() =>
  import('@sanity/visual-editing/react-router').then((m) => ({ default: m.VisualEditing })),
)

export function PreviewVisualEditing() {
  if (!isPreviewMode()) return null
  return (
    <Suspense fallback={null}>
      <VisualEditing />
    </Suspense>
  )
}

import { lazy, Suspense } from 'react'
import { isPreviewMode } from '@/shared/api'

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

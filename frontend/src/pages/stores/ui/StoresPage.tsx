import { useSeo } from '@/shared/hooks'
import { BranchesSection } from '@/widgets/branches-map'
import { PageHeader } from '@/widgets/page-header'

export function StoresPage() {
  useSeo({
    title: 'Tiendas esotéricas en el centro de Ibagué',
    description: 'El Sortilegio (Cra. 3 #18-27), La Colonia (Cra. 3 #18-19) y Loto & Nirvana (Cra. 5 #17-65), centro de Ibagué. Horarios, teléfonos y cómo llegar.',
  })
  return (
    <>
      <PageHeader
        eyebrow="Visítanos"
        title="Nuestras tiendas en Ibagué"
        highlight={['Ibagué']}
        description="Todas en el centro de Ibagué, a pocos pasos una de la otra. Toca una tarjeta para ubicarla en el mapa."
      />
      <BranchesSection variant="page" />
    </>
  )
}

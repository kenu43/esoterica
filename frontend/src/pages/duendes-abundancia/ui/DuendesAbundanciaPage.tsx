import { DuendeGarden } from '@/features/duende-garden'
import { WishUrn } from '@/features/wish-urn'
import { useSeo } from '@/shared/hooks'
import { Container } from '@/shared/ui'
import { PageHeader } from '@/widgets/page-header'
import { GuardianCouncil } from './GuardianCouncil'

export function DuendesAbundanciaPage() {
  useSeo({
    title: 'Duendes y Abundancia: la cosecha del duende',
    description: 'Siembra semillas de suerte en el huerto del duende, riégalas cada día y cosecha. Además, el consejo del Guardián: una afirmación y un producto real del catálogo.',
  })

  return (
    <>
      <PageHeader
        eyebrow="Duendes y Abundancia"
        title="El huerto de la suerte"
        highlight={['suerte']}
        description="Cuida tu planta con el duende un ratico cada día, o consulta al guardián: cada uno te conecta con la tienda de una forma distinta."
      />
      <Container>
        <DuendeGarden />
        <WishUrn />
        <GuardianCouncil />
      </Container>
    </>
  )
}

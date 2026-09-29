import { LuckyNumbers } from '@/features/numerology'
import { Container, SectionHeading } from '@/shared/ui'

export function NumerologySection() {
  return (
    <section className="relative py-24">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Números de la suerte"
          title="Tu número de la suerte de hoy"
          highlight={['suerte']}
          description="Los números se mezclan, se barajan y salen los tuyos. Cambian cada día y son distintos para cada persona."
        />
        <LuckyNumbers />
      </Container>
    </section>
  )
}

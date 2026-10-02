import { LuckyNumbers } from '@/features/numerology'
import { Container, SectionHeading } from '@/shared/ui'

export function NumerologySection() {
  return (
    <section className="relative py-24">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Suerte y chance"
          title="Tus números de la suerte y del chance de hoy"
          highlight={['suerte', 'chance']}
          description="Los números se mezclan, se barajan y salen los tuyos. Cambian cada día y son distintos para cada persona. Sirven para tu suerte del día y también para jugar tu chance."
        />
        <LuckyNumbers />
      </Container>
    </section>
  )
}

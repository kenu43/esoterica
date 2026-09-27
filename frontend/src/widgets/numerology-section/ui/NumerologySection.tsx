import { NumerologyCalculator } from '@/features/numerology'
import { Container, SectionHeading } from '@/shared/ui'

export function NumerologySection() {
  return (
    <section className="relative py-24">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Numerología"
          title="Descubre tu número de vida"
          highlight={['número']}
          description="Con tu fecha de nacimiento calculamos tu número, lo que dice de ti y el cristal o amuleto que te acompaña."
        />
        <NumerologyCalculator />
      </Container>
    </section>
  )
}

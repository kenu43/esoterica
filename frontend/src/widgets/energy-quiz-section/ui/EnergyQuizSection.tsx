import { EnergyQuiz } from '@/features/energy-quiz'
import { Container, LotusBloom, SectionHeading } from '@/shared/ui'

export function EnergyQuizSection() {
  return (
    <section className="relative isolate overflow-hidden py-24">
      <LotusBloom className="absolute bottom-0 left-1/2 -z-10 w-[640px] max-w-[120%] -translate-x-1/2 opacity-25" />
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Test de 30 segundos"
          title="¿Qué energía necesitas hoy?"
          highlight={['energía']}
          description="Responde tres preguntas y te recomendamos los productos indicados para tu momento."
        />
        <EnergyQuiz />
      </Container>
    </section>
  )
}

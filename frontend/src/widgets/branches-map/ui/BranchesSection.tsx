import { Button, Skeleton } from '@heroui/react'
import { ExternalLink, MessageCircle, Navigation } from 'lucide-react'
import { lazy, Suspense, useState } from 'react'
import { BranchCard, googleDirectionsUrl, useBranches, type BranchId } from '@/entities/branch'
import { buildWhatsAppUrl } from '@/shared/lib'
import { Container, Reveal, SectionHeading } from '@/shared/ui'

const BranchesMap = lazy(() => import('./BranchesMap'))

interface BranchesSectionProps {
  variant?: 'home' | 'page'
}

export function BranchesSection({ variant = 'home' }: BranchesSectionProps) {
  const branches = useBranches()
  const [activeId, setActiveId] = useState<BranchId | undefined>()

  return (
    <section className="relative py-24">
      <Container className="space-y-12">
        {variant === 'home' && (
          <SectionHeading
            eyebrow="Nuestras tiendas"
            title="Nuestras tiendas en el centro de Ibagué"
            highlight={['Ibagué']}
            description="El Sortilegio y La Colonia están en la misma cuadra de la Carrera 3, y Loto & Nirvana a dos calles. Cada una tiene su especialidad."
          />
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <div className="grid gap-4">
            {branches.map((b, i) => (
              <Reveal key={b.id} delay={i * 0.08}>
                <BranchCard
                  branch={b}
                  compact={variant === 'home'}
                  active={b.id === activeId}
                  onSelect={() => setActiveId(b.id)}
                  actions={
                    <>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="gap-1.5"
                        onPress={() => window.open(googleDirectionsUrl(b), '_blank', 'noopener,noreferrer')}
                      >
                        <Navigation className="size-3.5" /> Cómo llegar
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="gap-1.5"
                        onPress={() =>
                          window.open(
                            buildWhatsAppUrl(b.whatsapp, `Hola, ${b.name}. Vengo de la página web y quisiera información.`),
                            '_blank',
                            'noopener,noreferrer',
                          )
                        }
                      >
                        <MessageCircle className="size-3.5" /> WhatsApp
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="gap-1.5"
                        onPress={() => window.open(b.mapsUrl, '_blank', 'noopener,noreferrer')}
                      >
                        <ExternalLink className="size-3.5" /> Ver en Google
                      </Button>
                    </>
                  }
                />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative h-[420px] overflow-hidden rounded-2xl border border-border shadow-xl shadow-mystic/10 lg:h-[620px]">
              <Suspense fallback={<Skeleton className="size-full rounded-none" />}>
                <BranchesMap branches={branches} activeId={activeId} onSelect={setActiveId} />
              </Suspense>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[400] h-16 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

import { ClipboardList, MessageCircle, PackageCheck } from 'lucide-react'
import { CustomOrderForm } from '@/features/custom-order'
import { useSeo } from '@/shared/hooks'
import { Container, Reveal } from '@/shared/ui'
import { PageHeader } from '@/widgets/page-header'

const STEPS = [
  { icon: ClipboardList, title: 'Nos cuentas qué necesitas', text: 'Elige una sugerencia o descríbelo: figura, velón, kit, tarot o compra al por mayor.' },
  { icon: MessageCircle, title: 'Te cotizamos por WhatsApp', text: 'Revisamos disponibilidad en las tres tiendas y te enviamos precio y tiempo de entrega.' },
  { icon: PackageCheck, title: 'Lo recoges o te lo enviamos', text: 'Pasa por la tienda en Ibagué o recíbelo en cualquier ciudad de Colombia.' },
]

export function CustomOrderPage() {
  useSeo({
    title: 'Encargos y cotizaciones',
    description: 'Encarga figuras en tamaños especiales, tarot de la Santa Muerte, velones preparados, kits de baños y riegos o compras al por mayor. Cotización por WhatsApp.',
  })
  return (
    <>
      <PageHeader
        eyebrow="Encargos"
        title="Lo pides, nosotros lo conseguimos"
        highlight={['conseguimos']}
        description="¿Buscas algo que no ves en el catálogo o lo necesitas preparado para tu caso? Haz tu encargo y te enviamos la cotización sin compromiso."
      />
      <Container className="grid gap-8 pb-12 lg:grid-cols-[1fr_1.7fr]">
        <aside className="space-y-3 lg:sticky lg:top-28 lg:self-start">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="flex gap-4 rounded-2xl border border-border bg-surface p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold-soft text-gold">
                  <s.icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs text-muted">Paso {i + 1}</p>
                  <h2 className="font-sans text-base font-semibold">{s.title}</h2>
                  <p className="mt-1 text-sm text-muted">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </aside>
        <Reveal delay={0.1}>
          <CustomOrderForm />
        </Reveal>
      </Container>
    </>
  )
}

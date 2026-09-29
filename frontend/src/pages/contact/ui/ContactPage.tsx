import { Accordion } from '@heroui/react'
import { MessageCircle, Phone } from 'lucide-react'
import type { ComponentType } from 'react'
import { BRANCHES } from '@/entities/branch'
import { ContactForm } from '@/features/contact-form'
import { SITE } from '@/shared/config'
import { useSeo } from '@/shared/hooks'
import { buildWhatsAppUrl } from '@/shared/lib'
import { Container, FacebookIcon, InstagramIcon, Reveal, SectionHeading, TikTokIcon } from '@/shared/ui'
import { PageHeader } from '@/widgets/page-header'

interface Channel {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
  href: string
}

const CHANNELS: Channel[] = [
  {
    icon: MessageCircle,
    label: 'WhatsApp El Sortilegio y Loto & Nirvana',
    value: BRANCHES[0].phone,
    href: buildWhatsAppUrl(BRANCHES[0].whatsapp, 'Hola, vengo de la página web y quisiera información.'),
  },
  {
    icon: Phone,
    label: 'WhatsApp La Colonia',
    value: BRANCHES[1].phone,
    href: buildWhatsAppUrl(BRANCHES[1].whatsapp, 'Hola, vengo de la página web y quisiera información.'),
  },
  { icon: InstagramIcon, label: 'Instagram y TikTok', value: SITE.instagramHandle, href: SITE.instagram },
  { icon: FacebookIcon, label: 'Facebook', value: SITE.facebookName, href: SITE.facebook },
]

const FAQ = [
  {
    q: '¿Hacen envíos a otras ciudades?',
    a: 'Sí, enviamos a toda Colombia por transportadora. En Ibagué también hacemos domicilios. El costo depende de la ciudad y del tamaño del paquete; te lo confirmamos por WhatsApp.',
  },
  {
    q: '¿Los precios de la página son los finales?',
    a: 'Son precios de referencia. Algunas figuras y piezas son únicas o cambian de precio según el tamaño y el acabado, por eso siempre confirmamos antes de despachar.',
  },
  {
    q: '¿Cómo funciona la lista de consulta?',
    a: 'Toca el ícono de mensaje en los productos que te interesen, elige la tienda y envía la lista por WhatsApp. No es una compra en línea: es una forma rápida de preguntar por varios productos a la vez.',
  },
  {
    q: '¿Preparan velones y trabajos a pedido?',
    a: 'Sí. Preparamos velones, baños, riegos y amuletos según tu petición. Puedes hacerlo desde la sección de Encargos o escribiéndonos directamente.',
  },
  {
    q: '¿Hacen lecturas de tarot?',
    a: 'Sí, con cita previa. Escríbenos por WhatsApp para saber los horarios disponibles.',
  },
  {
    q: '¿Venden al por mayor?',
    a: 'Sí, tenemos precios especiales para otras tiendas esotéricas y compras grandes. Cuéntanos qué necesitas y te enviamos la lista de precios.',
  },
]

export function ContactPage() {
  useSeo({
    title: 'Contacto y preguntas frecuentes',
    description: 'WhatsApp de El Sortilegio, La Colonia y Loto & Nirvana en Ibagué. Envíos a toda Colombia, encargos, lecturas de tarot y ventas al por mayor.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  })

  return (
    <>
      <PageHeader
        eyebrow="Hablemos"
        title="Estamos para ayudarte"
        highlight={['ayudarte']}
        description="La forma más rápida de hablar con nosotros es WhatsApp. También puedes dejarnos tu mensaje aquí y se abre el chat con todo escrito."
      />

      <Container className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-4">
          {CHANNELS.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.05} className="h-full">
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-full items-center gap-4 rounded-2xl border border-border bg-surface px-5 py-4 transition-colors hover:border-gold/40"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold-soft text-gold">
                  <c.icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-muted">{c.label}</span>
                  <span className="block truncate font-medium">{c.value}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="h-full">
          <div className="h-full rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <h2 className="mb-1 flex items-center gap-2 text-xl">
              <MessageCircle className="size-5 text-gold" aria-hidden /> Escríbenos
            </h2>
            <p className="mb-6 text-sm text-muted">Se abre WhatsApp con tu mensaje listo para enviar.</p>
            <ContactForm />
          </div>
        </Reveal>
      </Container>

      <section className="py-24">
        <Container className="max-w-3xl space-y-10">
          <SectionHeading eyebrow="Preguntas frecuentes" title="Resolvemos tus dudas" highlight={['dudas']} />
          <Accordion variant="surface" className="overflow-hidden rounded-2xl border border-border">
            {FAQ.map((f) => (
              <Accordion.Item key={f.q} id={f.q}>
                <Accordion.Heading>
                  <Accordion.Trigger className="w-full py-4 text-left font-sans text-base font-semibold text-foreground">
                    {f.q}
                    <Accordion.Indicator />
                  </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                  <Accordion.Body className="pb-4 text-[15px] leading-relaxed text-muted">{f.a}</Accordion.Body>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
          <p className="flex items-center justify-center gap-2 text-sm text-muted">
            <TikTokIcon className="size-4" /> Síguenos en TikTok e Instagram como {SITE.instagramHandle}
          </p>
        </Container>
      </section>
    </>
  )
}

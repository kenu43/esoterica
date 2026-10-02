import { MapPin, MessageCircle, Phone } from 'lucide-react'
import { Link } from 'react-router'
import { BRANCHES } from '@/entities/branch'
import { NAV_ITEMS, ROUTES, SITE } from '@/shared/config'
import { buildWhatsAppUrl } from '@/shared/lib'
import { Container, FacebookIcon, InstagramIcon, Logo, LotusDivider, SakuraBranch, TikTokIcon } from '@/shared/ui'

const SOCIALS = [
  { href: SITE.instagram, label: `Instagram ${SITE.instagramHandle}`, Icon: InstagramIcon },
  { href: SITE.tiktok, label: `TikTok ${SITE.instagramHandle}`, Icon: TikTokIcon },
  { href: SITE.facebook, label: `Facebook ${SITE.facebookName}`, Icon: FacebookIcon },
]

const LEGAL_LINKS = [
  { label: 'Términos y condiciones', to: ROUTES.legalDoc('terminos-y-condiciones') },
  { label: 'Privacidad y datos', to: ROUTES.legalDoc('politica-de-privacidad') },
  { label: 'Envíos', to: ROUTES.legalDoc('politica-de-envios') },
  { label: 'Cambios y garantía', to: ROUTES.legalDoc('cambios-devoluciones-y-garantia') },
  { label: 'PQR', to: ROUTES.legalDoc('pqr') },
  { label: 'Cookies', to: ROUTES.legalDoc('politica-de-cookies') },
]

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative isolate mt-12 overflow-hidden border-t border-separator bg-surface/50">
      <SakuraBranch flip className="absolute -right-10 top-4 -z-10 w-72 text-foreground/50 opacity-40" />
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1.4fr]">
        <div className="space-y-5">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Una familia, varias tiendas: Doña Cielo abrió El Sortilegio y junto a su hija Giomara la
            tradición creció hasta La Colonia y Loto & Nirvana.
          </p>
          <div className="flex gap-2">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid size-10 place-items-center rounded-full border border-border transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
          <p className="text-sm text-muted">Síguenos como {SITE.instagramHandle}</p>
        </div>

        <nav aria-label="Pie de página">
          <h2 className="mb-4 font-sans text-sm font-semibold text-foreground">Explora</h2>
          <ul className="grid grid-cols-2 gap-2 text-sm lg:grid-cols-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-muted transition-colors hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 font-sans text-sm font-semibold text-foreground">Tiendas en el centro de Ibagué</h2>
          <ul className="space-y-4 text-sm">
            {BRANCHES.map((b) => (
              <li key={b.id} className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                <span>
                  <a href={b.mapsUrl} target="_blank" rel="noreferrer" className="font-medium hover:text-gold">
                    {b.name}
                  </a>
                  <span className="block text-muted">{b.address}, Centro</span>
                  <span className="mt-1 flex flex-wrap gap-3 text-muted">
                    <a href={`tel:+57${b.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1 hover:text-gold">
                      <Phone className="size-3" aria-hidden /> {b.phone}
                    </a>
                    <a
                      href={buildWhatsAppUrl(b.whatsapp, `Hola, ${b.name}. Vengo de la página web.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 hover:text-gold"
                    >
                      <MessageCircle className="size-3" aria-hidden /> WhatsApp
                    </a>
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <LotusDivider />
      <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted sm:flex-row">
        <p>
          © {year} {SITE.name} · Ibagué, Tolima · Envíos a toda Colombia
        </p>
        <nav aria-label="Políticas" className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {LEGAL_LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="transition-colors hover:text-gold">
              {l.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  )
}

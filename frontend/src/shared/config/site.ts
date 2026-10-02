import { env } from './env'
import { ROUTES } from './routes'

export const SITE = {
  name: 'Universo Esotérico',
  shortName: 'Universo',
  tagline: 'Protección, suerte y energía para tu camino',
  description:
    'Figuras de santos y de la Santa Muerte, velones, baños, riegos, sahumerios y amuletos. Tienda familiar en el centro de Ibagué con envíos a toda Colombia.',
  city: 'Ibagué, Tolima',
  url: env.VITE_SITE_URL,
  whatsapp: '573144778105',
  ordersWhatsapp: '573003236179',
  instagram: 'https://www.instagram.com/conexiondemagia/',
  instagramHandle: '@conexiondemagia',
  facebook: 'https://www.facebook.com/profile.php?id=61565505067255',
  facebookName: 'Conexión de Magia y Esoterismo',
  tiktok: 'https://www.tiktok.com/@conexiondemagia',
  foundedYear: 1981,
  /** Datos del titular para las páginas legales. Se muestran solo si se llenan. */
  legal: { owner: '', nit: '' } as { owner: string; nit: string },
} as const

export interface NavItem {
  label: string
  to: string
  icon?: 'star'
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', to: ROUTES.home },
  { label: 'Productos', to: ROUTES.products, icon: 'star' },
  { label: 'Tarot', to: ROUTES.tarot },
  { label: 'Duendes', to: ROUTES.duendesAbundancia },
  { label: 'Glosario', to: ROUTES.glossary },
  { label: 'Aprende', to: ROUTES.learn },
  { label: 'Tiendas', to: ROUTES.stores },
  { label: 'Encargos', to: ROUTES.customOrder },
  { label: 'Nosotros', to: ROUTES.about },
  { label: 'Contacto', to: ROUTES.contact },
]

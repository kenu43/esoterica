import { env } from './env'
import { ROUTES } from './routes'

/** Configuración de marca. Cambia aquí nombre, contactos y redes sin tocar componentes. */
export const SITE = {
  name: 'Universo Esotérico',
  shortName: 'Universo',
  tagline: 'Protección, suerte y fe para tu camino',
  description:
    'Figuras de santos y de la Santa Muerte, velones, baños, riegos, sahumerios y amuletos. Tienda familiar en el centro de Ibagué con envíos a toda Colombia.',
  city: 'Ibagué, Tolima',
  url: env.VITE_SITE_URL,
  /** WhatsApp principal (formato internacional, solo dígitos). */
  whatsapp: '573144778105',
  /** WhatsApp que recibe encargos y mensajes de contacto (La Colonia). */
  ordersWhatsapp: '573003236179',
  instagram: 'https://www.instagram.com/conexiondemagia/',
  instagramHandle: '@conexiondemagia',
  facebook: 'https://www.facebook.com/profile.php?id=61565505067255',
  facebookName: 'Conexión de Magia y Esoterismo',
  tiktok: 'https://www.tiktok.com/@conexiondemagia',
  foundedYear: 1981,
} as const

export interface NavItem {
  label: string
  to: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', to: ROUTES.home },
  { label: 'Productos', to: ROUTES.products },
  { label: 'Tarot', to: ROUTES.tarot },
  { label: 'Glosario', to: ROUTES.glossary },
  { label: 'Aprende', to: ROUTES.learn },
  { label: 'Tiendas', to: ROUTES.stores },
  { label: 'Encargos', to: ROUTES.customOrder },
  { label: 'Nosotros', to: ROUTES.about },
  { label: 'Contacto', to: ROUTES.contact },
]

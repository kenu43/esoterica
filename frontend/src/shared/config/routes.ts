/** Única fuente de verdad para las rutas de la app. */
export const ROUTES = {
  home: '/',
  products: '/productos',
  product: (slug: string) => `/productos/${slug}`,
  tarot: '/tarot',
  tarotCard: (id: string) => `/tarot/${id}`,
  glossary: '/glosario',
  stores: '/tiendas',
  customOrder: '/encargos',
  about: '/nosotros',
  contact: '/contacto',
} as const

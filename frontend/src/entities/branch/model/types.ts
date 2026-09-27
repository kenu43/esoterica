export type BranchId = 'el-sortilegio' | 'la-colonia' | 'loto-nirvana'

export interface OpeningHours {
  days: string
  hours: string
}

/** Tienda física de la familia. */
export interface Branch {
  id: BranchId
  name: string
  foundedYear: number
  specialty: string
  description: string
  address: string
  neighborhood: string
  city: string
  coords: { lat: number; lng: number }
  /** Enlace de la ficha en Google Maps. */
  mapsUrl: string
  /** Número de WhatsApp en formato internacional (solo dígitos). */
  whatsapp: string
  phone: string
  hours: OpeningHours[]
  image: string
  /** Color de acento (token CSS) para diferenciar la tienda en UI y mapa. */
  accent: 'gold' | 'mystic' | 'sage'
}

/** Opción de tienda para selectores: una sede concreta o "la que tenga disponibilidad". */
export type BranchChoiceId = BranchId | 'cualquiera'

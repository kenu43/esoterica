export type BranchId = 'el-sortilegio' | 'la-colonia' | 'loto-nirvana'

export interface OpeningHours {
  days: string
  hours: string
}

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
  mapsUrl: string
  whatsapp: string
  phone: string
  hours: OpeningHours[]
  image: string
  accent: 'gold' | 'mystic' | 'sage'
}

export type BranchChoiceId = BranchId | 'cualquiera'

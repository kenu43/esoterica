export const DAYS_TO_HARVEST = 5
export const PLOT_COUNT = 3

export interface SeedKind {
  id: string
  name: string
  intention: string
  art: string
  tagline: string
}

export const SEEDS: SeedKind[] = [
  { id: 'trebol', name: 'Trébol de suerte', intention: 'suerte', art: 'trebol', tagline: 'Para que la suerte te encuentre' },
  { id: 'oro', name: 'Árbol de monedas', intention: 'abundancia', art: 'oro', tagline: 'Para que el dinero crezca' },
]

export const STAGE_LABELS = ['Semilla dormida', 'Brotó un tallito', 'Ya tiene hojitas', 'Está creciendo fuerte', 'Se llenó de capullos', '¡Lista para cosechar!']

export const WATER_LINES = [
  'El duende sonríe: la semilla bebió agua de luna.',
  'Se oye un cascabeleo bajito entre las hojas.',
  'Una luciérnaga se posa a ver cómo va tu planta.',
  'La tierra huele a lluvia y a buena suerte.',
  'Tu planta se estiró un poquito hacia la luz.',
]

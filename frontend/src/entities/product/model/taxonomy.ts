export const INTENTIONS = [
  { value: 'amor', label: 'Amor' },
  { value: 'proteccion', label: 'Protección' },
  { value: 'abundancia', label: 'Abundancia' },
  { value: 'limpieza', label: 'Limpieza' },
  { value: 'suerte', label: 'Suerte' },
  { value: 'salud', label: 'Salud' },
  { value: 'trabajo', label: 'Trabajo y negocio' },
  { value: 'justicia', label: 'Justicia' },
  { value: 'paz', label: 'Paz y meditación' },
] as const

export const MOON_PHASES = [
  { value: 'nueva', label: 'Luna nueva' },
  { value: 'creciente', label: 'Luna creciente' },
  { value: 'llena', label: 'Luna llena' },
  { value: 'menguante', label: 'Luna menguante' },
] as const

export const SEASONS = [
  { value: 'navidad', label: 'Navidad' },
  { value: 'ano-nuevo', label: 'Año Nuevo' },
  { value: 'amor-y-amistad', label: 'Amor y Amistad' },
  { value: 'semana-santa', label: 'Semana Santa' },
  { value: 'dia-de-la-madre', label: 'Día de la Madre' },
  { value: 'halloween', label: 'Halloween y Día de Muertos' },
] as const

const labelIn = (list: readonly { value: string; label: string }[], value: string) =>
  list.find((i) => i.value === value)?.label ?? value

export const moonPhaseLabel = (v: string) => labelIn(MOON_PHASES, v)

const COLOR_HEX: Record<string, string> = {
  blanco: '#f5f2ea',
  negro: '#1c1a1f',
  rojo: '#c0392b',
  verde: '#2e8b57',
  azul: '#2f5fb3',
  amarillo: '#f2c94c',
  dorado: '#d4a72c',
  plateado: '#bfc3c9',
  rosado: '#f08fb0',
  rosa: '#f08fb0',
  morado: '#7d3fb2',
  violeta: '#7d3fb2',
  naranja: '#f2994a',
  café: '#7a4a2b',
  cafe: '#7a4a2b',
  marrón: '#7a4a2b',
  turquesa: '#2bb3b1',
}

const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i

/** Color CSS de una muestra: usa el hex del Studio si es válido; si no, lo deduce del nombre. */
export function resolveColor(name: string, hex?: string) {
  if (hex && HEX.test(hex.trim())) return hex.trim()
  return COLOR_HEX[name.trim().toLowerCase()]
}

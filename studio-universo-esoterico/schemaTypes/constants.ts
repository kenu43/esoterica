/**
 * Opciones compartidas con el frontend.
 * Deben coincidir con `frontend/src/entities/branch` y `frontend/src/entities/product/model/taxonomy.ts`.
 * (Categorías, temporadas e intenciones ya no están aquí: se crean desde el panel.)
 */
export const STORES = [
  { title: 'El Sortilegio', value: 'el-sortilegio' },
  { title: 'La Colonia', value: 'la-colonia' },
  { title: 'Loto & Nirvana', value: 'loto-nirvana' },
]

export const BADGES = [
  { title: 'Nuevo', value: 'nuevo' },
  { title: 'Más pedido (aparece en la portada)', value: 'destacado' },
  { title: 'Oferta', value: 'oferta' },
  { title: 'Edición limitada', value: 'edicion-limitada' },
]

export const MOON_PHASES = [
  { title: 'Luna nueva', value: 'nueva' },
  { title: 'Luna creciente', value: 'creciente' },
  { title: 'Luna llena', value: 'llena' },
  { title: 'Luna menguante', value: 'menguante' },
]

/** Íconos para las categorías. Las claves deben existir en `frontend/src/entities/category/model/icons.ts`. */
export const CATEGORY_ICONS = [
  { title: 'Iglesia (santos y figuras)', value: 'church' },
  { title: 'Llama (velones)', value: 'flame' },
  { title: 'Gotas (baños y riegos)', value: 'droplets' },
  { title: 'Viento (sahumerios)', value: 'wind' },
  { title: 'Escudo (protección)', value: 'shield' },
  { title: 'Trébol (suerte)', value: 'clover' },
  { title: 'Flor (oriente)', value: 'flower' },
  { title: 'Destellos (tarot)', value: 'sparkles' },
  { title: 'Gema (piedras)', value: 'gem' },
  { title: 'Corazón (amor)', value: 'heart' },
  { title: 'Hoja (plantas y hierbas)', value: 'leaf' },
  { title: 'Luna', value: 'moon' },
  { title: 'Sol', value: 'sun' },
  { title: 'Estrella', value: 'star' },
]

export const GLOSSARY_GROUPS = [
  'Santos y devociones',
  'Protección',
  'Limpieza',
  'Suerte y abundancia',
  'Oriente',
  'Plantas y resinas',
].map((g) => ({ title: g, value: g }))

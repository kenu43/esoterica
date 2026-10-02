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
  { title: 'Calavera (Santa Muerte)', value: 'skull' },
  { title: 'Medalla (bisutería y accesorios)', value: 'medal' },
  { title: 'Brote (duendes)', value: 'sprout' },
  { title: 'Corona (San Diego)', value: 'crown' },
  { title: 'Varita (rituales)', value: 'wand' },
  { title: 'Atomizador (perfumería)', value: 'spray-can' },
  { title: 'Bañera (jabones)', value: 'bath' },
  { title: 'Libro (librería y novenas)', value: 'book' },
  { title: 'Frasco (químicos y trucos)', value: 'flask' },
  { title: 'Probeta (extractos)', value: 'test-tube' },
]

/** Emoji de cada ícono: se ve en las listas del panel para reconocer la categoría de un vistazo. */
export const CATEGORY_EMOJIS: Record<string, string> = {
  church: '⛪', flame: '🕯️', droplets: '💧', wind: '🌬️', shield: '🛡️', clover: '🍀', flower: '🪷', sparkles: '✨', gem: '💎',
  heart: '❤️', leaf: '🌿', moon: '🌙', sun: '☀️', star: '⭐', skull: '💀', medal: '📿', sprout: '🌱', crown: '👑',
  wand: '🪄', 'spray-can': '🧴', bath: '🛁', book: '📖', flask: '⚗️', 'test-tube': '🧪',
}

export const GLOSSARY_GROUPS = [
  'Santos y devociones',
  'Protección',
  'Limpieza',
  'Suerte y abundancia',
  'Oriente',
  'Plantas y resinas',
].map((g) => ({ title: g, value: g }))

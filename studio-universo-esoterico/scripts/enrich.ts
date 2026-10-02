import { COLORS, FORMATS, TOPICS } from './knowledge.ts'

/** Textos, intenciones, temporadas y etiquetas automáticas para productos del inventario. Tono cercano, sin inventar datos técnicos. */

export interface CatDef {
  id: string
  group: string
  name: string
  description: string
  icon: string
  order: number
  noun: string
  intentions: string[]
  benefits: string[]
  usage: string
}

export const CATEGORIES: CatDef[] = [
  { id: 'figuras', group: 'FIGURAS RELIGIOSAS', name: 'Figuras religiosas', description: 'San Judas, la Virgen, arcángeles y más.', icon: 'church', order: 10, noun: 'figura', intentions: ['proteccion'], benefits: ['Para tu altar, tu casa o tu negocio', 'Se consagra y se pone en un lugar de respeto', 'Llega lista para estrenar'], usage: 'Ponla en un lugar alto y limpio, con una vela o un vaso de agua al lado, y háblale con fe y con claridad lo que le pides.' },
  { id: 'santa-muerte', group: 'SANTAS MUERTES', name: 'Santas Muertes', description: 'La Niña Blanca, la Negra y la Roja en todos los tamaños.', icon: 'skull', order: 11, noun: 'imagen de la Santa Muerte', intentions: ['proteccion', 'justicia'], benefits: ['Devoción fuerte para protección y respaldo', 'Hay en varios tamaños y colores', 'Para altar de casa o de negocio'], usage: 'Mantén su altar limpio, con agua fresca y su vela. Cada color tiene su petición: pregúntanos cuál va con lo que necesitas.' },
  { id: 'velas', group: 'VELAS Y VELADORAS', name: 'Velas y veladoras', description: 'Velones preparados, de figura y de colores para cada petición.', icon: 'flame', order: 20, noun: 'vela', intentions: [], benefits: ['Para encender con tu petición clara', 'Hay colores según lo que necesites', 'Se enciende en un lugar seguro y sin corrientes'], usage: 'Escribe tu petición, úntala con aceite si quieres y enciende la vela en un lugar seguro. Déjala consumir completa y nunca la dejes sola.' },
  { id: 'riegos', group: 'RIEGOS Y SALES', name: 'Riegos y sales', description: 'Despojos, abre caminos, sales y riegos para casa y negocio.', icon: 'droplets', order: 30, noun: 'riego', intentions: ['limpieza', 'trabajo'], benefits: ['Para limpiar casa o negocio', 'Se usa fácil, siguiendo las instrucciones', 'Muy pedido para abrir caminos'], usage: 'Se riega o se echa en el agua del trapeado, de la puerta hacia adentro o de adentro hacia la calle, según lo que busques. Hazlo con intención y de preferencia en martes o viernes.' },
  { id: 'inciensos', group: 'INCIENSOS Y SAHUMERIOS', name: 'Inciensos y sahumerios', description: 'Copal, salvia, palo santo e inciensos para limpiar espacios.', icon: 'wind', order: 40, noun: 'sahumerio', intentions: ['limpieza', 'paz'], benefits: ['Limpia y perfuma el ambiente', 'Ideal para casa, negocio o altar', 'Aroma que se siente'], usage: 'Enciéndelo y recorre la casa de adentro hacia la puerta con las ventanas abiertas. Al terminar, apágalo con cuidado.' },
  { id: 'bisuteria', group: 'BISUTERÍA Y ACCESORIOS', name: 'Bisutería y accesorios', description: 'Manillas, rosarios, dijes y pulseras para llevar contigo.', icon: 'link', order: 50, noun: 'accesorio', intentions: ['proteccion'], benefits: ['Para llevar contigo todos los días', 'Va con santos y símbolos de protección', 'Buen detalle para regalar'], usage: 'Llévalo puesto o en el bolsillo. Si quieres, pásalo por humo de sahumerio antes de estrenarlo.' },
  { id: 'suerte', group: 'SUERTE Y FENG SHUI', name: 'Suerte y Feng Shui', description: 'Pirámides, elefantes y Feng Shui para atraer el dinero.', icon: 'clover', order: 60, noun: 'amuleto de suerte', intentions: ['suerte', 'abundancia'], benefits: ['Atrae buena suerte y prosperidad', 'Va bien cerca de la caja o la entrada', 'Para casa, local u oficina'], usage: 'Ponlo en un lugar visible, cerca de la puerta o de donde manejas el dinero, y mantenlo limpio.' },
  { id: 'duendes', group: 'DUENDES', name: 'Duendes', description: 'Duendes guardianes para la prosperidad del hogar y el negocio.', icon: 'sprout', order: 61, noun: 'duende', intentions: ['abundancia', 'suerte'], benefits: ['Guardián de la prosperidad', 'Se cuida con una ofrenda sencilla', 'Muy pedido para el negocio'], usage: 'Dale un lugar fijo en la casa o el negocio y una ofrenda pequeña de vez en cuando; trátalo con cariño.' },
  { id: 'piedras', group: 'PIEDRAS Y CUARZOS', name: 'Piedras y cuarzos', description: 'Cuarzos y piedras naturales para energizar y proteger.', icon: 'gem', order: 70, noun: 'piedra', intentions: ['proteccion', 'paz'], benefits: ['Piedra natural', 'Se limpia fácil con agua y luz de luna', 'Cada una trabaja una energía distinta'], usage: 'Lávala con agua, déjala una noche a la luz de la luna y llévala contigo o ponla donde la necesites.' },
  { id: 'san-diego', group: 'SAN DIEGO', name: 'San Diego', description: 'La línea de San Diego para el negocio y la prosperidad.', icon: 'crown', order: 75, noun: 'producto de la línea San Diego', intentions: ['trabajo', 'abundancia'], benefits: ['Línea muy buscada para el negocio', 'Para atraer clientes y movimiento', 'Fácil de usar'], usage: 'Sigue las indicaciones del empaque o pregúntanos por WhatsApp y te explicamos cómo usarlo.' },
  { id: 'rituales', group: 'RITUALES Y SANTERÍA', name: 'Rituales y santería', description: 'Todo para tus trabajos y ofrendas.', icon: 'wand', order: 80, noun: 'elemento de ritual', intentions: ['proteccion'], benefits: ['Para trabajos y ofrendas', 'Pregúntanos cuál va con tu petición', 'Disponible en nuestras tiendas'], usage: 'Úsalo según el trabajo que vayas a hacer. Si es tu primera vez, escríbenos y te orientamos.' },
  { id: 'perfumeria', group: 'PERFUMERÍA', name: 'Perfumería', description: 'Lociones, perfumes y aguas con intención.', icon: 'spray-can', order: 85, noun: 'loción', intentions: [], benefits: ['Se usa como perfume con intención', 'Aroma duradero', 'Va bien para el baño o para llevar'], usage: 'Aplícala en muñecas, cuello o ropa pensando en lo que quieres atraer. También se puede echar en el agua del baño.' },
  { id: 'jabones', group: 'JABONES', name: 'Jabones', description: 'Jabones de baño para limpiar y proteger.', icon: 'bath', order: 90, noun: 'jabón', intentions: ['limpieza'], benefits: ['Para el baño de limpieza', 'Se usa como un jabón normal', 'Aroma agradable'], usage: 'Úsalo en el baño con intención clara, de la cabeza a los pies, y enjuágate bien.' },
  { id: 'libreria', group: 'LIBRERÍA Y NOVENAS', name: 'Librería y novenas', description: 'Novenas, libros, oraciones y tarot.', icon: 'book', order: 95, noun: 'novena', intentions: ['paz'], benefits: ['Oraciones y devociones a la mano', 'Fácil de seguir', 'Buen detalle para regalar'], usage: 'Léela con calma, con una vela encendida si quieres, y sé constante los días que indica.' },
  { id: 'natural', group: 'SEXUAL Y NATURAL', name: 'Sexual y natural', description: 'Productos naturales y de pareja.', icon: 'heart', order: 100, noun: 'producto natural', intentions: ['salud', 'amor'], benefits: ['Producto natural', 'Venta discreta', 'Pregúntanos por WhatsApp si tienes dudas'], usage: 'Sigue las instrucciones del empaque. Ante cualquier duda de salud, consulta con un profesional.' },
  { id: 'trucos', group: 'QUÍMICOS Y TRUCOS', name: 'Químicos y trucos', description: 'Trucos y preparados para el negocio.', icon: 'flask', order: 105, noun: 'truco', intentions: ['trabajo'], benefits: ['Preparado listo para usar', 'Pregúntanos cómo se aplica', 'Muy pedido por los negocios'], usage: 'Escríbenos por WhatsApp y te decimos el paso a paso para que te funcione.' },
  { id: 'extractos', group: 'EXTRACTOS', name: 'Extractos', description: 'Extractos para tus rituales.', icon: 'test-tube', order: 106, noun: 'extracto', intentions: ['limpieza'], benefits: ['Concentrado para tus rituales', 'Rinde', 'Pregúntanos cómo usarlo'], usage: 'Se usa en pocas gotas, según el ritual. Escríbenos y te orientamos.' },
  { id: 'otros', group: 'OTROS', name: 'Otros', description: 'Más productos de nuestras tiendas.', icon: 'star', order: 110, noun: 'producto', intentions: [], benefits: ['Disponible en nuestras tiendas', 'Pregúntanos por WhatsApp'], usage: 'Escríbenos y te contamos cómo se usa.' },
]

export const CAT_BY_GROUP = new Map(CATEGORIES.map((c) => [c.group, c]))

const norm = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

const INTENT_RULES: [RegExp, string][] = [
  [/amor|atrae|pareja|enamor|endulz|amarr|cupido|venus|union|sexual|pasion|deseo/, 'amor'],
  [/dinero|plata|prosper|abundan|billete|olla|riqueza|negocio|cliente|ventas?|buda|elefante|duende|citrino|piramide|moneda/, 'abundancia'],
  [/suerte|trebol|herradura|gato|fortuna|loteria|ruda|chance|rana/, 'suerte'],
  [/protec|escudo|defens|azabache|tumba|ojo|san miguel|san benito|detente|exorc|envidia|contra|arcangel|espada|guardian|fatima/, 'proteccion'],
  [/limpi|despojo|sahum|copal|salvia|palo santo|sales?\b|bano|riego|rompe|quita|desbloq|florida/, 'limpieza'],
  [/\bpaz\b|calma|meditac|tranquil|relaj|lavanda|cuenco|armonia|novena|rosario/, 'paz'],
  [/salud|sana|curacion|san rafael|medicin|vitafer|shilajit|energizante|vigor|macho/, 'salud'],
  [/justicia|juez|tribunal|carcel|san ramon|abogado|legal/, 'justicia'],
  [/trabajo|empleo|camino|san judas|gregorio|oficina/, 'trabajo'],
]

const SEASON_RULES: [RegExp, string][] = [
  [/navidad|navideno|pesebre|nacimiento|nino dios|santa claus|reno/, 'navidad'],
  [/ano nuevo|12 uvas|lenteja/, 'ano-nuevo'],
  [/halloween|calabaza|dia de (los )?muertos/, 'halloween'],
  [/semana santa|nazareno|crucifijo|via crucis|cristo/, 'semana-santa'],
  [/dia de la madre|madre/, 'dia-de-la-madre'],
  [/amor y amistad|san valentin|enamorados/, 'amor-y-amistad'],
]

export function intentionsFor(name: string, cat: CatDef) {
  const n = ` ${norm(name)} `
  const set = new Set(cat.intentions)
  for (const [re, id] of INTENT_RULES) if (re.test(n)) set.add(id)
  return [...set].slice(0, 3)
}

export function seasonFor(name: string) {
  const n = norm(name)
  return SEASON_RULES.find(([re]) => re.test(n))?.[1]
}

const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7)

const CLOSERS = [
  'Escríbenos por WhatsApp y te confirmamos disponibilidad y precio.',
  'Pregúntanos por WhatsApp y te asesoramos para que elijas bien.',
  'Lo encuentras en nuestras tiendas de Ibagué; te lo separamos por WhatsApp.',
]

function knowledge(name: string) {
  const n = norm(name)
  return {
    topic: TOPICS.find((t) => t.re.test(n)),
    format: FORMATS.find((f) => f.re.test(n)),
    color: COLORS.find((c) => c.re.test(n)),
  }
}

export function descriptionFor(name: string, cat: CatDef) {
  const { topic, format, color } = knowledge(name)
  const parts = [`${name}.`]
  if (topic) parts.push(topic.long)
  if (format && (!topic || format.long !== topic.long)) parts.push(format.long)
  if (color && ['velas', 'santa-muerte', 'figuras'].includes(cat.id)) parts.push(`En color ${color.label}: ${color.meaning}.`)
  if (!topic && !format) parts.push(`${cat.benefits[0]}.`)
  parts.push(CLOSERS[(hash(name) >>> 3) % CLOSERS.length])
  return parts.join(' ')
}

export function shortFor(name: string, cat: CatDef) {
  const { topic, format } = knowledge(name)
  return (topic?.short ?? format?.short ?? `${cat.benefits[0]}.`).slice(0, 110)
}

const STOP = new Set(['para', 'con', 'del', 'las', 'los', 'por', 'una', 'sin'])
export function tagsFor(name: string, cat: CatDef) {
  const words = norm(name)
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 2 && !STOP.has(w) && !/^\d+$/.test(w))
  return [...new Set([...words, norm(cat.name)])].slice(0, 7)
}

const HOT = /santa muerte|san judas|abre camino|dinero|amarre|tumba|despojo|ruda|piramide|cuarzo|copal|palo santo|velon|arcangel|san miguel|duende|elefante|amor|prosper|buda/

/** "Más pedido" y "Nuevo" para productos con buen precio y gancho comercial, repartidos entre categorías. */
export function pickBadges(items: { key: string; name: string; price: number; cat: string }[]) {
  const scored = items
    .filter((i) => i.price >= 3000 && i.price <= 60000)
    .map((i) => ({ ...i, score: (HOT.test(norm(i.name)) ? 3 : 0) + (i.price <= 20000 ? 2 : 1) + (hash(i.name) % 10) / 10 }))
    .sort((a, b) => b.score - a.score)
  const out = new Map<string, string[]>()
  const perCat = new Map<string, number>()
  let featured = 0
  for (const i of scored) {
    if (featured >= 36) break
    if ((perCat.get(i.cat) ?? 0) >= 3) continue
    out.set(i.key, ['destacado'])
    perCat.set(i.cat, (perCat.get(i.cat) ?? 0) + 1)
    featured++
  }
  const fresh = scored.filter((i) => !out.has(i.key)).sort((a, b) => hash(b.key) - hash(a.key))
  const perCatNew = new Map<string, number>()
  let n = 0
  for (const i of fresh) {
    if (n >= 24) break
    if ((perCatNew.get(i.cat) ?? 0) >= 2 || !HOT.test(norm(i.name))) continue
    out.set(i.key, ['nuevo'])
    perCatNew.set(i.cat, (perCatNew.get(i.cat) ?? 0) + 1)
    n++
  }
  return out
}

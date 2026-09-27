import type { Element } from '@/entities/tarot-card'

export interface ZodiacSign {
  id: string
  name: string
  symbol: string
  dates: string
  element: Element
  ruler: string
  crystal: string
  /** slug de producto recomendado del catálogo */
  productSlug: string
  trait: string
}

const SIGNS: ZodiacSign[] = [
  { id: 'aries', name: 'Aries', symbol: '♈', dates: '21 mar – 19 abr', element: 'fuego', ruler: 'Marte', crystal: 'Cuarzo cristal', productSlug: 'velon-preparado-7-dias', trait: 'Valiente, pionero y apasionado.' },
  { id: 'tauro', name: 'Tauro', symbol: '♉', dates: '20 abr – 20 may', element: 'tierra', ruler: 'Venus', crystal: 'Cuarzo rosa', productSlug: 'duende-de-la-suerte', trait: 'Sensual, leal y perseverante.' },
  { id: 'geminis', name: 'Géminis', symbol: '♊', dates: '21 may – 20 jun', element: 'aire', ruler: 'Mercurio', crystal: 'Citrino', productSlug: 'incienso-en-varitas', trait: 'Curioso, comunicativo y versátil.' },
  { id: 'cancer', name: 'Cáncer', symbol: '♋', dates: '21 jun – 22 jul', element: 'agua', ruler: 'Luna', crystal: 'Piedra luna', productSlug: 'figura-virgen-de-guadalupe', trait: 'Protector, intuitivo y sensible.' },
  { id: 'leo', name: 'Leo', symbol: '♌', dates: '23 jul – 22 ago', element: 'fuego', ruler: 'Sol', crystal: 'Citrino', productSlug: 'gato-de-la-fortuna', trait: 'Carismático, generoso y creativo.' },
  { id: 'virgo', name: 'Virgo', symbol: '♍', dates: '23 ago – 22 sep', element: 'tierra', ruler: 'Mercurio', crystal: 'Amazonita', productSlug: 'bano-de-despojo', trait: 'Analítico, servicial y detallista.' },
  { id: 'libra', name: 'Libra', symbol: '♎', dates: '23 sep – 22 oct', element: 'aire', ruler: 'Venus', crystal: 'Cuarzo rosa', productSlug: 'pulsera-7-chakras', trait: 'Armonioso, justo y encantador.' },
  { id: 'escorpio', name: 'Escorpio', symbol: '♏', dates: '23 oct – 21 nov', element: 'agua', ruler: 'Plutón', crystal: 'Obsidiana', productSlug: 'figura-santa-muerte-30cm', trait: 'Intenso, magnético y transformador.' },
  { id: 'sagitario', name: 'Sagitario', symbol: '♐', dates: '22 nov – 21 dic', element: 'fuego', ruler: 'Júpiter', crystal: 'Turquesa', productSlug: 'figura-de-ganesha', trait: 'Aventurero, optimista y filosófico.' },
  { id: 'capricornio', name: 'Capricornio', symbol: '♑', dates: '22 dic – 19 ene', element: 'tierra', ruler: 'Saturno', crystal: 'Turmalina negra', productSlug: 'tetragramaton-en-metal', trait: 'Ambicioso, disciplinado y sabio.' },
  { id: 'acuario', name: 'Acuario', symbol: '♒', dates: '20 ene – 18 feb', element: 'aire', ruler: 'Urano', crystal: 'Amatista', productSlug: 'cuenco-tibetano', trait: 'Visionario, libre y humanitario.' },
  { id: 'piscis', name: 'Piscis', symbol: '♓', dates: '19 feb – 20 mar', element: 'agua', ruler: 'Neptuno', crystal: 'Amatista', productSlug: 'agua-florida', trait: 'Soñador, empático y espiritual.' },
]

/** U+FE0E fuerza la presentación como texto (evita que Windows lo pinte como emoji). */
export const ZODIAC: ZodiacSign[] = SIGNS.map((s) => ({ ...s, symbol: `${s.symbol}\uFE0E` }))

/** Índice del signo solar según la fecha (útil para resaltar el signo actual). */
export function getCurrentSignIndex(date = new Date()) {
  const m = date.getMonth() + 1
  const d = date.getDate()
  const starts: [number, number][] = [
    [3, 21], [4, 20], [5, 21], [6, 21], [7, 23], [8, 23],
    [9, 23], [10, 23], [11, 22], [12, 22], [1, 20], [2, 19],
  ]
  for (let i = 0; i < 12; i++) {
    const [sm, sd] = starts[i]
    const [nm, nd] = starts[(i + 1) % 12]
    const afterStart = m > sm || (m === sm && d >= sd)
    const beforeNext = m < nm || (m === nm && d < nd)
    if (sm < nm ? afterStart && beforeNext : afterStart || beforeNext) return i
  }
  return 0
}

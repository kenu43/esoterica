import { pickDaily } from '@/shared/lib'

export interface EsotericTip {
  icon: string
  text: string
}

export const ESOTERIC_TIPS: EsotericTip[] = [
  { icon: '🧂', text: 'La sal gruesa en las esquinas de la casa absorbe la energía pesada; cámbiala cada luna nueva.' },
  { icon: '🕯️', text: 'Antes de encender un velón nuevo, agradécele en voz alta por el trabajo que va a hacer.' },
  { icon: '✂️', text: 'Nunca regales unas tijeras sin entregar también una moneda a cambio: corta lo bueno si no.' },
  { icon: '🌙', text: 'Las peticiones de amor y dinero se piden mejor en luna creciente; las de soltar, en menguante.' },
  { icon: '🚪', text: 'Trapear de la puerta hacia adentro atrae; de adentro hacia la puerta, limpia y saca.' },
  { icon: '🌿', text: 'La ruda protege más si se siembra un martes o un viernes, y nunca se riega con la mano izquierda.' },
  { icon: '🔔', text: 'Un móvil o campanita cerca de la puerta avisa a las buenas energías que son bienvenidas.' },
  { icon: '🪞', text: 'Un espejo frente a la puerta principal devuelve la energía que entra: mejor ubicarlo de lado.' },
  { icon: '🍯', text: 'La miel en la entrada del negocio, los viernes, endulza el trato con los clientes de la semana.' },
  { icon: '🐚', text: 'Guardar un caracol o una piedra de río en el bolsillo ayuda a mantener la calma en momentos difíciles.' },
  { icon: '🧺', text: 'Cambiar el agua de los floreros y del altar seguido evita que la energía se estanque en la casa.' },
  { icon: '🔑', text: 'Colgar una llave vieja cerca de la puerta simboliza que los caminos cerrados se abren.' },
]

export function getDailyTips(date = new Date()): [EsotericTip, EsotericTip] {
  const first = pickDaily(ESOTERIC_TIPS, ':tip1', date)
  const rest = ESOTERIC_TIPS.filter((t) => t !== first)
  const second = pickDaily(rest, ':tip2', date)
  return [first, second]
}

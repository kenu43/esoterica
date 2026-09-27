import { pickDaily } from '@/shared/lib'

export interface DailyAdvice {
  message: string
  ritual: string
  /** Aliado del día: planta, amuleto, vela o figura. */
  crystal: string
  color: { name: string; value: string }
  affirmation: string
}

/** Consejos rotativos (uno por día, igual para todos los visitantes). */
export const ADVICES: DailyAdvice[] = [
  {
    message: 'Si sientes la casa pesada, no esperes: la mala energía se acumula en los rincones y detrás de las puertas.',
    ritual: 'Sahúma con copal desde el fondo de la casa hacia la puerta y abre las ventanas al terminar.',
    crystal: 'Copal y mirra',
    color: { name: 'Blanco', value: 'oklch(0.97 0.01 90)' },
    affirmation: 'Mi casa queda limpia y solo entra lo bueno.',
  },
  {
    message: 'Hoy es buen día para proteger tu negocio. La envidia entra por la puerta antes que los clientes.',
    ritual: 'Pon una mata de ruda en la entrada y riega un poco de agua florida en el marco.',
    crystal: 'Ruda',
    color: { name: 'Verde', value: 'oklch(0.6 0.14 150)' },
    affirmation: 'Mi negocio está protegido y lleno de clientes.',
  },
  {
    message: 'El dinero llega donde hay orden. Limpia la caja o la billetera y bota los papeles viejos.',
    ritual: 'Guarda una hoja de laurel y una moneda dorada junto a tu duende o en la billetera.',
    crystal: 'Duende de la suerte',
    color: { name: 'Dorado', value: 'oklch(0.82 0.14 85)' },
    affirmation: 'La abundancia llega a mí y se queda.',
  },
  {
    message: 'Si llevas días con mala racha, puede ser salación. Un despojo a tiempo cambia la semana.',
    ritual: 'Baño de ruda, romero y albahaca del cuello hacia abajo, tres días seguidos.',
    crystal: 'Baño de despojo',
    color: { name: 'Morado', value: 'oklch(0.5 0.18 300)' },
    affirmation: 'Suelto lo que me frena y me abro a lo nuevo.',
  },
  {
    message: 'Pídele con fe y constancia. Las causas difíciles se trabajan con paciencia, no con afán.',
    ritual: 'Enciende una veladora verde a San Judas Tadeo y reza su oración siete días.',
    crystal: 'San Judas Tadeo',
    color: { name: 'Verde esmeralda', value: 'oklch(0.55 0.13 160)' },
    affirmation: 'Mi causa está en buenas manos.',
  },
  {
    message: 'La Niña Blanca protege a quien la respeta. Mantén su altar limpio y con agua fresca.',
    ritual: 'Cambia el agua de su vaso, ofrécele una flor blanca y enciende su velón.',
    crystal: 'Santa Muerte blanca',
    color: { name: 'Blanco', value: 'oklch(0.97 0.01 90)' },
    affirmation: 'Estoy protegida y acompañada.',
  },
  {
    message: 'Cuídate de contar tus planes antes de tiempo. Hay ojos que no te desean el bien.',
    ritual: 'Lleva contigo tu tetragramatón o un azabache y no lo prestes.',
    crystal: 'Tetragramatón',
    color: { name: 'Negro', value: 'oklch(0.25 0.01 290)' },
    affirmation: 'Ninguna envidia me alcanza.',
  },
  {
    message: 'Para abrir caminos hay que cerrar ciclos. Suelta lo que ya no suma.',
    ritual: 'Escribe lo que quieres dejar atrás y quémalo con cuidado junto a una vela amarilla.',
    crystal: 'Velón abre caminos',
    color: { name: 'Amarillo', value: 'oklch(0.85 0.15 90)' },
    affirmation: 'Mis caminos están abiertos.',
  },
  {
    message: 'La paz de la casa empieza por la tuya. Tómate un momento en silencio antes de empezar el día.',
    ritual: 'Toca tu cuenco tibetano o enciende un incienso de sándalo durante cinco minutos.',
    crystal: 'Cuenco tibetano',
    color: { name: 'Azul', value: 'oklch(0.55 0.13 255)' },
    affirmation: 'Respiro y todo se acomoda.',
  },
  {
    message: 'El amor también se protege. Si hay discusiones seguidas, limpia la habitación.',
    ritual: 'Sahúma con palo santo y deja un velón rosado encendido un rato en la noche.',
    crystal: 'Palo santo',
    color: { name: 'Rosado', value: 'oklch(0.8 0.1 10)' },
    affirmation: 'En mi hogar hay armonía.',
  },
  {
    message: 'Viernes de abundancia: el mejor día para riegos de dinero en casa o en el local.',
    ritual: 'Trapea desde la puerta hacia adentro con riego de miel y canela.',
    crystal: 'Riego de la abundancia',
    color: { name: 'Naranja', value: 'oklch(0.72 0.16 55)' },
    affirmation: 'Llamo clientes y prosperidad.',
  },
  {
    message: 'Los niños y los animales absorben las malas energías de la casa. Protégelos también.',
    ritual: 'Ponle un azabache al bebé o cuelga una Mano de Fátima en la entrada.',
    crystal: 'Azabache',
    color: { name: 'Rojo', value: 'oklch(0.55 0.2 25)' },
    affirmation: 'Mi familia está protegida.',
  },
  {
    message: 'Antes de una decisión importante, pide claridad. Las cartas muestran lo que el miedo no deja ver.',
    ritual: 'Saca una carta del tarot en la mañana y léela con calma antes de salir.',
    crystal: 'Tarot',
    color: { name: 'Índigo', value: 'oklch(0.4 0.15 280)' },
    affirmation: 'Veo con claridad mi camino.',
  },
  {
    message: 'Un obstáculo no es un no, es un todavía. Ganesha abre lo que parece cerrado.',
    ritual: 'Ofrece un dulce a tu Ganesha antes de empezar un trámite o un negocio.',
    crystal: 'Ganesha',
    color: { name: 'Naranja', value: 'oklch(0.72 0.16 55)' },
    affirmation: 'Todo obstáculo se abre a mi paso.',
  },
]

export const getDailyAdvice = (date = new Date()) => pickDaily(ADVICES, ':advice', date)

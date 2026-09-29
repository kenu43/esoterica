import type { BranchId } from '@/entities/branch'

export interface Testimonial {
  name: string
  city: string
  store?: BranchId
  text: string
  rating: number
}

export const MOCK_TESTIMONIALS: Testimonial[] = [
  { name: 'Luz Marina R.', city: 'Ibagué', store: 'el-sortilegio', rating: 5, text: 'Compré mi Santa Muerte hace como 3 años acá y la señora me explicó todo, cómo curarla y qué ofrendas ponerle. Muy queridas.' },
  { name: 'Jhon Fredy M.', city: 'Espinal', store: 'la-colonia', rating: 5, text: 'Me mandaron el kit tumba trabajos hasta el Espinal, llegó al otro día bien empacado. Gracias por la paciencia con tanta pregunta jaja' },
  { name: 'Doña Rosalba', city: 'Ibagué', store: 'el-sortilegio', rating: 5, text: 'Toda la vida le he comprado los velones a Doña Cielo. Uno sabe que ahí le preparan las cosas bien hechas.' },
  { name: 'Katherine V.', city: 'Bogotá', store: 'loto-nirvana', rating: 5, text: 'Pedí el duende y el gato de la fortuna para mi local por WhatsApp, super rápido el envío. El local está lindo con eso.' },
  { name: 'Andrés C.', city: 'Ibagué', store: 'la-colonia', rating: 4, text: 'Buenos los baños de despojo, se nota que son hierbas frescas. A veces toca esperar un ratico porque se llena harto, pero vale la pena.' },
  { name: 'Yuliana P.', city: 'Neiva', rating: 5, text: 'La lectura de tarot fue muy acertada, me dijo cosas que nadie sabía. Volví a escribir para el velón de abre caminos.' },
  { name: 'Carlos Arturo G.', city: 'Ibagué', store: 'el-sortilegio', rating: 5, text: 'El tetragramatón que me vendieron lo tengo desde hace rato y nunca me lo quito. Excelente atención.' },
  { name: 'Paola A.', city: 'Pereira', store: 'loto-nirvana', rating: 5, text: 'Me enamoré del cuenco tibetano, lo uso todas las mañanas. Me lo enviaron con su cojín y todo bien protegido.' },
  { name: 'Milena T.', city: 'Ibagué', store: 'la-colonia', rating: 5, text: 'El riego de la abundancia lo uso en la peluquería los viernes y no me ha faltado clientela, de verdad.' },
  { name: 'Hernán D.', city: 'Melgar', rating: 4, text: 'Tienen de todo, uno llega por una cosa y sale con tres. Precios justos para lo que es.' },
  { name: 'Sandra Liliana O.', city: 'Ibagué', store: 'el-sortilegio', rating: 5, text: 'Les encargué un San Judas grande para mi mamá y me lo consiguieron en una semana. Quedó feliz.' },
  { name: 'Brayan S.', city: 'Cali', store: 'loto-nirvana', rating: 5, text: 'La pulsera de chakras llegó igualita a la foto. Ya le compré otra a mi novia.' },
]

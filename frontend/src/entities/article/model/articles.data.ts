import type { Article, ArticleBlock } from './types'

const p = (text: string): ArticleBlock => ({ kind: 'p', inline: [{ text }] })
const h2 = (text: string): ArticleBlock => ({ kind: 'h2', inline: [{ text }] })
const li = (text: string): ArticleBlock => ({ kind: 'bullet', inline: [{ text }] })

/**
 * Artículos por defecto: respaldo si Sanity no responde y semilla del Studio.
 * En producción se escriben desde el Studio → "Aprende y Sanar".
 */
export const DEFAULT_ARTICLES: Article[] = [
  {
    id: 'limpiar-casa-sahumerios',
    slug: 'como-limpiar-las-energias-de-una-casa-con-sahumerios',
    title: '¿Cómo limpiar las energías de una casa con sahumerios?',
    excerpt: 'Paso a paso para sahumar tu casa con copal, palo santo o salvia, cuándo hacerlo y qué cuidados tener.',
    cover: '/images/products/incienso-varitas.webp',
    topic: 'Limpieza',
    publishedAt: '2026-09-01',
    body: [
      p('Cuando la casa se siente pesada, hay discusiones seguidas o simplemente no se descansa bien, un sahumerio a tiempo cambia el ambiente. Es de las limpiezas más sencillas y se puede hacer en casa.'),
      h2('Qué necesitas'),
      li('Un sahumerio: copal, palo santo o un atado de salvia blanca.'),
      li('Un incensario o un plato resistente al calor.'),
      li('Fósforos y una ventana que puedas abrir.'),
      h2('Paso a paso'),
      p('Abre las ventanas para que la energía vieja tenga por dónde salir. Enciende el sahumerio, deja que agarre brasa y apaga la llama para que solo quede el humo.'),
      p('Empieza por el fondo de la casa y avanza hacia la puerta principal, pasando por todos los rincones, detrás de las puertas y debajo de las camas. Mientras caminas, piensa o di en voz alta que sale todo lo que no suma.'),
      p('Al terminar, deja el sahumerio consumirse en un lugar seguro y mantén las ventanas abiertas unos minutos más.'),
      h2('¿Cuándo hacerlo?'),
      p('Después de una mudanza, de visitas pesadas, de una discusión fuerte o cada mes como mantenimiento. Muchas personas prefieren luna menguante, que es el momento de soltar.'),
      h2('Cuál elegir'),
      li('Copal: limpieza profunda y protección.'),
      li('Palo santo: armonía y paz en el ambiente.'),
      li('Salvia blanca: para casas nuevas o cargadas.'),
    ],
  },
  {
    id: 'riego-bano-velacion',
    slug: 'diferencia-entre-riego-bano-de-despojo-y-velacion',
    title: 'Diferencia entre riego, baño de despojo y velación',
    excerpt: 'Tres trabajos que se confunden mucho: para qué sirve cada uno y cuándo conviene hacerlo.',
    cover: '/images/products/despojo.webp',
    topic: 'Rituales',
    publishedAt: '2026-09-08',
    body: [
      p('En la tienda nos preguntan a diario cuál de los tres necesitan. Aquí va la diferencia sin enredos.'),
      h2('El baño de despojo'),
      p('Es para la persona. Se hace con hierbas, esencias o preparados, del cuello hacia abajo, y sirve para quitar la mala energía, la salación o la mala racha. Se recomienda hacerlo varios días seguidos.'),
      h2('El riego'),
      p('Es para el lugar: la casa, el negocio o la puerta. Se trapea o se rocía con una preparación (abre caminos, abundancia, protección) desde el fondo hacia la entrada. Atrae lo bueno y protege el espacio.'),
      h2('La velación'),
      p('Es una petición. Se enciende un velón o veladora dedicada a un santo o a una intención concreta (dinero, amor, trabajo, justicia) mientras se reza o se pide con fe, normalmente durante varios días.'),
      h2('¿Cuál necesito?'),
      li('Si te sientes cargado o con mala racha: baño de despojo.'),
      li('Si el problema es la casa o el negocio: riego.'),
      li('Si quieres pedir algo específico: velación.'),
      p('Lo ideal es combinarlos: primero limpiar (baño y riego) y luego pedir (velación). Si tienes dudas, escríbenos y te orientamos.'),
    ],
  },
  {
    id: 'palo-santo-salvia',
    slug: 'beneficios-naturistas-del-palo-santo-y-la-salvia',
    title: 'Beneficios naturistas del palo santo y la salvia',
    excerpt: 'Para qué se usan tradicionalmente el palo santo y la salvia blanca y cómo cuidarlos.',
    cover: '/images/products/incienso-varitas.webp',
    topic: 'Plantas y resinas',
    publishedAt: '2026-09-15',
    body: [
      p('El palo santo y la salvia blanca se usan desde hace siglos para limpiar y armonizar los espacios. Esto es lo que se les atribuye de forma tradicional; no reemplazan ningún tratamiento médico.'),
      h2('Palo santo'),
      li('Su aroma dulce y amaderado ayuda a relajarse y a soltar el estrés.'),
      li('Se usa antes de meditar o de dormir para crear calma.'),
      li('Dura bastante: se enciende unos segundos y se apaga para reusarlo.'),
      h2('Salvia blanca'),
      li('Se usa para limpiezas profundas, después de mudanzas o discusiones.'),
      li('Su humo es más fuerte, por eso conviene ventilar bien.'),
      li('Se enciende el atado, se apaga la llama y se deja el humo.'),
      h2('Cuidados'),
      p('Compra siempre material de origen responsable, no lo dejes encendido sin vigilar y ten cuidado con niños, mascotas y personas con asma o alergias.'),
    ],
  },
]

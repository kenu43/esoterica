import type { GlossaryTerm } from './types'

export const DEFAULT_GLOSSARY: GlossaryTerm[] = [
  {
    id: 'santa-muerte',
    term: 'Santa Muerte',
    group: 'Santos y devociones',
    summary: 'Devoción popular de origen mexicano, también llamada la Niña Blanca o la Flaca.',
    detail:
      'Se le pide protección, justicia, salud, amor y trabajo. Cada color de su figura tiene un propósito: blanca para la pureza y la protección, dorada para el dinero, roja para el amor y negra para cortar el mal. Se le ofrenda agua, flores, veladoras, dulces y tabaco.',
    category: 'figuras',
  },
  {
    id: 'san-judas-tadeo',
    term: 'San Judas Tadeo',
    group: 'Santos y devociones',
    summary: 'Apóstol conocido como el patrón de las causas difíciles y desesperadas.',
    detail:
      'Se le reconoce por el medallón con el rostro de Jesús en el pecho y la llama sobre la cabeza. Su fiesta es el 28 de octubre y muchos devotos le rezan el 28 de cada mes, sobre todo por trabajo y salud.',
    category: 'figuras',
  },
  {
    id: 'san-miguel-arcangel',
    term: 'San Miguel Arcángel',
    group: 'Santos y devociones',
    summary: 'El arcángel guerrero, jefe de los ejércitos celestiales y protector contra el mal.',
    detail:
      'Se representa con espada y balanza venciendo al demonio. Se invoca para protección espiritual, corte de lazos negativos y para defender el hogar.',
    category: 'figuras',
  },
  {
    id: 'siete-potencias',
    term: 'Siete Potencias',
    group: 'Santos y devociones',
    summary: 'Siete deidades de la tradición afrocaribeña que se invocan juntas.',
    detail:
      'Se asocian a Elegguá, Obatalá, Changó, Oshún, Yemayá, Oggún y Orula. Su velón de siete colores se enciende para pedir que se abran los caminos en todos los aspectos de la vida.',
    category: 'velones',
  },
  {
    id: 'tetragramaton',
    term: 'Tetragramatón',
    group: 'Protección',
    summary: 'Amuleto con las cuatro letras hebreas del nombre de Dios dentro de un pentagrama.',
    detail:
      'Es uno de los amuletos de protección más usados: se lleva al cuello o se pone en la entrada para cortar envidias, brujería y energías negativas. Se recomienda consagrarlo antes de usarlo.',
    category: 'amuletos',
  },
  {
    id: 'azabache',
    term: 'Azabache',
    group: 'Protección',
    summary: 'Piedra negra de origen fósil usada contra el mal de ojo.',
    detail:
      'Tradicionalmente se pone a los bebés en pulsera o prendedor para protegerlos del "ojo". En adultos se usa en dijes y pulseras con el mismo fin.',
    category: 'amuletos',
  },
  {
    id: 'mano-de-fatima',
    term: 'Mano de Fátima (Hamsa)',
    group: 'Protección',
    summary: 'Mano abierta con un ojo en la palma, amuleto contra la envidia.',
    detail:
      'Presente en culturas árabes y judías. Con los dedos hacia arriba protege; con los dedos hacia abajo atrae la abundancia. Se cuelga en la entrada o se lleva como dije.',
    category: 'amuletos',
  },
  {
    id: 'obsidiana',
    term: 'Obsidiana',
    group: 'Protección',
    summary: 'Vidrio volcánico negro que absorbe las energías negativas.',
    detail:
      'Se lleva en el bolsillo o se pone junto a la puerta. Conviene limpiarla con agua y sal cada cierto tiempo y cargarla a la luz de la luna.',
    category: 'amuletos',
  },
  {
    id: 'velon',
    term: 'Velón',
    group: 'Protección',
    summary: 'Vela grande o en vaso que arde durante varios días para una petición.',
    detail:
      'A diferencia de una vela común, el velón acompaña una intención durante 3, 7 o más días. Se puede "preparar" con aceites, hierbas y oraciones. El color indica la intención: rojo amor, verde dinero, blanco paz, negro protección.',
    category: 'velones',
  },
  {
    id: 'bano-de-despojo',
    term: 'Baño de despojo',
    group: 'Limpieza',
    summary: 'Baño con hierbas para quitarse de encima la mala energía o la "salación".',
    detail:
      'Se prepara con plantas como ruda, altamisa, romero y albahaca. Se echa del cuello hacia abajo después del baño normal, durante 3, 7 o 9 días según la necesidad, sin secarse con toalla.',
    category: 'banos',
  },
  {
    id: 'riego',
    term: 'Riego',
    group: 'Limpieza',
    summary: 'Preparado líquido que se esparce en la casa o el negocio.',
    detail:
      'Se usa para trapear o rociar la entrada y los rincones. Hay riegos para abrir caminos, atraer clientes, dinero o para sacar la mala energía del lugar.',
    category: 'banos',
  },
  {
    id: 'tumba-trabajos',
    term: 'Tumba trabajos',
    group: 'Limpieza',
    summary: 'Preparados para deshacer un "trabajo" o brujería que se sospecha.',
    detail:
      'Suele combinar un baño de descruce, un riego para la casa, un velón y un sahumerio. Se acompaña de oración y constancia durante varios días.',
    category: 'banos',
  },
  {
    id: 'sahumerio',
    term: 'Sahumerio',
    group: 'Limpieza',
    summary: 'Humo de resinas y hierbas para purificar espacios.',
    detail:
      'Se quema copal, mirra, benjuí, incienso o hierbas sobre carbón encendido y se recorre la casa desde el fondo hacia la puerta, abriendo ventanas al final para que salga lo negativo.',
    category: 'sahumerios',
  },
  {
    id: 'agua-florida',
    term: 'Agua Florida',
    group: 'Limpieza',
    summary: 'Colonia tradicional usada en limpias, baños y ofrendas.',
    detail:
      'Se frota en las manos y la nuca para cortar pesadez, se agrega a baños y se ofrece en altares. Es un básico de cualquier botiquín espiritual.',
    category: 'banos',
  },
  {
    id: 'duende-de-la-suerte',
    term: 'Duende de la suerte',
    group: 'Suerte y abundancia',
    summary: 'Figura que se pone en casa o negocio para atraer dinero.',
    detail:
      'Se coloca cerca de la caja o la entrada. La tradición dice que se le "paga" con una moneda al mes y se le habla con cariño para que cuide la abundancia.',
    category: 'suerte',
  },
  {
    id: 'gato-de-la-fortuna',
    term: 'Gato de la fortuna (Maneki Neko)',
    group: 'Suerte y abundancia',
    summary: 'Gato japonés con la pata levantada que llama a los clientes.',
    detail:
      'La pata izquierda levantada atrae clientes y la derecha, dinero. Se pone mirando hacia la puerta del negocio.',
    category: 'suerte',
  },
  {
    id: 'elefante-de-la-suerte',
    term: 'Elefante de la suerte',
    group: 'Suerte y abundancia',
    summary: 'Elefante con la trompa hacia arriba que atrae la abundancia.',
    detail:
      'Se coloca de espaldas a la puerta, "recibiendo" lo que entra. Es un regalo tradicional para casas y negocios nuevos.',
    category: 'suerte',
  },
  {
    id: 'buda',
    term: 'Buda',
    group: 'Oriente',
    summary: 'Figura asociada a la paz, la calma y la iluminación.',
    detail:
      'El Buda meditando trae serenidad; el Buda sonriente (Hotei) se asocia con la abundancia. Según el feng shui se ubica frente a la entrada y nunca en el suelo.',
    category: 'oriental',
  },
  {
    id: 'ganesha',
    term: 'Ganesha',
    group: 'Oriente',
    summary: 'Deidad hindú con cabeza de elefante, el que remueve obstáculos.',
    detail:
      'Se invoca antes de empezar un negocio, un viaje o un proyecto para que todo fluya. Se ubica en la entrada, mirando hacia afuera.',
    category: 'oriental',
  },
  {
    id: 'cuenco-tibetano',
    term: 'Cuenco tibetano',
    group: 'Oriente',
    summary: 'Cuenco metálico que vibra al frotarlo o golpearlo con una baqueta.',
    detail:
      'Su sonido se usa para meditar, limpiar espacios después de discusiones y relajar el cuerpo. Se frota el borde con la baqueta de forma lenta y constante.',
    category: 'oriental',
  },
  {
    id: 'chakras',
    term: 'Chakras',
    group: 'Oriente',
    summary: 'Siete centros de energía del cuerpo según la tradición hindú.',
    detail:
      'Van desde la base de la columna (raíz, rojo) hasta la coronilla (corona, violeta). Las pulseras de siete piedras se usan como recordatorio de equilibrio.',
    category: 'amuletos',
  },
  {
    id: 'atrapasuenos',
    term: 'Atrapasueños',
    group: 'Oriente',
    summary: 'Aro tejido con plumas de origen nativo norteamericano.',
    detail:
      'Se cuelga cerca de la cama: la red "atrapa" los malos sueños y deja pasar los buenos por las plumas.',
    category: 'oriental',
  },
  {
    id: 'ruda',
    term: 'Ruda',
    group: 'Plantas y resinas',
    summary: 'Planta de olor fuerte, la protectora por excelencia.',
    detail:
      'Se tiene en la entrada de la casa contra la envidia, se usa en baños de despojo y riegos. Si se seca de repente, se dice que absorbió una mala energía.',
    category: 'banos',
  },
  {
    id: 'copal',
    term: 'Copal',
    group: 'Plantas y resinas',
    summary: 'Resina sagrada de origen mesoamericano para sahumerios.',
    detail:
      'Su humo blanco y abundante limpia espacios y se ofrece en altares. Se quema sobre carbón encendido.',
    category: 'sahumerios',
  },
  {
    id: 'palo-santo',
    term: 'Palo santo',
    group: 'Plantas y resinas',
    summary: 'Madera aromática sudamericana que armoniza los ambientes.',
    detail:
      'Se enciende la punta, se deja arder unos segundos y se apaga para que suelte humo. Aleja la mala energía y deja un aroma dulce.',
    category: 'sahumerios',
  },
  {
    id: 'salvia-blanca',
    term: 'Salvia blanca',
    group: 'Plantas y resinas',
    summary: 'Planta usada en atados para limpiezas profundas.',
    detail:
      'Se usa para limpiar una casa nueva, después de una mudanza o de visitas pesadas. Se recorre cada rincón y al final se abren puertas y ventanas.',
    category: 'sahumerios',
  },
]

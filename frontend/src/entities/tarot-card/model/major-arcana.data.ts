import type { TarotCard } from './types'

type MajorSeed = Omit<TarotCard, 'id' | 'arcana' | 'image'>

/**
 * Arcanos mayores del mazo Rider-Waite-Smith (A. E. Waite y Pamela Colman Smith, 1909-1911).
 * Cada carta describe la escena clásica del mazo y su significado tradicional (derecho,
 * invertido, amor y trabajo). Es redacción propia siguiendo esa tradición, no una cita
 * textual de "The Pictorial Key to the Tarot": si necesitas una verificación formal,
 * pide a un tarotista de confianza que revise este archivo contra la obra original.
 */
const seeds: MajorSeed[] = [
  {
    name: 'El Loco',
    numeral: '0',
    keywords: ['comienzos', 'libertad', 'riesgo', 'espontaneidad'],
    upright:
      'Un joven camina hacia el borde de un precipicio mirando al cielo, con un perro a sus pies. Anuncia un comienzo sin garantías: un viaje, un cambio de vida o una decisión que se toma con el corazón. Pide confiar y soltar el miedo a lo desconocido.',
    reversed: 'Imprudencia, decisiones apresuradas o, al contrario, miedo que paraliza. Revisa bien el terreno antes de saltar.',
    love: 'Una relación nueva y ligera, o la necesidad de vivir el amor con más libertad y menos control.',
    career: 'Emprendimiento, cambio de trabajo o viaje de negocios. Buena energía para empezar, pero cuida el dinero.',
    advice: 'Da el primer paso aunque no veas toda la escalera.',
    element: 'aire',
    astrology: 'Urano',
  },
  {
    name: 'El Mago',
    numeral: 'I',
    keywords: ['voluntad', 'habilidad', 'manifestación', 'inicio'],
    upright:
      'Sobre la mesa del Mago están los cuatro palos del tarot: tiene todas las herramientas. Es la carta de la iniciativa y el talento puesto en acción. Lo que te propongas ahora tiene fuerza para concretarse si actúas con enfoque.',
    reversed: 'Engaño, manipulación o talento desperdiciado. Alguien puede estar prometiendo más de lo que cumple.',
    love: 'Seducción y comunicación fluida. Momento de tomar la iniciativa; cuidado con quien habla bonito sin hechos.',
    career: 'Excelente para negociar, vender, presentar un proyecto o empezar un negocio propio.',
    advice: 'Lo que visualizas con claridad, lo creas con tus manos.',
    element: 'aire',
    astrology: 'Mercurio',
  },
  {
    name: 'La Sacerdotisa',
    numeral: 'II',
    keywords: ['intuición', 'secretos', 'paciencia', 'sabiduría'],
    upright:
      'Sentada entre dos columnas y con un pergamino semioculto, guarda un conocimiento que no se revela de inmediato. Habla de intuición, sueños y misterios. Aún no es momento de actuar: observa, escucha y espera a que la verdad salga sola.',
    reversed: 'Secretos que salen a la luz, chismes o ignorar lo que la intuición te está diciendo.',
    love: 'Sentimientos que no se dicen, un amor platónico o algo oculto en la relación.',
    career: 'Estudiar, investigar y guardar discreción. No reveles tus planes todavía.',
    advice: 'Guarda silencio y escucha: tu intuición ya sabe.',
    element: 'agua',
    astrology: 'Luna',
  },
  {
    name: 'La Emperatriz',
    numeral: 'III',
    keywords: ['abundancia', 'fertilidad', 'belleza', 'cuidado'],
    upright:
      'Rodeada de trigo y naturaleza, es la madre generosa del tarot. Anuncia prosperidad, crecimiento y cosecha. Puede señalar embarazo, un hogar próspero o un proyecto que por fin da frutos.',
    reversed: 'Descuido de uno mismo, dependencia o bloqueo creativo. Dar tanto a otros que te olvidas de ti.',
    love: 'Amor maduro, estable y cariñoso. Posible embarazo o formalización de la relación.',
    career: 'Negocios que crecen, buenas ganancias y trabajos relacionados con belleza, comida o cuidado.',
    advice: 'Cuida lo que siembras: la abundancia pide constancia.',
    element: 'tierra',
    astrology: 'Venus',
  },
  {
    name: 'El Emperador',
    numeral: 'IV',
    keywords: ['autoridad', 'estructura', 'estabilidad', 'protección'],
    upright:
      'En su trono de piedra, con armadura bajo la túnica, representa el orden y la autoridad. Habla de un hombre protector, de un jefe o de la necesidad de poner reglas y límites claros para construir algo sólido.',
    reversed: 'Autoritarismo, rigidez o abuso de poder. También falta de disciplina o de estructura.',
    love: 'Una pareja protectora y responsable, aunque puede ser controladora. Relación estable y formal.',
    career: 'Ascenso, liderazgo, trámites legales favorables y apoyo de alguien con poder.',
    advice: 'Construye con disciplina: la estructura también protege.',
    element: 'fuego',
    astrology: 'Aries',
  },
  {
    name: 'El Hierofante',
    numeral: 'V',
    keywords: ['tradición', 'fe', 'consejo', 'compromiso'],
    upright:
      'El Sumo Sacerdote bendice a dos discípulos. Representa la fe, las instituciones, los rituales y los consejos de alguien con experiencia. Puede anunciar una boda religiosa, un sacramento o la ayuda de un guía espiritual.',
    reversed: 'Romper con las normas, rebeldía o desconfiar de consejos. Buscar tu propia forma de creer.',
    love: 'Compromiso formal, matrimonio o una relación bendecida por la familia.',
    career: 'Trabajo en instituciones, estudios o seguir los procedimientos al pie de la letra.',
    advice: 'Escucha a quien ya recorrió el camino.',
    element: 'tierra',
    astrology: 'Tauro',
  },
  {
    name: 'Los Enamorados',
    numeral: 'VI',
    keywords: ['amor', 'elección', 'unión', 'valores'],
    upright:
      'Un ángel bendice a una pareja desnuda en el paraíso. Es la carta de la unión y, sobre todo, de una elección importante hecha desde el corazón. Invita a decidir de acuerdo con tus valores, no por presión.',
    reversed: 'Desacuerdos, infidelidad o una decisión que se evita. Tentaciones que ponen en riesgo lo que tienes.',
    love: 'Amor correspondido, química fuerte o la decisión entre dos personas.',
    career: 'Sociedades y alianzas favorables. Elegir entre dos ofertas.',
    advice: 'Elige desde el amor, no desde el miedo.',
    element: 'aire',
    astrology: 'Géminis',
  },
  {
    name: 'El Carro',
    numeral: 'VII',
    keywords: ['victoria', 'avance', 'determinación', 'viaje'],
    upright:
      'Un guerrero conduce un carro tirado por dos esfinges de colores opuestos. Anuncia triunfo gracias a la fuerza de voluntad y al control de fuerzas contrarias. También puede indicar un viaje o la compra de un vehículo.',
    reversed: 'Pérdida de control, obstáculos en el camino o avanzar sin rumbo. Retrasos en viajes.',
    love: 'Conquista, avance rápido de la relación o una pareja que llega de lejos.',
    career: 'Logros, competencia ganada y crecimiento acelerado. Buen momento para exigir lo tuyo.',
    advice: 'Toma las riendas: la victoria es de quien persevera.',
    element: 'agua',
    astrology: 'Cáncer',
  },
  {
    name: 'La Fuerza',
    numeral: 'VIII',
    keywords: ['coraje', 'dominio', 'paciencia', 'compasión'],
    upright:
      'Una mujer cierra con suavidad la boca de un león. La verdadera fuerza no es violenta: es paciencia, templanza y valor interior. Superarás la situación con calma y firmeza, no con rabia.',
    reversed: 'Inseguridad, impulsos descontrolados o sentir que no puedes. Te falta confiar en ti.',
    love: 'Paciencia con la pareja y reconciliación. La ternura vence el orgullo.',
    career: 'Manejar con tacto a personas difíciles. Resistencia que al final da resultados.',
    advice: 'Sé firme y suave a la vez: así se doma cualquier león.',
    element: 'fuego',
    astrology: 'Leo',
  },
  {
    name: 'El Ermitaño',
    numeral: 'IX',
    keywords: ['introspección', 'soledad', 'búsqueda', 'guía'],
    upright:
      'Un anciano sostiene una lámpara en la cima de una montaña. Pide retirarse del ruido para reflexionar y encontrar respuestas propias. También puede anunciar un maestro o consejero que ilumina el camino.',
    reversed: 'Aislamiento excesivo, soledad no deseada o negarse a pedir ayuda.',
    love: 'Tiempo a solas o un amor que llega con madurez. Relación que necesita pausa.',
    career: 'Estudio, especialización o trabajo independiente. No es momento de exponerse.',
    advice: 'Apaga el ruido exterior y enciende tu linterna interior.',
    element: 'tierra',
    astrology: 'Virgo',
  },
  {
    name: 'La Rueda de la Fortuna',
    numeral: 'X',
    keywords: ['ciclos', 'suerte', 'cambio', 'destino'],
    upright:
      'La rueda gira con criaturas que suben y bajan. Anuncia un giro del destino, casi siempre favorable: oportunidades que aparecen de repente, suerte y el fin de una mala racha. Todo ciclo cambia.',
    reversed: 'Mala racha, cambios que no se pueden controlar o resistirse a lo inevitable.',
    love: 'Encuentros inesperados o una relación que da un giro importante.',
    career: 'Golpe de suerte, dinero que llega de forma inesperada o un cambio laboral positivo.',
    advice: 'Fluye con el cambio: la rueda ya está girando a tu favor.',
    element: 'fuego',
    astrology: 'Júpiter',
  },
  {
    name: 'La Justicia',
    numeral: 'XI',
    keywords: ['equilibrio', 'verdad', 'ley', 'consecuencias'],
    upright:
      'Con espada y balanza, representa la ley de causa y efecto. Cada quien recibe lo que sembró. Favorece trámites legales, contratos y decisiones tomadas con honestidad.',
    reversed: 'Injusticia, fallos en contra o mentiras. Alguien no está siendo honesto.',
    love: 'Relación equilibrada o el momento de poner las cosas claras. Posible separación legal.',
    career: 'Contratos, demandas o papeles que se resuelven. Firma solo lo que entiendas.',
    advice: 'Actúa con rectitud: la balanza siempre se equilibra.',
    element: 'aire',
    astrology: 'Libra',
  },
  {
    name: 'El Colgado',
    numeral: 'XII',
    keywords: ['pausa', 'espera', 'sacrificio', 'otra perspectiva'],
    upright:
      'Un hombre cuelga de un pie con el rostro sereno y un halo en la cabeza. Todo se detiene por un tiempo. Es una pausa necesaria para ver la situación desde otro ángulo; forzar las cosas ahora no sirve.',
    reversed: 'Estancamiento, sacrificios inútiles o sentirse víctima. Hay que soltar para avanzar.',
    love: 'Relación en pausa, espera o dar más de lo que se recibe.',
    career: 'Proyectos detenidos y retrasos. Aprovecha para replantear la estrategia.',
    advice: 'Detente y mira desde otro ángulo: ahí está la respuesta.',
    element: 'agua',
    astrology: 'Neptuno',
  },
  {
    name: 'La Muerte',
    numeral: 'XIII',
    keywords: ['transformación', 'fin de ciclo', 'renacer', 'cambio profundo'],
    upright:
      'Un esqueleto con armadura cabalga sobre un caballo blanco. No anuncia una muerte física: habla de un final necesario y definitivo que abre paso a algo nuevo. Lo viejo se va para que puedas renacer.',
    reversed: 'Resistencia al cambio, aferrarse a lo que ya terminó o un proceso que se alarga.',
    love: 'Fin de una etapa o transformación profunda de la relación.',
    career: 'Cambio de trabajo, cierre de un negocio o reinvención total.',
    advice: 'Suelta lo que ya cumplió su ciclo para renacer.',
    element: 'agua',
    astrology: 'Escorpio',
  },
  {
    name: 'La Templanza',
    numeral: 'XIV',
    keywords: ['equilibrio', 'moderación', 'sanación', 'paciencia'],
    upright:
      'Un ángel pasa agua de una copa a otra con un pie en la tierra y otro en el agua. Pide equilibrio, calma y encontrar el punto medio. Favorece la sanación, la reconciliación y los procesos que avanzan despacio pero seguros.',
    reversed: 'Excesos, impaciencia o desequilibrio en la salud o las emociones.',
    love: 'Armonía y reconciliación. Una relación que se construye con paciencia.',
    career: 'Trabajo en equipo, acuerdos y progreso constante sin afanes.',
    advice: 'Busca el punto medio: la paciencia también es poder.',
    element: 'fuego',
    astrology: 'Sagitario',
  },
  {
    name: 'El Diablo',
    numeral: 'XV',
    keywords: ['apegos', 'tentación', 'deseo', 'ataduras'],
    upright:
      'Dos figuras encadenadas a los pies de una criatura con cuernos, aunque las cadenas están flojas. Habla de apegos, adicciones, deudas o relaciones que atan. También de pasión y deseo intenso. Tienes el poder de soltarte.',
    reversed: 'Liberación, romper cadenas y recuperar el control de tu vida.',
    love: 'Pasión muy fuerte, celos o una relación tóxica y dependiente.',
    career: 'Dinero fácil que compromete, deudas o un trabajo que te esclaviza.',
    advice: 'Mira de frente lo que te ata: las cadenas están sueltas.',
    element: 'tierra',
    astrology: 'Capricornio',
  },
  {
    name: 'La Torre',
    numeral: 'XVI',
    keywords: ['ruptura', 'revelación', 'crisis', 'liberación'],
    upright:
      'Un rayo derriba una torre y dos personas caen al vacío. Anuncia un cambio repentino que destruye lo que estaba construido sobre bases falsas. Aunque duela, deja espacio para levantar algo verdadero.',
    reversed: 'Evitar una crisis que igual llegará, o una transformación interna menos brusca.',
    love: 'Ruptura inesperada, discusiones fuertes o una verdad que sale a la luz.',
    career: 'Despido, pérdida o cambio forzado. Oportunidad de empezar sobre algo más sólido.',
    advice: 'Lo que cae hoy deja espacio para algo más auténtico.',
    element: 'fuego',
    astrology: 'Marte',
  },
  {
    name: 'La Estrella',
    numeral: 'XVII',
    keywords: ['esperanza', 'fe', 'sanación', 'inspiración'],
    upright:
      'Una mujer vierte agua bajo un cielo con ocho estrellas. Es la calma después de la tormenta: esperanza, fe renovada y sanación. Tus deseos tienen buenas posibilidades de cumplirse.',
    reversed: 'Desánimo, falta de fe o expectativas poco realistas.',
    love: 'Amor sincero, ilusión y relaciones que sanan heridas del pasado.',
    career: 'Reconocimiento, inspiración creativa y proyectos con buen futuro.',
    advice: 'Confía: las estrellas brillan más en la oscuridad.',
    element: 'aire',
    astrology: 'Acuario',
  },
  {
    name: 'La Luna',
    numeral: 'XVIII',
    keywords: ['ilusión', 'miedo', 'intuición', 'confusión'],
    upright:
      'Un perro y un lobo aúllan a la luna mientras un cangrejo sale del agua. No todo es lo que parece: hay confusión, miedos o engaños. Guíate por la intuición y no tomes decisiones importantes hasta tener claridad.',
    reversed: 'La verdad sale a la luz, se disipan los miedos y termina la confusión.',
    love: 'Dudas, celos o secretos en la relación. No te dejes llevar por la imaginación.',
    career: 'Información incompleta, posibles engaños. Lee la letra pequeña.',
    advice: 'Atraviesa la niebla guiándote por tu intuición.',
    element: 'agua',
    astrology: 'Piscis',
  },
  {
    name: 'El Sol',
    numeral: 'XIX',
    keywords: ['éxito', 'alegría', 'claridad', 'vitalidad'],
    upright:
      'Un niño feliz cabalga bajo un sol radiante. Es una de las mejores cartas del tarot: éxito, alegría, salud y claridad. Lo que preguntas tiene una respuesta positiva.',
    reversed: 'Alegría que tarda en llegar, exceso de confianza o un éxito menor del esperado.',
    love: 'Felicidad en pareja, relación sincera y posible llegada de un hijo.',
    career: 'Triunfo, reconocimiento público y buenos resultados económicos.',
    advice: 'Brilla sin pedir permiso: hoy es tu día.',
    element: 'fuego',
    astrology: 'Sol',
  },
  {
    name: 'El Juicio',
    numeral: 'XX',
    keywords: ['renacer', 'llamado', 'perdón', 'decisión'],
    upright:
      'Un ángel toca la trompeta y los muertos se levantan de sus tumbas. Es un despertar: momento de evaluar tu vida, perdonar el pasado y responder a un llamado interior. Algo que parecía perdido revive.',
    reversed: 'Dudas, autocrítica excesiva o no escuchar el llamado.',
    love: 'Reencuentros, segundas oportunidades o perdonar para seguir.',
    career: 'Resultados de exámenes o evaluaciones, noticias importantes y un nuevo rumbo.',
    advice: 'Escucha el llamado de tu alma y perdónate.',
    element: 'fuego',
    astrology: 'Plutón',
  },
  {
    name: 'El Mundo',
    numeral: 'XXI',
    keywords: ['logro', 'plenitud', 'cierre', 'viajes'],
    upright:
      'Una figura danza dentro de una corona de laurel rodeada por los cuatro evangelistas. Un ciclo se completa con éxito: meta cumplida, plenitud y reconocimiento. También favorece viajes al exterior.',
    reversed: 'Asuntos pendientes, falta de cierre o metas que quedan a medias.',
    love: 'Relación plena y estable, o el cierre de una etapa para empezar otra mejor.',
    career: 'Logro profesional, graduación o expansión del negocio a otros lugares.',
    advice: 'Celebra lo logrado: cerraste un ciclo completo.',
    element: 'tierra',
    astrology: 'Saturno',
  },
]

export const MAJOR_ARCANA: TarotCard[] = seeds.map((seed, i) => {
  const n = String(i).padStart(2, '0')
  return { ...seed, id: `major-${n}`, arcana: 'major', image: `/images/tarot/major-${n}.webp` }
})

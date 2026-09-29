import type { Element, Suit, TarotCard } from './types'

type MinorSeed = [keywords: string, upright: string, reversed: string, advice: string]

const RANKS = ['As', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete', 'Ocho', 'Nueve', 'Diez', 'Sota', 'Caballero', 'Reina', 'Rey']

export const SUITS: Record<Suit, { name: string; element: Element; theme: string; file: string }> = {
  wands: { name: 'Bastos', element: 'fuego', theme: 'Pasión, creatividad, acción y energía vital.', file: 'wands' },
  cups: { name: 'Copas', element: 'agua', theme: 'Emociones, amor, relaciones e intuición.', file: 'cups' },
  swords: { name: 'Espadas', element: 'aire', theme: 'Mente, verdad, conflictos y decisiones.', file: 'swords' },
  pentacles: { name: 'Oros', element: 'tierra', theme: 'Dinero, trabajo, cuerpo y mundo material.', file: 'pents' },
}

const DATA: Record<Suit, MinorSeed[]> = {
  wands: [
    ['inspiración, potencial, chispa', 'Una chispa creativa enciende un nuevo proyecto lleno de pasión.', 'Retrasos, falta de motivación o ideas que no despegan.', 'Aprovecha la chispa: empieza hoy.'],
    ['planificación, decisión, visión', 'Planeas tu futuro con visión; el mundo está en tus manos.', 'Miedo a lo desconocido o falta de planificación.', 'Traza el mapa antes de partir.'],
    ['expansión, previsión, oportunidades', 'Tus esfuerzos empiezan a dar frutos; mira más allá del horizonte.', 'Obstáculos inesperados o falta de visión a largo plazo.', 'Tus barcos ya vienen en camino.'],
    ['celebración, hogar, armonía', 'Celebración, estabilidad y alegría compartida en el hogar.', 'Tensión familiar o celebraciones postergadas.', 'Celebra cada pequeño logro.'],
    ['competencia, conflicto, tensión', 'Roces y competencia que, bien llevados, te hacen crecer.', 'Evitar conflictos o encontrar acuerdos.', 'Convierte la rivalidad en aprendizaje.'],
    ['victoria, reconocimiento, éxito', 'Triunfo público y reconocimiento por tu esfuerzo.', 'Ego inflado o falta de reconocimiento.', 'Recibe los aplausos con humildad.'],
    ['defensa, perseverancia, convicción', 'Defiendes tu posición con valentía frente a la presión.', 'Agotamiento o sentirte abrumada(o).', 'Mantente firme en lo que crees.'],
    ['rapidez, movimiento, noticias', 'Todo se acelera: noticias, viajes y avances rápidos.', 'Retrasos, frustración o prisas mal dirigidas.', 'Muévete con la corriente: es tu momento.'],
    ['resiliencia, persistencia, último esfuerzo', 'Estás cerca de la meta; persevera un poco más.', 'Cansancio, paranoia o ganas de rendirte.', 'Un último esfuerzo y lo logras.'],
    ['carga, responsabilidad, estrés', 'Llevas demasiado peso; es momento de delegar.', 'Soltar cargas o colapsar por exceso.', 'Suelta lo que no te corresponde cargar.'],
    ['entusiasmo, exploración, mensajes', 'Noticias emocionantes y espíritu aventurero.', 'Ideas sin concretar o impaciencia.', 'Explora con curiosidad de principiante.'],
    ['aventura, pasión, impulso', 'Energía arrolladora para perseguir tus sueños.', 'Impulsividad, imprudencia o frustración.', 'Canaliza tu fuego con dirección.'],
    ['confianza, carisma, determinación', 'Magnetismo, seguridad y calidez que inspira a otros.', 'Celos, inseguridad o exigencia excesiva.', 'Brilla con confianza y calidez.'],
    ['liderazgo, visión, emprendimiento', 'Un líder visionario que convierte ideas en realidad.', 'Autoritarismo o expectativas imposibles.', 'Lidera con el ejemplo y la visión.'],
  ],
  cups: [
    ['amor nuevo, intuición, compasión', 'Un nuevo amor o despertar emocional desborda tu corazón.', 'Emociones bloqueadas o amor propio descuidado.', 'Abre tu corazón a recibir.'],
    ['unión, atracción, conexión', 'Conexión profunda y recíproca entre dos almas.', 'Desequilibrio en la relación o ruptura.', 'Honra los vínculos recíprocos.'],
    ['amistad, celebración, comunidad', 'Celebración con amistades y alegría compartida.', 'Excesos o chismes en el círculo social.', 'Rodéate de quienes te celebran.'],
    ['apatía, contemplación, reevaluación', 'Te sientes insatisfecha(o); mira lo que ya se te ofrece.', 'Nueva motivación o aceptar oportunidades.', 'Mira las oportunidades que ignoras.'],
    ['pérdida, duelo, arrepentimiento', 'Duelo por lo perdido; aún quedan copas en pie.', 'Aceptación, perdón y seguir adelante.', 'Voltea: aún hay copas llenas detrás de ti.'],
    ['nostalgia, recuerdos, inocencia', 'Recuerdos felices e inocencia que reconfortan.', 'Vivir en el pasado o idealizarlo.', 'Honra el pasado sin quedarte en él.'],
    ['ilusiones, opciones, fantasía', 'Muchas opciones y fantasías; elige con los pies en la tierra.', 'Claridad y decisiones realistas.', 'Distingue los sueños de las ilusiones.'],
    ['abandono, búsqueda, desapego', 'Te alejas de lo que ya no te llena para buscar algo más profundo.', 'Miedo a cambiar o volver por inercia.', 'Atrévete a partir hacia lo que te llena.'],
    ['satisfacción, deseos cumplidos, gratitud', 'La carta de los deseos: satisfacción emocional y material.', 'Insatisfacción o materialismo.', 'Pide un deseo: el universo escucha.'],
    ['felicidad, familia, plenitud', 'Armonía familiar y felicidad duradera.', 'Desconexión familiar o valores distintos.', 'Agradece el amor que te rodea.'],
    ['mensajes afectivos, creatividad, sensibilidad', 'Una propuesta emocional o creativa te sorprende.', 'Inmadurez emocional o bloqueo creativo.', 'Deja que tu niña(o) interior juegue.'],
    ['romance, encanto, idealismo', 'Propuestas románticas y un corazón que sigue sus sueños.', 'Celos, cambios de humor o promesas vacías.', 'Sigue a tu corazón con honestidad.'],
    ['empatía, intuición, cuidado', 'Compasión profunda y sabiduría emocional.', 'Dependencia emocional o descuido de ti.', 'Cuídate como cuidas a los demás.'],
    ['equilibrio emocional, diplomacia, calma', 'Dominio emocional, generosidad y serenidad.', 'Manipulación emocional o represión.', 'Sé el mar en calma en medio de la tormenta.'],
  ],
  swords: [
    ['claridad, verdad, avance', 'Un momento de claridad mental rompe la confusión.', 'Confusión, caos o malas decisiones.', 'Corta con la verdad lo que confunde.'],
    ['indecisión, bloqueo, equilibrio', 'Una decisión difícil que evitas tomar.', 'Sobrecarga de información o decisión inminente.', 'Quítate la venda y decide.'],
    ['dolor, tristeza, desamor', 'Una verdad dolorosa que necesita ser sanada.', 'Recuperación, perdón y liberación del dolor.', 'Permítete sentir para poder sanar.'],
    ['descanso, recuperación, meditación', 'Pausa necesaria para descansar y recuperar fuerzas.', 'Agotamiento o inquietud.', 'Descansa: también es productivo.'],
    ['conflicto, derrota, orgullo', 'Victorias vacías y conflictos que dejan heridas.', 'Reconciliación y deseo de hacer las paces.', 'Elige la paz sobre tener la razón.'],
    ['transición, cambio, avance', 'Dejas atrás aguas turbulentas hacia tiempos más calmos.', 'Resistencia al cambio o asuntos sin resolver.', 'Avanza: aguas tranquilas te esperan.'],
    ['estrategia, sigilo, astucia', 'Actuar con estrategia; cuidado con engaños.', 'Confesión, verdad revelada o conciencia.', 'Actúa con astucia y honestidad.'],
    ['restricción, miedo, autolimitación', 'Te sientes atrapada(o), pero las ataduras son mentales.', 'Liberación y nuevas perspectivas.', 'Las vendas se quitan con valor.'],
    ['ansiedad, preocupación, insomnio', 'Preocupaciones que roban el sueño; muchas son imaginarias.', 'Esperanza, pedir ayuda o superar miedos.', 'No creas todo lo que piensas.'],
    ['final doloroso, tocar fondo, cierre', 'Un final definitivo; desde el fondo solo queda subir.', 'Recuperación y renacimiento.', 'Lo peor ya pasó: amanece.'],
    ['curiosidad, vigilancia, ideas', 'Mente despierta, curiosa y ávida de verdad.', 'Chismes, palabras hirientes o impulsividad.', 'Observa antes de hablar.'],
    ['acción, ambición, determinación', 'Avanzas con decisión y rapidez hacia tus metas.', 'Impulsividad, agresividad o dispersión.', 'Actúa rápido, pero con cabeza fría.'],
    ['independencia, claridad, honestidad', 'Mente lúcida, independiente y directa.', 'Frialdad, amargura o crueldad.', 'Di tu verdad con claridad y compasión.'],
    ['autoridad intelectual, verdad, ética', 'Juicio claro, ética y liderazgo intelectual.', 'Abuso de poder o manipulación.', 'Decide con lógica y ética.'],
  ],
  pentacles: [
    ['oportunidad, prosperidad, manifestación', 'Una nueva oportunidad económica o material llega a tus manos.', 'Oportunidades perdidas o mala planificación.', 'Siembra hoy la semilla de tu prosperidad.'],
    ['equilibrio, adaptabilidad, prioridades', 'Haces malabares con tus responsabilidades con gracia.', 'Desorganización o exceso de compromisos.', 'Prioriza y fluye con los cambios.'],
    ['trabajo en equipo, maestría, colaboración', 'Colaboración que construye algo sólido y reconocido.', 'Falta de trabajo en equipo o mediocridad.', 'Juntos construimos catedrales.'],
    ['seguridad, ahorro, control', 'Estabilidad material y ahorro; cuidado con la avaricia.', 'Generosidad o gastos excesivos.', 'Protege tus recursos sin cerrarte.'],
    ['escasez, dificultad, aislamiento', 'Tiempos difíciles; la ayuda está más cerca de lo que crees.', 'Recuperación económica y apoyo.', 'Pide ayuda: no estás sola(o).'],
    ['generosidad, dar y recibir, caridad', 'Generosidad y equilibrio entre dar y recibir.', 'Deudas, egoísmo o caridad con condiciones.', 'Da con alegría y recibe con gratitud.'],
    ['paciencia, inversión, cosecha', 'Tus esfuerzos crecen; ten paciencia con la cosecha.', 'Impaciencia o inversiones sin retorno.', 'La cosecha llega a su tiempo.'],
    ['dedicación, aprendizaje, oficio', 'Perfeccionas tu oficio con dedicación y constancia.', 'Perfeccionismo o falta de enfoque.', 'La maestría se construye día a día.'],
    ['independencia, lujo, autosuficiencia', 'Disfrutas los frutos de tu trabajo con elegancia.', 'Dependencia económica o gastos superficiales.', 'Disfruta lo que has cultivado.'],
    ['legado, riqueza, familia', 'Prosperidad duradera, herencia y bienestar familiar.', 'Conflictos familiares por dinero o inestabilidad.', 'Construye un legado que perdure.'],
    ['estudio, ambición, nuevas metas', 'Aprendizaje, nuevas metas y oportunidades de crecer.', 'Falta de progreso o procrastinación.', 'Estudia: el conocimiento es riqueza.'],
    ['constancia, responsabilidad, rutina', 'Avance lento pero seguro gracias a la constancia.', 'Estancamiento, aburrimiento o pereza.', 'Paso a paso se llega lejos.'],
    ['nutrición, practicidad, abundancia', 'Abundancia práctica, calidez y cuidado del hogar.', 'Desequilibrio entre trabajo y hogar.', 'Nutre tu cuerpo y tu hogar.'],
    ['éxito material, estabilidad, abundancia', 'Éxito empresarial, abundancia y seguridad.', 'Codicia, terquedad o mal manejo del dinero.', 'La abundancia se multiplica al compartirla.'],
]}

export const MINOR_ARCANA: TarotCard[] = (Object.keys(DATA) as Suit[]).flatMap((suit) =>
  DATA[suit].map(([keywords, upright, reversed, advice], i) => {
    const n = String(i + 1).padStart(2, '0')
    const meta = SUITS[suit]
    return {
      id: `${meta.file}-${n}`,
      name: `${RANKS[i]} de ${meta.name}`,
      arcana: 'minor' as const,
      suit,
      numeral: RANKS[i],
      image: `/images/tarot/${meta.file}-${n}.webp`,
      keywords: keywords.split(', '),
      upright,
      reversed,
      advice,
      element: meta.element,
    }
  }),
)

export interface Consejo {
  text: string
  author?: string
  intention: 'suerte' | 'abundancia' | 'proteccion' | 'sabiduria'
}

export const CONSEJOS: Consejo[] = [
  { intention: 'suerte', text: 'La suerte no llega a quien la espera sentado: llega a quien deja la puerta abierta y el corazón liviano.' },
  { intention: 'suerte', text: 'Cada mañana siembras algo, aunque no lo veas. Lo que hoy parece nada, mañana es sombra de árbol.' },
  { intention: 'suerte', text: 'Agradece lo que ya tienes antes de pedir lo que falta: la suerte prefiere las manos que saben recibir.' },
  { intention: 'suerte', text: 'Un trébol de cuatro hojas no se encuentra buscando con afán, sino mirando con calma.' },
  { intention: 'suerte', text: 'Quien ayuda sin esperar nada cambia el aire a su alrededor, y el aire limpio atrae cosas buenas.' },
  { intention: 'suerte', text: 'No cuentes tus planes antes de tiempo: lo que se cuida en silencio crece más fuerte.' },
  { intention: 'suerte', text: 'La buena racha empieza el día que dejas de compararte y empiezas a avanzar a tu propio paso.' },
  { intention: 'suerte', text: 'Cuando un camino se cierra, mira con cuidado: casi siempre hay otra puerta, más pequeña, esperándote.' },
  { intention: 'suerte', text: 'Sonríele a lo pequeño de hoy. La suerte grande suele llegar disfrazada de detalle.' },
  { intention: 'suerte', text: 'Limpia tu casa, limpia tu mente: lo liviano se mueve rápido y la suerte también.' },
  { intention: 'abundancia', text: 'La abundancia empieza en cómo hablas de tu dinero: trátalo con respeto y volverá con gusto.' },
  { intention: 'abundancia', text: 'El agua que se estanca se pudre; el dinero que circula con gratitud vuelve multiplicado.' },
  { intention: 'abundancia', text: 'Guarda un poquito de cada cosa que ganes. La semilla que no se guarda no da árbol.' },
  { intention: 'abundancia', text: 'Ordena tu espacio y ordenarás tus cuentas: la abundancia entra por donde hay lugar para ella.' },
  { intention: 'abundancia', text: 'No trabajes solo por dinero: trabaja por hacerlo bien, y el dinero sabrá dónde encontrarte.' },
  { intention: 'abundancia', text: 'Comparte con quien lo necesita: la mano que da nunca queda vacía por mucho tiempo.' },
  { intention: 'abundancia', text: 'Cada moneda que cuidas es una semilla. Ten paciencia, el bosque no se hizo en un día.' },
  { intention: 'abundancia', text: 'Lo que tienes hoy fue algún día lo que soñabas. Míralo con cariño y sigue soñando.' },
  { intention: 'abundancia', text: 'La verdadera riqueza es dormir tranquilo. Lo demás se construye poco a poco.' },
  { intention: 'abundancia', text: 'Quien siembra con constancia cosecha con calma. No te desesperes por el ritmo de la tierra.' },
  { intention: 'proteccion', text: 'Cuida tu energía como cuidas tu casa: no dejes entrar a cualquiera ni a cualquier pensamiento.' },
  { intention: 'proteccion', text: 'Rodéate de quienes te dejan más liviano después de verlos. Esa es la mejor protección.' },
  { intention: 'proteccion', text: 'Lo que no puedes cambiar, suéltalo. Lo que puedes cambiar, empiézalo hoy.' },
  { intention: 'proteccion', text: 'Respira antes de responder. Un silencio a tiempo protege más que mil palabras.' },
  { intention: 'proteccion', text: 'Tu paz vale más que tener la razón. Cuídala como a una luz que se puede apagar con el viento.' },
  { intention: 'proteccion', text: 'Los duendes dicen: quien agradece cada noche duerme bajo una manta que nadie ve.' },
  { intention: 'sabiduria', author: 'Lao Tse', text: 'Un viaje de mil millas comienza con un solo paso.' },
  { intention: 'sabiduria', author: 'Séneca', text: 'No es pobre el que tiene poco, sino el que desea más.' },
  { intention: 'sabiduria', author: 'Epicteto', text: 'No son las cosas las que nos perturban, sino la opinión que tenemos de ellas.' },
  { intention: 'sabiduria', author: 'Marco Aurelio', text: 'Lo que no conviene a la colmena, no conviene a la abeja.' },
  { intention: 'sabiduria', author: 'Proverbio popular', text: 'Quien siembra, cosecha; y quien cuida lo sembrado, cosecha dos veces.' },
  { intention: 'sabiduria', author: 'Proverbio popular', text: 'Camarón que se duerme se lo lleva la corriente; el que descansa a tiempo, llega más lejos.' },
  { intention: 'sabiduria', text: 'Todo lo grande que existe fue alguna vez una semilla que alguien decidió no abandonar.' },
  { intention: 'sabiduria', text: 'Hoy no tienes que resolver toda tu vida, solo regar tu planta. Mañana volverás a regarla.' },
]

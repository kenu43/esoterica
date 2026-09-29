export interface GuardianAffirmation {
  text: string
  intention: string
}

export const GUARDIAN_AFFIRMATIONS: GuardianAffirmation[] = [
  { text: 'La abundancia toca tu puerta hoy: recíbela con las manos abiertas.', intention: 'abundancia' },
  { text: 'El dinero fluye hacia ti como el agua busca su cauce.', intention: 'abundancia' },
  { text: 'Tu suerte cambia en el momento en que dejas de dudarla.', intention: 'suerte' },
  { text: 'Los caminos cerrados se abren cuando limpias lo que ya no sirve.', intention: 'limpieza' },
  { text: 'Tu trabajo dará frutos que todavía ni imaginas.', intention: 'trabajo' },
  { text: 'La protección que pides ya está puesta sobre ti.', intention: 'proteccion' },
  { text: 'Hoy la fortuna reconoce tu nombre.', intention: 'suerte' },
  { text: 'Todo lo que siembras hoy con devoción, se multiplica.', intention: 'abundancia' },
  { text: 'Un cliente que dudaba, hoy dice que sí.', intention: 'trabajo' },
  { text: 'Lo que se fue no era para ti; lo que viene, sí.', intention: 'suerte' },
]

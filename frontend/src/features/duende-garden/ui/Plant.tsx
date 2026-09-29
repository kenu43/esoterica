interface PlantProps {
  stage: number
  art: string | null
}

/** Terrario de cristal con la planta en su etapa: 0 semilla, 1 brote, 2 hojas, 3 crece, 4 en flor. */
export function Plant({ stage, art }: PlantProps) {
  const src = art ? `/images/duende/${art}-${Math.min(stage, 4)}.png` : '/images/duende/vacio.png'
  return (
    <img
      src={src}
      alt={art ? 'Tu planta' : 'Parcela vacía'}
      draggable={false}
      className="mx-auto h-40 w-auto drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)] sm:h-44"
    />
  )
}

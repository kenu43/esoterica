import { motion } from 'motion/react'
import { useState } from 'react'

const COLORS = ['#f2c94c', '#e6b422', '#ffffff', '#c084fc', '#34d399', '#f472b6']

/** Estallido de confeti dorado desde el centro. Se monta cuando algo se completa y se desvanece solo. */
export function Confetti({ count = 44 }: { count?: number }) {
  const [pieces] = useState(() =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5
        const dist = 90 + Math.random() * 130
        return {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist - 30,
          rot: Math.random() * 540 - 270,
          color: COLORS[i % COLORS.length],
          w: 5 + Math.random() * 6,
          delay: Math.random() * 0.1,
        }
      }),
  )

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20 overflow-visible">
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
          animate={{ opacity: 0, x: p.x, y: p.y + 90, rotate: p.rot, scale: 0.6 }}
          transition={{ duration: 1.4, delay: p.delay, ease: [0.2, 0.7, 0.3, 1] }}
          className="absolute left-1/2 top-1/2 block rounded-[2px]"
          style={{ width: p.w, height: p.w * 1.6, background: p.color }}
        />
      ))}
    </div>
  )
}

import { AnimatedNumber } from '@/shared/ui'
import { Button } from '@heroui/react'
import { ScrollText } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { selectCount, useInquiryStore } from '../model/inquiry.store'

/** Botón del header con contador animado de productos en consulta. */
export function InquiryTrigger() {
  const count = useInquiryStore(selectCount)
  const setOpen = useInquiryStore((s) => s.setOpen)

  return (
    <Button
      isIconOnly
      variant="ghost"
      aria-label={`Mi lista de consulta (${count} productos)`}
      onPress={() => setOpen(true)}
      className="relative shrink-0 overflow-visible"
    >
      <ScrollText className="size-5" />
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0 }}
            animate={{ scale: [1.5, 1] }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 18 }}
            className="absolute right-0 top-0.5 grid min-w-[18px] place-items-center rounded-full bg-gold px-1 text-[10px] leading-[18px] font-bold text-[oklch(0.18_0.04_290)]"
          >
            <AnimatedNumber value={count} />
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  )
}

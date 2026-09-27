import { Button, toast } from '@heroui/react'
import { Check, MessageCirclePlus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import type { Product } from '@/entities/product'
import { cn } from '@/shared/lib'
import { useInquiryStore } from '../model/inquiry.store'

interface AddToInquiryButtonProps {
  product: Product
  variant?: 'icon' | 'full'
  /** Color, tamaño, material y texto de personalización elegidos (todos opcionales). */
  color?: string
  size?: string
  material?: string
  customText?: string
  quantity?: number
  className?: string
}

export function AddToInquiryButton({
  product,
  variant = 'icon',
  color,
  size,
  material,
  customText,
  quantity = 1,
  className,
}: AddToInquiryButtonProps) {
  const add = useInquiryStore((s) => s.add)
  const setOpen = useInquiryStore((s) => s.setOpen)
  const [added, setAdded] = useState(false)

  const onPress = () => {
    add(product.id, { color, size, material, customText }, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
    toast.success(`${product.name} agregado a tu consulta`, {
      description: 'Envía tu lista por WhatsApp cuando estés lista(o).',
      actionProps: { children: 'Ver lista', onPress: () => setOpen(true) },
    })
  }

  const icon = (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={added ? 'check' : 'add'}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.4, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        className="grid place-items-center"
      >
        {added ? <Check className="size-5" /> : <MessageCirclePlus className="size-5" />}
      </motion.span>
    </AnimatePresence>
  )

  if (variant === 'icon') {
    return (
      <Button
        isIconOnly
        variant={added ? 'primary' : 'secondary'}
        aria-label={product.inStock ? `Agregar ${product.name} a la consulta` : `${product.name} está agotado`}
        isDisabled={!product.inStock}
        onPress={onPress}
        className={cn('shrink-0 transition-transform active:scale-90', className)}
      >
        {icon}
      </Button>
    )
  }

  return (
    <Button size="lg" variant="primary" isDisabled={!product.inStock} onPress={onPress} className={cn('gap-2', className)}>
      {icon}
      {!product.inStock ? 'Agotado por ahora' : added ? '¡Agregado!' : 'Agregar a mi consulta'}
    </Button>
  )
}

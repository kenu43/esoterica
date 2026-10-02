import { Button, Drawer, TextArea } from '@heroui/react'
import { Minus, Plus, ScrollText, Send, Trash2 } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { ANY_BRANCH_ID, BRANCH_CHOICES, resolveBranch } from '@/entities/branch'
import { ProductImage, useProducts } from '@/entities/product'
import { ROUTES } from '@/shared/config'
import { cn, formatPrice, openWhatsApp } from '@/shared/lib'
import { LotusIcon } from '@/shared/ui'
import { buildInquiryMessage, SHIPPING_OPTIONS, type ShippingId } from '../lib/build-message'
import { useInquiryStore } from '../model/inquiry.store'

export function InquiryDrawer() {
  const { items, branchId, isOpen, setOpen, setQuantity, remove, setBranch, clear } = useInquiryStore()
  const { data: products = [] } = useProducts({ ids: items.map((i) => i.productId), limit: 100 })
  const [note, setNote] = useState('')
  const [shipping, setShipping] = useState<ShippingId>('domicilio')

  const lines = useMemo(
    () =>
      items.flatMap((i) => {
        const product = products.find((p) => p.id === i.productId)
        return product
          ? [
              {
                product,
                quantity: i.quantity,
                color: i.color,
                size: i.size,
                material: i.material,
                variant: i.variant,
                customText: i.customText,
              },
            ]
          : []
      }),
    [items, products],
  )
  const unitPrice = (l: (typeof lines)[number]) =>
    l.product.sizes.find((s) => s.name === l.size)?.price ??
    l.product.materials.find((m) => m.name === l.material)?.price ??
    l.product.variants.find((v) => v.name === l.variant)?.price ??
    l.product.price
  const total = lines.reduce((acc, l) => acc + unitPrice(l) * l.quantity, 0)
  const branch = resolveBranch(branchId)

  const send = () =>
    openWhatsApp(
      branch.whatsapp,
      buildInquiryMessage(lines, { branch, anyBranch: branchId === ANY_BRANCH_ID, shipping, note: note.trim() }),
    )

  return (
    <Drawer isOpen={isOpen} onOpenChange={setOpen}>
      <Drawer.Backdrop>
        <Drawer.Content placement="right">
          <Drawer.Dialog className="flex h-full w-[92vw] max-w-[92vw] flex-col sm:w-[440px]">
            <Drawer.CloseTrigger />
            <Drawer.Header className="border-b border-separator pb-4">
              <Drawer.Heading className="flex items-center gap-2 font-display text-2xl">
                <ScrollText className="size-6 text-gold" aria-hidden />
                Mi consulta
              </Drawer.Heading>
              <p className="text-sm text-muted">
                Arma tu lista y te confirmamos disponibilidad, precio final y envío por WhatsApp.
              </p>
            </Drawer.Header>

            <Drawer.Body className="flex-1 space-y-6 overflow-y-auto py-5">
              {lines.length === 0 ? (
                <div className="flex flex-col items-center gap-4 py-16 text-center">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="grid size-20 place-items-center rounded-full bg-mystic-soft text-gold"
                    aria-hidden
                  >
                    <LotusIcon className="size-10" />
                  </motion.div>
                  <p className="font-display text-xl">Tu lista está vacía</p>
                  <p className="max-w-xs text-sm text-muted">
                    Agrega los productos que te interesen y nos los envías por WhatsApp en un solo mensaje.
                  </p>
                  <Link
                    to={ROUTES.products}
                    onClick={() => setOpen(false)}
                    className="button button--primary"
                  >
                    Ver productos
                  </Link>
                </div>
              ) : (
                <>
                  <ul className="space-y-3">
                    <AnimatePresence initial={false}>
                      {lines.map((line) => {
                        const { product, quantity, color, size, material, variant: optionValue, customText } = line
                        const price = unitPrice(line)
                        const variant = { color, size, material, variant: optionValue, customText }
                        return (
                        <motion.li
                          key={`${product.id}-${color ?? ''}-${size ?? ''}-${material ?? ''}-${optionValue ?? ''}-${customText ?? ''}`}
                          layout
                          initial={{ opacity: 0, x: 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 40, height: 0, marginTop: 0 }}
                          className="flex gap-3 overflow-hidden rounded-2xl border border-border bg-surface-secondary p-3"
                        >
                          <ProductImage product={product} className="size-16 shrink-0 rounded-xl object-cover" />
                          <div className="flex min-w-0 flex-1 flex-col">
                            <span className="truncate font-semibold">{product.name}</span>
                            <span className="text-xs text-muted">
                              {product.unit}
                              {product.colors.length > 0 && ` · ${color ?? 'Cualquiera'}`}
                              {product.sizes.length > 0 && ` · ${size ?? 'Cualquiera'}`}
                              {product.materials.length > 0 && ` · ${material ?? 'Cualquiera'}`}
                              {product.variants.length > 0 && ` · ${optionValue ?? 'Cualquiera'}`}
                              {customText && ` · "${customText}"`}
                            </span>
                            <div className="mt-auto flex items-center justify-between gap-2 pt-1">
                              <div className="flex items-center gap-1">
                                <Button
                                  isIconOnly
                                  size="sm"
                                  variant="ghost"
                                  aria-label="Disminuir cantidad"
                                  onPress={() => setQuantity(product.id, quantity - 1, variant)}
                                >
                                  <Minus className="size-3.5" />
                                </Button>
                                <span className="w-6 text-center text-sm font-semibold tabular-nums">{quantity}</span>
                                <Button
                                  isIconOnly
                                  size="sm"
                                  variant="ghost"
                                  aria-label="Aumentar cantidad"
                                  onPress={() => setQuantity(product.id, quantity + 1, variant)}
                                >
                                  <Plus className="size-3.5" />
                                </Button>
                              </div>
                              <span className="text-sm font-bold">{formatPrice(price * quantity)}</span>
                            </div>
                          </div>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="ghost"
                            aria-label={`Quitar ${product.name}`}
                            onPress={() => remove(product.id, variant)}
                            className="self-start text-muted hover:text-danger"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </motion.li>
                        )
                      })}
                    </AnimatePresence>
                  </ul>

                  <fieldset className="space-y-2">
                    <legend className="mb-2 text-sm font-semibold">¿A qué tienda le escribimos?</legend>
                    <div className="grid gap-2">
                      {BRANCH_CHOICES.map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setBranch(b.id)}
                          aria-pressed={b.id === branchId}
                          className={cn(
                            'flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-all',
                            b.id === branchId
                              ? 'border-gold bg-gold-soft shadow-[0_0_0_1px_var(--gold)]'
                              : 'border-border hover:border-gold/40',
                          )}
                        >
                          <span>
                            <span className="block font-semibold">{b.name}</span>
                            <span className="text-xs text-muted">{b.specialty}</span>
                          </span>
                          <span
                            className={cn(
                              'size-4 rounded-full border-2 transition-colors',
                              b.id === branchId ? 'border-gold bg-gold' : 'border-border',
                            )}
                            aria-hidden
                          />
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="space-y-2">
                    <legend className="mb-2 text-sm font-semibold">¿Cómo lo recibes?</legend>
                    <div className="flex flex-wrap gap-2">
                      {SHIPPING_OPTIONS.map((s) => (
                        <button
                          key={s.value}
                          type="button"
                          onClick={() => setShipping(s.value)}
                          aria-pressed={s.value === shipping}
                          className={cn(
                            'rounded-full border px-3.5 py-1.5 text-sm transition-colors',
                            s.value === shipping ? 'border-gold bg-gold-soft' : 'border-border hover:border-gold/40',
                          )}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <label className="block space-y-2">
                    <span className="text-sm font-semibold">Nota (opcional)</span>
                    <TextArea
                      fullWidth
                      rows={2}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Ej.: envío a Bogotá, ¿lo tienen en otro color?"
                    />
                  </label>
                </>
              )}
            </Drawer.Body>

            {lines.length > 0 && (
              <Drawer.Footer className="flex-col gap-3 border-t border-separator pt-4">
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm text-muted">Total estimado</span>
                  <span className="text-2xl font-bold">{formatPrice(total)}</span>
                </div>
                {lines.some((l) => unitPrice(l) <= 0) && (
                  <p className="-mt-2 text-xs text-muted">Incluye productos con precio a consultar, no sumado arriba.</p>
                )}
                <Button
                  fullWidth
                  size="lg"
                  onPress={send}
                  className="gap-2 bg-[#25D366] font-semibold text-white hover:bg-[#1ebe5a]"
                >
                  <Send className="size-4" />
                  Enviar por WhatsApp
                </Button>
                <Button fullWidth variant="ghost" size="sm" onPress={clear} className="text-muted">
                  Vaciar lista
                </Button>
              </Drawer.Footer>
            )}
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  )
}

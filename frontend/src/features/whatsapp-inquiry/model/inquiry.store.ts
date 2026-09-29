import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_BRANCH_ID, type BranchChoiceId } from '@/entities/branch'

export interface InquiryItem {
  productId: string
  quantity: number
  color?: string
  size?: string
  material?: string
  variant?: string
  customText?: string
}

export interface InquiryVariant {
  color?: string
  size?: string
  material?: string
  variant?: string
  customText?: string
}

const VARIANT_KEYS = ['color', 'size', 'material', 'variant', 'customText'] as const

const same = (i: InquiryItem, productId: string, variant: InquiryVariant = {}) =>
  i.productId === productId && VARIANT_KEYS.every((k) => (i[k] ?? '') === (variant[k] ?? ''))

interface InquiryState {
  items: InquiryItem[]
  branchId: BranchChoiceId
  isOpen: boolean
  add: (productId: string, variant?: InquiryVariant, quantity?: number) => void
  remove: (productId: string, variant?: InquiryVariant) => void
  setQuantity: (productId: string, quantity: number, variant?: InquiryVariant) => void
  setBranch: (branchId: BranchChoiceId) => void
  clear: () => void
  setOpen: (open: boolean) => void
}

/**
 * Lista de consulta (no es un carrito de compra): el cliente reúne productos
 * y los envía por WhatsApp a la sede elegida. Persiste en localStorage.
 */
export const useInquiryStore = create<InquiryState>()(
  persist(
    (set) => ({
      items: [],
      branchId: DEFAULT_BRANCH_ID,
      isOpen: false,
      add: (productId, variant = {}, quantity = 1) =>
        set((s) => {
          const existing = s.items.find((i) => same(i, productId, variant))
          return {
            items: existing
              ? s.items.map((i) => (same(i, productId, variant) ? { ...i, quantity: i.quantity + quantity } : i))
              : [...s.items, { productId, quantity, ...variant }],
          }
        }),
      remove: (productId, variant) => set((s) => ({ items: s.items.filter((i) => !same(i, productId, variant)) })),
      setQuantity: (productId, quantity, variant) =>
        set((s) => ({
          items:
            quantity <= 0
              ? s.items.filter((i) => !same(i, productId, variant))
              : s.items.map((i) => (same(i, productId, variant) ? { ...i, quantity } : i)),
        })),
      setBranch: (branchId) => set({ branchId }),
      clear: () => set({ items: [] }),
      setOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: 'ue-inquiry',
      partialize: ({ items, branchId }) => ({ items, branchId }),
    },
  ),
)

export const selectCount = (s: InquiryState) => s.items.reduce((acc, i) => acc + i.quantity, 0)

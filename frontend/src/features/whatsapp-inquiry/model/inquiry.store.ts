import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_BRANCH_ID, type BranchChoiceId } from '@/entities/branch'

export interface InquiryItem {
  productId: string
  quantity: number
}

interface InquiryState {
  items: InquiryItem[]
  branchId: BranchChoiceId
  isOpen: boolean
  add: (productId: string) => void
  remove: (productId: string) => void
  setQuantity: (productId: string, quantity: number) => void
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
      add: (productId) =>
        set((s) => {
          const existing = s.items.find((i) => i.productId === productId)
          return {
            items: existing
              ? s.items.map((i) => (i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i))
              : [...s.items, { productId, quantity: 1 }],
          }
        }),
      remove: (productId) => set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),
      setQuantity: (productId, quantity) =>
        set((s) => ({
          items:
            quantity <= 0
              ? s.items.filter((i) => i.productId !== productId)
              : s.items.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
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

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Wish {
  id: string
  text: string
  createdAt: string
  granted: boolean
}

interface WishState {
  wishes: Wish[]
  lastWishAt: number
  add: (text: string) => Wish
  grant: (id: string) => void
  remove: (id: string) => void
}

export const WISH_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000

export const useWishStore = create<WishState>()(
  persist(
    (set) => ({
      wishes: [],
      lastWishAt: 0,
      add: (text) => {
        const wish: Wish = {
          id: Math.random().toString(36).slice(2),
          text: text.trim(),
          createdAt: new Date().toISOString(),
          granted: false,
        }
        set((s) => ({ wishes: [wish, ...s.wishes], lastWishAt: Date.now() }))
        return wish
      },
      grant: (id) => set((s) => ({ wishes: s.wishes.map((w) => (w.id === id ? { ...w, granted: true } : w)) })),
      remove: (id) => set((s) => ({ wishes: s.wishes.filter((w) => w.id !== id) })),
    }),
    { name: 'ue-wish-urn' },
  ),
)

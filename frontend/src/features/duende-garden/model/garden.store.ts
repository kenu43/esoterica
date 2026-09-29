import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { dayKey } from '@/shared/lib'
import { DAYS_TO_HARVEST, PLOT_COUNT } from './garden.data'

export interface Plot {
  seed: string | null
  days: string[]
}

interface GardenState {
  plots: Plot[]
  harvests: number
  seen: number[]
  plant: (i: number, seed: string) => void
  water: (i: number) => void
  harvest: (i: number, consejo: number, cycle: number) => void
}

const empty = (): Plot[] => Array.from({ length: PLOT_COUNT }, () => ({ seed: null, days: [] }))

export const useGardenStore = create<GardenState>()(
  persist(
    (set) => ({
      plots: empty(),
      harvests: 0,
      seen: [],
      plant: (i, seed) => set((s) => ({ plots: s.plots.map((p, j) => (j === i && !p.seed ? { seed, days: [] } : p)) })),
      water: (i) =>
        set((s) => ({
          plots: s.plots.map((p, j) => {
            const today = dayKey()
            return j === i && p.seed && p.days.length < DAYS_TO_HARVEST && !p.days.includes(today)
              ? { ...p, days: [...p.days, today] }
              : p
          }),
        })),
      harvest: (i, consejo, cycle) =>
        set((s) =>
          s.plots[i]?.days.length >= DAYS_TO_HARVEST
            ? { harvests: s.harvests + 1, seen: s.seen.length >= cycle ? [consejo] : [...s.seen, consejo], plots: s.plots.map((p, j) => (j === i ? { seed: null, days: [] } : p)) }
            : s,
        ),
    }),
    { name: 'ue-duende-garden' },
  ),
)

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { dayKey, hashString } from '@/shared/lib'

interface SeekerState {
  visitorId: string
  name: string
  birth: string
  setSeeker: (name: string, birth: string) => void
  doneOn: Record<string, string>
  markDone: (feature: string) => void
}

const newId = () => Math.random().toString(36).slice(2) + Date.now().toString(36)

export const useSeekerStore = create<SeekerState>()(
  persist(
    (set) => ({
      visitorId: newId(),
      name: '',
      birth: '',
      doneOn: {},
      setSeeker: (name, birth) => set({ name: name.trim(), birth, doneOn: {} }),
      markDone: (feature) => set((s) => ({ doneOn: { ...s.doneOn, [feature]: dayKey() } })),
    }),
    { name: 'ue-seeker' },
  ),
)

/** Semilla personal y estable para hoy: misma persona + mismo día = misma lectura; otra persona = otra. */
export function seekerSeed(s: Pick<SeekerState, 'visitorId' | 'name' | 'birth'>, salt = '', date = new Date()) {
  const who = s.name && s.birth ? `${s.name.toLowerCase()}|${s.birth}` : s.visitorId
  return hashString(`${who}|${dayKey(date)}|${salt}`)
}

/** Generador pseudoaleatorio con semilla (mulberry32): mismos datos, mismas cartas o números. */
export function seededRandom(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

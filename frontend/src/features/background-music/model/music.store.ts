import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MusicState {
  isOn: boolean
  setOn: (on: boolean) => void
}

/** Preferencia de música ambiental, recordada entre visitas. Suena al entrar por defecto. */
export const useMusicStore = create<MusicState>()(
  persist((set) => ({ isOn: true, setOn: (isOn) => set({ isOn }) }), { name: 'ue-music-v2' }),
)

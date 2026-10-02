import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MusicState {
  isOn: boolean
  setOn: (on: boolean) => void
  /** 0–1: nivel que elige la persona; el volumen real es este valor por MAX_VOLUME. */
  volume: number
  setVolume: (v: number) => void
}

/** Preferencia de música ambiental, recordada entre visitas. Suena al entrar por defecto. */
export const useMusicStore = create<MusicState>()(
  persist((set) => ({ isOn: true, setOn: (isOn) => set({ isOn }), volume: 0.5, setVolume: (volume) => set({ volume }) }), { name: 'ue-music-v2' }),
)

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemePreference = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: ThemePreference
  setTheme: (theme: ThemePreference) => void
}

const media = () => window.matchMedia('(prefers-color-scheme: dark)')

export const resolveTheme = (theme: ThemePreference) =>
  theme === 'system' ? (media().matches ? 'dark' : 'light') : theme

/** Aplica el tema al <html> (clase + data-theme, que es lo que HeroUI observa). */
export function applyTheme(theme: ThemePreference) {
  const resolved = resolveTheme(theme)
  const root = document.documentElement
  root.classList.toggle('dark', resolved === 'dark')
  root.classList.toggle('light', resolved === 'light')
  root.dataset.theme = resolved
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => {
        applyTheme(theme)
        set({ theme })
      },
    }),
    { name: 'esoterica-theme' },
  ),
)

/** Mantiene sincronizado el tema "system" con el sistema operativo. */
export function watchSystemTheme() {
  const mql = media()
  const onChange = () => {
    if (useThemeStore.getState().theme === 'system') applyTheme('system')
  }
  mql.addEventListener('change', onChange)
  return () => mql.removeEventListener('change', onChange)
}

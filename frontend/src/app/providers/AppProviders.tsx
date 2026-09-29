import { Toast } from '@heroui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MotionConfig } from 'motion/react'
import { useEffect, useState, type ReactNode } from 'react'
import { applyTheme, useThemeStore, watchSystemTheme } from '@/features/theme-toggle'
import { initAnalytics } from '@/shared/api'

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  })
}

/** Proveedores globales que no dependen del router. */
export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(createQueryClient)
  const theme = useThemeStore((s) => s.theme)
  const [toastPlacement, setToastPlacement] = useState<'top' | 'bottom'>('bottom')

  useEffect(() => applyTheme(theme), [theme])
  useEffect(() => watchSystemTheme(), [])
  useEffect(() => {
    initAnalytics().catch(() => undefined)
  }, [])
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const update = () => setToastPlacement(mq.matches ? 'top' : 'bottom')
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        {children}
        <Toast.Provider placement={toastPlacement} />
      </MotionConfig>
    </QueryClientProvider>
  )
}

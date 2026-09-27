import { Button, Tooltip } from '@heroui/react'
import { Moon, Sun } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { resolveTheme, useThemeStore } from '../model/theme.store'

/**
 * Alterna claro/oscuro. Usa la View Transitions API (si existe) para un
 * barrido circular desde el botón — el mismo truco que Magic UI.
 */
export function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme)
  const setTheme = useThemeStore((s) => s.setTheme)
  const isDark = resolveTheme(theme) === 'dark'

  const toggle = (x: number, y: number) => {
    const next = isDark ? 'light' : 'dark'
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduce) {
      setTheme(next)
      return
    }
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    const transition = document.startViewTransition(() => setTheme(next))
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }

  return (
    <Tooltip delay={400}>
      <Button
        isIconOnly
        variant="ghost"
        aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
        onPress={(e) => {
          const rect = (e.target as HTMLElement).getBoundingClientRect()
          toggle(rect.left + rect.width / 2, rect.top + rect.height / 2)
        }}
        className="relative overflow-hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? 'moon' : 'sun'}
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.25 }}
            className="grid place-items-center"
          >
            {isDark ? <Moon className="size-5 text-gold" /> : <Sun className="size-5 text-gold" />}
          </motion.span>
        </AnimatePresence>
      </Button>
      <Tooltip.Content>{isDark ? 'Modo claro' : 'Modo oscuro'}</Tooltip.Content>
    </Tooltip>
  )
}

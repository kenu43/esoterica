import { Button } from '@heroui/react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { ThemeToggle } from '@/features/theme-toggle'
import { InquiryTrigger } from '@/features/whatsapp-inquiry'
import { NAV_ITEMS, ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Logo } from '@/shared/ui'

export function Header() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  // Se compacta al bajar y se oculta al hacer scroll rápido hacia abajo
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > 400 && y > prev + 4 && !open)
    if (y < prev - 4) setHidden(false)
  })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6"
      >
        <nav
          aria-label="Principal"
          className={cn(
            'mx-auto flex max-w-7xl items-center justify-between gap-2 rounded-2xl px-2 transition-all duration-500 sm:gap-4 sm:px-4',
            scrolled ? 'glass h-16 shadow-lg shadow-black/5' : 'h-20 bg-transparent',
          )}
        >
          <Link to={ROUTES.home} aria-label="Inicio" className="shrink-0">
            <Logo />
          </Link>

          <ul className="hidden items-center xl:flex" onMouseLeave={() => setHovered(null)}>
            {NAV_ITEMS.map((item) => (
              <li key={item.to} onMouseEnter={() => setHovered(item.to)} className="relative">
                <NavLink
                  to={item.to}
                  end={item.to === ROUTES.home}
                  className={({ isActive }) =>
                    cn(
                      'relative z-10 block whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors 2xl:px-4',
                      isActive ? 'text-gold' : 'text-foreground/80 hover:text-foreground',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
                        />
                      )}
                    </>
                  )}
                </NavLink>
                {hovered === item.to && (
                  <motion.span
                    layoutId="nav-hover"
                    className="absolute inset-0 rounded-xl bg-default/70"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center sm:gap-1">
            <ThemeToggle />
            <InquiryTrigger />
            <Button
              isIconOnly
              variant="ghost"
              className="xl:hidden"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              onPress={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </nav>
      </motion.header>

      {/* Menú móvil a pantalla completa */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-background/95 px-6 pb-10 pt-28 backdrop-blur-xl xl:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } }}
              className="flex flex-col gap-1"
            >
              {NAV_ITEMS.map((item) => (
                <motion.li
                  key={item.to}
                  variants={{ hidden: { opacity: 0, x: 30 }, show: { opacity: 1, x: 0 } }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === ROUTES.home}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'block border-b border-separator py-3.5 font-display text-2xl',
                        isActive ? 'text-gold' : 'text-foreground',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>
            <p className="mt-auto text-center text-sm text-muted">Universo Esotérico · Ibagué desde 1981</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

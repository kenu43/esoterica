import { RouterProvider as AriaRouterProvider } from '@heroui/react'
import { AnimatePresence, motion } from 'motion/react'
import { Suspense } from 'react'
import { ScrollRestoration, useHref, useLocation, useNavigate, useOutlet } from 'react-router'
import { InquiryDrawer, WhatsAppFab } from '@/features/whatsapp-inquiry'
import { ScrollProgress } from '@/shared/ui'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { PageLoader } from './PageLoader'

/**
 * Layout raíz: header, footer y overlays globales.
 * Las páginas entran/salen con un fundido + desenfoque (AnimatePresence).
 */
export function RootLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const outlet = useOutlet()

  return (
    // Conecta los links de HeroUI/React Aria (Breadcrumbs, Link…) con React Router
    <AriaRouterProvider navigate={(to, opts) => navigate(to, opts)} useHref={useHref}>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:text-black"
      >
        Saltar al contenido
      </a>
      <ScrollProgress />
      <Header />

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="contenido"
          key={location.pathname}
          initial={{ opacity: 0, filter: 'blur(6px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="min-h-screen"
        >
          <Suspense fallback={<PageLoader />}>{outlet}</Suspense>
        </motion.main>
      </AnimatePresence>

      <Footer />
      <InquiryDrawer />
      <WhatsAppFab />
      <ScrollRestoration />
    </AriaRouterProvider>
  )
}

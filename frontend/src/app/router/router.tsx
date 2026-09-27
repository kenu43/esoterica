import { createBrowserRouter, Navigate } from 'react-router'
import { HomePage } from '@/pages/home'
import { NotFoundPage } from '@/pages/not-found'
import { ROUTES } from '@/shared/config'
import { RootLayout } from '../layouts/RootLayout'
import { RouteError } from './RouteError'

/**
 * Rutas con code-splitting: solo la home viaja en el bundle inicial,
 * el resto se descarga bajo demanda (`lazy`).
 */
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { path: ROUTES.home, element: <HomePage /> },
      {
        path: ROUTES.products,
        lazy: async () => ({ Component: (await import('@/pages/products')).ProductsPage }),
      },
      {
        path: `${ROUTES.products}/:slug`,
        lazy: async () => ({ Component: (await import('@/pages/product-detail')).ProductDetailPage }),
      },
      {
        path: ROUTES.tarot,
        lazy: async () => ({ Component: (await import('@/pages/tarot')).TarotPage }),
      },
      {
        path: `${ROUTES.tarot}/:id`,
        lazy: async () => ({ Component: (await import('@/pages/tarot-card')).TarotCardPage }),
      },
      {
        path: ROUTES.glossary,
        lazy: async () => ({ Component: (await import('@/pages/glossary')).GlossaryPage }),
      },
      {
        path: ROUTES.stores,
        lazy: async () => ({ Component: (await import('@/pages/stores')).StoresPage }),
      },
      {
        path: ROUTES.customOrder,
        lazy: async () => ({ Component: (await import('@/pages/custom-order')).CustomOrderPage }),
      },
      {
        path: ROUTES.about,
        lazy: async () => ({ Component: (await import('@/pages/about')).AboutPage }),
      },
      {
        path: ROUTES.contact,
        lazy: async () => ({ Component: (await import('@/pages/contact')).ContactPage }),
      },
      { path: '/puntos-fisicos', element: <Navigate to={ROUTES.stores} replace /> },
      { path: '/pedido-especial', element: <Navigate to={ROUTES.customOrder} replace /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

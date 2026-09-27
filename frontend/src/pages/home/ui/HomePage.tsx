import { lazy, Suspense } from 'react'
import { useSeo } from '@/shared/hooks'
import { BranchesSection } from '@/widgets/branches-map'
import { CategoriesBento } from '@/widgets/categories-bento'
import { CustomOrderCta } from '@/widgets/custom-order-cta'
import { DailyAdvice } from '@/widgets/daily-advice'
import { DailyTarot } from '@/widgets/daily-tarot'
import { EnergyQuizSection } from '@/widgets/energy-quiz-section'
import { GlossaryTeaser } from '@/widgets/glossary-teaser'
import { Hero } from '@/widgets/hero'
import { IntentionsMarquee } from '@/widgets/marquee-strip'
import { NumerologySection } from '@/widgets/numerology-section'
import { ProductShowcase } from '@/widgets/product-showcase'
import { Testimonials } from '@/widgets/testimonials'

/**
 * Orden pensado como embudo: confianza (hero + servicios) → catálogo →
 * experiencia personalizada (quiz, luna, tarot) → prueba social → ubicación → encargo.
 */
// GSAP (~45 kB gzip) solo se descarga cuando se renderiza la rueda zodiacal
const ZodiacWheel = lazy(() => import('@/widgets/zodiac-wheel').then((m) => ({ default: m.ZodiacWheel })))

export function HomePage() {
  useSeo()
  return (
    <>
      <Hero />
      <IntentionsMarquee />
      <CategoriesBento />
      <ProductShowcase />
      <EnergyQuizSection />
      <DailyAdvice />
      <DailyTarot />
      <NumerologySection />
      <Testimonials />
      <BranchesSection />
      <Suspense fallback={<div className="h-[640px]" />}>
        <ZodiacWheel />
      </Suspense>
      <GlossaryTeaser />
      <CustomOrderCta />
    </>
  )
}

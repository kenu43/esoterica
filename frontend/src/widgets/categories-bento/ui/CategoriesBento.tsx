import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { Link } from 'react-router'
import { useCategories } from '@/entities/category'
import { useCategoryCounts } from '@/entities/product'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Container, SectionHeading } from '@/shared/ui'

const LG_SPAN = { 1: '', 2: 'lg:col-span-2', 3: 'lg:col-span-3', 4: 'lg:col-span-4' } as const

function tileClass(i: number, total: number) {
  if (i === 0) return 'col-span-2 lg:row-span-2'
  if (i !== total - 1) return ''
  const lgSpan = (1 + ((4 - ((4 + total - 1) % 4)) % 4)) as 1 | 2 | 3 | 4
  const mobileFull = (2 + total - 1) % 2 === 1
  return cn(mobileFull && 'col-span-2', LG_SPAN[lgSpan])
}

export function CategoriesBento() {
  const { data: counts = {} } = useCategoryCounts()
  const categories = useCategories()

  return (
    <section id="descubre" className="relative scroll-mt-24 py-24">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Categorías"
          title="Todo para tu altar, tu casa y tu negocio"
          highlight={['altar,']}
          description="Lo que buscas para protegerte, limpiar la mala energía y atraer la buena suerte, en un solo lugar."
        />

        <div className="grid auto-rows-[190px] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {categories.map((cat, i) => {
            const count = counts[cat.id] ?? 0
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={tileClass(i, categories.length)}
              >
                <Link
                  to={`${ROUTES.products}?cat=${cat.id}`}
                  className="group relative flex size-full flex-col justify-end overflow-hidden rounded-2xl border border-border p-4 sm:p-5"
                >
                  <img
                    src={cat.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/0" />

                  <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-all duration-500 group-hover:bg-gold group-hover:text-black">
                    <ArrowUpRight className="size-4" />
                  </span>

                  <cat.icon className="mb-2 size-6 text-[oklch(0.85_0.12_85)]" aria-hidden />
                  <h3 className={cn('text-white', i === 0 ? 'text-2xl sm:text-3xl' : 'text-base sm:text-lg')}>{cat.name}</h3>
                  <p className={cn('mt-1 text-sm text-white/75', i === 0 ? 'block max-w-sm' : 'hidden sm:line-clamp-2')}>
                    {cat.description}
                  </p>
                  {count > 0 && <span className="mt-2 text-xs text-white/70">{count} productos</span>}
                </Link>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

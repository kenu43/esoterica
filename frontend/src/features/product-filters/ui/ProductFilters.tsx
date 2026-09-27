import { Button, Label, ListBox, SearchField, Select, Switch } from '@heroui/react'
import { RotateCcw } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { BRANCHES } from '@/entities/branch'
import { CATEGORIES } from '@/entities/category'
import type { ProductSort } from '@/entities/product'
import { cn } from '@/shared/lib'
import { useProductFilters } from '../model/useProductFilters'

const SORTS: { value: ProductSort; label: string }[] = [
  { value: 'relevance', label: 'Relevancia' },
  { value: 'newest', label: 'Más recientes' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
]

export function ProductFilters() {
  const { filter, update, reset, activeCount } = useProductFilters()
  const [search, setSearch] = useState(filter.search ?? '')

  // Debounce: la URL (y el filtrado) solo se actualiza 250 ms después de dejar de escribir
  useEffect(() => {
    const t = setTimeout(() => {
      if (search !== filter.search) update({ search })
    }, 250)
    return () => clearTimeout(t)
  }, [search, filter.search, update])

  const categories = [{ id: 'all' as const, name: 'Todo', icon: null }, ...CATEGORIES]

  return (
    <div className="space-y-4">
      {/* Categorías con indicador animado compartido (layoutId) */}
      <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
        <div role="tablist" aria-label="Categorías" className="flex w-max gap-2">
          {categories.map((c) => {
            const active = (filter.category ?? 'all') === c.id
            const Icon = c.icon
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={active}
                onClick={() => update({ category: c.id })}
                className={cn(
                  'relative flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                  active ? 'text-accent-foreground' : 'text-muted hover:text-foreground',
                )}
              >
                {active && (
                  <motion.span
                    layoutId="category-pill"
                    className="absolute inset-0 rounded-lg bg-accent"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                {!active && <span className="absolute inset-0 rounded-lg border border-border" />}
                {Icon && <Icon className="relative size-4" aria-hidden />}
                <span className="relative whitespace-nowrap">{c.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_200px_210px_auto] md:items-center">
        <SearchField value={search} onChange={setSearch} aria-label="Buscar productos" fullWidth>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input placeholder="Buscar: Santa Muerte, velón, ruda, duende…" />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>

        <Select
          aria-label="Tienda"
          value={filter.branch ?? 'all'}
          onChange={(key) => update({ branch: (key as typeof filter.branch) ?? 'all' })}
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="all" textValue="Todas las tiendas">
                Todas las tiendas
                <ListBox.ItemIndicator />
              </ListBox.Item>
              {BRANCHES.map((b) => (
                <ListBox.Item key={b.id} id={b.id} textValue={b.name}>
                  {b.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        <Select
          aria-label="Ordenar"
          value={filter.sort ?? 'relevance'}
          onChange={(key) => update({ sort: (key as ProductSort) ?? 'relevance' })}
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {SORTS.map((s) => (
                <ListBox.Item key={s.value} id={s.value} textValue={s.label}>
                  {s.label}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        <div className="flex items-center gap-2">
          {/* El control y el texto van dentro de Switch.Content: toda la fila es clicable */}
          <Switch isSelected={Boolean(filter.onlyNew)} onChange={(v) => update({ onlyNew: v })}>
            <Switch.Content className="flex-row items-center gap-2">
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <Label className="cursor-pointer whitespace-nowrap text-sm">Solo novedades</Label>
            </Switch.Content>
          </Switch>
          {activeCount > 0 && (
            <Button
              isIconOnly
              variant="ghost"
              aria-label="Limpiar filtros"
              onPress={() => {
                setSearch('')
                reset()
              }}
            >
              <RotateCcw className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

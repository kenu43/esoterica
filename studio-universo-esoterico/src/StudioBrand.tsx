import { Logo } from './Logo'

export function StudioBrand() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 1.5rem' }}>
      <Logo />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--sanity-color-text)' }}>
          Panel de catálogo
        </span>
        <span style={{ fontSize: '0.65rem', color: 'var(--sanity-color-text-muted)' }}>
          El Sortilegio · La Colonia · Loto & Nirvana
        </span>
      </div>
    </div>
  )
}

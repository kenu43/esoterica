import L from 'leaflet'
import { useEffect, useMemo } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { googleDirectionsUrl, type Branch, type BranchId } from '@/entities/branch'

/**
 * Tiles de OpenStreetMap (sin API key). El modo oscuro se logra con un
 * filtro CSS sobre `.leaflet-tile-pane` (ver globals.css).
 * Para tráfico alto, cambia a un proveedor con key (MapTiler, Stadia, Google).
 */
const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'

const ACCENT: Record<Branch['accent'], string> = {
  gold: 'var(--gold)',
  mystic: 'var(--mystic)',
  sage: 'var(--sage)',
}

/** Marcador HTML propio (luna + pulso) en vez del pin azul por defecto. */
const createIcon = (branch: Branch, active: boolean) =>
  L.divIcon({
    className: '',
    iconSize: [44, 44],
    // El Sortilegio y La Colonia están a ~7 m: desplazamos La Colonia para que ambos pines se vean
    iconAnchor: [branch.id === 'la-colonia' ? 44 : 22, 44],
    popupAnchor: [0, -40],
    html: `
      <div style="position:relative;width:44px;height:44px;display:grid;place-items:center">
        <span style="position:absolute;inset:4px;border-radius:9999px;background:${ACCENT[branch.accent]};opacity:.35;animation:${active ? 'ping 1.6s cubic-bezier(0,0,.2,1) infinite' : 'none'}"></span>
        <span style="position:relative;display:grid;place-items:center;width:${active ? 40 : 34}px;height:${active ? 40 : 34}px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${ACCENT[branch.accent]};box-shadow:0 8px 20px rgba(0,0,0,.35);border:2px solid white;transition:all .3s">
          <span style="transform:rotate(45deg);font-size:${active ? 18 : 15}px">☾</span>
        </span>
      </div>`,
  })

function FlyTo({ branch }: { branch?: Branch }) {
  const map = useMap()
  useEffect(() => {
    if (branch) map.flyTo([branch.coords.lat, branch.coords.lng], 18, { duration: 1.2 })
  }, [branch, map])
  return null
}

function FitAll({ branches, enabled }: { branches: Branch[]; enabled: boolean }) {
  const map = useMap()
  useEffect(() => {
    if (!enabled) return
    map.fitBounds(L.latLngBounds(branches.map((b) => [b.coords.lat, b.coords.lng])), { padding: [60, 60], maxZoom: 17 })
  }, [branches, enabled, map])
  return null
}

interface BranchesMapProps {
  branches: Branch[]
  activeId?: BranchId
  onSelect?: (id: BranchId) => void
  className?: string
}

export default function BranchesMap({ branches, activeId, onSelect, className }: BranchesMapProps) {
  const active = useMemo(() => branches.find((b) => b.id === activeId), [branches, activeId])
  const center = branches[0]?.coords ?? { lat: 4.4412, lng: -75.2352 }

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={16}
      scrollWheelZoom={false}
      className={className}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url={TILE_URL}
        maxZoom={19}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <FitAll branches={branches} enabled={!active} />
      <FlyTo branch={active} />
      {branches.map((b) => (
        <Marker
          key={b.id}
          position={[b.coords.lat, b.coords.lng]}
          icon={createIcon(b, b.id === activeId)}
          eventHandlers={{ click: () => onSelect?.(b.id) }}
        >
          <Popup>
            <div style={{ minWidth: 180 }}>
              <strong style={{ fontSize: 15 }}>{b.name}</strong>
              <div style={{ opacity: 0.75, margin: '4px 0 8px' }}>
                {b.address}, {b.neighborhood}
              </div>
              <a href={googleDirectionsUrl(b)} target="_blank" rel="noreferrer" style={{ color: 'var(--gold)', fontWeight: 600 }}>
                Cómo llegar →
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

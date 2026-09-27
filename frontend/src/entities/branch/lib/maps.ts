import type { Branch } from '../model/types'

/** Ficha de la tienda en Google Maps (reseñas, fotos, horario). */
export const googleMapsUrl = (b: Branch) => b.mapsUrl

/** Indicaciones desde la ubicación actual del visitante. */
export const googleDirectionsUrl = (b: Branch) =>
  `https://www.google.com/maps/dir/?api=1&destination=${b.coords.lat},${b.coords.lng}`

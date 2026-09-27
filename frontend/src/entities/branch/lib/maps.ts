import type { Branch } from '../model/types'

/** Indicaciones desde la ubicación actual del visitante. */
export const googleDirectionsUrl = (b: Branch) =>
  `https://www.google.com/maps/dir/?api=1&destination=${b.coords.lat},${b.coords.lng}`

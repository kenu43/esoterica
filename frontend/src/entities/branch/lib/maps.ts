import type { Branch } from '../model/types'

export const googleDirectionsUrl = (b: Branch) =>
  `https://www.google.com/maps/dir/?api=1&destination=${b.coords.lat},${b.coords.lng}`

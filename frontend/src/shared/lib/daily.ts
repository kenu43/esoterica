/**
 * Utilidades deterministas "del día": todos los visitantes ven el mismo
 * resultado durante la misma fecha local, sin necesidad de backend.
 */
export function dayKey(date = new Date()) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

/** Hash FNV-1a de 32 bits: rápido y estable entre navegadores. */
export function hashString(input: string) {
  let hash = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return hash >>> 0
}

export function pickDaily<T>(items: readonly T[], salt = '', date = new Date()): T {
  return items[hashString(dayKey(date) + salt) % items.length]
}

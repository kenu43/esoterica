import { useEffect, useState } from 'react'

/** Devuelve el valor solo cuando deja de cambiar durante `delay` ms (búsquedas). */
export function useDebouncedValue<T>(value: T, delay = 250) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

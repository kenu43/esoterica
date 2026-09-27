const currency = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

export const formatPrice = (value: number) => currency.format(value)

const longDate = new Intl.DateTimeFormat('es-CO', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})

export const formatLongDate = (date: Date) => longDate.format(date)

/** Fecha larga desde un ISO `YYYY-MM-DD`. */
const shortDate = new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })
export const formatDate = (iso: string) => shortDate.format(new Date(`${iso.slice(0, 10)}T12:00:00`))

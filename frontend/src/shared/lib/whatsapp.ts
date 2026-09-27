const isMobile = () => typeof navigator !== 'undefined' && /android|iphone|ipad|ipod/i.test(navigator.userAgent)

/**
 * Enlace de WhatsApp. En celular usa wa.me (abre la app). En computador va directo a WhatsApp Web:
 * wa.me abre la app de escritorio de Windows, que a veces daña los emojis (se ven como "�").
 */
export function buildWhatsAppUrl(phone: string, message: string) {
  const digits = phone.replace(/\D/g, '')
  const text = encodeURIComponent(message)
  return isMobile()
    ? `https://wa.me/${digits}?text=${text}`
    : `https://web.whatsapp.com/send?phone=${digits}&text=${text}`
}

export interface MessageLine {
  icon: string
  label: string
  value?: string
}

/**
 * Mensaje de WhatsApp limpio y estructurado: saludo y una línea por dato
 * (con ícono). Las líneas sin valor se omiten.
 */
export function buildFormMessage(lines: MessageLine[], intro = '¡Hola! Vengo de la página web.') {
  // String(...) por seguridad: si algo pasa un número o algo distinto de texto, no debe romper el mensaje.
  const body = lines
    .map((l) => ({ ...l, value: l.value == null ? '' : String(l.value).trim() }))
    .filter((l) => l.value)
    .map((l) => `${l.icon} *${l.label}:* ${l.value}`)
  return [intro, '', ...body].join('\n')
}

/** Abre WhatsApp con el mensaje listo para enviar. */
export function openWhatsApp(phone: string, message: string) {
  window.open(buildWhatsAppUrl(phone, message), '_blank', 'noopener,noreferrer')
}

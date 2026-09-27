/** Construye un enlace universal de WhatsApp (funciona en móvil y escritorio). */
export function buildWhatsAppUrl(phone: string, message: string) {
  const digits = phone.replace(/\D/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

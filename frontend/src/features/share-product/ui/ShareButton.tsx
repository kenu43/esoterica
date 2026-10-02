import { Button } from '@heroui/react'
import { Check, Link2, MessageCircle, Send, Share2 } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { FacebookIcon } from '@/shared/ui'

interface ShareButtonProps {
  /** Ruta del producto, ej. /productos/velon-rojo. */
  path: string
  title: string
  text: string
}

/**
 * Compartir: abre el menú nativo del dispositivo (WhatsApp, Instagram, Messenger…).
 * Solo si el navegador no lo tiene (algunos computadores) despliega WhatsApp, Facebook, Telegram y copiar enlace.
 */
export function ShareButton({ path, title, text }: ShareButtonProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  const url = `${window.location.origin}${path}`

  useEffect(() => {
    if (!open) return
    const close = (e: PointerEvent) => !box.current?.contains(e.target as Node) && setOpen(false)
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', esc)
    }
  }, [open])

  const press = async () => {
    // Si el dispositivo tiene menú nativo de compartir (celulares y varios computadores), se usa directamente.
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, text, url })
        return
      } catch (err) {
        if ((err as DOMException)?.name === 'AbortError') return // la persona cerró el menú
      }
    }
    setOpen((v) => !v)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const input = document.createElement('input')
      input.value = url
      document.body.append(input)
      input.select()
      document.execCommand('copy')
      input.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const message = encodeURIComponent(`${text} ${url}`)
  const links = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${message}`, icon: <MessageCircle className="size-4 text-[#25D366]" /> },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, icon: <FacebookIcon className="size-4 text-[#1877F2]" /> },
    { label: 'Telegram', href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, icon: <Send className="size-4 text-[#2AABEE]" /> },
  ]

  return (
    <div ref={box} className="relative">
      <Button size="lg" variant="outline" className="gap-2" onPress={press} aria-haspopup="menu" aria-expanded={open}>
        <Share2 className="size-4" /> Compartir
      </Button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16 }}
            className="absolute bottom-full left-0 z-30 mb-2 w-52 origin-bottom-left space-y-0.5 rounded-xl border border-border bg-overlay p-1.5 shadow-xl shadow-black/30"
          >
            {links.map((l) => (
              <li key={l.label} role="none">
                <a
                  role="menuitem"
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-surface-secondary"
                >
                  {l.icon} {l.label}
                </a>
              </li>
            ))}
            <li role="none">
              <button
                role="menuitem"
                type="button"
                onClick={copy}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-surface-secondary"
              >
                {copied ? <Check className="size-4 text-success" /> : <Link2 className="size-4 text-gold" />}
                {copied ? '¡Enlace copiado!' : 'Copiar enlace'}
              </button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

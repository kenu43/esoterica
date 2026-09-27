import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { SITE } from '@/shared/config'

interface SeoOptions {
  title?: string
  description?: string
  image?: string
  /** Datos estructurados schema.org específicos de la página. */
  jsonLd?: Record<string, unknown>
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

/**
 * SEO por página en una SPA: título, descripción, Open Graph, canonical y JSON-LD.
 * Google ejecuta JavaScript, así que estas etiquetas se indexan correctamente.
 */
export function useSeo({ title, description, image, jsonLd }: SeoOptions = {}) {
  const { pathname } = useLocation()
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    const fullTitle = title ? `${title} · ${SITE.name}` : `${SITE.name} · Tienda esotérica en Ibagué desde 1981`
    const desc = description ?? SITE.description
    const url = `${SITE.url}${pathname === '/' ? '/' : pathname}`
    const img = image?.startsWith('http') ? image : `${SITE.url}${image ?? '/images/products/figuras-tienda.webp'}`

    document.title = fullTitle
    setMeta('name', 'description', desc)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', img)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    let script: HTMLScriptElement | null = null
    if (jsonLdString) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.page = 'true'
      script.textContent = jsonLdString
      document.head.appendChild(script)
    }
    return () => script?.remove()
  }, [title, description, image, jsonLdString, pathname])
}

/** Atajo retrocompatible. */
export const useDocumentTitle = (title?: string, description?: string) => useSeo({ title, description })

import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

/**
 * Cada vista arranca desde arriba; si la URL trae un hash (`#seccion`), va a ese ancla.
 * Entre páginas el salto es `instant`: el `scroll-behavior: smooth` global lo animaría y se
 * cortaría a mitad de camino. Un ancla dentro de la misma página respeta el scroll suave.
 */
export function ScrollToTop() {
  // `key` cambia en cada navegación: volver a tocar el mismo ancla también desplaza.
  const { pathname, hash, key } = useLocation()
  const previousPathname = useRef(pathname)

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
  }, [])

  useEffect(() => {
    const samePage = previousPathname.current === pathname
    previousPathname.current = pathname
    const behavior: ScrollBehavior = samePage ? 'auto' : 'instant'
    const toTop = () => window.scrollTo({ top: 0, left: 0, behavior })

    if (!hash) {
      toTop()
      return
    }
    // Se espera un frame para que el DOM de la vista nueva ya exista.
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) target.scrollIntoView({ behavior, block: 'start' })
      else toTop()
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key])

  return null
}

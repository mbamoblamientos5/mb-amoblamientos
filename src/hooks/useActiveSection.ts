import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

/**
 * Devuelve la sección visible (la última cuyo borde superior pasó la mitad de la pantalla),
 * o `null` antes de la primera. Busca los elementos en cada cálculo porque las secciones
 * se cargan después que el header.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    let queued = 0
    const update = () => {
      queued = 0
      const line = window.innerHeight * 0.45
      let current: string | null = null
      for (const id of ids) {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    const schedule = () => {
      if (!queued) queued = requestAnimationFrame(update)
    }

    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(queued)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ids, pathname])

  return active
}

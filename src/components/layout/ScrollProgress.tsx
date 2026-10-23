import { useEffect, useRef } from 'react'

/** Barra superior que refleja cuánto se recorrió de la página actual. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    let queued = 0
    const paint = () => {
      queued = 0
      const total = document.documentElement.scrollHeight - window.innerHeight
      bar.style.scale = `${total > 0 ? Math.min(window.scrollY / total, 1) : 0} 1`
    }
    const schedule = () => {
      if (!queued) queued = requestAnimationFrame(paint)
    }

    // El alto cambia al navegar o cuando carga una vista: se recalcula con el ResizeObserver.
    const resizeObserver = new ResizeObserver(schedule)
    resizeObserver.observe(document.body)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    paint()
    return () => {
      cancelAnimationFrame(queued)
      resizeObserver.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return <div ref={barRef} aria-hidden="true" className="fixed top-0 left-0 z-40 h-0.75 w-full origin-left scale-x-0 bg-accent" />
}

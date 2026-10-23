import { useEffect, useRef } from 'react'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ParallaxImageProps {
  image: string
  alt: string
  sizes: string
  /** Proporción del scroll que se desplaza la imagen. */
  speed: number
  /** Centra el recorrido del efecto mientras el marco cruza la pantalla. */
  centered?: boolean
  priority?: boolean
  className?: string
}

/**
 * Imagen que se desplaza más lento que el scroll dentro de su marco. El `transform` se escribe
 * directo en el elemento desde un requestAnimationFrame: con estado de React se re-renderizaría
 * la vista en cada evento de scroll.
 */
export function ParallaxImage({ speed, centered = false, className = '', ...image }: ParallaxImageProps) {
  const ref = useRef<HTMLImageElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const img = ref.current
    const frame = img?.parentElement
    if (!img || !frame || reducedMotion) return

    let queued = 0
    const paint = () => {
      queued = 0
      const rect = frame.getBoundingClientRect()
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return
      const limit = rect.height * (centered ? 0.1 : 0.07)
      const distance = centered
        ? window.innerHeight / 2 - (rect.top + rect.height / 2)
        : -rect.top
      const offset = Math.max(-limit, Math.min(limit, distance * speed))
      img.style.transform = `translate3d(0, ${offset}px, 0)`
    }
    const schedule = () => {
      if (!queued) queued = requestAnimationFrame(paint)
    }

    paint()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(queued)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      img.style.transform = ''
    }
  }, [centered, reducedMotion, speed])

  return <ResponsiveImage ref={ref} className={`will-change-transform ${className}`} {...image} />
}

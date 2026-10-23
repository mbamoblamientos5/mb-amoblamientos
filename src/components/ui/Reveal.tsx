import { useCallback, useState, type ReactNode } from 'react'

interface RevealProps {
  as?: 'div' | 'article'
  className?: string
  children: ReactNode
}

/**
 * Aparición suave al entrar en pantalla. El estado oculto solo aplica dentro de `html.motion`,
 * clase que agrega el script inline de index.html cuando hay IntersectionObserver y no se pidió
 * reducir el movimiento: sin JS, o con movimiento reducido, el contenido se ve siempre.
 */
export function Reveal({ as: Tag = 'div', className = '', children }: RevealProps) {
  const [visible, setVisible] = useState(false)

  const observe = useCallback((node: HTMLElement | null) => {
    if (!node || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        setVisible(true)
        observer.disconnect()
      },
      { threshold: 0.08 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const hidden = visible ? '' : 'in-[.motion]:translate-y-7 in-[.motion]:opacity-0'

  return (
    <Tag
      ref={observe}
      className={`in-[.motion]:transition-[opacity,translate] in-[.motion]:duration-800 ${hidden} ${className}`}
    >
      {children}
    </Tag>
  )
}

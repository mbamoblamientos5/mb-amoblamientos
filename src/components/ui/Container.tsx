import type { ReactNode } from 'react'

interface ContainerProps {
  className?: string
  children: ReactNode
}

/** Centra el contenido con un ancho máximo de 1320px y los márgenes laterales del diseño original. */
export function Container({ className = '', children }: ContainerProps) {
  return (
    <div className="flex w-full justify-center px-5 md:px-12">
      <div className={`w-full max-w-330 ${className}`}>{children}</div>
    </div>
  )
}

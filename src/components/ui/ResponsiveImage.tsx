import type { ComponentPropsWithRef } from 'react'
import { getImageSources } from '@/data/images'

interface ResponsiveImageProps extends Omit<ComponentPropsWithRef<'img'>, 'src' | 'srcSet' | 'alt'> {
  /** Clave de la imagen, por ejemplo `works/trabajo-9`. */
  image: string
  alt: string
  sizes: string
  /** Imagen principal de la vista: se carga de inmediato y con prioridad alta. */
  priority?: boolean
}

export function ResponsiveImage({ image, alt, sizes, priority = false, ...props }: ResponsiveImageProps) {
  const { src, srcSet } = getImageSources(image)
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      {...props}
    />
  )
}

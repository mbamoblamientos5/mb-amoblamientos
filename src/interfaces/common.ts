export interface Seo {
  title: string
  description: string
}

/** `src` es una clave de imagen local (ver `data/images.ts`), por ejemplo `works/trabajo-9`. */
export interface ImageContent {
  src: string
  alt: string
}

export interface LinkContent {
  label: string
  to: string
}

export interface SectionHeadingContent {
  eyebrow: string
  title: string[]
  description: string
}

import type { ImageContent, LinkContent, SectionHeadingContent, Seo } from '@/interfaces/common'

export interface HomeContent {
  seo: Seo
  hero: {
    eyebrow: string
    title: string
    titleAccent: string
    titleEnd: string
    description: string
    primaryCta: string
    secondaryCta: LinkContent
    note: string
    scrollCta: LinkContent
    image: ImageContent
  }
  ticker: {
    label: string
    items: string[]
  }
}

export interface ServiceItem {
  number: string
  title: string
  description: string
}

export interface ServicesContent {
  heading: SectionHeadingContent
  items: ServiceItem[]
  painting: {
    title: string
    description: string
    to: string
  }
}

export interface WorkItem {
  title: string
  description: string
  /** Clave de la imagen retocada. */
  image: string
  /** Ruta de la foto original sin retoque dentro de `assets/images`. */
  original: string
  /** Las fotos verticales se muestran en un marco cuadrado. */
  square: boolean
}

export interface LightboxLabels {
  openLabel: string
  close: string
  previous: string
  next: string
  original: string
}

export interface WorksContent {
  heading: SectionHeadingContent
  items: WorkItem[]
  note: string
  lightbox: LightboxLabels
}

export interface AboutContent {
  eyebrow: string
  title: string[]
  paragraphs: string[]
  signature: {
    name: string
    role: string
  }
  image: ImageContent
}

interface FormField {
  label: string
  maxLength: number
}

export interface ContactFormContent {
  title: string
  description: string
  fields: {
    name: FormField
    phone: FormField
    email: FormField
    projectType: { label: string; placeholder: string }
    message: FormField & { placeholder: string }
  }
  projectTypes: string[]
  submit: string
  status: string
  noscript: string
  /** Líneas del mensaje de WhatsApp; `{campo}` se reemplaza por el valor ingresado. */
  messageTemplate: {
    greeting: string
    projectType: string
    email: string
    phone: string
  }
}

export interface ContactContent {
  heading: SectionHeadingContent
  direct: {
    title: string
    description: string
    cta: string
  }
  form: ContactFormContent
}

export interface NotFoundContent {
  seo: Seo
  eyebrow: string
  code: string
  title: string
  description: string
  cta: LinkContent
}

/** Contenido completo de la página principal, una entrada por sección. */
export interface LandingContent {
  home: HomeContent
  services: ServicesContent
  works: WorksContent
  about: AboutContent
  contact: ContactContent
}

export interface NavigationItem {
  label: string
  to: string
  /** Se muestra como botón destacado (pill). */
  highlight: boolean
}

export interface SiteContent {
  name: string
  /** URL pública del sitio, sin barra final. Vacía mientras no haya dominio definido. */
  url: string
  locale: string
  ogImage: string
  brand: {
    logo: string
    tagline: string[]
    homeLabel: string
  }
  contact: {
    whatsappNumber: string
    phoneDisplay: string
    email: string
    defaultMessage: string
  }
  navigation: NavigationItem[]
  ui: {
    skipLink: string
    navLabel: string
    openMenu: string
    closeMenu: string
    themeToDark: string
    themeToLight: string
    whatsappButton: string
  }
  footer: {
    description: string
    signature: string
    backToTop: string
  }
}

import type { LandingContent, NotFoundContent } from '@/interfaces/pages'
import type { SiteContent } from '@/interfaces/site'
import site from './site.json'

/*
 * Único punto de acceso al contenido. Hoy lee JSON locales (uno por sección); para pasar
 * a una API alcanza con reemplazar cada `import()` por un `fetch` que devuelva el mismo tipo.
 * Las promesas se cachean porque las vistas las consumen con `use()`, que necesita
 * recibir siempre la misma promesa entre renders.
 */
const cache = new Map<string, Promise<unknown>>()

function cached<T>(key: string, load: () => Promise<T>): Promise<T> {
  let promise = cache.get(key) as Promise<T> | undefined
  if (!promise) {
    promise = load()
    cache.set(key, promise)
  }
  return promise
}

export const siteContent: SiteContent = site

/** Carga en paralelo el contenido de todas las secciones de la página principal. */
export const getLandingContent = () =>
  cached('landing', async (): Promise<LandingContent> => {
    const [home, services, works, about, contact] = await Promise.all([
      import('./home.json'),
      import('./services.json'),
      import('./works.json'),
      import('./about.json'),
      import('./contact.json'),
    ])
    return {
      home: home.default,
      services: services.default,
      works: works.default,
      about: about.default,
      contact: contact.default,
    }
  })

export const getNotFoundContent = () =>
  cached('not-found', async (): Promise<NotFoundContent> => (await import('./not-found.json')).default)

export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${siteContent.contact.whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

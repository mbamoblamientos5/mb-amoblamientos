import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router'
import { App } from '@/App'

/** Rutas que se generan como HTML estático. `/404` se publica como `404.html`. */
export const routes = ['/', '/404']

/** Renderiza una ruta completa, esperando las vistas diferidas y su contenido. */
export async function render(url: string): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
  return new Response(prelude).text()
}

import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { App } from '@/App'
import '@/styles/global.css'

const container = document.getElementById('root')
if (!container) throw new Error('No se encontró el elemento #root')

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// En producción cada ruta llega prerenderizada y se hidrata; en desarrollo se renderiza desde cero.
if (container.firstElementChild) hydrateRoot(container, app)
else createRoot(container).render(app)

import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

// La misma clave usa el script inline de index.html para aplicar el tema antes de pintar.
const STORAGE_KEY = 'mb-theme'
const listeners = new Set<() => void>()

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'light' || stored === 'dark' ? stored : null
  } catch {
    return null
  }
}

function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  // Mientras el usuario no elija un tema, se sigue la preferencia del sistema.
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const onSystemChange = () => {
    if (!readStoredTheme()) applyTheme(media.matches ? 'dark' : 'light')
  }
  media.addEventListener('change', onSystemChange)
  return () => {
    listeners.delete(listener)
    media.removeEventListener('change', onSystemChange)
  }
}

export function useTheme() {
  const theme = useSyncExternalStore<Theme>(subscribe, getTheme, () => 'light')

  const toggleTheme = useCallback(() => {
    const next: Theme = getTheme() === 'dark' ? 'light' : 'dark'
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Sin almacenamiento disponible el tema se aplica solo a esta visita.
    }
    applyTheme(next)
  }, [])

  return { theme, toggleTheme }
}

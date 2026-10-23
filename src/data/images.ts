/*
 * Resuelve claves de imagen (`works/trabajo-9`) a URLs con hash generadas por Vite.
 * Cada imagen existe en varios anchos con el sufijo `-{ancho}.webp`, que se usan
 * para armar el `srcset`.
 */
const files = import.meta.glob<string>('../assets/images/**/*.{webp,jpeg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const PREFIX = '../assets/images/'

interface Variant {
  width: number
  url: string
}

const variants = new Map<string, Variant[]>()

for (const [path, url] of Object.entries(files)) {
  const match = /^(.+)-(\d+)\.webp$/.exec(path.slice(PREFIX.length))
  if (!match?.[1] || !match[2]) continue
  const list = variants.get(match[1]) ?? []
  list.push({ width: Number(match[2]), url })
  variants.set(match[1], list.sort((a, b) => a.width - b.width))
}

export interface ImageSources {
  src: string
  srcSet: string
}

export function getImageSources(key: string): ImageSources {
  const list = variants.get(key)
  const largest = list?.at(-1)
  if (!list || !largest) throw new Error(`Imagen inexistente: ${key}`)
  return {
    src: largest.url,
    srcSet: list.map(({ width, url }) => `${url} ${width}w`).join(', '),
  }
}

export function getAssetUrl(path: string): string {
  const url = files[PREFIX + path]
  if (!url) throw new Error(`Archivo inexistente: ${path}`)
  return url
}

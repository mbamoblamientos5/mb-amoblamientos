/*
 * Genera el HTML estático de la página principal y de la 404 a partir del build de cliente (dist)
 * y del build SSR (dist-ssr), con el contenido y los metadatos ya escritos. Al final borra dist-ssr.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = resolve('dist')
const ssrDir = resolve('dist-ssr')
const template = await readFile(resolve(dist, 'index.html'), 'utf8')
const { render, routes } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href)

// React 19 emite primero los <title>, <meta> y <link> de la vista: van al <head>.
const HEAD_TAGS = /^(?:<title>[\s\S]*?<\/title>|<meta[^>]*>|<link[^>]*>)*/

for (const route of routes) {
  const rendered = await render(route)
  const head = rendered.match(HEAD_TAGS)?.[0] ?? ''
  const html = template.replace('<!--app-head-->', head).replace('<!--app-html-->', rendered.slice(head.length))

  const file = route === '/' ? 'index.html' : `${route.slice(1)}.html`
  const target = resolve(dist, file)
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, html)
  console.log(`prerender: ${route} → dist/${file}`)
}

await rm(ssrDir, { recursive: true, force: true })

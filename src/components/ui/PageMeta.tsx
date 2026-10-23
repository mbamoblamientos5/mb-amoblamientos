import { useLocation } from 'react-router'
import { siteContent } from '@/data'
import type { Seo } from '@/interfaces/common'

/**
 * Title, description y Open Graph de cada vista. React 19 los ubica en <head>;
 * el prerenderizado los deja escritos en el HTML de cada ruta.
 */
export function PageMeta({ title, description }: Seo) {
  const { pathname } = useLocation()
  const { url: siteUrl, name, locale, ogImage } = siteContent
  const pageUrl = siteUrl ? `${siteUrl}${pathname}` : undefined

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {pageUrl && <link rel="canonical" href={pageUrl} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={name} />
      <meta property="og:locale" content={locale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      {pageUrl && <meta property="og:url" content={pageUrl} />}
      <meta name="twitter:card" content="summary_large_image" />
    </>
  )
}

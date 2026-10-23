import { Suspense } from 'react'
import { Outlet } from 'react-router'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { siteContent } from '@/data'

export function SiteLayout() {
  return (
    <>
      <a
        href="#contenido"
        className="fixed -top-25 left-2.5 z-50 rounded-md bg-accent p-3.75 text-[#20271b] focus:top-2.5"
      >
        {siteContent.ui.skipLink}
      </a>
      <ScrollProgress />
      <ScrollToTop />
      <Header />
      <main id="contenido" tabIndex={-1} className="focus:outline-none">
        <Suspense fallback={<div className="min-h-svh" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

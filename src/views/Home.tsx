import { use } from 'react'
import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { WorksSection } from '@/components/sections/WorksSection'
import { PageMeta } from '@/components/ui/PageMeta'
import { Ticker } from '@/components/ui/Ticker'
import { getLandingContent } from '@/data'

export default function Home() {
  const { home, services, works, about, contact } = use(getLandingContent())

  return (
    <>
      <PageMeta {...home.seo} />
      <HeroSection hero={home.hero} />
      <Ticker label={home.ticker.label} items={home.ticker.items} />
      <ServicesSection content={services} />
      <WorksSection content={works} />
      <AboutSection content={about} />
      <ContactSection content={contact} />
    </>
  )
}

import { Link } from 'react-router'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ParallaxImage } from '@/components/ui/ParallaxImage'
import { buildWhatsAppUrl, siteContent } from '@/data'
import type { HomeContent } from '@/interfaces/pages'

export function HeroSection({ hero }: Pick<HomeContent, 'hero'>) {
  return (
    <section
      id="inicio"
      aria-labelledby="inicio-title"
      className="relative flex h-207.5 max-h-262.5 min-h-[95svh] flex-col overflow-hidden bg-[#3c4537] text-white md:h-[max(760px,100svh)] md:max-h-275 md:min-h-0"
    >
      <ParallaxImage
        image={hero.image.src}
        alt={hero.image.alt}
        sizes="100vw"
        speed={0.17}
        priority
        className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover brightness-[.66]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,#111b17c9,transparent_95%),linear-gradient(0deg,#10180f88,transparent_60%)]"
      />

      <div className="relative flex flex-1 flex-col justify-center pt-(--header-h)">
        <Container className="flex flex-col items-start gap-7">
          <Eyebrow text={hero.eyebrow} onDark />
          <h1
            id="inicio-title"
            className="max-w-290 text-[clamp(46px,11.6vw,72px)] leading-[1.07] font-semibold tracking-[-2.7px] md:text-[clamp(60px,7.3vw,112px)] md:leading-[1.02] md:tracking-[-5px]"
          >
            {hero.title}
            <br />
            <span className="text-hero-accent">{hero.titleAccent}</span>
            <br />
            {hero.titleEnd}
          </h1>
          <p className="max-w-85 border-l-2 border-accent pl-5 text-sm leading-[1.8] text-hero-text md:max-w-107.5 md:text-[15px]">
            {hero.description}
          </p>
          <div className="flex flex-wrap items-center gap-5 md:gap-7.5">
            <Button href={buildWhatsAppUrl(siteContent.contact.defaultMessage)}>{hero.primaryCta}</Button>
            <Link
              to={hero.secondaryCta.to}
              className="inline-flex items-center gap-3.75 border-b border-white/45 py-3.75 text-xs"
            >
              {hero.secondaryCta.label} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </Container>
      </div>

      <Container className="relative flex items-end justify-between gap-5 pb-7.5 text-[8px] tracking-[1.8px] text-[#e6e8e0] uppercase md:text-[10px]">
        <span className="max-w-43.75 leading-[1.8] md:max-w-none">{hero.note}</span>
        <Link to={hero.scrollCta.to} className="flex items-center gap-4.5">
          {hero.scrollCta.label}
          <span
            aria-hidden="true"
            className="flex h-10.5 w-7.5 items-center justify-center rounded-full border border-white/45 text-lg"
          >
            ↓
          </span>
        </Link>
      </Container>
    </section>
  )
}

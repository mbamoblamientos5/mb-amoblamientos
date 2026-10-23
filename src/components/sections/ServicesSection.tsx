import { Link } from 'react-router'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ServiceCard } from '@/components/ui/ServiceCard'
import type { ServicesContent } from '@/interfaces/pages'

export function ServicesSection({ content }: { content: ServicesContent }) {
  const { heading, items, painting } = content

  return (
    <Section id="servicios" labelledBy="servicios-title" className="gap-9 md:gap-14">
      <SectionHeading heading={heading} id="servicios-title" />

      <div className="flex flex-col gap-8.75">
        <div className="grid grid-cols-2 gap-x-4.5 md:grid-cols-3 md:gap-x-7.5">
          {items.map((service) => (
            <ServiceCard key={service.number} {...service} />
          ))}
        </div>

        <Reveal>
          <Link
            to={painting.to}
            className="flex items-center justify-between gap-6.25 rounded-xl bg-surface px-5 py-5.5 md:px-7.5 md:py-6.75"
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium tracking-[-0.6px] md:text-xl">{painting.title}</h3>
              <p className="text-xs text-muted md:text-[13px]">{painting.description}</p>
            </div>
            <span
              aria-hidden="true"
              className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#a7af98] text-[23px]"
            >
              ↗
            </span>
          </Link>
        </Reveal>
      </div>
    </Section>
  )
}

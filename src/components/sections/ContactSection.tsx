import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ui/ContactForm'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { buildWhatsAppUrl, siteContent } from '@/data'
import type { ContactContent } from '@/interfaces/pages'

export function ContactSection({ content }: { content: ContactContent }) {
  const { heading, direct, form } = content
  const { contact } = siteContent

  return (
    <Section id="contacto" tone="contact" labelledBy="contacto-title" className="gap-9 md:gap-14">
      <SectionHeading heading={heading} id="contacto-title" />

      <div className="flex flex-col gap-10 md:flex-row md:gap-20">
        <Reveal className="flex flex-col items-start gap-5.5 md:flex-1">
          <div className="flex flex-col gap-4.5">
            <h3 className="text-[29px] font-medium tracking-[-1.2px]">{direct.title}</h3>
            <p className="max-w-95 text-sm leading-[1.8] text-contact-muted">{direct.description}</p>
          </div>
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-brand text-[clamp(24px,3vw,37px)] font-medium tracking-[-1.5px]"
          >
            {contact.phoneDisplay} <span aria-hidden="true">↗</span>
          </a>
          <Button href={buildWhatsAppUrl(contact.defaultMessage)} variant="strong">
            {direct.cta}
          </Button>
          <a href={`mailto:${contact.email}`} className="pt-1 text-[13px] underline underline-offset-5 wrap-anywhere">
            {contact.email}
          </a>
        </Reveal>

        <Reveal className="md:flex-1">
          <ContactForm form={form} />
        </Reveal>
      </div>
    </Section>
  )
}

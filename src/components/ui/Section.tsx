import type { ReactNode } from 'react'
import { Container } from '@/components/ui/Container'

type SectionTone = 'page' | 'deep' | 'contact'

interface SectionProps {
  tone?: SectionTone
  /** Primera sección de la página: suma el alto del header fijo al espaciado superior. */
  first?: boolean
  id?: string
  labelledBy?: string
  className?: string
  children: ReactNode
}

const tones: Record<SectionTone, string> = {
  page: '',
  deep: 'bg-deep text-cream',
  contact: 'bg-contact',
}

export function Section({ tone = 'page', first = false, id, labelledBy, className = '', children }: SectionProps) {
  const top = first ? 'pt-[calc(var(--header-h)+4rem)] md:pt-[calc(var(--header-h)+7rem)]' : 'pt-16 md:pt-29'
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${top} pb-16 md:pb-29 ${tones[tone]}`}>
      <Container className={`flex flex-col ${className}`}>{children}</Container>
    </section>
  )
}

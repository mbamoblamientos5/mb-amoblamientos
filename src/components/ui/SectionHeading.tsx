import { Eyebrow } from '@/components/ui/Eyebrow'
import { Lines } from '@/components/ui/Lines'
import { Reveal } from '@/components/ui/Reveal'
import type { SectionHeadingContent } from '@/interfaces/common'

interface SectionHeadingProps {
  heading: SectionHeadingContent
  id: string
  onDark?: boolean
}

/** Encabezado de sección: eyebrow, título (h2) y bajada. */
export function SectionHeading({ heading, id, onDark = false }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <Eyebrow text={heading.eyebrow} onDark={onDark} />
      </Reveal>
      <Reveal className="flex flex-col gap-5.5 md:flex-row md:items-end md:gap-15">
        <h2 id={id} className="heading-xl md:flex-[1.4]">
          <Lines lines={heading.title} />
        </h2>
        <p
          className={`max-w-92.5 text-sm leading-[1.9] md:flex-1 ${onDark ? 'text-deep-muted' : 'text-muted'}`}
        >
          {heading.description}
        </p>
      </Reveal>
    </div>
  )
}

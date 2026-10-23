import { useRef, useState } from 'react'
import { Lightbox } from '@/components/ui/Lightbox'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { WorkCard } from '@/components/ui/WorkCard'
import type { WorksContent } from '@/interfaces/pages'

export function WorksSection({ content }: { content: WorksContent }) {
  const { heading, items, note, lightbox } = content
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  // Elemento que abrió el visor: recupera el foco al cerrarlo.
  const triggerRef = useRef<HTMLElement | null>(null)

  const handleClose = () => {
    setActiveIndex(null)
    triggerRef.current?.focus()
  }

  return (
    <Section id="trabajos" tone="deep" labelledBy="trabajos-title" className="gap-9 md:gap-14">
      <SectionHeading heading={heading} id="trabajos-title" onDark />

      <div className="grid grid-cols-2 items-start gap-x-3 gap-y-6 md:gap-x-5 md:gap-y-9 lg:grid-cols-3 lg:gap-x-6">
        {items.map((item, index) => (
          <WorkCard
            key={item.image}
            item={item}
            openLabel={lightbox.openLabel}
            onOpen={(trigger) => {
              triggerRef.current = trigger
              setActiveIndex(index)
            }}
          />
        ))}
      </div>

      <p className="max-w-170 text-[11px] leading-[1.7] text-deep-muted">{note}</p>

      <Lightbox
        items={items}
        index={activeIndex}
        labels={lightbox}
        onNavigate={setActiveIndex}
        onClose={handleClose}
      />
    </Section>
  )
}

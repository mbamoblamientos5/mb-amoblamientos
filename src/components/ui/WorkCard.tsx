import type { MouseEvent } from 'react'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { Reveal } from '@/components/ui/Reveal'
import { getImageSources } from '@/data/images'
import type { WorkItem } from '@/interfaces/pages'

interface WorkCardProps {
  item: WorkItem
  openLabel: string
  onOpen: (trigger: HTMLElement) => void
}

export function WorkCard({ item, openLabel, onOpen }: WorkCardProps) {
  // Sin JS (o con Ctrl/Cmd + clic) el enlace abre la foto en una pestaña nueva.
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    onOpen(event.currentTarget)
  }

  return (
    <Reveal as="article" className="group min-w-0">
      <a
        href={getImageSources(item.image).src}
        target="_blank"
        rel="noopener"
        aria-label={`${openLabel} ${item.title}`}
        onClick={handleClick}
        className="flex min-w-0 flex-col gap-2.5 rounded-[10px] text-inherit no-underline md:gap-3.5"
      >
        <figure className="flex aspect-[4/3] overflow-hidden rounded-[10px] bg-photo p-1.5 md:p-2.5">
          <ResponsiveImage
            image={item.image}
            alt={`${item.title}: ${item.description}`}
            sizes="(min-width: 1000px) 33vw, 50vw"
            className="size-full object-contain transition-transform duration-800 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </figure>
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-col gap-1">
            <h3 className="text-sm leading-snug font-medium tracking-[-0.2px] md:text-lg">{item.title}</h3>
            <p className="hidden text-xs leading-[1.5] text-deep-muted md:block">{item.description}</p>
          </div>
          <span
            aria-hidden="true"
            className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/25 text-sm transition-colors group-hover:bg-accent group-hover:text-[#20271b] md:size-9.75 md:text-base"
          >
            ↗
          </span>
        </div>
      </a>
    </Reveal>
  )
}

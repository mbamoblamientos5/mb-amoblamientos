import { Reveal } from '@/components/ui/Reveal'
import type { ServiceItem } from '@/interfaces/pages'

export function ServiceCard({ number, title, description }: ServiceItem) {
  return (
    <Reveal as="article" className="group flex flex-col gap-6 border-t border-line pt-6 pb-6 md:gap-7.5 md:pt-7.5 md:pr-5 md:pb-8.75">
      <p className="flex justify-between text-[10px] text-muted">
        {number}
        <span aria-hidden="true">↗</span>
      </p>
      <div className="flex flex-col gap-3.75">
        <h3 className="text-xl font-medium tracking-[-1px] transition-[translate,color] duration-250 group-hover:translate-x-1.5 group-hover:text-highlight motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 md:text-2xl">
          {title}
        </h3>
        <p className="text-xs leading-[1.8] text-muted md:text-[13px]">{description}</p>
      </div>
    </Reveal>
  )
}

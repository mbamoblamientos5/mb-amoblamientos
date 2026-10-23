import { Fragment } from 'react'

interface TickerProps {
  label: string
  items: string[]
}

export function Ticker({ label, items }: TickerProps) {
  // La lista se duplica para que la animación (-50%) vuelva al inicio sin salto.
  const loop = [...items, ...items]
  return (
    <div className="overflow-hidden bg-accent py-5 text-[#20271b] md:py-6">
      <p className="sr-only">{label}</p>
      <div
        aria-hidden="true"
        className="flex w-max animate-ticker items-center gap-12 font-brand text-[13px] font-semibold tracking-[-0.4px] motion-reduce:animate-none md:text-base"
      >
        {loop.map((item, index) => (
          <Fragment key={index}>
            <span>{item}</span>
            <span className="text-accent-deep">✳</span>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

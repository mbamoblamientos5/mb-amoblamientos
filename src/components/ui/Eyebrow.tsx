interface EyebrowProps {
  text: string
  /** Sobre fondos oscuros el punto usa el color de acento. */
  onDark?: boolean
}

export function Eyebrow({ text, onDark = false }: EyebrowProps) {
  return (
    <p className="flex items-center gap-3 text-[9px] font-semibold tracking-[2px] uppercase md:text-[10px] md:tracking-[2.6px]">
      <span aria-hidden="true" className={`size-1.75 shrink-0 rounded-full ${onDark ? 'bg-accent' : 'bg-dot'}`} />
      {text}
    </p>
  )
}

import { useEffect, useId, useRef, type KeyboardEvent, type MouseEvent } from 'react'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { getAssetUrl } from '@/data/images'
import type { LightboxLabels, WorkItem } from '@/interfaces/pages'

interface LightboxProps {
  items: WorkItem[]
  /** Foto abierta; `null` con el modal cerrado. */
  index: number | null
  labels: LightboxLabels
  onNavigate: (index: number) => void
  onClose: () => void
}

const stepButton =
  'flex size-11.5 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/30 text-[22px] transition-colors hover:bg-white/10'

/**
 * Visor de fotos sobre `<dialog>` nativo: aporta el foco atrapado, el cierre con Escape
 * y el fondo (`::backdrop`). Este componente agrega la navegación y el bloqueo del scroll.
 */
export function Lightbox({ items, index, labels, onNavigate, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const isOpen = index !== null
  const item = index === null ? undefined : items[index]

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !isOpen) return
    if (!dialog.open) dialog.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
      if (dialog.open) dialog.close()
    }
  }, [isOpen])

  const step = (delta: number) => {
    if (index !== null) onNavigate((index + delta + items.length) % items.length)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      step(event.key === 'ArrowLeft' ? -1 : 1)
    }
  }

  // Un clic sobre el propio <dialog> fuera de su caja es un clic en el fondo.
  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return
    const rect = event.currentTarget.getBoundingClientRect()
    const outside =
      event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom
    if (outside) event.currentTarget.close()
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="m-auto max-h-[94svh] w-[min(1100px,94vw)] rounded-2xl border border-white/20 bg-[#1b211c] p-3.5 text-[#f5f1e8] backdrop:bg-[#090e0be8] backdrop:backdrop-blur-sm md:p-5"
    >
      {item && index !== null && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-5">
            <div>
              <h2 id={titleId} className="text-base tracking-[-0.5px] md:text-xl">
                {item.title}
              </h2>
              <p className="mt-1 text-xs text-[#c0c8b9]">{item.description}</p>
            </div>
            <button
              type="button"
              aria-label={labels.close}
              onClick={() => dialogRef.current?.close()}
              className={stepButton}
            >
              ×
            </button>
          </div>
          <ResponsiveImage
            key={item.image}
            image={item.image}
            alt={`${item.title}: ${item.description}`}
            sizes="min(1100px, 94vw)"
            loading="eager"
            className="block h-[60svh] w-full rounded-lg bg-[#121813] object-contain md:h-[min(64svh,720px)]"
          />
          <div className="flex flex-wrap items-center justify-between gap-4 md:flex-nowrap">
            <a
              href={getAssetUrl(item.original)}
              target="_blank"
              rel="noopener"
              className="text-xs underline underline-offset-4"
            >
              {labels.original}
            </a>
            <div className="flex items-center gap-2.5">
              <button type="button" aria-label={labels.previous} onClick={() => step(-1)} className={stepButton}>
                ←
              </button>
              <span aria-live="polite" className="text-xs text-[#c0c8b9]">
                {index + 1} / {items.length}
              </span>
              <button type="button" aria-label={labels.next} onClick={() => step(1)} className={stepButton}>
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}

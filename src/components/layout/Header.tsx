import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Container } from '@/components/ui/Container'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { siteContent } from '@/data'
import { useActiveSection } from '@/hooks/useActiveSection'

const { brand, navigation, ui } = siteContent
// Cada ítem apunta a `/#seccion`: el id de la sección es lo que sigue al `#`.
const sectionIds = navigation.map((item) => item.to.split('#')[1] ?? '')

const linkBase = 'flex min-h-12 items-center rounded-md px-3 py-3.5 text-[15px] transition-colors md:min-h-0 md:px-0 md:py-3.75 md:text-xs'
const pillBase =
  'mt-2 flex min-h-12 items-center justify-center rounded-full border px-5.5 py-3.25 text-[15px] transition-colors md:mt-0 md:min-h-0 md:text-xs'

export function Header() {
  const { pathname } = useLocation()
  // El menú queda abierto solo en la ruta donde se abrió: al navegar se cierra sin efectos extra.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const isOpen = openOn === pathname
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()
  const activeSection = useActiveSection(sectionIds)

  const close = useCallback(() => setOpenOn(null), [])

  useEffect(() => {
    if (!isOpen) return
    const header = headerRef.current
    const isOutside = (target: EventTarget | null) => !(target instanceof Node && header?.contains(target))

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      close()
      toggleRef.current?.focus()
    }
    const onPointerDown = (event: PointerEvent) => {
      if (isOutside(event.target)) close()
    }
    const onFocusIn = (event: FocusEvent) => {
      if (isOutside(event.target)) close()
    }
    const desktop = window.matchMedia('(min-width: 651px)')
    const onBreakpoint = () => {
      if (desktop.matches) close()
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('focusin', onFocusIn)
    desktop.addEventListener('change', onBreakpoint)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('focusin', onFocusIn)
      desktop.removeEventListener('change', onBreakpoint)
    }
  }, [isOpen, close])

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-30 border-b border-white/20 bg-forest-900/95 text-white shadow-[0_2px_18px_#0001] backdrop-blur-[14px]"
    >
      <Container className="flex min-h-(--header-h) items-center justify-between gap-2.5 md:gap-6">
        <Link to="/" aria-label={brand.homeLabel} className="flex items-center gap-2.5 md:gap-4">
          <span className="font-brand text-[30px] font-extrabold tracking-[-3px] md:text-[35px]">{brand.logo}</span>
          <span className="max-w-26.25 border-l border-white/30 pl-2.5 text-[8px] leading-[1.6] tracking-[1.3px] uppercase md:max-w-35 md:pl-4 md:text-[10px]">
            {brand.tagline[0]}
            <br />
            {brand.tagline[1]}
          </span>
        </Link>

        <div className="flex items-center gap-2.5 md:gap-8">
          <nav
            id={menuId}
            aria-label={ui.navLabel}
            className={`absolute inset-x-0 top-full flex max-h-[calc(100svh-var(--header-h))] flex-col gap-0.5 overflow-y-auto border-t border-white/15 bg-forest-900 px-5 pt-3 pb-5.5 shadow-[0_14px_20px_#0003] transition-[opacity,translate,visibility] duration-300 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none md:visible md:static md:max-h-none md:translate-y-0 md:flex-row md:items-center md:gap-8 md:overflow-visible md:border-0 md:bg-transparent md:p-0 md:opacity-100 md:shadow-none ${isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'}`}
          >
            {navigation.map((item, index) => {
              const isActive = activeSection === sectionIds[index]
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={close}
                  aria-current={isActive ? 'location' : undefined}
                  className={
                    item.highlight
                      ? `${pillBase} ${isActive ? 'border-accent bg-accent text-[#20271b]' : 'border-white/40 hover:border-accent'}`
                      : `${linkBase} ${isActive ? 'text-accent' : 'hover:text-accent'}`
                  }
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <ThemeToggle />

          <button
            ref={toggleRef}
            type="button"
            aria-controls={menuId}
            aria-expanded={isOpen}
            aria-label={isOpen ? ui.closeMenu : ui.openMenu}
            onClick={() => setOpenOn(isOpen ? null : pathname)}
            className="group flex size-11.5 cursor-pointer flex-col items-center justify-center gap-1.25 rounded-[9px] border border-white/35 md:hidden"
          >
            <span className="block h-0.5 w-5 bg-current transition-transform duration-300 group-aria-expanded:translate-y-1.75 group-aria-expanded:rotate-45 motion-reduce:transition-none" />
            <span className="block h-0.5 w-5 bg-current transition-opacity duration-200 group-aria-expanded:opacity-0 motion-reduce:transition-none" />
            <span className="block h-0.5 w-5 bg-current transition-transform duration-300 group-aria-expanded:-translate-y-1.75 group-aria-expanded:-rotate-45 motion-reduce:transition-none" />
          </button>
        </div>
      </Container>
    </header>
  )
}

import { Container } from '@/components/ui/Container'
import { siteContent } from '@/data'

const { brand, footer } = siteContent

export function Footer() {
  return (
    <footer className="bg-forest-950 pt-11.25 pb-21.25 text-forest-on md:pb-11.25">
      <Container className="flex flex-col items-start gap-6.25 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1.75">
          <span className="font-brand text-[30px] font-extrabold tracking-[-3px] text-white md:text-[35px]">
            {brand.logo}
          </span>
          <p className="text-[11px]">{footer.description}</p>
        </div>
        <small className="text-[10px]">{footer.signature}</small>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0 })}
          className="flex cursor-pointer items-center gap-3.75 border-b border-white/45 py-3.75 text-xs"
        >
          {footer.backToTop}
        </button>
      </Container>
    </footer>
  )
}

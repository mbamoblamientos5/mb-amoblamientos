import { use } from 'react'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { PageMeta } from '@/components/ui/PageMeta'
import { Section } from '@/components/ui/Section'
import { getNotFoundContent } from '@/data'

export default function NotFound() {
  const { seo, eyebrow, code, title, description, cta } = use(getNotFoundContent())

  return (
    <Section first labelledBy="not-found-title" className="min-h-[60svh] items-start justify-center gap-7.5">
      <PageMeta {...seo} />
      <meta name="robots" content="noindex" />
      <Eyebrow text={eyebrow} />
      <p
        aria-hidden="true"
        className="font-display text-[clamp(96px,24vw,220px)] leading-[0.85] font-semibold tracking-[-0.06em] text-accent"
      >
        {code}
      </p>
      <h1 id="not-found-title" className="heading-xl">
        {title}
      </h1>
      <p className="max-w-100 text-sm leading-[1.9] text-muted">{description}</p>
      <Button to={cta.to} variant="strong">
        {cta.label}
      </Button>
    </Section>
  )
}

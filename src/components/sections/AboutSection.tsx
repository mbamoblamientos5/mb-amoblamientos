import { Eyebrow } from '@/components/ui/Eyebrow'
import { Lines } from '@/components/ui/Lines'
import { ParallaxImage } from '@/components/ui/ParallaxImage'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import type { AboutContent } from '@/interfaces/pages'

export function AboutSection({ content }: { content: AboutContent }) {
  const { eyebrow, title, paragraphs, signature, image } = content

  return (
    <Section id="oficio" labelledBy="oficio-title">
      <div className="flex flex-col gap-8.75 md:flex-row md:items-center md:gap-25 lg:items-start">
        <Reveal className="relative h-100 overflow-hidden rounded-xl bg-photo md:h-160 md:flex-1 md:rounded-[120px_12px_12px_12px] lg:h-185">
          <ParallaxImage
            image={image.src}
            alt={image.alt}
            sizes="(min-width: 651px) 50vw, 100vw"
            speed={0.16}
            centered
            className="absolute -top-[10%] left-0 h-[120%] w-full object-cover object-[35%_center] md:object-[40%_center]"
          />
        </Reveal>

        <Reveal className="flex flex-col gap-7.5 md:flex-1 lg:sticky lg:top-25 lg:pt-11.25">
          <Eyebrow text={eyebrow} />
          <h2 id="oficio-title" className="heading-xl">
            <Lines lines={title} />
          </h2>
          <div className="flex flex-col gap-5">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-92.5 text-sm leading-[1.9] text-muted">
                {paragraph}
              </p>
            ))}
          </div>
          <p className="flex flex-col gap-1.75 border-t border-line pt-6.25 font-brand text-lg font-medium tracking-[-0.8px]">
            {signature.name}
            <small className="font-sans text-[10px] font-normal tracking-[1.2px] text-muted uppercase">
              {signature.role}
            </small>
          </p>
        </Reveal>
      </div>
    </Section>
  )
}

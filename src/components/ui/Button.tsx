import type { ReactNode } from 'react'
import { Link } from 'react-router'

type ButtonVariant = 'accent' | 'strong'

type ButtonTarget =
  | { to: string; href?: never; type?: never }
  | { href: string; to?: never; type?: never }
  | { type: 'submit' | 'button'; to?: never; href?: never }

type ButtonProps = ButtonTarget & {
  variant?: ButtonVariant
  className?: string
  children: ReactNode
}

const variants: Record<ButtonVariant, string> = {
  accent: 'bg-accent text-[#20271b] hover:bg-accent-soft',
  strong: 'bg-strong text-on-strong hover:bg-strong-hover',
}

/** Botón principal con flecha. Interno (`to`), externo en pestaña nueva (`href`) o de formulario (`type`). */
export function Button({ variant = 'accent', className = '', children, ...target }: ButtonProps) {
  const classes = `inline-flex min-h-13.75 items-center justify-between gap-6.25 rounded-full px-5 py-4 text-xs font-semibold transition-[background-color,translate] duration-200 hover:-translate-y-0.5 motion-reduce:transition-none md:gap-9 md:px-6.25 ${variants[variant]} ${className}`
  const content = (
    <>
      {children}
      <span aria-hidden="true" className="text-xl leading-none">
        ↗
      </span>
    </>
  )

  if (target.to !== undefined) {
    return (
      <Link to={target.to} className={classes}>
        {content}
      </Link>
    )
  }
  if (target.href !== undefined) {
    return (
      <a href={target.href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    )
  }
  return (
    <button type={target.type} className={`cursor-pointer ${classes}`}>
      {content}
    </button>
  )
}

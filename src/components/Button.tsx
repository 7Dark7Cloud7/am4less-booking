import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'accent' | 'outline' | 'ghost' | 'onDark' | 'outlineOnDark' | 'danger'
type Size = 'sm' | 'md' | 'lg'

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 dark:bg-brand-400 dark:text-brand-950 dark:hover:bg-brand-300',
  accent: 'bg-accent-700 text-white hover:bg-accent-800 active:bg-accent-900 font-bold',
  outline:
    'bg-surface text-ink border border-line-strong hover:border-brand-400 hover:bg-surface-muted dark:bg-transparent',
  ghost: 'bg-transparent text-ink hover:bg-surface-muted',
  onDark: 'bg-white text-brand-900 hover:bg-brand-50 active:bg-brand-100',
  outlineOnDark:
    'bg-transparent text-white border border-white/40 hover:bg-white/12 hover:border-white/70 active:bg-white/20',
  danger: 'bg-danger text-white hover:brightness-110'
}

const SIZES: Record<Size, string> = {
  sm: 'min-h-11 px-4 py-1.5 text-sm',
  md: 'min-h-[3.1rem] px-5 py-2.5 text-[0.95rem]',
  lg: 'min-h-[3.4rem] px-7 py-3 text-base'
}

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold no-underline transition-[background-color,color,border-color,transform,box-shadow] duration-150 cursor-pointer select-none active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: Variant
  size?: Size
  block?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  iconLeft,
  iconRight,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${block ? 'w-full' : ''} ${className}`}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  )
}

interface LinkButtonProps {
  href: string
  variant?: Variant
  size?: Size
  block?: boolean
  className?: string
  children: ReactNode
  external?: boolean
  ariaLabel?: string
}

/** Same visual as Button but a real anchor — used for tel:, wa.me and mailto:. */
export function LinkButton({
  href,
  variant = 'primary',
  size = 'md',
  block = false,
  className = '',
  children,
  external = false,
  ariaLabel
}: LinkButtonProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${block ? 'w-full' : ''} ${className}`}
    >
      {children}
    </a>
  )
}

/** Router-aware button so in-app navigation never reloads the document. */
export function RouteButton({
  to,
  variant = 'primary',
  size = 'md',
  block = false,
  className = '',
  onClick,
  children
}: {
  to: string
  variant?: Variant
  size?: Size
  block?: boolean
  className?: string
  onClick?: () => void
  children: ReactNode
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${block ? 'w-full' : ''} ${className}`}
    >
      {children}
    </Link>
  )
}

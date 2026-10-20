import type { ReactNode } from 'react'
import { HardHat, KeyRound, PartyPopper, Sparkles, Truck, Waves } from 'lucide-react'

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
  as: Tag = 'h2'
}: {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  center?: boolean
  as?: 'h1' | 'h2' | 'h3'
}) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p
          className={`mb-2.5 flex items-center gap-2 text-xs font-bold tracking-[0.13em] uppercase text-brand-600 dark:text-brand-300 ${
            center ? 'justify-center' : ''
          }`}
        >
          {!center && <span className="h-0.5 w-7 rounded bg-accent-500" />}
          {eyebrow}
        </p>
      )}
      <Tag className="text-3xl sm:text-4xl font-bold text-ink">{title}</Tag>
      {intro && <p className="mt-3 text-lg text-ink-soft">{intro}</p>}
    </div>
  )
}

export function Pill({
  children,
  tone = 'neutral'
}: {
  children: ReactNode
  tone?: 'neutral' | 'accent' | 'brand' | 'onDark'
}) {
  const tones = {
    neutral: 'bg-surface-muted text-ink-soft border-line',
    accent: 'bg-accent-500/15 text-accent-700 border-accent-500/40 dark:text-accent-300',
    brand: 'bg-brand-600 text-white border-brand-600',
    onDark: 'bg-white/12 text-white border-white/30'
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.7rem] font-bold tracking-wide uppercase ${tones[tone]}`}
    >
      {children}
    </span>
  )
}

export function Callout({
  tone = 'info',
  icon,
  children
}: {
  tone?: 'info' | 'warn' | 'success'
  icon?: ReactNode
  children: ReactNode
}) {
  const tones = {
    info: 'border-brand-300 bg-brand-50 dark:bg-brand-900/30 text-ink',
    warn: 'border-warning/50 bg-warning/12 text-ink',
    success: 'border-success/50 bg-success/12 text-ink'
  }
  return (
    <div className={`flex items-start gap-3 rounded-[var(--radius-card)] border p-4 text-sm ${tones[tone]}`}>
      {icon && <span className="mt-0.5 shrink-0">{icon}</span>}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}

const CATEGORY_ICONS: Record<string, ReactNode> = {
  sparkles: <Sparkles className="size-5" aria-hidden="true" />,
  'hard-hat': <HardHat className="size-5" aria-hidden="true" />,
  'party-popper': <PartyPopper className="size-5" aria-hidden="true" />,
  truck: <Truck className="size-5" aria-hidden="true" />,
  waves: <Waves className="size-5" aria-hidden="true" />,
  'key-round': <KeyRound className="size-5" aria-hidden="true" />
}

export function CategoryIcon({ name }: { name: string }) {
  return CATEGORY_ICONS[name] ?? <Sparkles className="size-5" aria-hidden="true" />
}

export function IconTile({ children }: { children: ReactNode }) {
  return (
    <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-brand-100 bg-brand-50 text-brand-600 dark:border-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
      {children}
    </span>
  )
}

export function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="relative ps-6 text-sm text-ink-soft">
      <span className="absolute left-0 top-[0.15rem] text-brand-600 dark:text-brand-300">✓</span>
      {children}
    </li>
  )
}

/** Three-dot labour weight meter. Pair with INTENSITY_LABELS text for screen readers. */
export function IntensityDots({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span aria-hidden="true" className="flex items-center gap-1">
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={`size-2 rounded-full ${n <= level ? 'bg-accent-600' : 'border border-line-strong bg-transparent'}`}
        />
      ))}
    </span>
  )
}

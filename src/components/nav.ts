export const NAV = [
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/training', label: 'Training' },
  { to: '/careers', label: 'Careers' },
  { to: '/account', label: 'My bookings' },
  { to: '/contact', label: 'Contact' }
]

export type NavTone = 'light' | 'lux'

const BASE = 'inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold no-underline transition-colors'

const TONES: Record<NavTone, { idle: string; active: string }> = {
  light: {
    idle: 'text-ink hover:bg-surface-muted hover:text-brand-600',
    active: 'bg-brand-50 text-brand-700 dark:bg-brand-900/60 dark:text-brand-200'
  },
  lux: {
    idle: 'text-ivory/65 hover:bg-white/5 hover:text-ivory',
    active: 'bg-gold/10 text-gold-soft'
  }
}

export function navLinkClass(isActive: boolean, tone: NavTone): string {
  const skin = TONES[tone]
  return `${BASE} ${isActive ? skin.active : skin.idle}`
}

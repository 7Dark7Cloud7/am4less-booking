import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { CalendarCheck2, Download, Menu, Moon, Phone, Sun, X } from 'lucide-react'
import { BUSINESS } from '../domain/business'
import { Button, LinkButton, RouteButton } from './Button'
import { BrandMark } from './BrandMark'
import { useInstallPrompt } from '../hooks/useInstallPrompt'
import { useAppTheme } from './ThemeProvider'

const NAV = [
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/training', label: 'Training' },
  { to: '/careers', label: 'Careers' },
  { to: '/account', label: 'My bookings' },
  { to: '/contact', label: 'Contact' }
]

const linkBase = 'block rounded-lg px-3 py-2 text-sm font-semibold no-underline transition-colors'

function linkClass(isActive: boolean): string {
  return `${linkBase} ${
    isActive
      ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/60 dark:text-brand-200'
      : 'text-ink hover:bg-surface-muted hover:text-brand-600'
  }`
}

export function Header() {
  const [open, setOpen] = useState(false)
  const { canInstall, install } = useInstallPrompt()
  const { isDark, toggle } = useAppTheme()
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/85 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-[clamp(1rem,0.5rem+2vw,2rem)]">
        <Link to="/" className="flex min-w-0 items-center py-2.5 no-underline" aria-label="AM4LESS — home">
          <BrandMark size={40} />
        </Link>

        <nav aria-label="Main" className="ms-auto hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => linkClass(isActive)}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2 lg:ms-1">
          {canInstall && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => void install()}
              iconLeft={<Download className="size-4" aria-hidden="true" />}
              className="hidden xl:inline-flex"
            >
              Install
            </Button>
          )}
          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            className="tap-target grid place-items-center rounded-[var(--radius-field)] border border-line text-ink transition-colors hover:bg-surface-muted"
          >
            {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
          <RouteButton to="/book" size="sm" variant="primary" className="hidden sm:inline-flex">
            <CalendarCheck2 className="size-4" aria-hidden="true" />
            Book now
          </RouteButton>
          <Button
            variant="ghost"
            size="sm"
            className="tap-target lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-line bg-surface lg:hidden">
          <div className="mx-auto max-w-7xl px-[clamp(1rem,0.5rem+2vw,2rem)] py-3">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `${linkClass(isActive)} min-h-[3rem] border-b border-line py-4 text-base`}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-4 grid gap-2">
              <RouteButton to="/book" variant="primary" block>
                <CalendarCheck2 className="size-4" aria-hidden="true" />
                Book a cleaning
              </RouteButton>
              <LinkButton href={BUSINESS.phoneHref} variant="outline" block ariaLabel={`Call ${BUSINESS.phoneDisplay}`}>
                <Phone className="size-4" aria-hidden="true" />
                {BUSINESS.phoneDisplay}
              </LinkButton>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}

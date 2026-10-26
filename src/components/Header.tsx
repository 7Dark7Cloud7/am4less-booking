import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { CalendarCheck2, Download, Menu, Moon, Sun, X } from 'lucide-react'
import { Button, RouteButton } from './Button'
import { BrandMark } from './BrandMark'
import { MobileNav } from './MobileNav'
import { NAV, navLinkClass, type NavTone } from './nav'
import { useInstallPrompt } from '../hooks/useInstallPrompt'
import { useAppTheme } from './ThemeProvider'

/** `overlay` is the dark editorial header used on the home page. */
export function Header({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false)
  const { canInstall, install } = useInstallPrompt()
  const { isDark, toggle } = useAppTheme()
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  const tone: NavTone = overlay ? 'lux' : 'light'

  return (
    <header
      className={`safe-area-top sticky top-0 z-50 border-b backdrop-blur-lg ${
        overlay ? 'border-white/10 bg-lux-base/90' : 'border-line bg-surface/85'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-[clamp(1rem,0.5rem+2vw,2rem)]">
        <Link to="/" className="flex min-w-0 items-center py-2.5 no-underline" aria-label="AM4LESS — home">
          <BrandMark size={40} tone={overlay ? 'lux' : 'auto'} />
        </Link>

        <nav aria-label="Main" className="ms-auto hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => navLinkClass(isActive, tone)}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2 lg:ms-1">
          {canInstall && !overlay && (
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
          {!overlay && (
            <button
              type="button"
              onClick={toggle}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              className="tap-target grid place-items-center rounded-[var(--radius-field)] border border-line text-ink transition-colors hover:bg-surface-muted"
            >
              {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
          )}
          <div className="hidden sm:block">
            <RouteButton to="/book" size="sm" variant={overlay ? 'accent' : 'primary'} className="min-h-11">
              <CalendarCheck2 className="size-4" aria-hidden="true" />
              <span className="whitespace-nowrap">{overlay ? 'Book a cleaning' : 'Book now'}</span>
            </RouteButton>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className={`tap-target !min-h-11 min-w-11 lg:hidden ${overlay ? 'text-lux-fg hover:bg-white/10' : ''}`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>
      </div>

      {open && <MobileNav tone={tone} />}
    </header>
  )
}

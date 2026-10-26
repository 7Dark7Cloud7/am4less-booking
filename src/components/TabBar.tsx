import { NavLink, useLocation } from 'react-router-dom'
import { CalendarPlus, Home, LayoutGrid, Phone, ReceiptText } from 'lucide-react'
import { BUSINESS } from '../domain/business'

const TABS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/services', label: 'Services', icon: LayoutGrid, end: false },
  { to: '/account', label: 'Bookings', icon: ReceiptText, end: false }
]

/**
 * Android-style app shell. The centre action is the conversion path, so it is
 * elevated above the bar and is the only filled shape down here.
 */
export function TabBar() {
  const { pathname } = useLocation()
  const onBook = pathname.startsWith('/book')
  const lux = pathname === '/'

  return (
    <nav
      aria-label="Primary"
      className={`fixed inset-x-0 bottom-0 z-40 border-t backdrop-blur-lg shadow-[var(--shadow-bar)] lg:hidden ${
        lux ? 'border-white/10 bg-lux-base/95' : 'border-line bg-surface/95'
      }`}
      style={{ paddingBottom: 'var(--spacing-safe-bottom)' }}
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2">
        {TABS.slice(0, 2).map((tab) => (
          <Tab key={tab.to} {...tab} lux={lux} />
        ))}

        <li className="relative -mt-6 flex w-[26%] justify-center">
          <NavLink
            to="/book"
            aria-label="Get a free quote"
            aria-current={onBook ? 'page' : undefined}
            className={`flex size-[60px] items-center justify-center rounded-full shadow-[var(--shadow-lift)] transition-transform active:translate-y-0.5 ${
              lux ? 'bg-accent-700 text-white' : 'bg-brand-600 text-white dark:bg-brand-500'
            }`}
          >
            <CalendarPlus className="size-7" aria-hidden="true" />
            <span className="sr-only">Quote</span>
          </NavLink>
        </li>

        <Tab {...TABS[2]!} lux={lux} />
        <li className="w-[26%]">
          <a
            href={BUSINESS.phoneHref}
            aria-label={`Call ${BUSINESS.phoneDisplay}`}
            className={`flex h-full flex-col items-center justify-center gap-1 py-2 text-[0.68rem] font-semibold no-underline ${
              lux ? 'text-lux-fg-soft active:text-accent-400' : 'text-ink-soft active:text-brand-600'
            }`}
          >
            <span
              className={`grid size-7 place-items-center rounded-full ${
                lux ? 'bg-accent-500/20 text-accent-300' : 'bg-accent-600/12 text-accent-600 dark:text-accent-400'
              }`}
            >
              <Phone className="size-4" aria-hidden="true" />
            </span>
            Call
          </a>
        </li>
      </ul>
    </nav>
  )
}

function Tab({
  to,
  label,
  icon: Icon,
  end,
  lux
}: {
  to: string
  label: string
  icon: typeof Home
  end: boolean
  lux: boolean
}) {
  return (
    <li className="w-[26%]">
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) => {
          if (lux) return `flex h-full flex-col items-center justify-center gap-1 py-2 text-[0.68rem] font-semibold no-underline ${isActive ? 'text-accent-300' : 'text-lux-fg-faint active:text-lux-fg'}`
          return `flex h-full flex-col items-center justify-center gap-1 py-2 text-[0.68rem] font-semibold no-underline transition-colors ${
            isActive ? 'text-brand-700 dark:text-brand-300' : 'text-ink-soft active:text-brand-600 dark:text-ink-soft'
          }`
        }}
      >
        {({ isActive }) => (
          <>
            <span
              className={`grid size-7 place-items-center rounded-full transition-colors ${
                lux ? (isActive ? 'bg-accent-500/20' : '') : isActive ? 'bg-brand-600/12 dark:bg-brand-400/20' : ''
              }`}
            >
              <Icon className="size-5" aria-hidden="true" />
            </span>
            {label}
          </>
        )}
      </NavLink>
    </li>
  )
}

import { NavLink } from 'react-router-dom'
import { CalendarCheck2, Phone } from 'lucide-react'
import { BUSINESS } from '../domain/business'
import { LinkButton, RouteButton } from './Button'
import { NAV, navLinkClass, type NavTone } from './nav'

export function MobileNav({ tone }: { tone: NavTone }) {
  return (
    <nav
      id="mobile-nav"
      aria-label="Main"
      className={`border-t lg:hidden ${tone === 'lux' ? 'border-white/10 bg-lux-base' : 'border-line bg-surface'}`}
    >
      <div className="mx-auto max-w-7xl px-[clamp(1rem,0.5rem+2vw,2rem)] py-3">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `${navLinkClass(isActive, tone)} min-h-[3rem] border-b py-4 text-base ${
                tone === 'lux' ? 'border-white/8' : 'border-line'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
        <div className="mt-4 grid gap-2">
          <RouteButton to="/book" variant={tone === 'lux' ? 'accent' : 'primary'} block>
            <CalendarCheck2 className="size-4" aria-hidden="true" />
            Book a cleaning
          </RouteButton>
          <LinkButton
            href={BUSINESS.phoneHref}
            variant={tone === 'lux' ? 'outlineOnDark' : 'outline'}
            block
            ariaLabel={`Call ${BUSINESS.phoneDisplay}`}
          >
            <Phone className="size-4" aria-hidden="true" />
            {BUSINESS.phoneDisplay}
          </LinkButton>
        </div>
      </div>
    </nav>
  )
}

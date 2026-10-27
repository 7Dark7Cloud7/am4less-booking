import { NavLink } from 'react-router-dom'
import { BriefcaseBusiness, CalendarDays, GraduationCap, Home, Images, Info, LayoutGrid, Mail, Moon, Phone, Sun } from 'lucide-react'
import { BUSINESS } from '../domain/business'
import { BrandMark } from './BrandMark'
import { useAppTheme } from './ThemeProvider'

const LINKS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/services', label: 'Services', icon: LayoutGrid },
  { to: '/account', label: 'My bookings', icon: CalendarDays },
  { to: '/gallery', label: 'Our work', icon: Images },
  { to: '/about', label: 'About us', icon: Info },
  { to: '/training', label: 'Training', icon: GraduationCap },
  { to: '/careers', label: 'Careers', icon: BriefcaseBusiness },
  { to: '/contact', label: 'Contact', icon: Mail }
]

export function SkySidebar() {
  const { isDark, toggle } = useAppTheme()
  return (
    <aside className="sky-sidebar">
      <NavLink to="/" aria-label="AM4LESS home" className="mb-8 flex min-h-11 items-center no-underline"><BrandMark size={36} tone="lux" /></NavLink>
      <nav aria-label="Main navigation" className="space-y-1">
        {LINKS.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `sky-sidebar-link ${isActive ? 'is-active' : ''}`}>
            <Icon className="size-5 shrink-0" aria-hidden="true" /><span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto pt-6">
        <button type="button" onClick={toggle} className="sky-sidebar-link mb-3 w-full" aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
          {isDark ? <Sun className="size-5" aria-hidden="true" /> : <Moon className="size-5" aria-hidden="true" />}<span>{isDark ? 'Light' : 'Dark'} mode</span>
        </button>
        <a href={BUSINESS.phoneHref} className="sky-call"><Phone className="size-5 shrink-0" aria-hidden="true" /><span>Call us<strong>{BUSINESS.phoneDisplay}</strong></span></a>
      </div>
    </aside>
  )
}

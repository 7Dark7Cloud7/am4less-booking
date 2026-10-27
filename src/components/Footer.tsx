import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Clock, Facebook, Instagram, Mail, MapPin, Music2, Phone, Star } from 'lucide-react'
import { BUSINESS } from '../domain/business'
import { CATEGORIES } from '../domain/categories'

interface FooterProps {
  /** `lux` matches the dark editorial home page; `light` is the default commercial shell. */
  tone?: 'light' | 'lux'
  /** The booking wizard pins its PlanBar over the bottom of the phone screen, so the marketing footer waits for desktop. */
  hideOnMobile?: boolean
}

export function Footer({ tone = 'light', hideOnMobile = false }: FooterProps) {
  const lux = tone === 'lux'
  const linkClass = lux
    ? 'text-lux-fg-soft no-underline transition-colors hover:text-accent-400'
    : 'text-brand-200 no-underline hover:text-accent-400 hover:underline'
  const muteClass = lux ? 'text-lux-fg-faint' : 'text-brand-300'
  const navLink = `flex min-h-11 items-center ${linkClass}`

  return (
    <footer
      className={`am4-site-footer ${hideOnMobile ? 'hidden lg:block' : ''} ${lux ? 'font-[family-name:var(--font-lux)] border-t border-brand-800/70 bg-lux-base text-lux-fg-soft' : 'bg-brand-950 text-brand-100 dark:bg-[oklch(0.12_0.025_266)]'}`}
    >
      <div className="mx-auto max-w-7xl px-[clamp(1rem,0.5rem+2vw,2rem)] pt-14 pb-[calc(5.5rem+var(--spacing-safe-bottom))] lg:pb-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/brand/logo-am4less.webp"
                width={52}
                height={52}
                alt="AM4LESS badge logo"
                decoding="async"
                className="size-[52px] shrink-0 rounded-full bg-white/95 p-1 object-contain"
              />
              <span>
                <span className="block font-[family-name:var(--font-display)] text-xl font-bold text-white">
                  AM4<span className="text-accent-400">LESS</span>
                </span>
                <span
                  className={`text-[0.68rem] font-semibold tracking-wide uppercase ${lux ? 'text-lux-fg-faint' : 'text-brand-300'}`}
                >
                  Quality goods &amp; services
                </span>
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold text-accent-400">{BUSINESS.slogan}</p>
            <p className={`mt-3 text-sm ${lux ? 'text-lux-fg-soft' : 'text-brand-200'}`}>{BUSINESS.tagline}</p>
            <p className={`mt-3 text-sm ${muteClass}`}>{BUSINESS.foundedNote}</p>
            <div className="mt-4 flex gap-2">
              <Social href={BUSINESS.social.facebook} label="Facebook" lux={lux}>
                <Facebook className="size-4" />
              </Social>
              <Social href={BUSINESS.social.instagram} label="Instagram" lux={lux}>
                <Instagram className="size-4" />
              </Social>
              <Social href={BUSINESS.social.tiktok} label="TikTok" lux={lux}>
                <Music2 className="size-4" />
              </Social>
              <Social href={BUSINESS.reviewHref} label="Read and leave Google reviews" lux={lux}>
                <Star className="size-4" />
              </Social>
            </div>
          </div>

          <nav aria-label="Services">
            <h3 className="mb-4 text-sm font-bold tracking-wide text-white uppercase">Service groups</h3>
            <ul className="text-sm">
              {CATEGORIES.map((category) => (
                <li key={category.id}>
                  <Link to={`/services#${category.id}`} className={navLink}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h3 className="mb-4 text-sm font-bold tracking-wide text-white uppercase">Company</h3>
            <ul className="text-sm">
              {[
                { to: '/about', label: 'About AM4LESS' },
                { to: '/training', label: 'Mastery program' },
                { to: '/careers', label: 'Careers' },
                { to: '/book', label: 'Book & get a quote' },
                { to: '/account', label: 'My bookings' },
                { to: '/settings', label: 'Business settings' }
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={navLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-4 text-sm font-bold tracking-wide text-white uppercase">Reach us</h3>
            <ul className="space-y-3 text-sm">
              <FooterLine icon={<Phone className="size-4" />} lux={lux}>
                <a href={BUSINESS.phoneHref} className={`inline-flex min-h-11 items-center ${linkClass}`}>
                  {BUSINESS.phoneDisplay}
                </a>
              </FooterLine>
              <FooterLine icon={<Mail className="size-4" />} lux={lux}>
                <a href={`mailto:${BUSINESS.email}`} className={`inline-flex min-h-11 items-center ${linkClass}`}>
                  {BUSINESS.email}
                </a>
              </FooterLine>
              <FooterLine icon={<MapPin className="size-4" />} lux={lux}>
                <span>
                  {BUSINESS.city}, {BUSINESS.region} {BUSINESS.postalCode}
                  <br />
                  <span className={lux ? 'text-lux-fg-faint' : 'text-brand-400'}>{BUSINESS.areaServed}</span>
                </span>
              </FooterLine>
              <FooterLine icon={<Clock className="size-4" />} lux={lux}>
                <span>{BUSINESS.hoursSummary}</span>
              </FooterLine>
            </ul>
          </div>
        </div>

        <div
          className={`mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-xs ${lux ? 'border-white/10 text-lux-fg-faint' : 'border-brand-800 text-brand-400'}`}
        >
          <p>
            © {new Date().getFullYear()} {BUSINESS.legalName}. All rights reserved.
          </p>
          <p>Insured &amp; bonded · Estimates are non-binding until the on-site walkthrough.</p>
        </div>
      </div>
    </footer>
  )
}

function Social({ href, label, children, lux }: { href: string; label: string; children: ReactNode; lux: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`tap-target grid place-items-center rounded-lg border no-underline transition-colors ${
        lux
          ? 'border-white/15 text-lux-fg-soft hover:border-accent-400 hover:bg-white/5 hover:text-accent-400'
          : 'border-brand-700 text-brand-200 hover:border-accent-400 hover:bg-brand-900 hover:text-accent-400'
      }`}
    >
      {children}
    </a>
  )
}

function FooterLine({ icon, children, lux }: { icon: ReactNode; children: ReactNode; lux: boolean }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className={`mt-0.5 shrink-0 ${lux ? 'text-accent-400' : 'text-brand-400'}`}>{icon}</span>
      <span className="min-w-0">{children}</span>
    </li>
  )
}

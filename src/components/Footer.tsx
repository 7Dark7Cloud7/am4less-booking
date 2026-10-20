import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Clock, Facebook, Instagram, Mail, MapPin, Music2, Phone, Star } from 'lucide-react'
import { BUSINESS } from '../domain/business'
import { CATEGORIES } from '../domain/categories'

export function Footer() {
  return (
    <footer className="mt-16 bg-brand-950 text-brand-100 dark:bg-[oklch(0.12_0.025_266)]">
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
                <span className="text-[0.68rem] font-semibold tracking-wide text-brand-300 uppercase">
                  Quality goods &amp; services
                </span>
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold text-accent-400">{BUSINESS.slogan}</p>
            <p className="mt-3 text-sm text-brand-200">{BUSINESS.tagline}</p>
            <p className="mt-3 text-sm text-brand-300">{BUSINESS.foundedNote}</p>
            <div className="mt-4 flex gap-2">
              <Social href={BUSINESS.social.facebook} label="Facebook">
                <Facebook className="size-4" />
              </Social>
              <Social href={BUSINESS.social.instagram} label="Instagram">
                <Instagram className="size-4" />
              </Social>
              <Social href={BUSINESS.social.tiktok} label="TikTok">
                <Music2 className="size-4" />
              </Social>
              <Social href={BUSINESS.reviewHref} label="Read and leave Google reviews">
                <Star className="size-4" />
              </Social>
            </div>
          </div>

          <nav aria-label="Services">
            <h3 className="mb-4 text-sm font-bold tracking-wide text-white uppercase">Service groups</h3>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.map((category) => (
                <li key={category.id}>
                  <Link to={`/services#${category.id}`} className="text-brand-200 no-underline hover:text-accent-400 hover:underline">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h3 className="mb-4 text-sm font-bold tracking-wide text-white uppercase">Company</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: '/about', label: 'About AM4LESS' },
                { to: '/training', label: 'Mastery program' },
                { to: '/careers', label: 'Careers' },
                { to: '/book', label: 'Book & get a quote' },
                { to: '/account', label: 'My bookings' },
                { to: '/settings', label: 'Business settings' }
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-brand-200 no-underline hover:text-accent-400 hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-4 text-sm font-bold tracking-wide text-white uppercase">Reach us</h3>
            <ul className="space-y-3 text-sm">
              <FooterLine icon={<Phone className="size-4" />}>
                <a href={BUSINESS.phoneHref} className="text-brand-200 no-underline hover:text-accent-400">
                  {BUSINESS.phoneDisplay}
                </a>
              </FooterLine>
              <FooterLine icon={<Mail className="size-4" />}>
                <a href={`mailto:${BUSINESS.email}`} className="text-brand-200 no-underline hover:text-accent-400">
                  {BUSINESS.email}
                </a>
              </FooterLine>
              <FooterLine icon={<MapPin className="size-4" />}>
                <span>
                  {BUSINESS.city}, {BUSINESS.region} {BUSINESS.postalCode}
                  <br />
                  <span className="text-brand-400">{BUSINESS.areaServed}</span>
                </span>
              </FooterLine>
              <FooterLine icon={<Clock className="size-4" />}>
                <span>{BUSINESS.hoursSummary}</span>
              </FooterLine>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-brand-800 pt-6 text-xs text-brand-400">
          <p>© {new Date().getFullYear()} {BUSINESS.legalName}. All rights reserved.</p>
          <p>Insured &amp; bonded · Estimates are non-binding until the on-site walkthrough.</p>
        </div>
      </div>
    </footer>
  )
}

function Social({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="tap-target grid place-items-center rounded-lg border border-brand-700 text-brand-200 no-underline transition-colors hover:border-accent-400 hover:bg-brand-900 hover:text-accent-400"
    >
      {children}
    </a>
  )
}

function FooterLine({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="mt-0.5 shrink-0 text-brand-400">{icon}</span>
      <span className="min-w-0">{children}</span>
    </li>
  )
}

import { useState } from 'react'
import { ArrowRight, BellPlus, Search } from 'lucide-react'
import { CATEGORIES } from '../domain/categories'
import { BOOKABLE, SERVICES } from '../domain/services'
import { INTENSITY_LABELS, currency, pricingSignal } from '../domain/estimate'
import { PUBLIC_PRICING } from '../domain/config'
import { RouteButton } from '../components/Button'
import { CategoryIcon, IconTile, IntensityDots, Pill, SectionHeading } from '../components/ui'
import { Photo } from '../components/Photo'
import { PageHero } from '../components/PageHero'
import { CATEGORY_PHOTO } from '../domain/media'
import type { ServiceItem } from '../domain/types'

function priceLabel(service: ServiceItem): string {
  if (!PUBLIC_PRICING) return pricingSignal(service)
  const p = service.pricing
  if (p.kind === 'per-square-foot') return `From ${currency(p.minCharge)} · $${p.rate.toFixed(2)}/sq ft`
  if (p.kind === 'hourly') return `${currency(p.rate)}/hr · ${p.minHours} hr min`
  if (p.kind === 'flat') return `${currency(p.amount)} per unit`
  return 'Priced after free survey'
}

function ServiceCard({ service }: { service: ServiceItem }) {
  if (service.comingSoon) {
    return (
      <article
        aria-disabled="true"
        className="reveal flex flex-col rounded-[var(--radius-card)] border border-dashed border-line-strong bg-surface-muted p-5"
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold text-ink-soft">{service.name}</h3>
          <Pill>Coming soon</Pill>
        </div>
        <p className="mt-1.5 text-sm text-ink-soft">{service.summary}</p>
        <ul className="mt-4 flex-1 space-y-1.5 text-ink-soft">
          {service.details.map((detail) => (
            <li key={detail} className="relative ps-5 text-xs">
              <span className="absolute left-0">•</span>
              {detail}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4">
          <span className="text-xs font-semibold text-ink-soft">Not bookable yet</span>
          <RouteButton to="/contact" variant="ghost" size="sm" className="p-0 font-bold text-ink-soft hover:bg-transparent">
            Notify me <BellPlus className="size-4" aria-hidden="true" />
          </RouteButton>
        </div>
      </article>
    )
  }

  return (
    <article className="reveal card-surface flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-bold">{service.name}</h3>
        {service.popular && <Pill tone="accent">Popular</Pill>}
      </div>
      <p className="mt-1.5 text-sm text-ink-soft">{service.summary}</p>
      <ul className="mt-4 flex-1 space-y-1.5">
        {service.details.map((detail) => (
          <li key={detail} className="relative ps-5 text-xs text-ink-soft">
            <span className="absolute left-0 text-brand-600 dark:text-brand-300">•</span>
            {detail}
          </li>
        ))}
      </ul>
      <div className="mt-4 space-y-2 border-t border-line pt-4">
        <span className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
          <IntensityDots level={service.intensity} />
          {INTENSITY_LABELS[service.intensity]}
        </span>
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-bold text-brand-700 dark:text-brand-300">{priceLabel(service)}</span>
          <RouteButton to="/book" variant="ghost" size="sm" className="p-0 font-bold hover:bg-transparent">
            Book <ArrowRight className="size-4" aria-hidden="true" />
          </RouteButton>
        </div>
      </div>
    </article>
  )
}

export function ServicesPage() {
  const [query, setQuery] = useState('')
  const needle = query.trim().toLowerCase()

  const matches = (service: ServiceItem) =>
    !needle ||
    service.name.toLowerCase().includes(needle) ||
    service.summary.toLowerCase().includes(needle) ||
    service.details.some((detail) => detail.toLowerCase().includes(needle))

  return (
    <div className="am4-route">
      <PageHero
        title={<>Cleaning services.<br /><span>Ready when you are.</span></>}
        intro={`Explore ${BOOKABLE.length} cleaning lines available now. Specialty services remain visible but unselectable until each crew is ready.`}
      >
        <label htmlFor="service-search" className="mb-2 block text-sm font-bold text-white">
          Find the right service
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-brand-600" aria-hidden="true" />
          <input
            type="search"
            id="service-search"
            name="q"
            autoComplete="off"
            className="field-control ps-12"
            placeholder="Search grout, floors, offices…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </PageHero>

      <nav aria-label="Jump to category" className="sticky top-[4.25rem] z-30 border-b border-line bg-surface/90 backdrop-blur">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-1.5 overflow-x-auto px-[clamp(1rem,0.5rem+2vw,2rem)] py-3">
          {CATEGORIES.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="flex min-h-[2.75rem] shrink-0 items-center gap-2 rounded-full border border-line-strong bg-surface px-4 text-sm font-semibold text-ink-soft no-underline transition-colors hover:border-brand-400 hover:text-brand-600"
            >
              <CategoryIcon name={category.icon} />
              {category.name}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-[clamp(1rem,0.5rem+2vw,2rem)] py-16">
        {CATEGORIES.map((category) => {
          const items = SERVICES.filter((s) => s.category === category.id).filter(matches)
          if (items.length === 0) return null
          return (
            <section key={category.id} id={category.id} className="mb-16 scroll-mt-32 last:mb-0">
              <div className="mb-6 flex items-start gap-4 border-b-2 border-line pb-4">
                <IconTile>
                  <CategoryIcon name={category.icon} />
                </IconTile>
                <div className="min-w-0">
                  <h2 className="text-2xl font-bold">{category.name}</h2>
                  <p className="mt-1 text-sm text-ink-soft">{category.blurb}</p>
                </div>
                <div className="ms-auto hidden w-44 shrink-0 md:block">
                  <Photo
                    slot={CATEGORY_PHOTO[category.id] ?? 'heroCrew'}
                    alt={`${category.name} in progress`}
                    ratio="4 / 3"
                    className="rounded-[var(--radius-field)]"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </section>
          )
        })}

        {needle && SERVICES.filter(matches).length === 0 && (
          <div className="card-surface p-10 text-center">
            <p className="text-lg font-semibold">Nothing matches “{query}”.</p>
            <p className="mt-2 text-sm text-ink-soft">
              We quote non-listed work too — send it as a question and a crew lead will scope it.
            </p>
            <RouteButton to="/contact" variant="primary" className="mt-5">
              Ask about a custom job
            </RouteButton>
          </div>
        )}

        <div className="card-surface mt-4 p-8 text-center">
          <SectionHeading
            title="Not sure which line item you need?"
            intro="Send a photo of the space. We will scope it, size the crew and write the price before anyone visits."
            center
          />
          <RouteButton to="/book" variant="primary" size="lg" className="mt-6">
            Build my quote
            <ArrowRight className="size-5" aria-hidden="true" />
          </RouteButton>
        </div>
      </div>
    </div>
  )
}

import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ChevronDown, Star } from 'lucide-react'
import { CATEGORIES } from '../../domain/categories'
import { BOOKABLE } from '../../domain/services'
import { ADD_ONS, INTENSITY_LABELS, pricingSignal } from '../../domain/estimate'
import { PUBLIC_PRICING } from '../../domain/config'
import { currency } from '../../domain/estimate'
import { CategoryIcon, IntensityDots, Pill } from '../ui'
import { ChoiceCard } from '../Field'
import type { ServiceCategoryId } from '../../domain/types'
import type { BookingController } from '../../hooks/useBooking'

/** A category only makes the filter strip if something in it can actually be booked. */
const FILTERABLE_CATEGORIES = CATEGORIES.filter((category) =>
  BOOKABLE.some((service) => service.category === category.id)
)

export function ServicesStep({ controller }: { controller: BookingController }) {
  const [filter, setFilter] = useState<ServiceCategoryId | 'all'>('all')
  const [expanded, setExpanded] = useState<string | null>(null)
  const { draft, toggleService, toggleAddon, errors, showErrors } = controller

  const visible = useMemo(() => (filter === 'all' ? BOOKABLE : BOOKABLE.filter((s) => s.category === filter)), [filter])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold">What should we quote for?</h3>
        <p className="mt-1 text-sm text-ink-soft">
          Tap everything you want covered. Unsure? Pick the closest one — a crew lead refines the scope when they see
          the space.
        </p>
      </div>

      <div
        role="group"
        aria-label="Filter services by category"
        className="-mx-[clamp(1rem,0.5rem+2vw,2rem)] flex snap-x gap-2 overflow-x-auto px-[clamp(1rem,0.5rem+2vw,2rem)] pb-1"
      >
        <FilterChip active={filter === 'all'} onClick={() => setFilter('all')} label="All services" />
        {FILTERABLE_CATEGORIES.map((category) => (
          <FilterChip
            key={category.id}
            active={filter === category.id}
            onClick={() => setFilter(category.id)}
            label={category.name}
            icon={<CategoryIcon name={category.icon} />}
          />
        ))}
      </div>

      {filter !== 'all' && <p className="text-sm text-ink-soft">{CATEGORIES.find((c) => c.id === filter)?.blurb}</p>}

      {showErrors && errors.serviceIds && (
        <p role="alert" className="font-semibold text-danger">
          {errors.serviceIds}
        </p>
      )}

      <div className="grid gap-3">
        {visible.map((service) => {
          const checked = draft.serviceIds.includes(service.id)
          const open = expanded === service.id
          return (
            <div
              key={service.id}
              className={`card-surface p-0 transition-colors ${checked ? 'border-am4-blue ring-1 ring-am4-blue/30' : ''}`}
            >
              <div className="flex items-start gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <ChoiceCard
                    checked={checked}
                    onChange={() => toggleService(service.id)}
                    title={service.name}
                    subtitle={service.summary}
                  />
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5 pt-1">
                  {service.popular && <Pill tone="accent">Popular</Pill>}
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
                    <IntensityDots level={service.intensity} />
                    {INTENSITY_LABELS[service.intensity]}
                  </span>
                </div>
              </div>
              <div className="px-4 pb-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setExpanded(open ? null : service.id)}
                    aria-expanded={open}
                    className="flex min-h-[2.75rem] items-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-brand-600"
                  >
                    {open ? 'Hide' : 'What is included'}
                    <ChevronDown className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  <span className="text-xs font-semibold text-brand-700 dark:text-brand-300">{pricingSignal(service)}</span>
                </div>
                {open && (
                  <ul className="mt-2 space-y-1.5 border-t border-line pt-3">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex gap-2 text-sm text-ink-soft">
                        <Star className="mt-0.5 size-3.5 shrink-0 fill-accent-500 text-accent-500" aria-hidden="true" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <section aria-labelledby="addons-heading" className="card-surface p-5">
        <h3 id="addons-heading" className="text-base font-bold">
          Add-ons
        </h3>
        <p className="mt-1 mb-4 text-sm text-ink-soft">Optional extras that change what we pack and how long we stay.</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {ADD_ONS.map((addon) => (
            <ChoiceCard
              key={addon.id}
              checked={draft.addons.includes(addon.id)}
              onChange={() => toggleAddon(addon.id)}
              title={addon.name}
              subtitle={
                PUBLIC_PRICING && (addon.amount || addon.percent)
                  ? `${addon.note} · ${addon.amount ? currency(addon.amount) : `${Math.round((addon.percent ?? 0) * 100)}%`}`
                  : addon.extraHours > 0
                    ? `${addon.note} · adds about ${addon.extraHours} hr`
                    : addon.note
              }
            />
          ))}
        </div>
      </section>
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  label,
  icon
}: {
  active: boolean
  onClick: () => void
  label: string
  icon?: ReactNode
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex min-h-[2.875rem] shrink-0 snap-start items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors ${
        active
          ? 'border-am4-blue bg-am4-blue text-am4-soft'
          : 'border-line-strong bg-surface text-ink-soft hover:border-brand-300 hover:text-ink'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

import { CalendarDays, Clock, MapPin, Ruler, User } from 'lucide-react'
import type { ReactNode } from 'react'
import { formatDate, serviceNames } from '../../domain/booking'
import { FREQUENCY_LABELS, PROPERTY_LABELS, currency, jobPlanFor } from '../../domain/estimate'
import { PUBLIC_PRICING } from '../../domain/config'
import { TIME_SLOT_LABELS } from '../../domain/types'
import type { Booking } from '../../domain/types'

function Row({ icon, label, value }: { icon: ReactNode; label: string; value: ReactNode }) {
  return (
    <div className="flex items-start gap-3 border-b border-line py-3 last:border-0">
      <span className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-300">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-bold tracking-wide text-ink-faint uppercase">{label}</span>
        <span className="block text-sm font-medium text-ink">{value}</span>
      </span>
    </div>
  )
}

export function BookingSummary({ booking }: { booking: Booking }) {
  const { contact, estimate } = booking
  const names = serviceNames(booking.serviceIds)
  const plan = jobPlanFor(booking.serviceIds, booking.addons, booking.squareFeet, booking.propertyType, booking.frequency)

  return (
    <div className="card-surface overflow-hidden">
      <Row
        icon={<User className="size-4" aria-hidden="true" />}
        label="Contact"
        value={
          <>
            {`${contact.firstName} ${contact.lastName}`.trim() || '—'}
            <br />
            <span className="text-ink-soft">
              {contact.phone} · {contact.email}
            </span>
          </>
        }
      />
      <Row
        icon={<MapPin className="size-4" aria-hidden="true" />}
        label="Service address"
        value={[contact.address, contact.city, contact.zip].filter(Boolean).join(', ') || '—'}
      />
      {booking.propertyType && (
        <Row
          icon={<Ruler className="size-4" aria-hidden="true" />}
          label="Space"
          value={
            <>
              {PROPERTY_LABELS[booking.propertyType]}
              {booking.squareFeet ? ` · ${booking.squareFeet.toLocaleString('en-US')} sq ft` : ''}
            </>
          }
        />
      )}
      <Row
        icon={<CalendarDays className="size-4" aria-hidden="true" />}
        label="When"
        value={
          <>
            {formatDate(booking.preferredDate)}
            {booking.preferredTime && (
              <>
                <br />
                <span className="text-ink-soft">{TIME_SLOT_LABELS[booking.preferredTime]}</span>
              </>
            )}
            <br />
            <span className="text-ink-soft">{FREQUENCY_LABELS[booking.frequency]}</span>
          </>
        }
      />
      <Row
        icon={<Clock className="size-4" aria-hidden="true" />}
        label="Scope"
        value={
          <ul className="space-y-1">
            {names.map((name) => (
              <li key={name}>{name}</li>
            ))}
            {booking.addons.length > 0 && (
              <li className="text-xs text-ink-faint">+ {booking.addons.length} add-on(s)</li>
            )}
          </ul>
        }
      />
      <div className="flex flex-wrap items-baseline justify-between gap-2 bg-surface-muted px-4 py-3.5">
        <span className="text-sm font-bold text-ink">Crew plan</span>
        <span className="text-sm font-semibold text-brand-700 tabular-nums dark:text-brand-300">
          {plan.headline}
        </span>
      </div>
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-line bg-surface-muted px-4 py-3.5">
        <span className="text-sm font-bold text-ink">{PUBLIC_PRICING ? 'Estimated total' : 'Price'}</span>
        <span className="font-[family-name:var(--font-display)] text-xl font-bold text-brand-700 tabular-nums dark:text-brand-300">
          {PUBLIC_PRICING && estimate.total > 0 ? currency(estimate.total) : 'Written after the walkthrough'}
        </span>
      </div>
    </div>
  )
}

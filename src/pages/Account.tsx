import { useEffect, useState } from 'react'
import { Inbox, MessageCircle, RotateCcw, Trash2 } from 'lucide-react'
import { leadStore } from '../infrastructure/stores'
import { leadMessage } from '../infrastructure/leadDelivery'
import { formatDate } from '../domain/booking'
import { jobPlanFor } from '../domain/estimate'
import { BUSINESS, whatsappHref } from '../domain/business'
import { LinkButton, RouteButton } from '../components/Button'
import { Pill, SectionHeading } from '../components/ui'
import type { Booking } from '../domain/types'

const STATUS_TONE: Record<string, 'neutral' | 'accent' | 'brand'> = {
  draft: 'neutral',
  submitted: 'brand',
  confirmed: 'accent',
  completed: 'accent',
  cancelled: 'neutral'
}

export function AccountPage() {
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => setBookings(leadStore.list()), [])

  const refresh = () => setBookings(leadStore.list())

  function remove(reference: string) {
    leadStore.remove(reference)
    refresh()
  }

  function advance(booking: Booking, status: Booking['status']) {
    leadStore.setStatus(booking.reference, status)
    refresh()
  }

  return (
    <section className="mx-auto max-w-4xl px-[clamp(1rem,0.5rem+2vw,2rem)] py-14">
      <SectionHeading
        eyebrow="On this device"
        title="My bookings"
        intro="Requests are stored locally so nothing is lost if a send fails or you close the tab. Clearing browser data removes them — that is why each one can be re-sent."
      />

      {bookings.length === 0 ? (
        <div className="card-surface mt-8 p-12 text-center">
          <Inbox className="mx-auto size-10 text-ink-faint" aria-hidden="true" />
          <p className="mt-4 text-lg font-semibold">No saved requests yet</p>
          <p className="mt-1 text-sm text-ink-soft">Build a quote and it will appear here instantly.</p>
          <RouteButton to="/book" variant="primary" className="mt-6">
            <RotateCcw className="size-4" aria-hidden="true" />
            Start a booking
          </RouteButton>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {bookings.map((booking) => {
            const plan = jobPlanFor(
              booking.serviceIds,
              booking.addons,
              booking.squareFeet,
              booking.propertyType,
              booking.frequency
            )
            return (
              <li key={booking.reference} className="card-surface p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-sm font-bold">{booking.reference}</span>
                  <Pill tone={STATUS_TONE[booking.status] ?? 'neutral'}>{booking.status}</Pill>
                  <span className="ms-auto text-end text-sm font-bold text-brand-700 dark:text-brand-300">
                    {plan.crewSize > 0 ? plan.headline : 'Scope to be confirmed'}
                  </span>
                </div>

                <p className="mt-3 text-sm">
                  {booking.serviceIds.length} service{booking.serviceIds.length === 1 ? '' : 's'} ·{' '}
                  {booking.squareFeet ? `${booking.squareFeet.toLocaleString('en-US')} sq ft · ` : ''}
                  {formatDate(booking.preferredDate)}
                </p>
                <p className="mt-1 text-xs text-ink-faint">
                  Saved {new Date(booking.createdAt).toLocaleString('en-US')} ·{' '}
                  {booking.submittedAt ? 'sent' : 'not yet sent'}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <LinkButton
                    href={whatsappHref(leadMessage(booking))}
                    variant="primary"
                    size="sm"
                    external
                    ariaLabel={`Resend ${booking.reference} on WhatsApp`}
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    Resend on WhatsApp
                  </LinkButton>
                  <LinkButton href={BUSINESS.phoneHref} variant="outline" size="sm">
                    Call us
                  </LinkButton>
                  {booking.status !== 'completed' && (
                    <button
                      type="button"
                      onClick={() => advance(booking, 'completed')}
                      className="min-h-[2.5rem] rounded-full border border-line-strong bg-surface px-4 text-sm font-semibold hover:border-brand-400"
                    >
                      Mark completed
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => remove(booking.reference)}
                    aria-label={`Delete ${booking.reference}`}
                    className="ms-auto inline-flex min-h-[2.5rem] items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-danger hover:bg-danger/10"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                    Delete
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

import { useMemo } from 'react'
import { AlertTriangle, Send } from 'lucide-react'
import { buildBooking } from '../../domain/booking'
import { validateDraftForSubmit } from '../../domain/validation'
import { isWebhookConfigured } from '../../infrastructure/leadDelivery'
import { Callout, Pill } from '../ui'
import { BookingSummary } from './BookingSummary'
import type { BookingController } from '../../hooks/useBooking'

export function ReviewStep({
  controller,
  onSubmit
}: {
  controller: BookingController
  onSubmit: (booking: ReturnType<typeof buildBooking>) => void
}) {
  const { draft, estimate, submitting } = controller
  const blocking = useMemo(() => validateDraftForSubmit(draft), [draft])
  const booking = useMemo(() => buildBooking(draft), [draft])

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <Pill>Ref {booking.reference}</Pill>
        <Pill tone="accent">{estimate.lines.length} scope line{estimate.lines.length === 1 ? '' : 's'} priced on site</Pill>
        {estimate.needsSiteVisit && <Pill tone="neutral">Site survey needed</Pill>}
      </div>

      <BookingSummary booking={booking} />

      {Object.keys(blocking).length > 0 && (
        <Callout tone="warn" icon={<AlertTriangle className="size-5 text-warning" aria-hidden="true" />}>
          <strong>Still missing:</strong>
          <ul className="mt-1.5 list-inside list-disc">
            {Object.entries(blocking).map(([key, message]) => (
              <li key={key}>{message}</li>
            ))}
          </ul>
          <p className="mt-2">Use Back to fix these — the button stays locked until they are filled in.</p>
        </Callout>
      )}

      {!isWebhookConfigured() && (
        <Callout tone="info">
          <strong>No lead server connected yet.</strong> Your request is saved on this device and opened in WhatsApp,
          SMS or email so it still reaches the team. Wire up an endpoint in{' '}
          <a href="/settings" className="font-semibold underline">
            Business settings
          </a>{' '}
          to collect these automatically.
        </Callout>
      )}

      <button
        type="button"
        disabled={Object.keys(blocking).length > 0 || submitting}
        onClick={() => onSubmit(booking)}
        className="inline-flex min-h-[3.5rem] w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 text-base font-bold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-45 dark:bg-brand-400 dark:text-brand-950"
      >
        <Send className="size-5" aria-hidden="true" />
        {submitting ? 'Sending…' : 'Send my booking request'}
      </button>
      <p className="text-center text-xs text-ink-faint">No payment now. We confirm the slot and price before any work.</p>
    </div>
  )
}

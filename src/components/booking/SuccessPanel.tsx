import { useState } from 'react'
import { CalendarPlus, CheckCircle2, Copy, Mail, MessageCircle, Phone, RotateCcw } from 'lucide-react'
import { BUSINESS, mailtoHref, smsHref, whatsappHref } from '../../domain/business'
import { formatDate } from '../../domain/booking'
import { buildBookingText } from '../../infrastructure/message'
import { leadMessage } from '../../infrastructure/leadDelivery'
import { Button, LinkButton } from '../Button'
import { Callout } from '../ui'
import type { Booking } from '../../domain/types'

const SLOT_START: Record<string, string> = {
  morning: '0600',
  midday: '1000',
  evening: '1400',
  overnight: '1800'
}

function icsFor(booking: Booking): string {
  const date = (booking.preferredDate ?? '').replace(/-/g, '')
  const start = SLOT_START[booking.preferredTime ?? 'morning'] ?? '0600'
  const endHour = String(Math.min(23, Number(start.slice(0, 2)) + 4)).padStart(2, '0')
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AM4LESS//Booking//EN',
    'BEGIN:VEVENT',
    `UID:${booking.reference}@am4less.com`,
    `DTSTAMP:${date}T${start}00Z`,
    `DTSTART:${date}T${start}00`,
    `DTEND:${date}T${endHour}00`,
    `SUMMARY:AM4LESS cleaning — ${booking.reference}`,
    `LOCATION:${[booking.contact.address, booking.contact.city, booking.contact.zip].filter(Boolean).join(', ')}`,
    `DESCRIPTION:${buildBookingText(booking).replace(/\n/g, '\\n')}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')
}

export function SuccessPanel({ booking, onReset }: { booking: Booking; onReset: () => void }) {
  const [copied, setCopied] = useState(false)
  const message = leadMessage(booking)
  const subject = `Service request ${booking.reference} — ${booking.contact.firstName} ${booking.contact.lastName}`

  async function copy() {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  function downloadIcs() {
    const blob = new Blob([icsFor(booking)], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `AM4LESS-${booking.reference}.ics`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-5">
      <div className="card-surface p-6 text-center">
        <CheckCircle2 className="mx-auto size-12 text-success" aria-hidden="true" />
        <h1 className="mt-3 text-2xl font-bold">Request received</h1>
        <p className="mt-1 text-ink-soft">
          Reference <strong className="font-mono">{booking.reference}</strong> · target{' '}
          {formatDate(booking.preferredDate)}
        </p>
        <p className="mt-2 text-sm text-ink-faint">
          A coordinator confirms within one business hour. Nothing is charged until you approve the walkthrough price.
        </p>
      </div>

      <Callout tone="info">
        <strong>Send it to the team now</strong> — one tap opens the message pre-filled. Nothing is lost if you close
        this tab: the request is saved under <em>My bookings</em>.
      </Callout>

      <div className="grid gap-2.5 sm:grid-cols-2">
        <LinkButton href={whatsappHref(message)} variant="primary" external block size="lg">
          <MessageCircle className="size-5" aria-hidden="true" />
          Send on WhatsApp
        </LinkButton>
        <LinkButton href={smsHref(message)} variant="outline" block size="lg">
          <MessageCircle className="size-5" aria-hidden="true" />
          Send as text message
        </LinkButton>
        <LinkButton href={mailtoHref(subject, message)} variant="outline" block size="lg">
          <Mail className="size-5" aria-hidden="true" />
          Email the request
        </LinkButton>
        <LinkButton href={BUSINESS.phoneHref} variant="accent" block size="lg">
          <Phone className="size-5" aria-hidden="true" />
          Call {BUSINESS.phoneDisplay}
        </LinkButton>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-3">
        <Button variant="ghost" onClick={copy} iconLeft={<Copy className="size-4" aria-hidden="true" />}>
          {copied ? 'Copied' : 'Copy details'}
        </Button>
        <Button variant="ghost" onClick={downloadIcs} iconLeft={<CalendarPlus className="size-4" aria-hidden="true" />}>
          Add to calendar
        </Button>
        <Button variant="ghost" onClick={onReset} iconLeft={<RotateCcw className="size-4" aria-hidden="true" />}>
          Start another
        </Button>
      </div>
    </div>
  )
}

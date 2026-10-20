import { buildBookingText } from './message'
import { leadStore } from './stores'
import type { Booking } from '../domain/types'

export const WEBHOOK_SETTING_KEY = 'am4:webhook-url'

export type DeliveryResult = {
  ok: boolean
  channel: 'webhook' | 'offline'
  detail: string
}

/**
 * The owner can point this at any HTTP endpoint that accepts JSON — Zapier,
 * Make, n8n, a Google Apps Script, Supabase Edge Function, or our own API.
 * Empty means "no server wired up yet", in which case the lead is kept on the
 * device and handed to WhatsApp / email / SMS instead.
 */
export function getWebhookUrl(): string {
  try {
    return localStorage.getItem(WEBHOOK_SETTING_KEY)?.trim() ?? ''
  } catch {
    return ''
  }
}

export function setWebhookUrl(url: string): void {
  try {
    const trimmed = url.trim()
    if (trimmed) localStorage.setItem(WEBHOOK_SETTING_KEY, trimmed)
    else localStorage.removeItem(WEBHOOK_SETTING_KEY)
  } catch {
    /* ignore */
  }
}

export function isWebhookConfigured(): boolean {
  return getWebhookUrl().length > 0
}

function toPayload(booking: Booking) {
  return {
    reference: booking.reference,
    source: 'am4less-web',
    name: `${booking.contact.firstName} ${booking.contact.lastName}`.trim(),
    phone: booking.contact.phone,
    email: booking.contact.email,
    address: [booking.contact.address, booking.contact.city, booking.contact.zip].filter(Boolean).join(', '),
    propertyType: booking.propertyType,
    squareFeet: booking.squareFeet,
    frequency: booking.frequency,
    services: booking.serviceIds,
    addons: booking.addons,
    preferredDate: booking.preferredDate,
    preferredTime: booking.preferredTime,
    accessNotes: booking.accessNotes,
    message: booking.contact.notes,
    consent: booking.contact.consent,
    estimateTotal: booking.estimate.total,
    estimateMonthly: booking.estimate.recurringMonthly,
    createdAt: booking.createdAt
  }
}

export async function submitBooking(booking: Booking): Promise<DeliveryResult> {
  leadStore.add(booking)

  const endpoint = getWebhookUrl()

  if (!endpoint) {
    return {
      ok: true,
      channel: 'offline',
      detail: 'Saved on this device. Send it to the team with one tap below.'
    }
  }

  if (!/^https:\/\/[^\s]+$/i.test(endpoint)) {
    return {
      ok: false,
      channel: 'offline',
      detail: 'The lead endpoint must be an https:// URL. Saved locally instead.'
    }
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(toPayload(booking))
    })

    if (!response.ok) {
      return {
        ok: false,
        channel: 'offline',
        detail: `The lead server answered ${response.status}. Your request is saved — send it below.`
      }
    }

    leadStore.markDelivered(booking.reference)
    return { ok: true, channel: 'webhook', detail: 'Received. A coordinator will confirm the slot.' }
  } catch {
    return {
      ok: false,
      channel: 'offline',
      detail: 'You appear to be offline. The request is saved and can be sent as a text or email.'
    }
  }
}

/** Plain-text body for the WhatsApp / SMS / email hand-off. */
export function leadMessage(booking: Booking): string {
  return buildBookingText(booking)
}

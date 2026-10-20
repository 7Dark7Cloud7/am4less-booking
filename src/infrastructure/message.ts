import { formatDate, serviceNames } from '../domain/booking'
import { ADD_ON_BY_ID, FREQUENCY_LABELS, PROPERTY_LABELS, currency, jobPlanFor } from '../domain/estimate'
import { PUBLIC_PRICING } from '../domain/config'
import { TIME_SLOT_LABELS } from '../domain/types'
import type { Booking } from '../domain/types'

export function buildBookingText(booking: Booking): string {
  const { contact, estimate } = booking
  const lines: string[] = [
    `NEW SERVICE REQUEST — ${booking.reference}`,
    '',
    `${contact.firstName} ${contact.lastName}`.trim(),
    `Phone: ${contact.phone}`,
    `Email: ${contact.email}`,
    `Site: ${[contact.address, contact.city, contact.zip].filter(Boolean).join(', ')}`,
    ''
  ]

  if (booking.propertyType) lines.push(`Property: ${PROPERTY_LABELS[booking.propertyType]}`)
  if (booking.squareFeet) lines.push(`Size: ${booking.squareFeet.toLocaleString('en-US')} sq ft`)
  lines.push(`Frequency: ${FREQUENCY_LABELS[booking.frequency]}`)
  lines.push('')
  lines.push('Services:')
  for (const name of serviceNames(booking.serviceIds)) lines.push(`  • ${name}`)

  if (booking.addons.length) {
    lines.push('')
    lines.push('Add-ons:')
    for (const id of booking.addons) {
      const addon = ADD_ON_BY_ID.get(id)
      if (addon) lines.push(`  • ${addon.name} (${addon.note})`)
    }
  }

  lines.push('')
  lines.push(`Target date: ${formatDate(booking.preferredDate)}`)
  if (booking.preferredTime) lines.push(`Window: ${TIME_SLOT_LABELS[booking.preferredTime]}`)
  if (booking.accessNotes.trim()) lines.push(`Access: ${booking.accessNotes.trim()}`)
  if (contact.notes.trim()) lines.push(`Notes: ${contact.notes.trim()}`)

  lines.push('')
  const plan = jobPlanFor(booking.serviceIds, booking.addons, booking.squareFeet, booking.propertyType, booking.frequency)
  if (plan.crewSize > 0) lines.push(`Crew plan: ${plan.headline} (${plan.crewHours} labour-hours)`)
  if (PUBLIC_PRICING && estimate.total > 0) {
    lines.push(`Web estimate: ${currency(estimate.total)}`)
    if (estimate.recurringMonthly) lines.push(`Approx. monthly: ${currency(estimate.recurringMonthly)}`)
  }
  if (estimate.needsSiteVisit) lines.push('Site survey required for part of this scope.')
  lines.push(PUBLIC_PRICING ? 'Estimate is non-binding until walkthrough.' : 'Written price to be confirmed after the walkthrough.')

  return lines.join('\n')
}

export function buildShortSummary(booking: Booking): string {
  const names = serviceNames(booking.serviceIds)
  const first = names[0] ?? 'cleaning'
  const extra = names.length > 1 ? ` +${names.length - 1} more` : ''
  const size = booking.squareFeet ? `${booking.squareFeet.toLocaleString('en-US')} sq ft, ` : ''
  const plan = jobPlanFor(booking.serviceIds, booking.addons, booking.squareFeet, booking.propertyType, booking.frequency)
  const tail = PUBLIC_PRICING
    ? booking.estimate.total > 0
      ? ` est. ${currency(booking.estimate.total)}`
      : ''
    : plan.crewSize > 0
      ? ` ${plan.crewSize}-person crew`
      : ''
  return `${first}${extra} — ${size}${formatDate(booking.preferredDate)}${tail}`
}

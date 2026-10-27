import { ArrowUpRight } from 'lucide-react'
import { BOOKABLE, isBookable } from '../domain/services'
import { digits, formatPhone, todayIso } from '../domain/validation'
import { HOME_SERVICES } from './home/homeServices'
import type { QuickBookingController } from '../hooks/useQuickBooking'

export function QuickQuote({ booking }: { booking: QuickBookingController }) {
  return (
    <form id="quick-booking" className="am4-booking" aria-labelledby="quick-booking-heading" onSubmit={(event) => { event.preventDefault(); booking.continueBooking() }}>
      <div className="am4-booking-intro"><h2 id="quick-booking-heading">Your clean starts here.</h2><p>Choose a service. Confirm the full details next.</p></div>
      <div className="am4-booking-body">
        <div className="am4-choices" role="group" aria-label="Choose a cleaning service">
          {HOME_SERVICES.map(({ id, label, icon: Icon }) => <button key={id} type="button" disabled={!isBookable(id)} aria-pressed={booking.serviceId === id} onClick={() => booking.selectService(id)}><Icon className="size-4" aria-hidden="true" /><span>{label}{!isBookable(id) && ' · Soon'}</span></button>)}
        </div>
        <div className="am4-booking-grid">
          <div className="am4-field">
            <label htmlFor="quick-service">Cleaning service</label>
            <select id="quick-service" value={booking.serviceId} onChange={(e) => booking.selectService(e.target.value)} required>
              {BOOKABLE.map((service) => <option key={service.id} value={service.id}>{service.name}</option>)}
            </select>
          </div>
          <div className="am4-field">
            <label htmlFor="quick-date">Preferred date</label>
            <input id="quick-date" type="date" value={booking.date} min={todayIso()} onChange={(e) => booking.setDate(e.target.value)} required />
          </div>
          <div className="am4-field">
            <label htmlFor="quick-zip">ZIP code</label>
            <input id="quick-zip" inputMode="numeric" autoComplete="postal-code" value={booking.zip} maxLength={5} pattern="[0-9]{5}" onChange={(e) => booking.setZip(digits(e.target.value).slice(0, 5))} required />
          </div>
          <div className="am4-field">
            <label htmlFor="quick-phone">Phone</label>
            <input id="quick-phone" type="tel" autoComplete="tel-national" value={booking.phone} placeholder="(267) 000-0000" pattern="(?:[^0-9]*[0-9]){10,}[^0-9]*" onChange={(e) => booking.setPhone(formatPhone(e.target.value))} required />
          </div>
          <button type="submit" className="am4-button am4-button-red am4-submit">Continue my booking <ArrowUpRight className="size-5" aria-hidden="true" /></button>
        </div>
        <p className="am4-booking-note">Saved services carry forward; you can edit the full scope next. Nothing is sent until you finish the booking and give your consent.</p>
      </div>
    </form>
  )
}

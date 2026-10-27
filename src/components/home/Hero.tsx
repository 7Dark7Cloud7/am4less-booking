import { ArrowUpRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BUSINESS } from '../../domain/business'
import { QuickQuote } from '../QuickQuote'
import type { QuickBookingController } from '../../hooks/useQuickBooking'

export function Hero({ booking }: { booking: QuickBookingController }) {
  return (
    <section className="am4-hero" aria-labelledby="home-heading">
      <div className="am4-hero-copy">
        <h1 id="home-heading">Less mess.<br /><span>More room.</span></h1>
        <p>Commercial cleaning. More room for the work, the people and the life that fill your space.</p>
        <div className="am4-hero-actions">
          <a href="#quick-booking" className="am4-button am4-button-red">Plan my cleaning <ArrowUpRight className="size-5" aria-hidden="true" /></a>
          <Link to="/about" className="am4-text-link">Our story <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
        </div>
        <div className="am4-hero-foot"><Sparkles className="size-5" aria-hidden="true" /><span>Based in {BUSINESS.city}, {BUSINESS.region}<br />Serving all of Pennsylvania</span></div>
      </div>
      <QuickQuote booking={booking} />
    </section>
  )
}

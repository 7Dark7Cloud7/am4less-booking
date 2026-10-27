import { Sparkles } from 'lucide-react'
import { Hero } from '../components/home/Hero'
import { Disciplines } from '../components/home/Disciplines'
import { Pillars } from '../components/home/Pillars'
import { Story } from '../components/home/Story'
import { Closing } from '../components/home/Closing'
import { useQuickBooking } from '../hooks/useQuickBooking'

export function HomePage() {
  const booking = useQuickBooking()
  return (
    <div className="am4-home">
      <Hero booking={booking} />
      <div className="am4-brand-strip" aria-label="Cleaning for your space"><span>Commercial</span><Sparkles aria-hidden="true" /><span>Deep cleans</span><Sparkles aria-hidden="true" /><span>Made for your space</span></div>
      <Disciplines serviceId={booking.serviceId} onSelect={booking.selectService} />
      <Pillars />
      <Story />
      <Closing />
    </div>
  )
}

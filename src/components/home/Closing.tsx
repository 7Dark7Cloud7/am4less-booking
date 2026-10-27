import { ArrowUpRight, Phone } from 'lucide-react'
import { BUSINESS } from '../../domain/business'
import { PHOTOS } from '../../domain/media'

export function Closing() {
  return (
    <section className="am4-closing" aria-labelledby="closing-heading">
      <img src={PHOTOS.heroCrew} alt="A polished industrial floor from an AM4LESS cleaning project" loading="lazy" decoding="async" />
      <div className="am4-closing-copy"><h2 id="closing-heading">Your next<br /><span>fresh start.</span></h2><p>Commercial cleaning in {BUSINESS.city}, {BUSINESS.region} and all of Pennsylvania.</p><div className="am4-hero-actions"><a href="#quick-booking" className="am4-button am4-button-red">Plan a cleaning <ArrowUpRight className="size-5" aria-hidden="true" /></a><a href={BUSINESS.phoneHref} className="am4-text-link"><Phone className="size-4" aria-hidden="true" />{BUSINESS.phoneDisplay}</a></div><p className="am4-hours">{BUSINESS.hoursSummary}</p></div>
    </section>
  )
}

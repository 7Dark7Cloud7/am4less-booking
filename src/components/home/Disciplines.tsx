import { Link } from 'react-router-dom'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { isBookable, SERVICE_BY_ID } from '../../domain/services'
import { PHOTOS } from '../../domain/media'
import { HOME_SERVICES } from './homeServices'

export function Disciplines({ serviceId, onSelect }: { serviceId: string; onSelect: (id: string) => void }) {
  return (
    <section className="am4-services" aria-labelledby="services-heading">
      <div className="am4-section-heading">
        <h2 id="services-heading">Different spaces.<br /><span>Same attention.</span></h2>
        <div><p>From the everyday clean to the big reset.<br />Choose the work your space needs.</p><Link to="/services" className="am4-inline-link">Explore all services <ArrowUpRight className="size-5" aria-hidden="true" /></Link></div>
      </div>
      <div className="am4-service-layout">
        <figure className="am4-service-photo">
          <img src={PHOTOS.pressureWashing} alt="An outdoor court after pressure washing by AM4LESS" loading="lazy" decoding="async" />
          <figcaption><Sparkles className="size-6" aria-hidden="true" /><span>A fresh perspective.<br /><strong>Inside &amp; out.</strong></span></figcaption>
        </figure>
        <div className="am4-service-list">
          {HOME_SERVICES.map(({ id, title, icon: Icon }) => (
            <article key={id} className="am4-service-row" data-selected={serviceId === id} data-unavailable={!isBookable(id)}>
              <Icon className="size-6 shrink-0" aria-hidden="true" />
              <div><h3>{title}</h3><p>{isBookable(id) ? SERVICE_BY_ID.get(id)?.summary : 'Coming soon · Not available to book yet'}</p></div>
              {isBookable(id) ? <a href="#quick-booking" onClick={() => onSelect(id)} aria-label={`Plan ${title.toLowerCase()}`} className="am4-service-action"><ArrowUpRight className="size-5" aria-hidden="true" /></a> : <span className="am4-unavailable">Soon</span>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

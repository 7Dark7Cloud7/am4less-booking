import { ArrowRight, Phone } from 'lucide-react'
import { BUSINESS } from '../../domain/business'
import { LinkButton, RouteButton } from '../Button'

const FACTS = [
  { label: 'Hours', value: BUSINESS.hoursSummary },
  { label: 'Base', value: `${BUSINESS.city}, ${BUSINESS.region} ${BUSINESS.postalCode}` },
  { label: 'Typical reply', value: 'Within one hour on new requests' },
  { label: 'Walkthrough', value: 'Free, on site, before any price' }
]

export function Closing() {
  return (
    <section className="relative isolate overflow-hidden border-t border-white/10">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(90%_120%_at_15%_0%,rgba(201,164,92,0.12),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-[84rem] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-24">
          <div>
            <p className="lux-eyebrow">Booking</p>
            <h2 className="mt-5 max-w-[16ch] text-[clamp(2.2rem,5vw,4.2rem)] font-light text-ivory">
              Ready when the building is.
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-ivory-soft">
              Build the scope online in about two minutes — the space, the services, the access and how often. A crew
              lead confirms it on a free walkthrough and writes the price before anyone touches a mop.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <RouteButton to="/book" variant="gold" size="lg">
                Start my booking
                <ArrowRight className="size-4" aria-hidden="true" />
              </RouteButton>
              <LinkButton href={BUSINESS.phoneHref} variant="outlineOnDark" size="lg">
                <Phone className="size-4" aria-hidden="true" />
                {BUSINESS.phoneDisplay}
              </LinkButton>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-x-8 gap-y-7 border-t border-white/15 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <dt className="text-[0.6rem] font-semibold tracking-[0.24em] text-ivory-faint uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed font-medium text-ivory">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

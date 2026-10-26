import { ArrowRight, Compass } from 'lucide-react'
import { BUSINESS } from '../../domain/business'
import { LinkButton, RouteButton } from '../Button'

const COUNTIES = [
  {
    name: 'Bucks County',
    towns: ['Quakertown', 'Perkasie', 'Sellersville', 'Doylestown', 'Warrington', 'Newtown', 'Warminster', 'Bristol']
  },
  {
    name: 'Lehigh County',
    towns: ['Allentown', 'Emmaus', 'Macungie', 'Whitehall', 'Coopersburg', 'Center Valley']
  }
]

export function Coverage() {
  return (
    <section className="border-t border-white/10">
      <div className="mx-auto grid max-w-[84rem] gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:px-12">
        <div>
          <p className="lux-eyebrow">Where we work</p>
          <h2 className="mt-5 max-w-[15ch] text-[clamp(2rem,4vw,3.4rem)] font-light text-ivory">
            Out of Quakertown, across the Valley.
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-ivory-soft">
            Scheduled programs and one-time projects run through Bucks and Lehigh County — and anywhere in
            Pennsylvania a job takes us. If the address is outside the list, ask. We will tell you straight.
          </p>

          <div className="mt-10 flex items-start gap-3 border-t border-white/10 pt-6">
            <Compass className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
            <div className="text-sm">
              <p className="font-medium text-ivory">
                {BUSINESS.city}, {BUSINESS.region} {BUSINESS.postalCode}
              </p>
              <p className="mt-1 text-[0.7rem] font-semibold tracking-[0.2em] text-ivory-faint uppercase">
                40.4389° N · 75.3445° W
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <RouteButton to="/book" variant="gold" size="md">
              Check my address
              <ArrowRight className="size-4" aria-hidden="true" />
            </RouteButton>
            <LinkButton href={BUSINESS.phoneHref} variant="outlineOnDark" size="md">
              {BUSINESS.phoneDisplay}
            </LinkButton>
          </div>
        </div>

        <dl>
          {COUNTIES.map((county) => (
            <div key={county.name} className="border-t border-white/10 py-7 first:border-t-0 first:pt-0">
              <dt className="font-[family-name:var(--font-lux-display)] text-2xl font-light text-ivory">
                {county.name}
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-ivory-soft">{county.towns.join(' · ')}</dd>
            </div>
          ))}
          <div className="border-t border-white/10 pt-7">
            <dt className="lux-eyebrow">Statewide</dt>
            <dd className="mt-3 text-sm leading-relaxed text-ivory-soft">
              Scheduled commercial projects anywhere in Pennsylvania, planned ahead.
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

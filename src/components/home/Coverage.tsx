import { ArrowRight, MapPin } from 'lucide-react'
import { BUSINESS } from '../../domain/business'
import { LinkButton, RouteButton } from '../Button'

const COUNTIES = [
  { name: 'Bucks County', towns: ['Quakertown', 'Perkasie', 'Sellersville', 'Doylestown', 'Warrington', 'Newtown', 'Warminster', 'Bristol'] },
  { name: 'Lehigh County', towns: ['Allentown', 'Emmaus', 'Macungie', 'Whitehall', 'Coopersburg', 'Center Valley'] }
]

export function Coverage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16">
      <div>
        <MapPin className="size-9 text-brand-700 dark:text-brand-200" aria-hidden="true" />
        <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Local roots.<br />A wider reach.</h2>
        <p className="mt-4 max-w-lg text-ink-soft">
          Based in {BUSINESS.city}, {BUSINESS.region}, serving Bucks and Lehigh County and scheduled projects across Pennsylvania. Have an address outside the list? Ask the team.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <RouteButton to="/book" variant="accent">Plan my cleaning <ArrowRight className="size-4" aria-hidden="true" /></RouteButton>
          <LinkButton href={BUSINESS.phoneHref} variant="outline">{BUSINESS.phoneDisplay}</LinkButton>
        </div>
      </div>
      <dl className="overflow-hidden rounded-card border border-line bg-surface-muted p-6 sm:p-8">
        {COUNTIES.map((county) => (
          <div key={county.name} className="border-b border-line py-5 first:pt-0">
            <dt className="font-home-display text-2xl font-bold">{county.name}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{county.towns.join(' · ')}</dd>
          </div>
        ))}
        <div className="pt-5">
          <dt className="font-bold text-brand-700 dark:text-brand-200">Across Pennsylvania</dt>
          <dd className="mt-2 text-sm text-ink-soft">Scheduled commercial projects, planned ahead.</dd>
        </div>
      </dl>
    </section>
  )
}

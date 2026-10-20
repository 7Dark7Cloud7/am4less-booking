import { ArrowRight, Phone } from 'lucide-react'
import { BUSINESS } from '../domain/business'
import { LinkButton, RouteButton } from '../components/Button'

export function NotFoundPage() {
  return (
    <section className="mx-auto max-w-2xl px-[clamp(1rem,0.5rem+2vw,2rem)] py-24 text-center">
      <p className="font-[family-name:var(--font-display)] text-6xl font-bold text-brand-300 dark:text-brand-700">404</p>
      <h1 className="mt-4 text-3xl font-bold">This page has been cleaned out</h1>
      <p className="mt-3 text-ink-soft">
        The link is wrong or the page moved. Everything bookable is one tap away, and a person answers the phone.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <RouteButton to="/book" variant="primary" size="lg">
          Build a quote
          <ArrowRight className="size-5" aria-hidden="true" />
        </RouteButton>
        <LinkButton href={BUSINESS.phoneHref} variant="outline" size="lg">
          <Phone className="size-5" aria-hidden="true" />
          {BUSINESS.phoneDisplay}
        </LinkButton>
      </div>
    </section>
  )
}

import { ArrowRight, Phone } from 'lucide-react'
import { BUSINESS } from '../domain/business'
import { LinkButton, RouteButton } from '../components/Button'

export function NotFoundPage() {
  return (
    <div className="am4-route">
      <section className="am4-not-found">
        <p className="am4-404 font-[family-name:var(--font-art)] font-bold">404</p>
        <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">This page has been cleaned out</h1>
        <p className="mx-auto mt-3 max-w-md text-am4-soft">
          The link is wrong or the page moved. Everything bookable is one tap away, and a person answers the phone.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <RouteButton to="/book" variant="accent" size="lg">
            Build a quote
            <ArrowRight className="size-5" aria-hidden="true" />
          </RouteButton>
          <LinkButton href={BUSINESS.phoneHref} variant="outlineOnDark" size="lg">
            <Phone className="size-5" aria-hidden="true" />
            {BUSINESS.phoneDisplay}
          </LinkButton>
        </div>
      </section>
    </div>
  )
}

import { ArrowRight, Phone } from 'lucide-react'
import { BUSINESS } from '../../domain/business'
import { BOOKABLE } from '../../domain/services'
import { PHOTOS } from '../../domain/media'
import { LinkButton, RouteButton } from '../Button'

const PROOF = [
  { value: '20+', label: 'Years of combined crew experience' },
  { value: `${BOOKABLE.length}`, label: 'Services bookable online today' },
  { value: '1 hr', label: 'Typical reply on a new request' },
  { value: 'Free', label: 'On-site walkthrough & written quote' }
]

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={PHOTOS.heroCrew}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover opacity-55"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-obsidian)_2%,rgba(18,18,20,0.78)_42%,rgba(18,18,20,0.4)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(115%_75%_at_50%_-10%,rgba(201,164,92,0.14),transparent_62%)]"
      />

      <div className="relative mx-auto flex min-h-[84svh] max-w-[84rem] flex-col justify-end px-5 pt-16 pb-12 sm:px-8 lg:px-12 lg:pb-16">
        <p className="lux-eyebrow reveal">
          Quakertown · Bucks &amp; Lehigh County
          <span className="hidden sm:inline"> · Pennsylvania</span>
        </p>

        <h1 className="reveal mt-6 max-w-[24ch] text-[clamp(2.6rem,7vw,5.6rem)] font-light text-ivory">
          Develop a <span className="text-gold">spotless</span> reputation.
        </h1>

        <p className="reveal mt-6 max-w-xl text-base leading-relaxed text-ivory-soft sm:text-lg">
          Commercial and residential cleaning for buildings that get walked, audited and photographed. We size the crew
          before we ever quote the job.
        </p>

        <div className="reveal mt-9 flex flex-wrap items-center gap-3">
          <RouteButton to="/book" variant="gold" size="lg">
            Start my quote
            <ArrowRight className="size-4" aria-hidden="true" />
          </RouteButton>
          <LinkButton href={BUSINESS.phoneHref} variant="outlineOnDark" size="lg">
            <Phone className="size-4" aria-hidden="true" />
            {BUSINESS.phoneDisplay}
          </LinkButton>
        </div>

        <dl className="reveal mt-14 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-white/12 pt-8 lg:grid-cols-4">
          {PROOF.map((item) => (
            <div key={item.label}>
              <dt className="font-[family-name:var(--font-lux-display)] text-3xl font-light text-ivory">{item.value}</dt>
              <dd className="mt-1.5 text-xs leading-relaxed text-ivory-faint">{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

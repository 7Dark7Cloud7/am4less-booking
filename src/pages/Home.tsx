import { ArrowRight, BadgeCheck, Clock3, MapPin, Phone, ShieldCheck, Sparkles, Star } from 'lucide-react'
import { BUSINESS } from '../domain/business'
import { CATEGORIES } from '../domain/categories'
import { BOOKABLE } from '../domain/services'
import { LinkButton, RouteButton } from '../components/Button'
import { CategoryIcon, CheckItem, IconTile, Pill, SectionHeading } from '../components/ui'
import { Faq } from '../components/Faq'
import { Photo } from '../components/Photo'
import { SHOTS } from '../domain/media'
import { QuickQuote } from '../components/QuickQuote'

const PROOF = [
  { value: '20+', label: 'Years of combined crew experience' },
  { value: `${BOOKABLE.length}`, label: 'Services you can book online now' },
  { value: '1 hr', label: 'Typical reply on new requests' },
  { value: 'Free', label: 'On-site walkthrough & written quote' }
]

const PROMISES = [
  'Insured and bonded crews, badge-checked for occupied buildings',
  'Written scope before the first visit — no surprise line items',
  'Photo sign-off at completion, room by room',
  'Re-scan of any missed spot within 24 hours, at no charge'
]

export function HomePage() {
  const popular = BOOKABLE.filter((service) => service.popular).slice(0, 6)

  return (
    <>
      <section className="relative overflow-hidden bg-inverse text-inverse-ink">
        <div aria-hidden="true" className="absolute inset-0 opacity-25">
          <Photo slot="heroCrew" alt="" ratio="16 / 9" scrim="brand" className="size-full" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-32 size-[34rem] rounded-full bg-[radial-gradient(circle,oklch(0.545_0.235_265/0.5),transparent_62%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-24 size-[26rem] rounded-full bg-[radial-gradient(circle,oklch(0.6_0.168_19/0.32),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-7xl px-[clamp(1rem,0.5rem+2vw,2rem)] py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="reveal">
              <p className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase text-brand-200">
                <span className="h-0.5 w-7 rounded bg-accent-500" />
                Commercial &amp; residential cleaning · Pennsylvania
              </p>
              <h1 className="font-[family-name:var(--font-display)] text-4xl leading-[1.06] font-bold sm:text-5xl lg:text-6xl">
                Develop a <span className="text-accent-400">spotless</span> reputation
              </h1>
              <p className="mt-5 max-w-xl text-lg text-brand-100">
                Book recurring janitorial, post-construction cleanup, move-out details and pressure washing online —
                and see exactly how big a crew the job needs before anyone visits.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <RouteButton to="/book" variant="accent" size="lg">
                  <Sparkles className="size-5" aria-hidden="true" />
                  Get my free quote
                  <ArrowRight className="size-5" aria-hidden="true" />
                </RouteButton>
                <LinkButton href={BUSINESS.phoneHref} variant="outlineOnDark" size="lg">
                  <Phone className="size-5" aria-hidden="true" />
                  {BUSINESS.phoneDisplay}
                </LinkButton>
              </div>

              <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-brand-200">
                <span className="flex items-center gap-1.5">
                  <Clock3 className="size-4" aria-hidden="true" /> {BUSINESS.hoursSummary}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4" aria-hidden="true" /> {BUSINESS.city}, {BUSINESS.region}
                </span>
              </p>
            </div>

            <div className="reveal">
              <QuickQuote />
            </div>
          </div>

          <dl className="mt-14 grid gap-6 border-t border-white/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROOF.map((item) => (
              <div key={item.label}>
                <dt className="font-[family-name:var(--font-display)] text-3xl font-bold text-white">{item.value}</dt>
                <dd className="mt-1 text-sm text-brand-200">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-[clamp(1rem,0.5rem+2vw,2rem)] py-20">
        <SectionHeading
          eyebrow="Most booked"
          title="Start with the jobs people call us for"
          intro="Each one tells you how we price the work and how big a crew it takes. Pick several and the job plan combines them into one shift."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((service) => (
            <article key={service.id} className="reveal card-surface flex flex-col p-5">
              <IconTile>
                <CategoryIcon name={CATEGORIES.find((c) => c.id === service.category)?.icon ?? 'sparkles'} />
              </IconTile>
              <h3 className="mt-4 text-base font-bold">{service.name}</h3>
              <p className="mt-1.5 flex-1 text-sm text-ink-soft">{service.summary}</p>
              <RouteButton
                to="/book"
                variant="ghost"
                size="sm"
                className="mt-4 justify-start p-0 font-bold text-brand-600 hover:bg-transparent dark:text-brand-300"
              >
                Book this <ArrowRight className="size-4" aria-hidden="true" />
              </RouteButton>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-surface-muted py-20">
        <div className="mx-auto max-w-7xl px-[clamp(1rem,0.5rem+2vw,2rem)]">
          <SectionHeading
            eyebrow="On site"
            title="Real jobs, real buildings, photographed before we left"
            intro="Healthcare floors, schools, sanctuaries and exteriors. Every picture on this site came off one of our own job sites."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { slot: 'postConstruction', caption: 'Floor prepped and detailed for a commercial handover' },
              { slot: 'eventSetup', caption: 'Sanctuary carpet and seating turned over before service' },
              { slot: 'pressureWashing', caption: 'Court pressure-washed: algae and staining gone' },
              { slot: 'specialtyOps', caption: 'Overnight crew with air movers in a live hospital wing' }
            ].map((item) => (
              <figure key={item.slot} className="reveal card-surface overflow-hidden p-0">
                <Photo slot={item.slot as 'postConstruction'} alt={item.caption} ratio="4 / 3" scrim="dark" />
                <figcaption className="p-4 text-sm font-semibold">{item.caption}</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <RouteButton to="/gallery" variant="outline" size="lg">
              Browse all {SHOTS.length} job photos
              <ArrowRight className="size-4" aria-hidden="true" />
            </RouteButton>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-[clamp(1rem,0.5rem+2vw,2rem)] lg:grid-cols-2">
          <div className="reveal">
            <SectionHeading
              eyebrow="Why switch to us"
              title="The difference is what happens after the quote"
              intro="Most cleaning companies sell a rate. We sell a building that passes inspection every time it is walked."
            />
            <ul className="mt-6 space-y-3">
              {PROMISES.map((promise) => (
                <CheckItem key={promise}>{promise}</CheckItem>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <RouteButton to="/about" variant="outline">
                Meet the mission and values
              </RouteButton>
              <RouteButton to="/training" variant="ghost">
                Train with the AM4LESS program
              </RouteButton>
            </div>
          </div>

          <div className="reveal card-surface p-6">
            <div className="flex items-center gap-2">
              <BadgeCheck className="size-5 text-brand-600 dark:text-brand-300" aria-hidden="true" />
              <h3 className="text-base font-bold">Faith · Excellence · Empowerment</h3>
            </div>
            <p className="mt-3 text-sm text-ink-soft">
              AM4LESS is not only a cleaning company. We turn crew members into business-ready operators — which is why
              our supervisors think like owners instead of clock-watching.
            </p>
            <hr className="my-5 border-line" />
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: 'Serving', value: BUSINESS.areaServed },
                { label: 'Response', value: 'Same-day on one-time jobs' },
                { label: 'Reviews', value: 'Google Business profile' }
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs font-bold tracking-wide text-ink-faint uppercase">{item.label}</p>
                  <p className="mt-1 text-sm font-medium">{item.value}</p>
                </div>
              ))}
            </div>
            <LinkButton href={BUSINESS.reviewHref} variant="primary" block className="mt-6" external>
              <Star className="size-4" aria-hidden="true" />
              Read or leave a review
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-[clamp(1rem,0.5rem+2vw,2rem)] py-20">
        <SectionHeading eyebrow="How it works" title="Four steps, no phone tag" center />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Build your scope', body: 'Pick the space, the services and the frequency. Watch the crew size and hours on site update as you go.' },
            { title: 'Send it in one tap', body: 'WhatsApp, text, email or our lead endpoint — whichever you already use.' },
            { title: 'Free walkthrough', body: 'A crew lead verifies size, access and soil level, then writes your price on the spot.' },
            { title: 'Recurring or one-off', body: 'Standing schedules run with photo sign-off every visit and a 24-hour re-scan promise.' }
          ].map((item, index) => (
            <li key={item.title} className="reveal card-surface p-5">
              <Pill tone="brand">Step {index + 1}</Pill>
              <h3 className="mt-3 text-base font-bold">{item.title}</h3>
              <p className="mt-1.5 text-sm text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-4xl px-[clamp(1rem,0.5rem+2vw,2rem)] pb-20">
        <SectionHeading eyebrow="Questions" title="Before you book" />
        <Faq className="mt-8" />
      </section>

      <section className="mx-auto max-w-7xl px-[clamp(1rem,0.5rem+2vw,2rem)] pb-20">
        <div className="reveal rounded-[1.5rem] bg-gradient-to-br from-brand-700 to-brand-950 p-8 text-center sm:p-12">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white">
            Get a crew plan in the next two minutes
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">
            No rate card, no guesswork: the flow sizes your job, a crew lead writes the price. The booking works
            offline, installs on your home screen, and never asks for a card.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <RouteButton to="/book" variant="onDark" size="lg">
              Start my booking
              <ArrowRight className="size-5" aria-hidden="true" />
            </RouteButton>
            <LinkButton href={BUSINESS.whatsappHref} variant="outlineOnDark" size="lg" external>
              Ask a question first
            </LinkButton>
          </div>
          <p className="mt-5 flex items-center justify-center gap-2 text-xs text-brand-200">
            <ShieldCheck className="size-4" aria-hidden="true" />
            Your details stay with this job. We do not sell lists.
          </p>
        </div>
      </section>
    </>
  )
}

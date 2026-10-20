import { ArrowRight, HeartHandshake, Target, TrendingUp } from 'lucide-react'
import { BUSINESS, CORE_VALUES } from '../domain/business'
import { CATEGORIES } from '../domain/categories'
import { BOOKABLE, SERVICES } from '../domain/services'
import { RouteButton } from '../components/Button'
import { CategoryIcon, IconTile, Pill, SectionHeading } from '../components/ui'
import { Photo } from '../components/Photo'

export function AboutPage() {
  return (
    <>
      <section className="bg-inverse py-16 text-inverse-ink">
        <div className="mx-auto max-w-4xl px-[clamp(1rem,0.5rem+2vw,2rem)] text-center">
          <p className="mb-3 text-xs font-bold tracking-[0.14em] text-brand-200 uppercase">About AM4LESS</p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold sm:text-5xl">
            More than a cleaning company
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-brand-100">
            We are a movement built on faith, excellence and empowerment — that turns buildings around and turns crew
            members into owners.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-[clamp(1rem,0.5rem+2vw,2rem)] py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="reveal card-surface p-6">
            <IconTile>
              <Target className="size-5" aria-hidden="true" />
            </IconTile>
            <h2 className="mt-4 text-xl font-bold">Our mission</h2>
            <p className="mt-2 text-ink-soft">
              Every project we take on is treated with the same dedication, whether it is a single apartment or a
              multi-floor office tower. We do not just clean buildings — we build trust, one walkthrough at a time, by
              leaving every space better than the client expected it.
            </p>
          </div>
          <div className="reveal card-surface p-6">
            <IconTile>
              <TrendingUp className="size-5" aria-hidden="true" />
            </IconTile>
            <h2 className="mt-2 text-xl font-bold">Our vision</h2>
            <p className="mt-2 text-ink-soft">
              To be recognised as a national leader in commercial cleaning and professional empowerment — inspiring
              success through purpose, discipline and entrepreneurship, and giving every person who works with us a
              path to owning their own result.
            </p>
          </div>
        </div>

        <figure className="reveal mt-8">
          <Photo slot="aboutTeam" alt="AM4LESS crew preparing a commercial space" ratio="16 / 7" scrim="brand" className="rounded-[var(--radius-card)]" />
          <figcaption className="mt-2 text-sm text-ink-soft">
            Badge-checked crews, written scope before the first visit, photo sign-off at completion.
          </figcaption>
        </figure>

        <div className="mt-14">
          <SectionHeading
            eyebrow="Our core values"
            title="Five standards we actually hold people to"
            intro="These are not wall posters. They are the checklist a supervisor is measured against on site."
          />
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map((value, index) => (
              <li key={value.name} className="reveal card-surface border-t-4 border-t-brand-500 p-5">
                <span className="text-xs font-bold tracking-[0.12em] text-ink-faint uppercase">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-1 text-lg font-bold">{value.name}</h3>
                <p className="mt-1.5 text-sm text-ink-soft">{value.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 card-surface p-8">
          <SectionHeading
            eyebrow="Scope"
            title="What we handle beyond surface cleaning and floor care"
            intro="Facilities management, move-in and move-out prep, and deep-prep work that most vendors will not quote."
          />
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((category) => (
              <RouteButton
                key={category.id}
                to={`/services#${category.id}`}
                variant="ghost"
                className="h-auto items-start justify-start gap-3 rounded-xl border border-line bg-surface p-4 text-left hover:bg-surface-muted"
              >
                <IconTile>
                  <CategoryIcon name={category.icon} />
                </IconTile>
                <span>
                  <span className="block text-sm font-bold">{category.name}</span>
                  <span className="mt-1 block text-xs text-ink-soft">
                    {BOOKABLE.filter((s) => s.category === category.id).length} bookable · {category.tagline}
                  </span>
                </span>
              </RouteButton>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold">Empowerment, in practice</h2>
            <p className="mt-3 text-ink-soft">
              The AM4LESS Commercial Cleaning Mastery Program exists for one reason: a good crew member should not have
              to stay a crew member forever. We train workers to run scopes, price jobs, manage a schedule and invoice
              properly — the same skills our supervisors use on site.
            </p>
            <p className="mt-3 text-ink-soft">
              That is also why clients get a better result. A team that understands why a line item costs what it costs
              stops cutting corners nobody can see.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <RouteButton to="/training" variant="primary">
                See the training program
                <ArrowRight className="size-4" aria-hidden="true" />
              </RouteButton>
              <RouteButton to="/careers" variant="outline">
                Work with us
              </RouteButton>
            </div>
          </div>
          <div className="card-surface p-6">
            <div className="flex items-center gap-2">
              <HeartHandshake className="size-5 text-brand-600 dark:text-brand-300" aria-hidden="true" />
              <h3 className="text-base font-bold">At a glance</h3>
            </div>
            <dl className="mt-4 space-y-3 text-sm">
              {[
                ['Base', `${BUSINESS.city}, ${BUSINESS.region} ${BUSINESS.postalCode}`],
                ['Service area', BUSINESS.areaServed],
                ['Experience', BUSINESS.foundedNote],
                ['Hours', BUSINESS.hoursSummary],
                ['Services online', `${BOOKABLE.length} bookable now · ${SERVICES.length} in catalogue`]
              ].map(([term, value]) => (
                <div key={term} className="flex justify-between gap-4 border-b border-line pb-2 last:border-0">
                  <dt className="text-ink-faint">{term}</dt>
                  <dd className="text-end font-medium">{value}</dd>
                </div>
              ))}
            </dl>
            <Pill tone="brand">{BUSINESS.slogan}</Pill>
          </div>
        </div>
      </section>
    </>
  )
}

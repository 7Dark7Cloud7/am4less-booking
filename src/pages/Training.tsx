import { ArrowRight, Award, Briefcase, GraduationCap, Users } from 'lucide-react'
import { BUSINESS, CORE_VALUES } from '../domain/business'
import { BOOKABLE } from '../domain/services'
import { LinkButton, RouteButton } from '../components/Button'
import { Callout, CheckItem, IconTile, SectionHeading } from '../components/ui'
import { PageHero } from '../components/PageHero'

const MODULES = [
  {
    title: 'Scope reading & job pricing',
    body: 'How to walk a building, measure realistically, identify soil level and access cost, and put a number on paper that holds up when the client pushes back.'
  },
  {
    title: 'Surface chemistry & method',
    body: 'Which product on which floor, dwell time that actually disinfects, why acid on the wrong stone destroys it, and how to strip, seal and burnish VCT properly.'
  },
  {
    title: 'Specialty operations',
    body: `Every line on our catalogue taught as a working scope — the ${BOOKABLE.length} you can book today plus the specialty crews we are certifying next: event turnaround, exterior pressure washing, upholstery extraction, HVAC and kitchen exhaust.`
  },
  {
    title: 'Infection control & compliance',
    body: 'Colour-coded tooling, cross-contamination routes, sharps and biohazard handling, SDS literacy, and the documentation a medical or school facility will ask you for.'
  },
  {
    title: 'Crew leadership on site',
    body: 'Scheduling a team, supervising a walkthrough, photo sign-off discipline, and the 24-hour re-scan promise — how you keep a contract instead of winning it.'
  },
  {
    title: 'From worker to owner',
    body: 'Invoicing and Net terms, insurance and bonding basics, quoting your own route, hiring your first two crew members, and running a P&L on a building you cleaned for years.'
  }
]

const OUTCOMES = [
  'Read a commercial scope and price it without asking a supervisor',
  'Run an occupied-building floor with badge, alarm and access discipline',
  'Close a visit with documented sign-off a facility manager accepts',
  'Decide honestly whether you want to run your own route'
]

export function TrainingPage() {
  return (
    <div className="am4-route">
      <PageHero
        title={<>Commercial cleaning<br /><span>mastery program.</span></>}
        intro="A training track for crew members who want more than an hourly rate — and for clients who want to know the person cleaning their building was taught, not just hired."
        actions={
          <>
            <RouteButton to="/careers" variant="accent" size="lg">
              Join the crew, then the program
              <ArrowRight className="size-5" aria-hidden="true" />
            </RouteButton>
            <LinkButton
              href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent('Mastery Program enquiry')}`}
              variant="outlineOnDark"
              size="lg"
            >
              Ask about the next cohort
            </LinkButton>
          </>
        }
      />

      <section className="mx-auto max-w-5xl px-[clamp(1rem,0.5rem+2vw,2rem)] py-16">
        <Callout tone="warn">
          <strong>Cohort dates, tuition and hours are set per intake.</strong> This page describes the curriculum. We
          deliberately do not publish a price here — email us and a lead will give you the current intake terms.
        </Callout>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { icon: <GraduationCap className="size-5" aria-hidden="true" />, label: 'Format', value: 'Classroom plus supervised floors' },
            { icon: <Users className="size-5" aria-hidden="true" />, label: 'Who it is for', value: 'Crew, supervisors, career changers' },
            { icon: <Award className="size-5" aria-hidden="true" />, label: 'Standard taught to', value: CORE_VALUES.map((v) => v.name).join(' · ') }
          ].map((item) => (
            <div key={item.label} className="card-surface p-5">
              <IconTile>{item.icon}</IconTile>
              <p className="mt-3 text-xs font-bold tracking-wide text-ink-faint uppercase">{item.label}</p>
              <p className="mt-1 text-sm font-semibold">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <SectionHeading eyebrow="Curriculum" title="Six modules, one working standard" />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {MODULES.map((module, index) => (
              <article key={module.title} className="reveal card-surface p-5">
                <span className="font-[family-name:var(--font-art)] text-3xl font-bold uppercase text-am4-blue dark:text-am4-soft">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-1 text-base font-bold">{module.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{module.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold">What you can do at the end</h2>
            <ul className="mt-4 space-y-3">
              {OUTCOMES.map((outcome) => (
                <CheckItem key={outcome}>{outcome}</CheckItem>
              ))}
            </ul>
          </div>
          <div className="card-surface p-6">
            <div className="flex items-center gap-2">
              <Briefcase className="size-5 text-brand-600 dark:text-brand-300" aria-hidden="true" />
              <h3 className="text-base font-bold">Clients: why this matters to you</h3>
            </div>
            <p className="mt-3 text-sm text-ink-soft">
              When you compare two cleaning bids, the rate difference is usually the difference between a crew that was
              trained and one that was told. Our supervisors price, document and close scopes themselves — which is why
              the walkthrough is free and the re-scan promise costs us nothing to honour.
            </p>
            <RouteButton to="/book" variant="primary" block className="mt-5">
              Book a trained crew
            </RouteButton>
          </div>
        </div>
      </section>
    </div>
  )
}

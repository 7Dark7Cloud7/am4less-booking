import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRight, CheckCircle2, Paperclip, Phone } from 'lucide-react'
import { BUSINESS, CORE_VALUES } from '../domain/business'
import { digits, formatPhone } from '../domain/validation'
import { LinkButton, RouteButton } from '../components/Button'
import { Callout, IconTile, SectionHeading } from '../components/ui'
import { ChoiceCard, TextArea, TextField } from '../components/Field'

interface Application {
  firstName: string
  lastName: string
  phone: string
  email: string
  role: string
  info: string
}

const ROLES = [
  'Crew member — commercial',
  'Crew member — residential',
  'Specialty tech (exterior / upholstery / restoration)',
  'Supervisor / lead',
  'Trainer — Mastery Program',
  'Driver / logistics'
] as const

const EMPTY: Application = { firstName: '', lastName: '', phone: '', email: '', role: ROLES[0], info: '' }

export function CareersPage() {
  const [form, setForm] = useState<Application>(EMPTY)
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const patch = (next: Partial<Application>) => setForm((current) => ({ ...current, ...next }))

  const message = [
    'CAREERS APPLICATION',
    `Name: ${form.firstName} ${form.lastName}`.trim(),
    `Phone: ${form.phone}`,
    `Email: ${form.email}`,
    `Role: ${form.role}`,
    form.info ? `Additional information: ${form.info}` : ''
  ]
    .filter(Boolean)
    .join('\n')

  function submit(event: FormEvent) {
    event.preventDefault()
    const next: Record<string, string> = {}
    if (!form.firstName.trim()) next.firstName = 'Required'
    if (!form.lastName.trim()) next.lastName = 'Required'
    if (digits(form.phone).length < 10) next.phone = 'Enter a 10-digit phone number'
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(form.email)) next.email = 'Enter a valid email'
    setErrors(next)
    if (Object.keys(next).length > 0) return
    setSent(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <section className="bg-inverse py-14 text-inverse-ink">
        <div className="mx-auto max-w-5xl px-[clamp(1rem,0.5rem+2vw,2rem)]">
          <p className="mb-3 text-xs font-bold tracking-[0.14em] text-brand-200 uppercase">Careers</p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold sm:text-5xl">
            Start as crew. Leave as an owner.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-brand-100">
            {BUSINESS.foundedNote}, and a training path that exists because empowerment is the stated mission, not a
            word on a wall.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-10 px-[clamp(1rem,0.5rem+2vw,2rem)] py-14 lg:grid-cols-2">
        <div>
          <SectionHeading title="What working here is like" intro="Straight answers, before you apply." />
          <ul className="mt-6 space-y-4 text-sm text-ink-soft">
            <li>
              <strong className="text-ink">Hours.</strong> {BUSINESS.hoursSummary}. Commercial routes also run
              after-hours and overnight, and we schedule around your availability where we can.
            </li>
            <li>
              <strong className="text-ink">Tools and transport.</strong> Equipment and chemicals are supplied. Some
              specialty and logistics roles need a valid licence for towing or hauling.
            </li>
            <li>
              <strong className="text-ink">Progression.</strong> Crew, lead, supervisor, then the Mastery Program if you
              want to run your own route. Promotion is earned on walkthrough results, not tenure.
            </li>
            <li>
              <strong className="text-ink">Screening.</strong> Occupied buildings require badge-checked, insurable crew.
              Expect a reference check and a site trial before an offer.
            </li>
          </ul>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {CORE_VALUES.map((value) => (
              <div key={value.name} className="card-surface p-4">
                <p className="text-sm font-bold">{value.name}</p>
                <p className="mt-1 text-xs text-ink-soft">{value.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card-surface h-fit p-6">
          {sent ? (
            <div className="text-center">
              <CheckCircle2 className="mx-auto size-11 text-success" aria-hidden="true" />
              <h2 className="mt-3 text-xl font-bold">Ready to send</h2>
              <p className="mt-2 text-sm text-ink-soft">
                Open the message below and attach your resume. It goes to us with your details already filled in.
              </p>
              <div className="mt-5 grid gap-2.5">
                <LinkButton
                  href={`${BUSINESS.whatsappHref}?text=${encodeURIComponent(message)}`}
                  variant="primary"
                  external
                  block
                  size="lg"
                >
                  <Paperclip className="size-5" aria-hidden="true" />
                  Send via WhatsApp &amp; attach resume
                </LinkButton>
                <LinkButton
                  href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent('Crew application — ' + form.role)}&body=${encodeURIComponent(message)}`}
                  variant="outline"
                  block
                >
                  Send by email instead
                </LinkButton>
                <LinkButton href={BUSINESS.phoneHref} variant="ghost" block>
                  <Phone className="size-4" aria-hidden="true" />
                  Or call {BUSINESS.phoneDisplay}
                </LinkButton>
              </div>
              <button
                type="button"
                onClick={() => {
                  setForm(EMPTY)
                  setSent(false)
                }}
                className="mt-5 text-sm font-semibold underline"
              >
                Edit my application
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h2 className="text-xl font-bold">Apply</h2>
              <p className="mt-1 mb-5 text-sm text-ink-soft">
                All fields marked <span className="text-danger">*</span> are required.
              </p>

              <Callout tone="info" icon={<IconTile><Paperclip className="size-5" aria-hidden="true" /></IconTile>}>
                There is no file upload here yet — the résumé is attached in the last step, straight from your phone.
              </Callout>

              <div className="mt-5 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    id="c-firstName"
                    label="First name"
                    required
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={(v) => patch({ firstName: v })}
                    error={errors.firstName}
                  />
                  <TextField
                    id="c-lastName"
                    label="Last name"
                    required
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={(v) => patch({ lastName: v })}
                    error={errors.lastName}
                  />
                  <TextField
                    id="c-phone"
                    label="Phone"
                    required
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(v) => patch({ phone: formatPhone(v) })}
                    error={errors.phone}
                  />
                  <TextField
                    id="c-email"
                    label="Email"
                    required
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(v) => patch({ email: v.trim() })}
                    error={errors.email}
                  />
                </div>

                <fieldset className="border-line rounded-[var(--radius-card)] border p-4">
                  <legend className="px-1 text-sm font-semibold">Role</legend>
                  <div className="grid gap-2">
                    {ROLES.map((role) => (
                      <ChoiceCard
                        key={role}
                        checked={form.role === role}
                        onChange={() => patch({ role })}
                        title={role}
                      />
                    ))}
                  </div>
                </fieldset>

                <TextArea
                  id="c-info"
                  label="Additional information"
                  rows={4}
                  placeholder="Availability, distance you can travel, licences, previous cleaning or restoration work…"
                  value={form.info}
                  onChange={(v) => patch({ info: v })}
                />

                <button
                  type="submit"
                  className="inline-flex min-h-[3.4rem] w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 font-bold text-white transition-colors hover:bg-brand-700 dark:bg-brand-400 dark:text-brand-950"
                >
                  Continue
                  <ArrowRight className="size-5" aria-hidden="true" />
                </button>
                <p className="text-center text-xs text-ink-faint">
                  Nothing leaves this device until you press send.{' '}
                  <RouteButton to="/book" variant="ghost" size="sm" className="inline h-auto p-0 text-xs font-semibold underline">
                    Need cleaning, not a job?
                  </RouteButton>
                </p>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  )
}

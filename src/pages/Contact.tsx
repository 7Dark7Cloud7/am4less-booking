import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRight, CheckCircle2, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { BUSINESS } from '../domain/business'
import { formatPhone, digits } from '../domain/validation'
import { LinkButton, RouteButton } from '../components/Button'
import { Callout, SectionHeading } from '../components/ui'
import { PageHero } from '../components/PageHero'
import { TextArea, TextField } from '../components/Field'

const SUBJECTS = [
  'Request a quote',
  'Pressure washing or exterior',
  'Upholstery, carpet or leather',
  'Move-in / move-out deep clean',
  'Recurring contract question',
  'Billing or invoice',
  'Event turnaround (bookable now)',
  'Event set-up, LED or HVAC (opening soon)',
  'Something else'
] as const

const DAYS = [
  ['Monday', '8:00 AM – 5:00 PM'],
  ['Tuesday', '8:00 AM – 5:00 PM'],
  ['Wednesday', '8:00 AM – 5:00 PM'],
  ['Thursday', '8:00 AM – 5:00 PM'],
  ['Friday', '8:00 AM – 5:00 PM'],
  ['Saturday', '8:00 AM – 5:00 PM'],
  ['Sunday', 'Closed']
] as const

export function ContactPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState<string>(SUBJECTS[0])
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [ready, setReady] = useState(false)

  const composed = [
    `AM4LESS enquiry — ${subject}`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    '',
    message
  ].join('\n')

  function submit(event: FormEvent) {
    event.preventDefault()
    const next: Record<string, string> = {}
    if (!name.trim()) next.name = 'Tell us who to ask for'
    if (digits(phone).length < 10 && !email.trim()) next.phone = 'Add a phone or an email so we can reply'
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email.trim())) next.email = 'That email looks incomplete'
    if (message.trim().length < 8) next.message = 'A sentence about the job is enough'
    setErrors(next)
    if (Object.keys(next).length > 0) return
    setReady(true)
  }

  return (
    <div className="am4-route">
      <PageHero
        title={<>Reach out.<br /><span>A person answers.</span></>}
        intro="Fastest routes are a call or a WhatsApp message. Use the form when you want the scope in writing."
        actions={
          <>
            <LinkButton href={BUSINESS.phoneHref} variant="accent" size="lg">
              <Phone className="size-5" aria-hidden="true" />
              {BUSINESS.phoneDisplay}
            </LinkButton>
            <LinkButton href={BUSINESS.whatsappHref} variant="outlineOnDark" size="lg" external>
              <MessageCircle className="size-5" aria-hidden="true" />
              WhatsApp us
            </LinkButton>
            <LinkButton href={`mailto:${BUSINESS.email}`} variant="outlineOnDark" size="lg">
              <Mail className="size-5" aria-hidden="true" />
              Email
            </LinkButton>
          </>
        }
      />

      <section className="mx-auto grid max-w-5xl gap-10 px-[clamp(1rem,0.5rem+2vw,2rem)] py-14 lg:grid-cols-[1.3fr_1fr]">
        <div className="card-surface p-6">
          {ready ? (
            <div className="text-center">
              <CheckCircle2 className="mx-auto size-11 text-success" aria-hidden="true" />
              <h2 className="mt-3 text-xl font-bold">Your message is written</h2>
              <p className="mt-2 text-sm text-ink-soft">
                Pick how to send it — it opens pre-filled, so nothing gets lost in transcription.
              </p>
              <div className="mt-5 grid gap-2.5">
                <LinkButton
                  href={`${BUSINESS.whatsappHref}?text=${encodeURIComponent(composed)}`}
                  variant="primary"
                  external
                  block
                  size="lg"
                >
                  <MessageCircle className="size-5" aria-hidden="true" />
                  Send on WhatsApp
                </LinkButton>
                <LinkButton
                  href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent('AM4LESS enquiry — ' + subject)}&body=${encodeURIComponent(composed)}`}
                  variant="outline"
                  block
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Send by email
                </LinkButton>
                <LinkButton href={`sms:+12676424616?body=${encodeURIComponent(composed)}`} variant="ghost" block>
                  Send as a text message
                </LinkButton>
              </div>
              <button type="button" className="mt-5 text-sm font-semibold underline" onClick={() => setReady(false)}>
                Edit my message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <SectionHeading title="Send a written enquiry" intro="Used for scope questions, not emergencies — call those." />
              <div className="mt-6 space-y-4">
                <TextField id="k-name" label="Your name" required autoComplete="name" value={name} onChange={setName} error={errors.name} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    id="k-phone"
                    label="Phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(v) => setPhone(formatPhone(v))}
                    error={errors.phone}
                  />
                  <TextField
                    id="k-email"
                    label="Email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(v) => setEmail(v.trim())}
                    error={errors.email}
                  />
                </div>
                <div>
                  <label htmlFor="k-subject" className="mb-1.5 block text-sm font-semibold">
                    What is this about?
                  </label>
                  <select
                    id="k-subject"
                    className="field-control"
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                  >
                    {SUBJECTS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <TextArea
                  id="k-message"
                  label="Message"
                  required
                  rows={5}
                  placeholder="Building type, rough size, when you need it, and anything unusual about access."
                  value={message}
                  onChange={setMessage}
                  error={errors.message}
                />
                <button
                  type="submit"
                  className="inline-flex min-h-[3.4rem] w-full items-center justify-center gap-2 rounded-full bg-am4-blue px-6 font-bold text-white transition-colors hover:bg-brand-700"
                >
                  Continue
                  <ArrowRight className="size-5" aria-hidden="true" />
                </button>
                <p className="text-center text-xs text-ink-faint">
                  Want the scope sized instead of described?{' '}
                  <RouteButton to="/book" variant="ghost" size="sm" className="inline h-auto p-0 text-xs font-semibold underline">
                    Use the booking flow
                  </RouteButton>
                </p>
              </div>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="card-surface p-5">
            <h3 className="flex items-center gap-2 text-base font-bold">
              <Clock className="size-4 text-brand-600 dark:text-brand-300" aria-hidden="true" />
              Hours
            </h3>
            <table className="mt-3 w-full text-sm">
              <caption className="sr-only">Opening hours by day</caption>
              <tbody>
                {DAYS.map(([day, hours]) => (
                  <tr key={day} className="border-b border-line last:border-0">
                    <th scope="row" className="py-2 text-start font-medium">
                      {day}
                    </th>
                    <td className={`py-2 text-end ${hours === 'Closed' ? 'text-ink-faint' : ''}`}>{hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card-surface p-5">
            <h3 className="flex items-center gap-2 text-base font-bold">
              <MapPin className="size-4 text-brand-600 dark:text-brand-300" aria-hidden="true" />
              Where we work
            </h3>
            <p className="mt-2 text-sm text-ink-soft">{BUSINESS.areaServed}</p>
            <p className="mt-2 text-sm text-ink-soft">
              Base: {BUSINESS.city}, {BUSINESS.region} {BUSINESS.postalCode}
            </p>
            <LinkButton href={BUSINESS.mapHref} variant="outline" size="sm" external className="mt-4">
              Open in Google Maps
            </LinkButton>
          </div>

          <Callout tone="warn">
            <strong>Deadline this week — a failed event, an inspection, a lease date?</strong> Do not wait on a form.
            Call{' '}
            <a href={BUSINESS.phoneHref} className="font-bold underline">
              {BUSINESS.phoneDisplay}
            </a>{' '}
            and we will tell you honestly whether a crew can be on site in time.
          </Callout>
        </div>
      </section>
    </div>
  )
}

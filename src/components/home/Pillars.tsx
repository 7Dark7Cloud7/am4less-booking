import { ArrowUpRight, Phone } from 'lucide-react'
import { BUSINESS } from '../../domain/business'

const STEPS = [
  { title: 'Your space. Your scope.', body: 'Tell us the property type, size and cleaning services you need.' },
  { title: 'A schedule that fits.', body: 'Choose your preferred date, access details and one-time or recurring visits.' },
  { title: 'Let’s make a plan.', body: 'Share your contact details. The AM4LESS team reviews your request and confirms the scope.' }
]

export function Pillars() {
  return (
    <section className="am4-process" aria-labelledby="process-heading">
      <div className="am4-process-intro"><h2 id="process-heading">A little planning.<br /><span>A lot less mess.</span></h2><p>No guesswork about the next step. Start with your space; we’ll take it from there.</p></div>
      <ol className="am4-process-list">
        {STEPS.map(({ title, body }, index) => (
          <li key={title}><span className="am4-step-number" aria-hidden="true">{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div></li>
        ))}
      </ol>
      <div className="am4-hero-actions"><a href="#quick-booking" className="am4-button am4-button-red">Start my plan <ArrowUpRight className="size-5" aria-hidden="true" /></a><a href={BUSINESS.phoneHref} className="am4-text-link"><Phone className="size-4" aria-hidden="true" />{BUSINESS.phoneDisplay}</a></div>
    </section>
  )
}

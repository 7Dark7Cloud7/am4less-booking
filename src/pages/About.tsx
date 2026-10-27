import { ArrowUpRight, Phone, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BUSINESS, CORE_VALUES } from '../domain/business'
import { BOOKABLE } from '../domain/services'
import { CATEGORIES } from '../domain/categories'
import { PHOTOS, PHOTO_SHOT } from '../domain/media'
import { Story } from '../components/home/Story'

function AboutHero() {
  const photo = PHOTO_SHOT.heroCrew
  return (
    <section className="am4-about-hero" aria-labelledby="about-heading">
      <div className="am4-about-hero-copy">
        <h1 id="about-heading">More than a<br /><span>cleaning company.</span></h1>
        <p className="am4-about-belief">It’s a movement.</p>
        <p>Built on faith, excellence, and empowerment. We specialize in professional commercial cleaning services that transform workplaces, while also transforming lives.</p>
        <div className="am4-hero-actions"><Link to="/book" className="am4-button am4-button-red">Plan a cleaning <ArrowUpRight className="size-5" aria-hidden="true" /></Link><a href="#our-story" className="am4-text-link">Read our story <ArrowUpRight className="size-4" aria-hidden="true" /></a></div>
      </div>
      <figure className="am4-about-hero-photo">
        <img src={PHOTOS.heroCrew} alt={photo.alt} width={photo.w} height={photo.h} fetchPriority="high" decoding="async" />
        <figcaption><Sparkles className="size-6" aria-hidden="true" /><span>{BUSINESS.slogan}</span></figcaption>
      </figure>
    </section>
  )
}

function AboutValues() {
  return (
    <section className="am4-about-values" aria-labelledby="values-heading">
      <div className="am4-about-section-heading"><h2 id="values-heading">Our core<br /><span>values.</span></h2><p>Five commitments that shape every building we clean and every person we train.</p></div>
      <ul className="am4-value-list">
        {CORE_VALUES.map((value) => <li key={value.name}><h3>{value.name}</h3><p>{value.text}</p></li>)}
      </ul>
    </section>
  )
}

function AboutTraining() {
  return (
    <section className="am4-about-training" aria-labelledby="training-heading">
      <h2 id="training-heading">Commercial cleaning.<br /><span>A path to mastery.</span></h2>
      <div className="am4-about-training-body">
        <div><h3>AM4LESS Commercial Cleaning Mastery Program</h3><p>A good crew member should not have to stay a crew member forever. We train workers to run scopes, price jobs, manage a schedule and invoice properly — the same skills our supervisors use on site.</p><div className="am4-hero-actions"><Link to="/training" className="am4-button am4-button-red">Explore the program <ArrowUpRight className="size-5" aria-hidden="true" /></Link><Link to="/careers" className="am4-inline-link">Work with us <ArrowUpRight className="size-4" aria-hidden="true" /></Link></div></div>
        <div className="am4-about-training-purpose"><Sparkles className="size-8" aria-hidden="true" /><p>Success begins with belief, discipline, and consistency.</p><span>From working a scope to leading a business.</span></div>
      </div>
    </section>
  )
}

export function AboutPage() {
  return (
    <div className="am4-about">
      <AboutHero />
      <Story />
      <section className="am4-about-mission" aria-labelledby="mission-heading"><h2 id="mission-heading">The same dedication.<br /><span>Every space.</span></h2><p>Every project we take on is treated with the same dedication, whether it is a single storefront or a multi-floor office tower. We do not just clean buildings — we build trust, one walkthrough at a time, by leaving every space better than the client expected it.</p></section>
      <AboutValues />
      <AboutTraining />
      <section className="am4-about-vision" aria-labelledby="vision-heading"><h2 id="vision-heading">Our vision.</h2><p>To be recognised as a national leader in commercial cleaning and professional empowerment — inspiring success through purpose, discipline and entrepreneurship, and giving every person who works with us a path to owning their own result.</p></section>
      <section className="am4-about-scope" aria-labelledby="scope-heading"><div className="am4-about-section-heading"><h2 id="scope-heading">Find your clean.</h2><Link to="/services" className="am4-inline-link">See all cleaning services <ArrowUpRight className="size-4" aria-hidden="true" /></Link></div><div className="am4-about-scope-links">{CATEGORIES.filter((category) => BOOKABLE.some((service) => service.category === category.id)).map((category) => <Link key={category.id} to={`/services#${category.id}`}>{category.name}<ArrowUpRight className="size-4" aria-hidden="true" /></Link>)}</div></section>
      <section className="am4-about-contact" aria-labelledby="contact-heading">
        <div><h2 id="contact-heading">Reach out.<br /><span>Start fresh.</span></h2><div className="am4-hero-actions"><Link to="/book" className="am4-button am4-button-red">Plan a cleaning <ArrowUpRight className="size-5" aria-hidden="true" /></Link><a href={BUSINESS.phoneHref} className="am4-text-link"><Phone className="size-4" aria-hidden="true" />{BUSINESS.phoneDisplay}</a></div></div>
        <dl className="am4-about-facts">{[['Based in', `${BUSINESS.city}, ${BUSINESS.region} ${BUSINESS.postalCode}`], ['Service area', BUSINESS.areaServed], ['Experience', BUSINESS.foundedNote], ['Hours', BUSINESS.hoursSummary]].map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>
      </section>
    </div>
  )
}

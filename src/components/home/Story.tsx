import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BUSINESS } from '../../domain/business'
import { PHOTOS, PHOTO_SHOT } from '../../domain/media'

export function Story() {
  const photo = PHOTO_SHOT.aboutTeam
  return (
    <section id="our-story" className="am4-story" aria-labelledby="story-heading">
      <figure className="am4-story-photo">
        <img src={PHOTOS.aboutTeam} alt={photo.alt} width={photo.w} height={photo.h} loading="lazy" decoding="async" />
        <figcaption>Our people. Our work.<Link to="/gallery" aria-label="See AM4LESS project photos"><ArrowUpRight className="size-5" aria-hidden="true" /></Link></figcaption>
      </figure>
      <div className="am4-story-copy">
        <h2 id="story-heading">Clean buildings.<br /><span>Changed lives.</span></h2>
        <p className="am4-story-lead">We specialize in professional commercial cleaning services that transform workplaces, while also transforming lives.</p>
        <p>Built on faith, excellence and empowerment, AM4LESS brings {BUSINESS.foundedNote.toLowerCase()} to the spaces we care for across Pennsylvania.</p>
        <div className="am4-story-mission"><h3>Our mission</h3><p>Beyond clean buildings, we build people, purpose, and prosperity.</p></div>
        <div className="am4-story-links"><Link to="/training" className="am4-inline-link">Explore the training program <ArrowUpRight className="size-4" aria-hidden="true" /></Link><Link to="/careers" className="am4-inline-link">Work with us <ArrowUpRight className="size-4" aria-hidden="true" /></Link></div>
      </div>
    </section>
  )
}

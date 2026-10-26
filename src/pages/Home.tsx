import { Hero } from '../components/home/Hero'
import { Ticker } from '../components/home/Ticker'
import { Disciplines } from '../components/home/Disciplines'
import { Chapters } from '../components/home/Chapters'
import { Standard } from '../components/home/Standard'
import { Coverage } from '../components/home/Coverage'
import { Pillars } from '../components/home/Pillars'
import { Closing } from '../components/home/Closing'

export function HomePage() {
  return (
    <div className="lux">
      <Hero />
      <Ticker />
      <Disciplines />
      <Chapters />
      <Standard />
      <Pillars />
      <Coverage />
      <Closing />
    </div>
  )
}

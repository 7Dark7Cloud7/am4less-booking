import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Photo } from '../Photo'
import type { PhotoKey } from '../../domain/media'
import { BOOKABLE } from '../../domain/services'

const TILES: { id: string; kicker: string; line: string; photo: PhotoKey }[] = [
  { id: 'recurring', kicker: 'Recurring programs', line: 'Scheduled weekly to quarterly', photo: 'heroCrew' },
  { id: 'construction', kicker: 'Construction handovers', line: 'Inspection-ready before the walkthrough', photo: 'postConstruction' },
  { id: 'event', kicker: 'Event turnarounds', line: 'Cleared before the morning booking', photo: 'eventSetup' }
]

export function Disciplines() {
  return (
    <section className="mx-auto max-w-[84rem] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="lux-eyebrow">What we clean</p>
          <h2 className="mt-5 max-w-[18ch] text-[clamp(2rem,4vw,3.4rem)] font-light text-ivory">
            Built for every building.
          </h2>
        </div>
        <Link to="/services" className="lux-link text-ivory-faint hover:text-gold">
          All {BOOKABLE.length} services
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {TILES.map((tile) => (
          <Link
            key={tile.id}
            to={`/services#${tile.id}`}
            className="group relative block overflow-hidden no-underline"
          >
            <Photo
              slot={tile.photo}
              ratio="4 / 5"
              scrim="dark"
              className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span aria-hidden="true" className="mb-4 block h-px w-10 bg-gold" />
              <h3 className="text-2xl font-normal text-ivory">{tile.kicker}</h3>
              <p className="mt-2 text-sm text-ivory-soft">{tile.line}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

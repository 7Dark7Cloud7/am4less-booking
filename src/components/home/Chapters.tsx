import { Chapter, type ChapterData } from './Chapter'

const CHAPTERS: ChapterData[] = [
  {
    eyebrow: 'Recurring programs',
    title: 'The same standard, every visit.',
    body: 'Daily or scheduled cleaning of offices, common areas and restrooms — weekly through quarterly. The scope is written before the first visit, then held on every visit after it.',
    bullets: [
      'Desks, surfaces, glass partitions and touchpoint disinfection',
      'Restroom sanitation, consumable restock and trap emptying',
      'Break room, kitchenette and appliance wipe-down',
      'Trash, recycling and cardboard removal'
    ],
    meta: [
      { label: 'Crew', value: '2–6 technicians' },
      { label: 'Cadence', value: 'Weekly to quarterly' }
    ],
    photo: 'heroCrew',
    inset: 'specialtyOps',
    flip: true
  },
  {
    eyebrow: 'Healthcare & education',
    title: 'A clean you can document.',
    body: 'Clinics, schools and care facilities where the result has to be provable: full dwell times, colour-coded tooling and a record of what was touched.',
    bullets: [
      'Hospital-grade disinfectant with documented dwell time',
      'Exam room, waiting area and classroom turnover',
      'Colour-coded tooling to prevent cross-contamination',
      'OSHA-compliant sharps and biohazard handling'
    ],
    meta: [
      { label: 'Crew', value: '2–6 technicians' },
      { label: 'Survey', value: 'On-site walkthrough first' }
    ],
    photo: 'specialtyOps',
    inset: 'postConstruction'
  },
  {
    eyebrow: 'Exteriors',
    title: 'Curb line to roof line.',
    body: 'Soft-washing siding and roofs, high-pressure concrete and asphalt, gutters cleared and hauled off — photographed before and after for your file.',
    bullets: [
      'Soft-wash on siding and roof to protect coatings',
      'High-pressure surface cleaning on concrete and asphalt',
      'Gutter clear and downflush, debris hauled off',
      'Before-and-after photo documentation for your file'
    ],
    meta: [
      { label: 'Crew', value: '2–6 technicians' },
      { label: 'Evidence', value: 'Before & after photos' }
    ],
    photo: 'pressureWashing',
    inset: 'heroCrew',
    flip: true
  },
  {
    eyebrow: 'Events',
    title: 'Handed back before the morning booking.',
    body: 'After the last guest leaves we sort waste, pull bottles and confetti, scrub the floors and give the venue back on your overnight deadline.',
    bullets: [
      'Sorting for landfill, recycling and donation streams',
      'Bottle, glass and confetti extraction from soft goods',
      'Autoscrub pass on hard floors and spill treatment on carpet',
      'Venue handed over ready for the next morning booking'
    ],
    meta: [
      { label: 'Window', value: 'Overnight deadline' },
      { label: 'Bookable', value: 'Rapid post-event cleanup' }
    ],
    photo: 'eventSetup',
    inset: 'moveOut'
  }
]

export function Chapters() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 sm:pb-20">
      <h2 className="text-3xl font-extrabold sm:text-4xl">Find your kind of clean.</h2>
      <p className="mt-2 max-w-2xl text-ink-soft">
        Recurring care or a one-time reset. Explore the details, then build a plan for your space.
      </p>
      <div className="mt-7 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CHAPTERS.map((chapter) => <Chapter key={chapter.title} data={chapter} />)}
      </div>
    </section>
  )
}

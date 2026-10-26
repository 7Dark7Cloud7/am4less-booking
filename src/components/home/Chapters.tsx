import { Chapter, type ChapterData } from './Chapter'

const CHAPTERS: ChapterData[] = [
  {
    eyebrow: 'Post-construction',
    title: 'The last crew before the walkthrough.',
    body: 'Builders and general contractors need a site inspection-ready. We pull the dust nobody else reaches, then detail the glass, frames and floors before the owner arrives.',
    bullets: [
      'Drywall and sanding dust extracted from cavities and ledges',
      'Paint, silicone and grout haze removed from frames and glass',
      'Sticker and label residue dissolved without surface damage',
      'HEPA vacuum and damp-wipe two-pass finish'
    ],
    meta: [
      { label: 'Crew', value: '2–6 technicians' },
      { label: 'Handover', value: 'Photo sign-off, room by room' }
    ],
    photo: 'postConstruction',
    inset: 'floorCare'
  },
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
    <section className="mx-auto max-w-[84rem] px-5 py-8 sm:px-8 lg:px-12">
      <div className="max-w-2xl">
        <p className="lux-eyebrow">Service disciplines</p>
        <h2 className="mt-5 text-[clamp(2rem,4vw,3.4rem)] font-light text-ivory">Tailored to the work.</h2>
        <p className="mt-5 leading-relaxed text-ivory-soft">
          Every line below is quoted after a walkthrough, never over the phone — because the building decides the crew,
          the hours and the detail, not a rate sheet.
        </p>
      </div>

      <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
        {CHAPTERS.map((chapter) => (
          <div key={chapter.title} className="reveal">
            <Chapter data={chapter} />
          </div>
        ))}
      </div>
    </section>
  )
}

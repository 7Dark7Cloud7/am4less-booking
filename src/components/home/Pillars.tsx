const PILLARS = [
  {
    title: 'A written scope first.',
    body: 'We walk the building — access, soil level, square footage — then send the scope in writing. No surprise line items.'
  },
  {
    title: 'A crew sized to the job.',
    body: 'Crew count and hours on site come from the scope, not from who happens to be free that morning.'
  },
  {
    title: 'A photo sign-off.',
    body: 'Every completed room is photographed at handover, so the result is a record instead of a memory.'
  },
  {
    title: 'A 24-hour re-scan.',
    body: 'Anything missed is cleaned again within twenty-four hours, at no charge. One walkthrough, no argument.'
  }
]

export function Pillars() {
  return (
    <section className="border-t border-white/10 bg-lux-raise">
      <div className="mx-auto max-w-[84rem] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="max-w-2xl">
          <p className="lux-eyebrow">How a job runs</p>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.4rem)] font-light text-lux-fg">
            What is fixed before a mop moves.
          </h2>
        </div>

        <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, index) => (
            <li key={pillar.title} className="border-t border-white/15 pt-6">
              <span className="font-[family-name:var(--font-lux-display)] text-xs tracking-[0.2em] text-accent-400">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-xl font-normal text-lux-fg">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-lux-fg-soft">{pillar.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-14 border-t border-white/10 pt-6 text-xs font-semibold tracking-[0.18em] text-lux-fg-faint uppercase">
          Insured &amp; bonded · Badge-checked crews for occupied buildings
        </p>
      </div>
    </section>
  )
}

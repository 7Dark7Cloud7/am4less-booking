const LINES = [
  { no: 'A rate quoted over the phone.', yes: 'A written scope after the walkthrough.' },
  { no: 'Whoever is free on the day.', yes: 'A crew sized to the building.' },
  { no: 'A promise that it will be clean.', yes: 'A photo sign-off, room by room.' },
  { no: 'A list of what we might do.', yes: 'The same standard on every visit.' }
]

export function Standard() {
  return (
    <section className="border-y border-white/10 bg-soft-black">
      <div className="mx-auto max-w-[84rem] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="lux-eyebrow">The standard</p>
            <h2 className="mt-5 text-[clamp(2rem,3.6vw,3rem)] font-light text-ivory">
              What we are
              <br />
              not here to be.
            </h2>
            <div aria-hidden="true" className="lux-rule mt-8 w-24" />
          </div>

          <ul>
            {LINES.map((line) => (
              <li key={line.no} className="border-b border-white/10 py-7 first:pt-0 last:border-0">
                <p className="text-lg text-ivory/50 line-through decoration-ivory/25 sm:text-xl">{line.no}</p>
                <p className="mt-2 text-xl font-light text-gold sm:text-2xl">{line.yes}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

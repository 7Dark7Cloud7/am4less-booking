const ITEMS = [
  'Recurring janitorial',
  'Post-construction',
  'Event turnovers',
  'Pressure washing',
  'Medical & school disinfection',
  'Floor strip & wax',
  'Move-in / move-out',
  'Upholstery care'
]

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {ITEMS.map((item) => (
        <li
          key={item}
          className="flex items-center gap-7 px-7 text-[0.66rem] font-semibold tracking-[0.28em] text-lux-fg/55 uppercase"
        >
          <span aria-hidden="true" className="size-1 rotate-45 bg-accent-400/80" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function Ticker() {
  return (
    <div className="marquee overflow-hidden border-y border-white/10 bg-brand-900/85 py-4">
      <div className="marquee-track">
        <Row />
        <Row hidden />
      </div>
    </div>
  )
}

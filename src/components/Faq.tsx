import { FAQS } from '../domain/faq'

export function Faq({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      {FAQS.map((item) => (
        <details key={item.q} className="card-surface mb-3 overflow-hidden">
          <summary className="flex min-h-[3.25rem] cursor-pointer list-none items-center gap-4 px-5 py-4 font-semibold hover:bg-surface-muted [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="ms-auto shrink-0 text-xl leading-none text-brand-600 dark:text-brand-300" aria-hidden="true">
              <span className="details-plus">+</span>
              <span className="details-minus">−</span>
            </span>
          </summary>
          <div className="px-5 pb-5 text-sm text-ink-soft">{item.a}</div>
        </details>
      ))}
      <style>{`
        .details-minus { display: none; }
        details[open] .details-plus { display: none; }
        details[open] .details-minus { display: inline; }
      `}</style>
    </div>
  )
}

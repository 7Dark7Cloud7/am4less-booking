import type { ReactNode } from 'react'

export function PageHero({
  title,
  intro,
  actions,
  children
}: {
  title: ReactNode
  intro: ReactNode
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className={`am4-page-hero ${children ? '' : 'am4-page-hero-single'}`}>
      <div className="am4-page-hero-copy">
        <h1>{title}</h1>
        <p>{intro}</p>
        {actions && <div className="am4-page-hero-actions">{actions}</div>}
      </div>
      {children && <div className="am4-page-hero-aside">{children}</div>}
    </section>
  )
}

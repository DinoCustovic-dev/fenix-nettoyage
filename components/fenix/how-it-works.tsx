import { FileText, Quote, CalendarCheck, SprayCan, type LucideIcon } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n/types'

const stepIcons: LucideIcon[] = [FileText, Quote, CalendarCheck, SprayCan]

export function HowItWorks({ howItWorks }: { howItWorks: Dictionary['howItWorks'] }) {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            {howItWorks.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-balance text-brand-navy sm:text-4xl">
            {howItWorks.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            {howItWorks.subtitle}
          </p>
        </div>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.steps.map((step, index) => {
            const Icon = stepIcons[index]
            return (
              <li key={step.title} className="relative rounded-2xl border border-border bg-card p-6">
                <span className="absolute right-5 top-5 font-heading text-4xl font-bold text-accent/40">
                  {index + 1}
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl brand-gradient text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-heading text-lg font-semibold text-brand-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

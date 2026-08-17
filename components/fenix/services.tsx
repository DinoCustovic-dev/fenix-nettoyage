import {
  HardHat,
  Building2,
  Store,
  Mountain,
  House,
  SprayCan,
  Factory,
  Building,
  Truck,
  CalendarClock,
  PanelsTopLeft,
  Layers,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import type { Dictionary, ServiceId } from '@/lib/i18n/types'

const icons: Record<ServiceId, LucideIcon> = {
  'post-construction': HardHat,
  offices: Building2,
  commercial: Store,
  chalets: Mountain,
  villas: House,
  homes: SprayCan,
  industrial: Factory,
  'common-areas': Building,
  'move-out': Truck,
  recurring: CalendarClock,
  windows: PanelsTopLeft,
  surfaces: Layers,
  disinfection: ShieldCheck,
}

export function Services({ services }: { services: Dictionary['services'] }) {
  return (
    <section id="services" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            {services.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-balance text-brand-navy sm:text-4xl">
            {services.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            {services.subtitle}
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((service) => {
            const Icon = icons[service.id]
            return (
              <li
                key={service.id}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-heading text-lg font-semibold text-brand-navy">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </li>
            )
          })}
        </ul>

        <p className="mx-auto mt-12 max-w-3xl rounded-2xl brand-gradient px-6 py-6 text-center text-lg font-medium text-white text-pretty">
          {services.closing}
        </p>
      </div>
    </section>
  )
}

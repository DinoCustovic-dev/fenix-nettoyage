'use client'

import { useState } from 'react'
import {
  HardHat,
  Building2,
  Building,
  Mountain,
  Factory,
  PanelsTopLeft,
  Waves,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react'
import type { Dictionary, ServiceId } from '@/lib/i18n/types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const icons: Record<ServiceId, LucideIcon> = {
  'common-areas': Building,
  windows: PanelsTopLeft,
  industrial: Factory,
  'villas-chalets': Mountain,
  offices: Building2,
  'tourist-residences': Waves,
  'post-construction': HardHat,
}

const VISIBLE_COUNT = 4

export function Services({ services }: { services: Dictionary['services'] }) {
  const [expanded, setExpanded] = useState(false)
  const visibleItems = expanded ? services.items : services.items.slice(0, VISIBLE_COUNT)
  const hasMore = !expanded && services.items.length > VISIBLE_COUNT

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

        <ul className="mx-auto mt-14 grid max-w-3xl gap-5 sm:grid-cols-2">
          {visibleItems.map((service) => {
            const Icon = icons[service.id]
            return (
              <li
                key={service.id}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-heading text-lg font-semibold text-brand-navy">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.teaser}
                </p>

                <Dialog>
                  <DialogTrigger
                    render={
                      <Button
                        variant="link"
                        className="mt-4 h-auto self-start px-0 font-semibold text-primary"
                      />
                    }
                  >
                    {services.learnMoreLabel}
                  </DialogTrigger>
                  <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto sm:max-w-lg">
                    <DialogHeader>
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <DialogTitle className="mt-1 text-xl">{service.title}</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {service.approach}
                    </p>
                    <ul className="mt-2 space-y-3">
                      {service.bullets.map((bullet) => (
                        <li key={bullet.label} className="text-sm leading-relaxed">
                          <strong className="font-semibold text-brand-navy">{bullet.label}:</strong>{' '}
                          <span className="text-muted-foreground">{bullet.text}</span>
                        </li>
                      ))}
                    </ul>
                  </DialogContent>
                </Dialog>
              </li>
            )
          })}
        </ul>

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <Button
              variant="outline"
              className="rounded-full px-5"
              onClick={() => setExpanded(true)}
            >
              {services.moreLabel}
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        )}

        <p className="mx-auto mt-12 max-w-3xl rounded-2xl brand-gradient px-6 py-6 text-center text-lg font-medium text-white text-pretty">
          {services.closing}
        </p>
      </div>
    </section>
  )
}

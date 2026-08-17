import Image from 'next/image'
import { ShieldCheck, Leaf, Users, Mountain, type LucideIcon } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n/types'

const pointIcons: LucideIcon[] = [ShieldCheck, Leaf, Users, Mountain]

export function About({ about }: { about: Dictionary['about'] }) {
  return (
    <section id="about" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div className="relative order-last lg:order-first">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] brand-gradient opacity-15 blur-2xl" aria-hidden="true" />
          <div className="overflow-hidden rounded-3xl border border-border shadow-xl shadow-primary/10">
            <Image
              src="/about-team.png"
              alt={about.imageAlt}
              width={900}
              height={720}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            {about.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-balance text-brand-navy sm:text-4xl">
            {about.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            {about.subtitle}
          </p>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {about.points.map((point, index) => {
              const Icon = pointIcons[index]
              return (
                <li key={point.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-brand-navy">
                      {point.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {point.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

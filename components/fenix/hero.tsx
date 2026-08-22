import Image from 'next/image'
import { MapPin, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Dictionary } from '@/lib/i18n/types'

export function Hero({ hero }: { hero: Dictionary['hero'] }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-130 bg-linear-to-b from-secondary to-background" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:pb-24 lg:pt-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-brand-navy">
            <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-6 font-heading text-4xl font-bold leading-tight text-balance text-brand-navy sm:text-5xl lg:text-6xl">
            {hero.title} <span className="brand-text-gradient">{hero.highlight}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            {hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              nativeButton={false}
              render={<a href="#contact">{hero.ctaPrimary}</a>}
              size="lg"
              className="rounded-full bg-primary px-7 font-semibold text-primary-foreground hover:bg-primary/90"
            />
            <Button
              nativeButton={false}
              render={<a href="#services">{hero.ctaSecondary}</a>}
              size="lg"
              variant="outline"
              className="rounded-full border-primary/30 bg-background px-7 font-semibold text-brand-navy hover:bg-secondary"
            />
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {hero.trust.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-medium text-brand-navy">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/40">
                  <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-4xl brand-gradient opacity-15 blur-2xl" aria-hidden="true" />
          <div className="overflow-hidden rounded-3xl border border-border shadow-xl shadow-primary/10">
            <Image
              src="/hero-chalet.png"
              alt={hero.imageAlt}
              width={960}
              height={720}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, Clock, MapPin } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n/types'
import type { Locale } from '@/lib/i18n/config'
import { siteConfig } from '@/lib/site'

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  )
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export function Footer({
  locale,
  dict,
}: {
  locale: Locale
  dict: Dictionary
}) {
  const { footer } = dict
  const year = new Date().getFullYear()
  const topServices = dict.services.items.slice(0, 6)

  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="inline-flex" aria-label="Fenix Nettoyage">
              <span className="rounded-xl bg-white/95 px-3 py-2">
                <Image
                  src="/logo.png"
                  alt="Logo Fenix Nettoyage"
                  width={130}
                  height={44}
                  className="h-9 w-auto object-contain"
                />
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{footer.tagline}</p>
          </div>

          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-accent">
              {footer.servicesTitle}
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {topServices.map((service) => (
                <li key={service.id}>
                  <a href="#services" className="transition-colors hover:text-white">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-accent">
              {footer.contactTitle}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li>
                <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 transition-colors hover:text-white">
                  <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {footer.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${footer.email}`} className="flex items-center gap-2 transition-colors hover:text-white">
                  <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {footer.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{footer.areaValue}</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-accent">
              {footer.hoursTitle}
            </h2>
            <p className="mt-4 flex items-center gap-2 text-sm text-white/75">
              <Clock className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {footer.hoursValue}
            </p>

            <h2 className="mt-6 font-heading text-sm font-semibold uppercase tracking-wide text-accent">
              {footer.followTitle}
            </h2>
            <div className="mt-4 flex gap-3">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-sm text-white/60">
          <p>
            &copy; {year} {siteConfig.name}. {footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}

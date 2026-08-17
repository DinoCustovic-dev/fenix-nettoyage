'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from './language-switcher'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/types'
import { cn } from '@/lib/utils'

export function Header({
  locale,
  nav,
}: {
  locale: Locale
  nav: Dictionary['nav']
}) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#services', label: nav.services },
    { href: '#how-it-works', label: nav.howItWorks },
    { href: '#about', label: nav.about },
    { href: '#reviews', label: nav.reviews },
    { href: '#contact', label: nav.contact },
  ]

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-colors',
        scrolled ? 'border-b border-border bg-background/90 backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          aria-label="Fenix Nettoyage"
        >
          <Image
            src="/logo.png"
            alt="Logo Fenix Nettoyage"
            width={132}
            height={44}
            priority
            className="h-10 w-auto object-contain lg:h-12"
          />
        </Link>

        <nav aria-label={locale === 'fr' ? 'Navigation principale' : 'Main navigation'} className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher locale={locale} label={nav.languageLabel} />
          <Button
            nativeButton={false}
            render={<a href="#contact">{nav.quote}</a>}
            className="rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
          />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher locale={locale} label={nav.languageLabel} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-border bg-background lg:hidden">
          <nav aria-label={locale === 'fr' ? 'Navigation mobile' : 'Mobile navigation'} className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-secondary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button
              nativeButton={false}
              render={
                <a href="#contact" onClick={() => setOpen(false)}>
                  {nav.quote}
                </a>
              }
              className="mt-3 w-full rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
            />
          </nav>
        </div>
      )}
    </header>
  )
}

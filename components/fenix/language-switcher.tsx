'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { i18n, type Locale } from '@/lib/i18n/config'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale
  label: string
}) {
  const pathname = usePathname()

  function pathFor(target: Locale) {
    if (!pathname) return `/${target}`
    const segments = pathname.split('/')
    segments[1] = target
    return segments.join('/') || `/${target}`
  }

  return (
    <div
      className="flex items-center rounded-full border border-border bg-secondary p-0.5"
      role="group"
      aria-label={label}
    >
      {i18n.locales.map((target) => {
        const active = target === locale
        return (
          <Link
            key={target}
            href={pathFor(target)}
            hrefLang={target}
            aria-current={active ? 'true' : undefined}
            className={cn(
              'rounded-full px-3 py-1 text-sm font-semibold uppercase transition-colors',
              active
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {target}
          </Link>
        )
      })}
    </div>
  )
}

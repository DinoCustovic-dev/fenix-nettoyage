import type { MetadataRoute } from 'next'
import { i18n } from '@/lib/i18n/config'
import { siteConfig } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return i18n.locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: locale === i18n.defaultLocale ? 1 : 0.9,
    alternates: {
      languages: {
        fr: `${siteConfig.url}/fr`,
        en: `${siteConfig.url}/en`,
      },
    },
  }))
}

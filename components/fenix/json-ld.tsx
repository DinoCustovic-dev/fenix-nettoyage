import type { Dictionary } from '@/lib/i18n/types'
import type { Locale } from '@/lib/i18n/config'
import { siteConfig } from '@/lib/site'

export function LocalBusinessJsonLd({
  dict,
  locale,
}: {
  dict: Dictionary
  locale: Locale
}) {
  const businessUrl = `${siteConfig.url}/${locale}`

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'CleaningService',
    '@id': `${siteConfig.url}/#business`,
    name: siteConfig.name,
    description: dict.meta.description,
    url: businessUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${siteConfig.url}/hero-chalet.png`,
    logo: `${siteConfig.url}/logo.png`,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postalCode,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: siteConfig.areaServed.map((name) => ({
      '@type': 'City',
      name,
    })),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '19:00',
    },
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: dict.services.title,
      itemListElement: dict.services.items.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.approach,
          serviceType: service.title,
          areaServed: siteConfig.areaServed,
          provider: { '@id': `${siteConfig.url}/#business` },
        },
      })),
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
    />
  )
}

import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { notFound } from 'next/navigation'
import '../globals.css'
import { i18n, isLocale, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { siteConfig } from '@/lib/site'
import { LocalBusinessJsonLd } from '@/components/fenix/json-ld'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }))
}

export const viewport: Viewport = {
  themeColor: '#2e9fb5',
  colorScheme: 'light',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const locale: Locale = isLocale(lang) ? lang : i18n.defaultLocale
  const dict = await getDictionary(locale)

  return {
    metadataBase: new URL(siteConfig.url),
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    generator: 'v0.app',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: '/fr',
        en: '/en',
        'x-default': '/fr',
      },
    },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      url: `/${locale}`,
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      images: [
        {
          url: '/hero-chalet.png',
          width: 1200,
          height: 630,
          alt: dict.hero.imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      images: ['/hero-chalet.png'],
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  return (
    <html lang={lang} className={`bg-background ${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        <LocalBusinessJsonLd dict={dict} locale={lang} />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

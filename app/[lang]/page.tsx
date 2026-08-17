import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { Header } from '@/components/fenix/header'
import { Hero } from '@/components/fenix/hero'
import { Services } from '@/components/fenix/services'
import { HowItWorks } from '@/components/fenix/how-it-works'
import { About } from '@/components/fenix/about'
import { Reviews } from '@/components/fenix/reviews'
import { Contact } from '@/components/fenix/contact'
import { Footer } from '@/components/fenix/footer'

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  return (
    <>
      <Header locale={lang} nav={dict.nav} />
      <main>
        <Hero hero={dict.hero} />
        <Services services={dict.services} />
        <HowItWorks howItWorks={dict.howItWorks} />
        <About about={dict.about} />
        <Reviews reviews={dict.reviews} />
        <Contact contact={dict.contact} services={dict.services.items} />
      </main>
      <Footer locale={lang} dict={dict} />
    </>
  )
}

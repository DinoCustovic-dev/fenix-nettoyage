import 'server-only'
import type { Locale } from './config'
import type { Dictionary } from './types'

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  fr: () => import('@/dictionaries/fr.json').then((m) => m.default as Dictionary),
  en: () => import('@/dictionaries/en.json').then((m) => m.default as Dictionary),
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return (dictionaries[locale] ?? dictionaries.fr)()
}

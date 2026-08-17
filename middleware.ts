import { NextResponse, type NextRequest } from 'next/server'
import { i18n } from '@/lib/i18n/config'

function getLocale(request: NextRequest): string {
  const header = request.headers.get('accept-language')
  if (header) {
    const preferred = header
      .split(',')
      .map((part) => part.split(';')[0].trim().slice(0, 2).toLowerCase())
    for (const lang of preferred) {
      if ((i18n.locales as readonly string[]).includes(lang)) return lang
    }
  }
  return i18n.defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocale = i18n.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
  if (hasLocale) return

  const locale = getLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}

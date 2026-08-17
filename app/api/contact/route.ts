import { NextResponse } from 'next/server'

export interface ContactPayload {
  name?: string
  phone?: string
  email?: string
  service?: string
  area?: string
  message?: string
  date?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let body: ContactPayload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const name = body.name?.trim() ?? ''
  const phone = body.phone?.trim() ?? ''
  const email = body.email?.trim() ?? ''
  const service = body.service?.trim() ?? ''
  const message = body.message?.trim() ?? ''

  const errors: Record<string, string> = {}
  if (!name) errors.name = 'required'
  if (!phone) errors.phone = 'required'
  if (!email) errors.email = 'required'
  else if (!EMAIL_RE.test(email)) errors.email = 'invalid_email'
  if (!service) errors.service = 'required'
  if (!message) errors.message = 'required'

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 })
  }

  // TODO: Wire real email sending here (e.g. Resend, Nodemailer, or a CRM).
  // Example: await sendEmail({ to: 'contact@fenix-nettoyage.fr', ... })
  console.log('[v0] New contact request:', {
    name,
    phone,
    email,
    service,
    area: body.area?.trim() ?? '',
    date: body.date?.trim() ?? '',
    message,
  })

  return NextResponse.json({ ok: true })
}

import { NextResponse } from 'next/server'
import { siteConfig } from '@/lib/site'

export interface ContactPayload {
  name?: string
  phone?: string
  email?: string
  service?: string
  area?: string
  message?: string
  date?: string
  // Honeypot — hidden from humans, bots fill it in.
  website?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Field = 'name' | 'phone' | 'email' | 'service' | 'area' | 'date' | 'message'

const MAX_LENGTH: Record<Field, number> = {
  name: 200,
  phone: 200,
  email: 200,
  service: 200,
  area: 300,
  date: 50,
  message: 5000,
}

const LABELS: [Field, string][] = [
  ['name', 'Nom'],
  ['phone', 'Téléphone'],
  ['email', 'E-mail'],
  ['service', 'Prestation'],
  ['area', 'Adresse / secteur'],
  ['date', 'Date souhaitée'],
  ['message', 'Message'],
]

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: Request) {
  let body: ContactPayload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  if (body.website?.trim()) {
    return NextResponse.json({ ok: true })
  }

  const fields: Record<Field, string> = {
    name: body.name?.trim() ?? '',
    phone: body.phone?.trim() ?? '',
    email: body.email?.trim() ?? '',
    service: body.service?.trim() ?? '',
    area: body.area?.trim() ?? '',
    date: body.date?.trim() ?? '',
    message: body.message?.trim() ?? '',
  }

  const errors: Record<string, string> = {}
  if (!fields.name) errors.name = 'required'
  if (!fields.phone) errors.phone = 'required'
  if (!fields.email) errors.email = 'required'
  else if (!EMAIL_RE.test(fields.email)) errors.email = 'invalid_email'
  if (!fields.service) errors.service = 'required'
  if (!fields.message) errors.message = 'required'
  for (const [key] of LABELS) {
    if (fields[key].length > MAX_LENGTH[key]) errors[key] = 'too_long'
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL || `${siteConfig.name} <onboarding@resend.dev>`
  if (!apiKey || !to) {
    console.error('[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not set')
    return NextResponse.json({ ok: false, error: 'email_not_configured' }, { status: 500 })
  }

  const rows = LABELS.filter(([key]) => fields[key])
  const text = rows.map(([key, label]) => `${label}: ${fields[key]}`).join('\n')
  const html = `<h2 style="font-family:sans-serif;color:#1a4f6e">Nouvelle demande de devis</h2>
<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
${rows
  .map(
    ([key, label]) =>
      `<tr><td style="padding:6px 16px 6px 0;color:#567a8d;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:6px 0;color:#123a52;white-space:pre-wrap">${escapeHtml(fields[key])}</td></tr>`,
  )
  .join('\n')}
</table>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: fields.email,
        subject: `Nouvelle demande de devis — ${fields.service} — ${fields.name}`.replace(/\s+/g, ' '),
        text,
        html,
      }),
    })
    if (!res.ok) {
      console.error('[contact] Resend error', res.status, await res.text())
      return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 })
    }
  } catch (error) {
    console.error('[contact] Resend request failed', error)
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}

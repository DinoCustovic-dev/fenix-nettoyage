'use client'

import { useState } from 'react'
import { Phone, Mail, Clock, MapPin, Send, LoaderCircle, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Dictionary } from '@/lib/i18n/types'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function Contact({
  contact,
  services,
}: {
  contact: Dictionary['contact']
  services: Dictionary['services']['items']
}) {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate(form: FormData) {
    const next: Record<string, string> = {}
    const required = ['name', 'phone', 'email', 'service', 'message']
    for (const field of required) {
      if (!String(form.get(field) ?? '').trim()) next[field] = contact.required
    }
    const email = String(form.get('email') ?? '').trim()
    if (email && !EMAIL_RE.test(email)) next.email = contact.invalidEmail
    return next
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formEl = event.currentTarget
    const form = new FormData(formEl)

    const validation = validate(form)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      })
      if (!res.ok) throw new Error('request_failed')
      setStatus('success')
      formEl.reset()
    } catch {
      setStatus('error')
    }
  }

  const fieldClass =
    'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30'

  const labelClass = 'mb-1.5 block text-sm font-medium text-brand-navy'

  return (
    <section id="contact" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            {contact.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-balance text-brand-navy sm:text-4xl">
            {contact.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            {contact.subtitle}
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3 rounded-3xl border border-border bg-card p-6 sm:p-8">
            {status === 'success' ? (
              <div
                role="status"
                className="flex h-full min-h-72 flex-col items-center justify-center text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-7 w-7" aria-hidden="true" />
                </span>
                <p className="mt-5 max-w-md text-lg font-medium text-brand-navy text-pretty">
                  {contact.success}
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    {contact.fields.name} *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className={fieldClass}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-xs text-destructive">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className={labelClass}>
                    {contact.fields.phone} *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={fieldClass}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1 text-xs text-destructive">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    {contact.fields.email} *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={fieldClass}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-xs text-destructive">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="service" className={labelClass}>
                    {contact.fields.service} *
                  </label>
                  <select
                    id="service"
                    name="service"
                    defaultValue=""
                    className={cn(fieldClass, 'appearance-none')}
                    aria-invalid={!!errors.service}
                    aria-describedby={errors.service ? 'service-error' : undefined}
                  >
                    <option value="" disabled>
                      {contact.fields.servicePlaceholder}
                    </option>
                    {services.map((service) => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p id="service-error" className="mt-1 text-xs text-destructive">{errors.service}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="area" className={labelClass}>
                    {contact.fields.area}
                  </label>
                  <input
                    id="area"
                    name="area"
                    type="text"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="date" className={labelClass}>
                    {contact.fields.date} <span className="text-muted-foreground">{contact.fields.dateOptional}</span>
                  </label>
                  <input id="date" name="date" type="date" className={fieldClass} />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className={labelClass}>
                    {contact.fields.message} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className={cn(fieldClass, 'resize-y')}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-xs text-destructive">{errors.message}</p>
                  )}
                </div>

                {status === 'error' && (
                  <p role="alert" className="sm:col-span-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {contact.error}
                  </p>
                )}

                <div className="sm:col-span-2">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === 'submitting'}
                    className="w-full rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90 sm:w-auto"
                  >
                    {status === 'submitting' ? (
                      <>
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                        {contact.submitting}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                        {contact.submit}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>

          <aside className="lg:col-span-2 rounded-3xl brand-gradient p-6 text-white sm:p-8">
            <h3 className="font-heading text-xl font-semibold">{contact.infoTitle}</h3>
            <ul className="mt-6 space-y-5 text-sm">
              <li>
                <a href={`tel:${siteConfig.phone}`} className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  <span className="font-medium">{contact.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-start gap-3 break-all">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  <span className="font-medium">{contact.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <span>
                  <span className="block font-medium">{contact.hours}</span>
                  <span className="text-white/80">{contact.hoursValue}</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="text-white/90">{contact.areaValue}</span>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}

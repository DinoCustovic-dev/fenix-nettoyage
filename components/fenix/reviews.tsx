'use client'

import useSWR from 'swr'
import { Star } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n/types'
import type { ReviewsResponse } from '@/app/api/reviews/route'
import { cn } from '@/lib/utils'

const fetcher = (url: string) => fetch(url).then((r) => r.json() as Promise<ReviewsResponse>)

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn('inline-flex', className)} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={cn(
            'h-4 w-4',
            i < Math.round(rating) ? 'fill-[#f5b301] text-[#f5b301]' : 'fill-muted text-muted',
          )}
        />
      ))}
    </span>
  )
}

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8Z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1Z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1C6.2 6.8 8.9 4.8 12 4.8Z" />
    </svg>
  )
}

export function Reviews({ reviews }: { reviews: Dictionary['reviews'] }) {
  const { data, error, isLoading } = useSWR<ReviewsResponse>('/api/reviews', fetcher)

  return (
    <section id="reviews" className="scroll-mt-24 bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            {reviews.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-balance text-brand-navy sm:text-4xl">
            {reviews.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            {reviews.subtitle}
          </p>
        </div>

        {data && (
          <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-2 rounded-2xl border border-border bg-card px-6 py-5 text-center">
            <div className="flex items-center gap-2">
              <GoogleGlyph />
              <span className="text-3xl font-bold text-brand-navy">{data.rating.toFixed(1)}</span>
              <Stars rating={data.rating} />
            </div>
            <p className="text-sm text-muted-foreground">
              {reviews.ratingLabel} · {data.user_ratings_total} {reviews.reviewsLabel}
            </p>
          </div>
        )}

        {isLoading && (
          <p className="mt-10 text-center text-muted-foreground">{reviews.loading}</p>
        )}
        {error && <p className="mt-10 text-center text-destructive">{reviews.error}</p>}

        {data && (
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.reviews.slice(0, 3).map((review, i) => (
              <li key={i} className="flex flex-col rounded-2xl border border-border bg-card p-6">
                <Stars rating={review.rating} />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full brand-gradient font-heading text-sm font-semibold text-white">
                    {review.author_name.charAt(0)}
                  </span>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-brand-navy">{review.author_name}</p>
                    <p className="text-xs text-muted-foreground">{review.relative_time_description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

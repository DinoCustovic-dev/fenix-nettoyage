import { NextResponse } from 'next/server'

/**
 * Mock Google Places reviews endpoint.
 *
 * The response shape mirrors the Google Places Details API so you can later
 * replace `getReviews()` with a real fetch to:
 *   https://maps.googleapis.com/maps/api/place/details/json?place_id=...&fields=rating,user_ratings_total,reviews&key=GOOGLE_PLACES_API_KEY
 * and return `result.rating`, `result.user_ratings_total`, `result.reviews`.
 */

export interface GoogleReview {
  author_name: string
  rating: number
  text: string
  relative_time_description: string
  profile_photo_url?: string
  time: number
}

export interface ReviewsResponse {
  rating: number
  user_ratings_total: number
  reviews: GoogleReview[]
}

const MOCK: ReviewsResponse = {
  rating: 4.9,
  user_ratings_total: 87,
  reviews: [
    {
      author_name: 'Camille Rousseau',
      rating: 5,
      text: "Équipe très professionnelle pour le nettoyage de notre chalet à Megève entre deux locations. Ponctuels, discrets et un résultat impeccable. Je recommande vivement.",
      relative_time_description: 'il y a 2 semaines',
      time: 1718000000,
    },
    {
      author_name: 'James Whitfield',
      rating: 5,
      text: 'Booked a post-construction cleaning for our villa near Annecy. The team was thorough and left everything spotless. Excellent communication in English too.',
      relative_time_description: 'a month ago',
      time: 1715400000,
    },
    {
      author_name: 'Sophie Béatrice',
      rating: 5,
      text: "Nettoyage de nos bureaux chaque semaine. Sérieux, fiables et produits écologiques comme promis. Un vrai partenaire de confiance.",
      relative_time_description: 'il y a 1 mois',
      time: 1714800000,
    },
    {
      author_name: 'Laurent Meunier',
      rating: 4,
      text: "Très bon travail pour l'état des lieux de sortie de notre appartement. Caution récupérée sans problème. Merci à toute l'équipe.",
      relative_time_description: 'il y a 2 mois',
      time: 1712200000,
    },
    {
      author_name: 'Anna Kowalski',
      rating: 5,
      text: 'Reliable and detail-oriented. They handle the common areas of our building and the difference is night and day. Highly recommended in Haute-Savoie.',
      relative_time_description: '2 months ago',
      time: 1711900000,
    },
    {
      author_name: 'Thomas Girard',
      rating: 5,
      text: "Lavage des vitres de notre villa, résultat parfait sans traces. Équipe aimable et efficace. On refera appel à eux sans hésiter.",
      relative_time_description: 'il y a 3 mois',
      time: 1709300000,
    },
  ],
}

export async function GET() {
  // Replace with a real Google Places API call.
  return NextResponse.json(MOCK, {
    headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' },
  })
}

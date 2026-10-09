// URL and email come from env until the client's own domain is live — set
// NEXT_PUBLIC_SITE_URL / NEXT_PUBLIC_CONTACT_EMAIL in Vercel to switch.
export const siteConfig = {
  name: 'Fenix74',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fenix-nettoyage.vercel.app',
  phone: '+33450000000',
  phoneDisplay: '+33 4 50 00 00 00',
  // Placeholder inbox until the client's domain mail exists — override via NEXT_PUBLIC_CONTACT_EMAIL.
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'f7671029@gmail.com',
  // Placeholder address — replace with the real one.
  address: {
    street: '1 Rue du Lac',
    city: 'Annecy',
    postalCode: '74000',
    region: 'Haute-Savoie',
    country: 'FR',
  },
  geo: {
    latitude: 45.8992,
    longitude: 6.1294,
  },
  areaServed: ['Annecy', 'Megève', 'Haute-Savoie'],
  social: {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
  },
  openingHours: 'Mo-Sa 08:00-19:00',
} as const

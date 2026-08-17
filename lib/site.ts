export const siteConfig = {
  name: 'Fenix Nettoyage',
  url: 'https://www.fenix-nettoyage.fr',
  phone: '+33450000000',
  phoneDisplay: '+33 4 50 00 00 00',
  email: 'contact@fenix-nettoyage.fr',
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

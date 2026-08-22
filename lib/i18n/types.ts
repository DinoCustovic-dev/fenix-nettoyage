export type ServiceId =
  | 'common-areas'
  | 'windows'
  | 'industrial'
  | 'villas-chalets'
  | 'offices'
  | 'tourist-residences'
  | 'post-construction'

export interface Dictionary {
  meta: {
    title: string
    description: string
    ogTitle: string
    ogDescription: string
    keywords: string
  }
  nav: {
    services: string
    howItWorks: string
    about: string
    reviews: string
    contact: string
    quote: string
    languageLabel: string
  }
  hero: {
    eyebrow: string
    title: string
    highlight: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    imageAlt: string
    trust: string[]
  }
  services: {
    eyebrow: string
    title: string
    subtitle: string
    closing: string
    moreLabel: string
    fewerLabel: string
    learnMoreLabel: string
    closeLabel: string
    items: {
      id: ServiceId
      title: string
      teaser: string
      approach: string
      bullets: { label: string; text: string }[]
    }[]
  }
  howItWorks: {
    eyebrow: string
    title: string
    subtitle: string
    steps: { title: string; description: string }[]
  }
  about: {
    eyebrow: string
    title: string
    subtitle: string
    imageAlt: string
    points: { title: string; description: string }[]
  }
  reviews: {
    eyebrow: string
    title: string
    subtitle: string
    ratingLabel: string
    reviewsLabel: string
    error: string
    loading: string
  }
  contact: {
    eyebrow: string
    title: string
    subtitle: string
    fields: {
      name: string
      phone: string
      email: string
      service: string
      servicePlaceholder: string
      area: string
      message: string
      date: string
      dateOptional: string
    }
    submit: string
    submitting: string
    success: string
    error: string
    required: string
    invalidEmail: string
    infoTitle: string
    phone: string
    email: string
    hours: string
    hoursValue: string
    areaValue: string
  }
  footer: {
    tagline: string
    servicesTitle: string
    contactTitle: string
    hoursTitle: string
    hoursValue: string
    areaTitle: string
    areaValue: string
    followTitle: string
    rights: string
    phone: string
    email: string
  }
}

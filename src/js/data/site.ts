// Identité et coordonnées du site : à modifier ici uniquement.
// Ces valeurs alimentent l'affichage, les métadonnées SEO, le sitemap et les données structurées.

export const SITE = {
  name: 'Les Tables de Giovanni',
  /** Adresse publique du site, sans barre finale. */
  url: 'https://les-tables-de-giovanni.fr',
  domain: 'les-tables-de-giovanni.fr',
  description:
    "Les Tables de Giovanni, traiteur italien à Arles : cuisine de famille italienne et produits de Provence pour vos réceptions, mariages, repas d'entreprise et événements.",
  /** Image de partage (Facebook, LinkedIn, WhatsApp…), 1200 × 630 px. */
  ogImage: '/assets/img/partage-les-tables-de-giovanni.jpg',
  /** Logo carré pour Google (données structurées). */
  logo: '/assets/icons/icon-512.png',
  locale: 'fr_FR',
  themeColor: '#1f3a2e',

  city: 'Arles',
  phone: '06.14.67.05.64',
  phoneHref: 'tel:+33614670564',
  phoneE164: '+33614670564',
  email: 'contact@les-tables-de-giovanni.fr',
  address: '8 rue de la Calade, 13200 Arles',
  streetAddress: '8 rue de la Calade',
  postalCode: '13200',
  region: "Provence-Alpes-Côte d'Azur",
  zone: 'Arles, la Camargue et les Alpilles',
  areaServed: ['Arles', 'Camargue', 'Alpilles', 'Saint-Rémy-de-Provence', 'Tarascon', 'Nîmes'],
  founded: 2012,
} as const;

export const HOURS: { day: string; hours: string }[] = [
  { day: 'Lundi', hours: 'Fermé' },
  { day: 'Mardi – Vendredi', hours: '9 h – 19 h' },
  { day: 'Samedi', hours: '9 h – 17 h' },
  { day: 'Dimanche', hours: 'Sur rendez-vous' },
];

/** Horaires au format schema.org (données structurées). */
export const OPENING_HOURS = [
  { days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' },
  { days: ['Saturday'], opens: '09:00', closes: '17:00' },
];

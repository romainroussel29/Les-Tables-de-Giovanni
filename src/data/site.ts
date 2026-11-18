export const SITE = {
  name: "Les Tables de Giovanni",
  city: "Arles",
  phone: "06.14.67.05.64",
  phoneHref: "tel:+33614670564",
  email: "contact@les-tables-de-giovanni.fr",
  domain: "les-tables-de-giovanni.fr",
  url: "https://les-tables-de-giovanni.fr",
  address: "8 rue de la Calade, 13200 Arles",
  zone: "Arles, la Camargue et les Alpilles",
  founded: 2012,
} as const;

export const HOURS: { day: string; hours: string }[] = [
  { day: "Lundi", hours: "Fermé" },
  { day: "Mardi – Vendredi", hours: "9 h – 19 h" },
  { day: "Samedi", hours: "9 h – 17 h" },
  { day: "Dimanche", hours: "Sur rendez-vous" },
];

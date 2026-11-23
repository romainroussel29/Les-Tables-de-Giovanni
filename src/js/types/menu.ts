export type Diet = 'Classique' | 'Végétarien' | 'Vegan' | 'Sans gluten';

export type Category = 'Italien' | 'Terroir' | 'Buffet' | 'Cocktail' | 'Entreprise' | 'Brunch' | 'Réception';

export interface Courses {
  entrees: string[];
  plats: string[];
  desserts: string[];
}

export interface Menu {
  /** Identifiant dans l'adresse (/menus/<slug>/) et nom de la photo (menu-<slug>-*.webp) */
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: Category;
  diet: Diet;
  /** Prix TTC par personne, en euros */
  pricePerPerson: number;
  minGuests: number;
  /** Délai de commande minimum, en jours */
  orderDelay: number;
  /** Description de la photo (public/assets/img/menu-<slug>-*.webp) */
  imageAlt: string;
  courses: Courses;
  allergens: string[];
  featured?: boolean;
}

export interface Testimonial {
  name: string;
  event: string;
  rating: number;
  text: string;
}

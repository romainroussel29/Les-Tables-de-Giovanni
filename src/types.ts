export type Diet = "Classique" | "Végétarien" | "Vegan" | "Sans gluten";

export type Category =
  | "Italien"
  | "Terroir"
  | "Buffet"
  | "Cocktail"
  | "Entreprise"
  | "Brunch"
  | "Réception";

export interface Courses {
  entrees: string[];
  plats: string[];
  desserts: string[];
}

export interface Menu {
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
  image: string;
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

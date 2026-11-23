// Référencement : balises <head> de chaque page et données structurées schema.org.
// Utilisé au pré-rendu (scripts/prerender.mjs) et dans le navigateur (changement de page).

import { OPENING_HOURS, SITE } from '@/data/site';
import type { Menu } from '@/types/menu';
import { getImage, menuImageKey } from './images';

export interface PageMeta {
  /** Adresse de la page, avec barre finale : « /menus/ » */
  path: string;
  title: string;
  description: string;
  /** Page exclue des résultats de recherche (404) */
  noIndex?: boolean;
  /** Données structurées schema.org propres à la page */
  jsonLd?: object[];
  /** Photo du premier écran, préchargée en priorité */
  preloadImage?: { key: string; sizes: string };
}

/** URL absolue d'un chemin du site */
export const absoluteUrl = (path: string) => `${SITE.url}${path}`;

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** JSON dans une balise <script> : « < » est échappé pour qu'aucun texte ne puisse la refermer */
const serializeJsonLd = (data: object) => JSON.stringify(data, null, 2).replace(/</g, '\\u003c');

/** Balises <head> propres à une page, en texte HTML (pré-rendu) */
export function renderHead(meta: PageMeta): string {
  const url = absoluteUrl(meta.path);
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const tags = [`<title>${title}</title>`, `<meta name="description" content="${description}" />`];

  if (meta.noIndex) {
    tags.push('<meta name="robots" content="noindex, follow" />');
  } else {
    tags.push(
      '<meta name="robots" content="index, follow, max-image-preview:large" />',
      `<link rel="canonical" href="${url}" />`,
      `<meta property="og:url" content="${url}" />`,
    );
  }

  tags.push(
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
  );

  if (meta.preloadImage) {
    const image = getImage(meta.preloadImage.key);
    if (image) {
      tags.push(
        `<link rel="preload" as="image" type="image/webp" imagesrcset="${image.srcSet}" imagesizes="${meta.preloadImage.sizes}" fetchpriority="high" />`,
      );
    }
  }

  for (const data of meta.jsonLd ?? []) {
    tags.push(`<script type="application/ld+json">\n${serializeJsonLd(data)}\n    </script>`);
  }
  return tags.join('\n    ');
}

/** Met à jour le titre, la description et l'URL canonique après une navigation dans le navigateur */
export function applyHead(meta: PageMeta) {
  document.title = meta.title;
  const set = (selector: string, value: string) =>
    document.head.querySelector(selector)?.setAttribute('content', value);
  set('meta[name="description"]', meta.description);
  set('meta[property="og:title"]', meta.title);
  set('meta[property="og:description"]', meta.description);
  set('meta[property="og:url"]', absoluteUrl(meta.path));
  document.head.querySelector('link[rel="canonical"]')?.setAttribute('href', absoluteUrl(meta.path));
}

// --- Données structurées -------------------------------------------------------------------

const BUSINESS_ID = `${SITE.url}/#traiteur`;

/** L'entreprise : nom, adresse, horaires, zone desservie (fiche Google, recherche locale) */
export function businessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: `${SITE.url}/`,
        name: SITE.name,
        inLanguage: 'fr-FR',
        publisher: { '@id': BUSINESS_ID },
      },
      {
        '@type': 'FoodEstablishment',
        '@id': BUSINESS_ID,
        name: SITE.name,
        description: SITE.description,
        url: `${SITE.url}/`,
        image: absoluteUrl(SITE.ogImage),
        logo: absoluteUrl(SITE.logo),
        telephone: SITE.phoneE164,
        email: SITE.email,
        foundingDate: String(SITE.founded),
        servesCuisine: ['Italienne', 'Provençale', 'Méditerranéenne'],
        priceRange: '22 € – 62 € par personne',
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE.streetAddress,
          postalCode: SITE.postalCode,
          addressLocality: SITE.city,
          addressRegion: SITE.region,
          addressCountry: 'FR',
        },
        areaServed: SITE.areaServed.map((name) => ({ '@type': 'City', name })),
        openingHoursSpecification: OPENING_HOURS.map((slot) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: slot.days,
          opens: slot.opens,
          closes: slot.closes,
        })),
      },
    ],
  };
}

/** Fil d'Ariane, affiché par Google sous le titre du résultat */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Accueil', path: '/' }, ...items].map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Un menu, décrit comme une offre avec son prix par personne */
export function menuJsonLd(menu: Menu) {
  const path = `/menus/${menu.slug}/`;
  const image = getImage(menuImageKey(menu.slug));
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Menu ${menu.name}`,
    description: menu.description,
    category: `Traiteur — ${menu.category}`,
    url: absoluteUrl(path),
    ...(image ? { image: absoluteUrl(image.largestSrc) } : {}),
    brand: { '@type': 'Brand', name: SITE.name },
    offers: {
      '@type': 'Offer',
      price: menu.pricePerPerson,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: absoluteUrl(path),
      seller: { '@id': BUSINESS_ID },
      eligibleQuantity: { '@type': 'QuantitativeValue', minValue: menu.minGuests, unitText: 'personnes' },
    },
  };
}

/** Liste des menus (page « Nos menus ») */
export function menuListJsonLd(menus: Menu[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: menus.map((menu, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/menus/${menu.slug}/`),
      name: menu.name,
    })),
  };
}

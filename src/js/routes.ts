// Titre, description et données structurées de chaque page, et fichier généré dans public/.
// Les composants des pages sont déclarés dans App.tsx ; ce fichier sert au pré-rendu, au sitemap
// et au navigateur (mise à jour du <head> après une navigation).

import { MENUS, getMenu } from '@/data/menus';
import { SITE } from '@/data/site';
import { breadcrumbJsonLd, businessJsonLd, menuJsonLd, menuListJsonLd, type PageMeta } from '@/modules/seo';
import { menuImageKey } from '@/modules/images';

export const HERO_SIZES = '(max-width: 860px) 100vw, 50vw';

const prices = MENUS.map((m) => m.pricePerPerson);

const STATIC_PAGES: PageMeta[] = [
  {
    path: '/',
    title: `${SITE.name} — Traiteur italien à Arles`,
    description: SITE.description,
    jsonLd: [businessJsonLd()],
    preloadImage: { key: 'table-italienne-spaghetti-palourdes', sizes: HERO_SIZES },
  },
  {
    path: '/menus/',
    title: `Nos menus traiteur : buffets, cocktails, réceptions — ${SITE.name}`,
    description: `${MENUS.length} menus traiteur à Arles, de ${Math.min(...prices)} à ${Math.max(...prices)} € par personne : cuisine italienne, terroir provençal, buffets, cocktails dînatoires, options végétariennes, vegan et sans gluten.`,
    jsonLd: [breadcrumbJsonLd([{ name: 'Nos menus', path: '/menus/' }]), menuListJsonLd(MENUS)],
  },
  {
    path: '/a-propos/',
    title: `À propos : Giovanni, de Bari à Arles — ${SITE.name}`,
    description: `L'histoire des Tables de Giovanni, traiteur italien à Arles depuis ${SITE.founded} : la cuisine de famille des Pouilles, des produits de Provence et une livraison sur ${SITE.zone}.`,
    jsonLd: [breadcrumbJsonLd([{ name: 'À propos', path: '/a-propos/' }])],
  },
  {
    path: '/contact/',
    title: `Contact et devis gratuit — ${SITE.name}, traiteur à Arles`,
    description: `Demandez un devis pour votre réception, mariage ou repas d'entreprise à ${SITE.zone}. Réponse sous 48 h. Tél. ${SITE.phone}.`,
    jsonLd: [breadcrumbJsonLd([{ name: 'Contact', path: '/contact/' }])],
  },
  {
    path: '/mentions-legales/',
    title: `Mentions légales — ${SITE.name}`,
    description: `Mentions légales du site ${SITE.domain} : éditeur, hébergement, crédits photos et propriété intellectuelle.`,
    jsonLd: [breadcrumbJsonLd([{ name: 'Mentions légales', path: '/mentions-legales/' }])],
  },
  {
    path: '/politique-confidentialite/',
    title: `Politique de confidentialité — ${SITE.name}`,
    description: `Comment ${SITE.name} utilise et protège les informations transmises par le formulaire de contact : données collectées, durée de conservation et vos droits (RGPD).`,
    jsonLd: [breadcrumbJsonLd([{ name: 'Politique de confidentialité', path: '/politique-confidentialite/' }])],
  },
];

export const NOT_FOUND_PAGE: PageMeta = {
  path: '/404.html',
  title: `Page introuvable — ${SITE.name}`,
  description: "Cette page n'existe pas ou a été déplacée.",
  noIndex: true,
};

/** Coupe un texte à la fin d'un mot, avant `max` caractères (Google affiche ~160 caractères) */
function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(' ', max - 1)).replace(/[\s,;:.]+$/, '')}…`;
}

function menuPage(slug: string): PageMeta | null {
  const menu = getMenu(slug);
  if (!menu) return null;
  const path = `/menus/${menu.slug}/`;
  return {
    path,
    title: `Menu ${menu.name} — ${SITE.name}, traiteur à Arles`,
    description: truncate(
      `${menu.tagline}. ${menu.pricePerPerson} € par personne, dès ${menu.minGuests} invités. ${menu.description}`,
      160,
    ),
    preloadImage: { key: menuImageKey(menu.slug), sizes: '100vw' },
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Nos menus', path: '/menus/' },
        { name: menu.name, path },
      ]),
      menuJsonLd(menu),
    ],
  };
}

/** « /menus » ou « /menus/index.html » → « /menus/ » */
export const normalizePath = (path: string) => {
  const clean = path.replace(/index\.html$/, '');
  return clean.endsWith('/') ? clean : `${clean}/`;
};

/** Métadonnées de la page à cette adresse (page 404 si elle n'existe pas) */
export function getPageMeta(pathname: string): PageMeta {
  const path = normalizePath(pathname);
  const slug = path.match(/^\/menus\/([^/]+)\/$/)?.[1];
  if (slug) return menuPage(slug) ?? NOT_FOUND_PAGE;
  return STATIC_PAGES.find((page) => page.path === path) ?? NOT_FOUND_PAGE;
}

/** Toutes les pages à pré-rendre : adresse, métadonnées et fichier écrit dans public/ */
export const PAGES = [...STATIC_PAGES, ...MENUS.map((menu) => menuPage(menu.slug)!)].map((meta) => ({
  meta,
  file: `${meta.path.slice(1)}index.html`,
}));

export const NOT_FOUND = { meta: NOT_FOUND_PAGE, file: '404.html' };

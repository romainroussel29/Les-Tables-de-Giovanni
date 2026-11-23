<p align="center">
  <img src="public/assets/icons/favicon.svg" alt="Logo Les Tables de Giovanni" width="88">
</p>

<h1 align="center">Les Tables de Giovanni</h1>

<p align="center">
  Site vitrine d'un traiteur italien à Arles<br>
  <a href="https://les-tables-de-giovanni.fr">les-tables-de-giovanni.fr</a> · 06.14.67.05.64
</p>

<p align="center">
  React 19 · TypeScript · Vite · Sass · pré-rendu statique
</p>

---

## Sommaire

- [Présentation](#présentation)
- [Fonctionnalités](#fonctionnalités)
- [Démarrage](#démarrage)
- [Commandes](#commandes)
- [Structure](#structure)
- [Modifier le contenu](#modifier-le-contenu)
- [Mise en ligne](#mise-en-ligne)
- [Référencement](#référencement)
- [Charte graphique](#charte-graphique)
- [État du projet](#état-du-projet)

## Présentation

**Les Tables de Giovanni** propose une cuisine de famille italienne et des produits de Provence pour les réceptions, mariages, repas d'entreprise et événements privés, à Arles, en Camargue et dans les Alpilles.

Le site est écrit en React et TypeScript, puis **pré-rendu à la compilation** : chaque page devient un fichier HTML complet, lisible par Google avant même le JavaScript. Le résultat est un site entièrement statique, hébergeable n'importe où : **seul le dossier `public/` est mis en ligne**.

## Fonctionnalités

- **Accueil** : présentation de la maison, galerie des menus, déroulé d'une commande, avis clients
- **Nos menus** : 10 menus, recherche plein texte (plats, ingrédients), filtres par type, régime et nombre d'invités, tri par prix
- **Fiche menu** : carte complète, allergènes, estimation du prix selon le nombre d'invités, suggestions
- **À propos** : histoire, engagements, zone de livraison
- **Contact et devis** : formulaire validé, pré-rempli depuis une fiche menu
- **Mentions légales**, **politique de confidentialité** et page **404**
- Responsive, navigation au clavier, animations désactivées si le visiteur préfère les réduire

## Démarrage

Prérequis : [Node.js](https://nodejs.org/) 22 ou plus récent.

```bash
git clone https://github.com/romainroussel29/Les-Tables-de-Giovanni.git
cd Les-Tables-de-Giovanni
npm install
npm run dev
```

Le site s'ouvre sur http://localhost:5173 et se recharge à chaque modification.

## Commandes

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Vérifie le TypeScript, compile et pré-rend toutes les pages dans `public/` |
| `npm run preview` | Sert `public/` tel qu'il sera en ligne (http://localhost:4173) |
| `npm run typecheck` | Vérification TypeScript seule |
| `npm run images` | Optimise les photos de `src/img-originales/` et régénère les favicons |
| `npm run format` | Met en forme le code avec Prettier |

## Structure

```
.
├── public/                    Site final : seul dossier mis en ligne
│   ├── index.html             Pages générées par npm run build,
│   ├── menus/                 une par adresse (/menus/, /menus/<menu>/…)
│   ├── a-propos/
│   ├── contact/
│   ├── mentions-legales/
│   ├── politique-confidentialite/
│   ├── 404.html
│   ├── assets/
│   │   ├── css/               style.min.css (généré)
│   │   ├── js/                main.min.js (généré)
│   │   ├── img/               photos WebP en trois largeurs
│   │   ├── fonts/             polices WOFF2 auto-hébergées
│   │   └── icons/             icônes SVG et icônes du manifeste
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── site.webmanifest
│   ├── robots.txt
│   ├── sitemap.xml            (généré)
│   └── .htaccess              HTTPS, redirections, cache, sécurité
│
├── src/                       Sources, non mises en ligne
│   ├── scss/
│   │   ├── base/              polices, variables, reset, typographie, animations
│   │   ├── layout/            en-tête, pied de page, grille
│   │   ├── components/        boutons, formulaires, cartes, icônes
│   │   ├── pages/             styles propres à chaque page
│   │   └── main.scss
│   ├── js/                    application React (TypeScript)
│   │   ├── components/        Header, Footer, MenuCard, Picture…
│   │   ├── pages/             une page par fichier
│   │   ├── data/              menus, avis, coordonnées, inventaire des photos
│   │   ├── modules/           SEO, images, formatage, animations
│   │   ├── types/
│   │   ├── App.tsx            routes
│   │   ├── routes.ts          titres, descriptions et données structurées
│   │   ├── main.tsx           point d'entrée du navigateur
│   │   └── entry-server.tsx   point d'entrée du pré-rendu
│   └── img-originales/        photos avant compression
│
├── scripts/
│   ├── prerender.mjs          écrit les pages HTML et le sitemap
│   └── images.mjs             convertit les photos en WebP
├── package.json
├── tsconfig.json
└── vite.config.ts
```

> Les fichiers HTML, `style.min.css`, `main.min.js` et `sitemap.xml` de `public/` sont **générés** : ils sont écrasés à chaque `npm run build`. On modifie les sources dans `src/`.

## Modifier le contenu

| Pour changer… | Fichier |
|---|---|
| Téléphone, adresse, e-mail, horaires | [`src/js/data/site.ts`](src/js/data/site.ts) |
| Menus (prix, plats, allergènes) et avis | [`src/js/data/menus.ts`](src/js/data/menus.ts) |
| Titre et description Google d'une page | [`src/js/routes.ts`](src/js/routes.ts) |
| Texte d'une page | [`src/js/pages/`](src/js/pages/) |
| Couleurs, polices, espacements | [`src/scss/base/_variables.scss`](src/scss/base/_variables.scss) |

Lancer ensuite `npm run build`.

**Ajouter un menu**

1. Ajouter son entrée dans `src/js/data/menus.ts` ; son `slug` donne l'adresse `/menus/<slug>/`.
2. Déposer sa photo dans `src/img-originales/menu-<slug>.jpg`, puis lancer `npm run images`.
3. Lancer `npm run build` : sa page, la liste des menus, la galerie de l'accueil et le sitemap sont mis à jour.

Pour retirer un menu, supprimer aussi son dossier `public/menus/<slug>/`.

**Ajouter une photo** : la nommer de façon descriptive en minuscules et tirets (`gardianne-taureau-camargue.jpg`), la déposer dans `src/img-originales/` et lancer `npm run images`.

## Mise en ligne

Le site est hébergé sur un **hébergement web OVH** (domaine et e-mails également chez OVH).

**Publier une mise à jour**

1. `npm run build`
2. Se connecter en FTP (FileZilla, port 21, ou SFTP port 22) avec les identifiants de l'espace client OVH : *Web Cloud › Hébergements › FTP-SSH*.
3. Envoyer **tout le contenu** de `public/` dans le dossier `www/` de l'hébergement, en écrasant les fichiers existants. Penser au fichier caché `.htaccess` (FileZilla : *Serveur › Forcer l'affichage des fichiers cachés*).

Le `.htaccess` impose une adresse unique (HTTPS, sans `www`), redirige les anciennes adresses en 301, active la compression et le cache, ajoute les en-têtes de sécurité et sert la page `404.html`.

**Configuration initiale** (une seule fois, dans l'espace client OVH)

1. *Hébergements › Multisite* : rattacher `les-tables-de-giovanni.fr` et `www.les-tables-de-giovanni.fr`, dossier racine `www`.
2. *Hébergements › Informations générales* : activer le certificat SSL gratuit (Let's Encrypt).
3. *Noms de domaine › Serveurs DNS* : utiliser les serveurs DNS d'OVH, puis vérifier dans *Zone DNS* que les enregistrements A/AAAA pointent vers l'hébergement et que les enregistrements MX et SPF du courrier OVH sont présents.

## Référencement

- **Contenu complet dans le HTML** grâce au pré-rendu
- **Une adresse propre par page** (`/menus/jardin-vegetal/`) avec `<title>`, description et URL canonique uniques
- **Données structurées schema.org** : entreprise locale (adresse, horaires, zone desservie), fil d'Ariane, liste des menus, offre avec prix pour chaque menu
- **Partage** : balises Open Graph et Twitter, image dédiée 1200 × 630
- **Indexation** : `sitemap.xml`, `robots.txt`, page 404 en `noindex`
- **Performance** : images WebP responsives avec dimensions déclarées, image principale et polices préchargées, CSS et JS minifiés et mis en cache un an (versionnés par empreinte)
- **Confidentialité** : aucun cookie, aucun service tiers, polices hébergées sur le site

## Charte graphique

Beige sable, vert cyprès et filets de laiton. Titres en **Bodoni Moda**, texte en **Instrument Sans**.

| Rôle | Couleur |
|---|---|
| Sable (fond) | `#EFE7DA` |
| Lin (sections secondaires) | `#E5DBCB` |
| Carte (encadrés, champs) | `#F8F3EA` |
| Cyprès (boutons, bandeaux) | `#1F3A2E` |
| Cyprès profond (pied de page) | `#172C23` |
| Encre (texte) | `#1B1F1C` |
| Laiton (filets, ornements) | `#A88645` |

Photos : [Unsplash](https://unsplash.com), licence Unsplash.

## État du projet

Le formulaire de contact valide les champs et affiche une confirmation, mais **n'envoie pas encore de message** : le site est statique, sans serveur. Prochaine étape envisagée : un script PHP d'envoi d'e-mail chez l'hébergeur, ou un service de formulaires.

---

<sub>Projet indépendant, inspiré de mon projet d'ECF <a href="https://github.com/romainroussel29/ECF-Vite-et-gourmands">Vite & Gourmands</a>.</sub>

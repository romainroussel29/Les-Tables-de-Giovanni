<p align="center">
  <img src="public/favicon.svg" alt="Logo Les Tables de Giovanni" width="96">
</p>

# 🍝 Les Tables de Giovanni

Site vitrine de **Les Tables de Giovanni**, traiteur à **Arles** : cuisine de famille italienne et produits de Provence pour les réceptions, mariages, repas d'entreprise et événements privés.

📞 **06.14.67.05.64** · 🌐 [les-tables-de-giovanni.fr](https://les-tables-de-giovanni.fr)

## 🔗 Liens utiles

| Ressource | Lien |
|---|---|
| Dépôt GitHub | [Les-Tables-de-Giovanni](https://github.com/romainroussel29/Les-Tables-de-Giovanni) |
| Site en ligne | [les-tables-de-giovanni.fr](https://les-tables-de-giovanni.fr) |

> Ce projet est indépendant. Il reprend l'idée de départ de mon projet d'ECF [Vite & Gourmands](https://github.com/romainroussel29/ECF-Vite-et-gourmands) (site d'un traiteur), mais tout le code a été réécrit en React, Vite et TypeScript, avec une nouvelle identité, de nouveaux menus et de nouvelles photos.

## ✨ Fonctionnalités

- **Accueil** : présentation de la maison, engagements, menus coups de cœur, déroulé d'une commande, avis clients et appel à l'action
- **Nos menus** : 10 menus avec recherche plein texte (plats, ingrédients), filtres par type de menu, régime et nombre d'invités, tri par prix
- **Détail d'un menu** : carte complète (entrées, plats, desserts), allergènes, conditions, estimation du prix selon le nombre d'invités et suggestions de menus proches
- **Contact & devis** : formulaire validé côté client, pré-rempli depuis la page d'un menu, coordonnées et horaires
- **Mentions légales** et page **404**
- Design responsive (mobile, tablette, ordinateur), navigation au clavier et respect de `prefers-reduced-motion`

## 🍽️ Les menus

| Menu | Type | Régime | Prix / pers. | Minimum |
|---|---|---|---|---|
| Trattoria della Nonna | Italien | Classique | 38 € | 10 pers. |
| Table provençale | Terroir | Classique | 42 € | 10 pers. |
| Jardin végétal | Buffet | Vegan | 31 € | 8 pers. |
| Buffet Riviera | Buffet | Végétarien | 34 € | 15 pers. |
| Cocktail dînatoire | Cocktail | Classique | 29 € | 20 pers. |
| Escale méditerranéenne | Réception | Sans gluten | 48 € | 10 pers. |
| Déjeuner d'affaires | Entreprise | Classique | 24 € | 6 pers. |
| Brunch de Giovanni | Brunch | Végétarien | 27 € | 8 pers. |
| Grande réception | Réception | Classique | 62 € | 30 pers. |
| Pique-nique chic | Terroir | Classique | 22 € | 4 pers. |

Les menus se modifient dans [src/data/menus.ts](src/data/menus.ts), les coordonnées et horaires dans [src/data/site.ts](src/data/site.ts).

## 🎨 Charte graphique « Nuit »

L'assiette comme une pièce de musée : fond brun presque noir, texte crème en capitales, beaucoup d'espace vide, filets en pointillés et aucune ombre.

| Rôle | Couleur |
|---|---|
| Ombre de noyer (fond) | `#100904` |
| Crème chaude (texte, contours) | `#FFEDD7` |
| Brun écorce (seul bouton plein, fiche de réservation) | `#382416` |
| Liège (filets en pointillés) | `#40372E` |
| Bois flotté (séparations secondaires) | `#6C5F51` |
| Braise (crédits et signatures uniquement) | `#DC5000` |

Typographie : **Inter** seule, en capitales graisse 500 pour les titres, le menu, les libellés et les boutons. Le texte descriptif est la seule voix en minuscules (graisse 400, jusqu'à 29 px).

Effets : grand nom qui monte ligne par ligne, assiettes qui flottent dans le noir et tournent au défilement, photo qui suit le curseur sur la carte, révélations au défilement. Tout est coupé si l'utilisateur demande moins d'animations.

Toutes les couleurs sont des variables CSS en tête de [src/styles/global.css](src/styles/global.css).

## 📷 Photos

Les photos viennent d'[Unsplash](https://unsplash.com) (licence Unsplash : usage commercial gratuit, sans attribution obligatoire). Chaque menu a sa photo dans [public/images/menus/](public/images/menus/), nommée d'après son identifiant (ex. `table-provencale.jpg`). Pour en changer, il suffit de remplacer le fichier en gardant le même nom.

## 🛠️ Technologies

- **React 18** + **TypeScript** (mode strict)
- **Vite 5** pour le serveur de développement et le build
- **React Router 6** pour la navigation
- **CSS** natif (variables, Grid, Flexbox), sans framework
- Hébergement **Cloudflare Workers** (fichiers statiques), nom de domaine **les-tables-de-giovanni.fr** (acheté chez OVH, DNS gérés par Cloudflare)

## 🌐 Mise en ligne (Cloudflare Workers)

Le site est relié au dépôt GitHub : **chaque `git push` sur `main` met le site à jour automatiquement**.

Réglages dans Cloudflare : commande de build `npm run build`, commande de déploiement `npx wrangler deploy`.

La configuration est dans [wrangler.jsonc](wrangler.jsonc) :
- `assets.directory` : le dossier `dist/` produit par le build est publié tel quel
- `not_found_handling: "single-page-application"` : les adresses comme `/menus` ou `/contact` renvoient `index.html`, et React Router affiche la bonne page
- `name` doit rester identique au nom du Worker dans le tableau de bord Cloudflare

## 📁 Structure

```
├── public/
│   ├── favicon.svg
│   └── images/            # photo d'accueil, cuisine et menus/ (une photo par menu)
├── src/
│   ├── components/        # Header, Footer, MenuCard, Logo, icônes…
│   ├── data/              # menus, avis, coordonnées
│   ├── pages/             # Accueil, Menus, Détail, Contact, Mentions, 404
│   ├── styles/global.css  # thème et styles
│   ├── types.ts
│   ├── utils.ts
│   ├── App.tsx            # routes
│   └── main.tsx
├── index.html
├── vite.config.ts
└── tsconfig.json
```

## 🚀 Lancer le projet

**Prérequis** : [Node.js](https://nodejs.org/) 18 ou plus récent.

```bash
git clone https://github.com/romainroussel29/Les-Tables-de-Giovanni.git
cd Les-Tables-de-Giovanni
npm install
npm run dev       # http://localhost:5173
```

Autres commandes :

```bash
npm run build      # vérification TypeScript + build de production dans dist/
npm run preview    # prévisualiser le build
npm run typecheck  # vérification TypeScript seule
```

> **Note Windows** : `package.json` force la version WebAssembly de Rollup (`overrides`), car le Contrôle intelligent des applications de Windows bloque le binaire natif. Cela ne change rien au résultat du build.

## 📌 État du projet

Le site est **100 % front-end** : il n'y a pas encore de back-end. Le formulaire de contact valide les champs et affiche une confirmation, mais n'envoie pas encore de message. Prochaines étapes possibles : envoi des demandes par e-mail, commande en ligne et espace client.

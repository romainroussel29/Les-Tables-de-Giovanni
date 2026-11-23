// Pré-rendu : après la compilation, écrit le HTML complet de chaque page dans public/
// (public/index.html, public/menus/index.html, public/menus/<menu>/index.html, public/404.html…)
// ainsi que public/sitemap.xml. Google et les visiteurs reçoivent le contenu avant même
// que le JavaScript soit chargé ; React ne fait ensuite que « l'hydrater ».

import { createHash } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');
const SSR = join(ROOT, '.prerender');
const SITE_URL = 'https://les-tables-de-giovanni.fr';

const { render, PAGES, NOT_FOUND } = await import(pathToFileURL(join(SSR, 'entry-server.js')).href);

// « ?v=empreinte » : le CSS et le JS sont gardés en cache un an et rechargés dès qu'ils changent
const version = async (file) =>
  createHash('sha256')
    .update(await readFile(join(PUBLIC, file)))
    .digest('hex')
    .slice(0, 10);
const css = `/assets/css/style.min.css?v=${await version('assets/css/style.min.css')}`;
const js = `/assets/js/main.min.js?v=${await version('assets/js/main.min.js')}`;

const document = (head, html) => `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    ${head}

    <!-- Animations : activées avant l'affichage, sauf si le visiteur préfère les réduire -->
    <script>if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) document.documentElement.classList.add('motion');</script>

    <link rel="preload" href="/assets/fonts/bodoni-moda-latin.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/assets/fonts/instrument-sans-latin.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="stylesheet" href="${css}" />
    <script type="module" src="${js}"></script>

    <link rel="icon" href="/favicon.ico" sizes="32x32" />
    <link rel="icon" href="/assets/icons/favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="theme-color" content="#1f3a2e" />

    <meta property="og:type" content="website" />
    <meta property="og:locale" content="fr_FR" />
    <meta property="og:site_name" content="Les Tables de Giovanni" />
    <meta property="og:image" content="${SITE_URL}/assets/img/partage-les-tables-de-giovanni.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Les Tables de Giovanni, traiteur italien à Arles" />
    <meta name="twitter:card" content="summary_large_image" />
  </head>
  <body>
    <div id="root">${html}</div>
  </body>
</html>
`;

for (const { meta, file } of [...PAGES, NOT_FOUND]) {
  // La page 404 est rendue à une adresse inexistante, comme lorsqu'un visiteur s'y perd
  const path = file === NOT_FOUND.file ? '/page-introuvable/' : meta.path;
  const { html, head } = render(path, meta);
  const target = join(PUBLIC, file);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, document(head, html));
  console.log(`✓ ${meta.path.padEnd(38)} → public/${file}`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(({ meta }) => `  <url>\n    <loc>${SITE_URL}${meta.path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join('\n')}
</urlset>
`;
await writeFile(join(PUBLIC, 'sitemap.xml'), sitemap);
console.log(`✓ public/sitemap.xml (${PAGES.length} pages)`);

await rm(SSR, { recursive: true, force: true });

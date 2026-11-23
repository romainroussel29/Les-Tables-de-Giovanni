// Vite compile src/ directement dans public/, avec des noms de fichiers fixes :
//   src/js/main.tsx      →  public/assets/js/main.min.js
//   src/scss/main.scss   →  public/assets/css/style.min.css
// Les pages HTML sont ensuite écrites par scripts/prerender.mjs (voir package.json).
// Le reste de public/ (images, polices, icônes, .htaccess…) n'est jamais touché par la compilation.

import { fileURLToPath, URL } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const SRC = fileURLToPath(new URL('./src/js', import.meta.url));

/** En développement : chaque adresse (/, /menus/…) reçoit une page vide que React remplit. */
function devPages(): Plugin {
  const shell = `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Les Tables de Giovanni</title>
    <meta name="description" content="" />
    <link rel="canonical" href="" />
    <link rel="icon" href="/assets/icons/favicon.svg" type="image/svg+xml" />
    <script>if (!matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.classList.add('motion');</script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/js/main.tsx"></script>
  </body>
</html>`;

  return {
    name: 'dev-pages',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = (req.url ?? '/').split('?')[0];
        const isPage = req.method === 'GET' && req.headers.accept?.includes('text/html') && !/\.\w+$/.test(path);
        if (!isPage) return next();
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(await server.transformIndexHtml(req.url ?? '/', shell));
      });
    },
  };
}

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), devPages()],
  resolve: {
    // Imports absolus depuis src/js : « @/components/Header »
    alias: { '@': SRC },
  },
  // public/ contient les images, polices et icônes : servi tel quel en développement,
  // et utilisé à la compilation pour vérifier les adresses « /assets/… » du SCSS (sans rien recopier).
  publicDir: 'public',
  // Site multipage, comme chez l'hébergeur : une adresse inconnue n'est pas redirigée vers l'accueil
  appType: 'mpa',
  server: { port: 5173, open: true },
  preview: { port: 4173 },
  build: isSsrBuild
    ? {
        // Rendu serveur temporaire, utilisé puis supprimé par scripts/prerender.mjs
        outDir: '.prerender',
        emptyOutDir: true,
        rolldownOptions: { input: 'src/js/entry-server.tsx' },
      }
    : {
        outDir: 'public',
        // Surtout pas : public/ contient aussi les images, les polices et le .htaccess
        emptyOutDir: false,
        copyPublicDir: false,
        cssCodeSplit: false,
        modulePreload: false,
        rolldownOptions: {
          input: 'src/js/main.tsx',
          output: {
            entryFileNames: 'assets/js/main.min.js',
            assetFileNames: (asset) =>
              (asset.names?.[0] ?? '').endsWith('.css') ? 'assets/css/style.min.css' : 'assets/[name][extname]',
          },
        },
      },
}));

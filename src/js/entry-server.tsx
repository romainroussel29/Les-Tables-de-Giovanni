// Point d'entrée du pré-rendu (scripts/prerender.mjs) : transforme chaque page en HTML
// à la compilation, pour que Google et les visiteurs reçoivent le contenu complet avant le JavaScript.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App';
import { NOT_FOUND, PAGES } from './routes';
import { renderHead } from './modules/seo';

export { NOT_FOUND, PAGES };

/** HTML d'une page (contenu de <div id="root">) et ses balises <head> */
export function render(path: string, meta: (typeof PAGES)[number]['meta']) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={path}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
  return { html, head: renderHead(meta) };
}

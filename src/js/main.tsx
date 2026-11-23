// Point d'entrée du navigateur.
// Compilé par `npm run build` vers public/assets/js/main.min.js (et le SCSS vers public/assets/css/style.min.css).
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
import '../scss/main.scss';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

if (container.firstElementChild) {
  // Page pré-rendue : React « hydrate » le HTML existant, sans le redessiner
  hydrateRoot(container, app);
} else {
  // En développement (npm run dev), la page est vide : rendu classique
  createRoot(container).render(app);
}

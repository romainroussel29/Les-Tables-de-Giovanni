import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import Footer from './Footer';
import Header from './Header';
import { getPageMeta } from '@/routes';
import { applyHead } from '@/modules/seo';
import { useMotion } from '@/modules/useMotion';

export default function Layout() {
  const { pathname, hash } = useLocation();

  // Ancre (ex. /#avis) : défile jusqu'à la section ; sinon, haut de page
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  useMotion(pathname);

  // Titre, description et URL canonique de la nouvelle page (le pré-rendu les écrit pour la première)
  useEffect(() => {
    applyHead(getPageMeta(pathname));
  }, [pathname]);

  return (
    <>
      <a href="#contenu" className="skip-link">
        Aller au contenu
      </a>
      <Header />
      {/* La clé relance le fondu d'entrée à chaque page */}
      <main id="contenu" key={pathname} className="page">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

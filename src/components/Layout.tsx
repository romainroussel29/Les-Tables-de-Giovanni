import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useMotion } from "../hooks/useMotion";

export default function Layout() {
  const { pathname, hash } = useLocation();

  // Ancre (ex. /#avis) : défile jusqu'à la section ; sinon, haut de page
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  useMotion(pathname);

  return (
    <>
      <a href="#contenu" className="skip-link">Aller au contenu</a>
      <Header />
      {/* La clé relance le fondu d'entrée à chaque page */}
      <main id="contenu" key={pathname} className="page">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

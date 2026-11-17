import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  const { pathname } = useLocation();

  // Remonte en haut de page à chaque changement de route
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a href="#contenu" className="skip-link">Aller au contenu</a>
      <Header />
      <main id="contenu">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

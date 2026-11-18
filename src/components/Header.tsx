import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { SITE } from "../data/site";
import Logo from "./Logo";

const LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/menus", label: "Menus" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  // Transparent sur la photo, voile sombre dès qu'on défile
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${scrolled || open ? " header--solid" : ""}`}>
      <Link to="/" className="header__brand" aria-label={`${SITE.name}, accueil`}>
        <Logo />
      </Link>

      <nav className={`nav${open ? " nav--open" : ""}`} aria-label="Navigation principale">
        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === "/"}
            className={({ isActive }) => `nav__link${isActive && !hash ? " active" : ""}`}
          >
            {l.label}
          </NavLink>
        ))}
        {/* Raccourci vers la section des avis de l'accueil */}
        <Link to="/#avis" className={`nav__link${hash === "#avis" ? " active" : ""}`}>
          Avis
        </Link>
        <a href={SITE.phoneHref} className="btn btn--ghost nav__phone">
          {SITE.phone}
        </a>
      </nav>

      <button
        className="header__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
      >
        {open ? "Fermer" : "Menu"}
      </button>
    </header>
  );
}

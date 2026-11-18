import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { SITE } from "../data/site";
import Logo from "./Logo";
import { CloseIcon, MenuBurgerIcon, PhoneIcon } from "./Icons";

const LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/menus", label: "Nos menus" },
  { to: "/contact", label: "Contact et devis" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  return (
    <header className="header">
      <div className="header__inner">
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
          <a href={SITE.phoneHref} className="pill">
            <PhoneIcon size={15} /> {SITE.phone}
          </a>
        </nav>

        <button
          className="header__toggle pill"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <CloseIcon size={20} /> : <MenuBurgerIcon size={20} />}
        </button>
      </div>
    </header>
  );
}

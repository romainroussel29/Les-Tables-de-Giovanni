import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { SITE } from "../data/site";
import Logo from "./Logo";
import { CloseIcon, MenuBurgerIcon, PhoneIcon } from "./Icons";

const LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/menus", label: "Nos menus" },
  { to: "/contact", label: "Contact & devis" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const overHero = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${overHero ? " header--transparent" : ""}`}>
      <div className="container header__inner">
        <Link to="/" className="header__brand" aria-label={`${SITE.name}, accueil`}>
          <Logo light={overHero} />
        </Link>

        <nav className={`nav${open ? " nav--open" : ""}`} aria-label="Navigation principale">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className="nav__link">
              {l.label}
            </NavLink>
          ))}
          <a href={SITE.phoneHref} className="btn btn--primary nav__cta">
            <PhoneIcon size={16} /> {SITE.phone}
          </a>
        </nav>

        <button
          className="header__toggle"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <CloseIcon /> : <MenuBurgerIcon />}
        </button>
      </div>
    </header>
  );
}

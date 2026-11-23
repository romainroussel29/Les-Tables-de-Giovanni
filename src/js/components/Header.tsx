import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { SITE } from '@/data/site';

const LINKS = [
  { to: '/', label: 'Accueil' },
  { to: '/menus/', label: 'Menus' },
  { to: '/a-propos/', label: 'À propos' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { pathname, hash } = useLocation();

  // Menu mobile refermé à chaque changement de page (ajusté pendant le rendu, sans effet)
  const location = `${pathname}${hash}`;
  const [shownLocation, setShownLocation] = useState(location);
  if (shownLocation !== location) {
    setShownLocation(location);
    setOpen(false);
  }

  // Ombre légère dès qu'on défile ; la barre s'efface en descendant et revient en remontant
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 400);
        last = y;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Échap referme le menu mobile
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`header${scrolled || open ? ' header--solid' : ''}${hidden && !open ? ' header--hidden' : ''}`}>
      <Link to="/" className="header__brand" aria-label={`${SITE.name}, accueil`}>
        <span className="logo">{SITE.name}</span>
      </Link>

      <nav className={`nav${open ? ' nav--open' : ''}`} id="navigation" aria-label="Navigation principale">
        {LINKS.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.to === '/'} className="nav__link">
            {link.label}
          </NavLink>
        ))}
        {/* Raccourci vers la section des avis de l'accueil */}
        <Link to="/#avis" className="nav__link">
          Avis
        </Link>
        <NavLink to="/contact/" className="nav__link">
          Contact
        </NavLink>
        <a href={SITE.phoneHref} className="btn btn--primary nav__phone">
          {SITE.phone}
        </a>
      </nav>

      <button
        type="button"
        className="header__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-controls="navigation"
        aria-expanded={open}
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
      >
        {open ? 'Fermer' : 'Menu'}
      </button>
    </header>
  );
}

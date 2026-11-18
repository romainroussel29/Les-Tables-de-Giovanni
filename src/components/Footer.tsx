import { Link } from "react-router-dom";
import { HOURS, SITE } from "../data/site";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Photo d'olivier pleine largeur : une respiration avant le pied de page */}
      <img className="footer__photo" src="/images/branches-olivier.jpg" alt="" loading="lazy" />

      <div className="footer__grid">
        <div className="footer__brand">
          <Logo />
          <p>
            Traiteur italien à Arles depuis {SITE.founded}. La cuisine de famille des Pouilles, livrée et servie chez
            vous.
          </p>
        </div>

        <div>
          <h2 className="footer__title">Nous joindre</h2>
          <ul className="footer__list">
            <li><a href={SITE.phoneHref}>{SITE.phone}</a></li>
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li>{SITE.address}</li>
          </ul>
        </div>

        <div>
          <h2 className="footer__title">L'atelier</h2>
          <ul className="footer__list footer__hours">
            {HOURS.map((h) => (
              <li key={h.day}>
                <span>{h.day}</span>
                <span>{h.hours}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="footer__title">Le site</h2>
          <ul className="footer__list">
            <li><Link to="/menus">Nos menus</Link></li>
            <li><Link to="/contact">Contact et devis</Link></li>
            <li><Link to="/#avis">Avis</Link></li>
            <li><Link to="/mentions-legales">Mentions légales</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} {SITE.name}, {SITE.city}</span>
        <span>Fait avec amore à Arles</span>
      </div>
    </footer>
  );
}

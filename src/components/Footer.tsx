import { Link } from "react-router-dom";
import { HOURS, SITE } from "../data/site";
import Logo from "./Logo";
import { MailIcon, PhoneIcon, PinIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Logo light />
          <p className="footer__about">
            Traiteur italien et bordelais depuis {SITE.founded}. Cuisine maison, produits locaux et service sur mesure
            pour toutes vos tablées.
          </p>
        </div>

        <div>
          <h3 className="footer__title">Nous joindre</h3>
          <ul className="footer__list">
            <li>
              <PhoneIcon size={16} /> <a href={SITE.phoneHref}>{SITE.phone}</a>
            </li>
            <li>
              <MailIcon size={16} /> <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <PinIcon size={16} /> {SITE.address}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="footer__title">Horaires</h3>
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
          <h3 className="footer__title">Plan du site</h3>
          <ul className="footer__list">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/menus">Nos menus</Link></li>
            <li><Link to="/contact">Contact & devis</Link></li>
            <li><Link to="/mentions-legales">Mentions légales</Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} {SITE.name} · {SITE.city}</span>
        <span>Fait avec amore à Bordeaux</span>
      </div>
    </footer>
  );
}

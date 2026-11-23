import { Link } from 'react-router';
import { HOURS, SITE } from '@/data/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <p className="footer__name">{SITE.name}</p>
            <p>Traiteur italien à Arles depuis {SITE.founded}.</p>
          </div>

          <div>
            <h2 className="footer__title">Nous joindre</h2>
            <address className="footer__address">
              <ul className="footer__list">
                <li>
                  <a href={SITE.phoneHref}>{SITE.phone}</a>
                </li>
                <li>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </li>
                <li>{SITE.address}</li>
              </ul>
            </address>
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
              <li>
                <Link to="/menus/">Nos menus</Link>
              </li>
              <li>
                <Link to="/a-propos/">À propos</Link>
              </li>
              <li>
                <Link to="/contact/">Contact et devis</Link>
              </li>
              <li>
                <Link to="/mentions-legales/">Mentions légales</Link>
              </li>
              <li>
                <Link to="/politique-confidentialite/">Confidentialité</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          {/* L'année est écrite au pré-rendu, puis vérifiée par le navigateur */}
          <span suppressHydrationWarning>
            © {new Date().getFullYear()} {SITE.name}, {SITE.city}
          </span>
          <span>Fait avec amore à Arles. Photographies Unsplash.</span>
        </div>
      </div>
    </footer>
  );
}

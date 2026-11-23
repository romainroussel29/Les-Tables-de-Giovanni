import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <section className="section not-found">
      <div className="container">
        <p className="not-found__code" aria-hidden="true">
          404
        </p>
        <h1 className="section__title">Mamma mia, cette page n'existe pas.</h1>
        <p>La page que vous cherchez a peut-être été déplacée, ou elle n'a jamais été au menu.</p>
        <div className="not-found__actions">
          <Link to="/" className="btn btn--primary">
            Retour à l'accueil
          </Link>
          <Link to="/menus/" className="btn btn--outline">
            Voir les menus
          </Link>
        </div>
      </div>
    </section>
  );
}

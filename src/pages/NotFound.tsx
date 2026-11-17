import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section not-found">
      <div className="container">
        <p className="not-found__code">404</p>
        <h1 className="section__title">Mamma mia, cette page n'existe pas.</h1>
        <p>La page que vous cherchez a peut-être été déplacée, ou elle n'a jamais été au menu.</p>
        <div className="not-found__actions">
          <Link to="/" className="btn btn--primary">Retour à l'accueil</Link>
          <Link to="/menus" className="btn btn--outline">Voir les menus</Link>
        </div>
      </div>
    </section>
  );
}

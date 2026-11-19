import { useState } from "react";
import { Link } from "react-router-dom";
import { MENUS, TESTIMONIALS } from "../data/menus";
import { SITE } from "../data/site";
import { euro } from "../utils";

const STEPS = [
  {
    numeral: "I",
    title: "Vous nous appelez",
    text: "On parle de la date, du lieu, du nombre d'invités et de vos envies.",
  },
  {
    numeral: "II",
    title: "Nous composons",
    text: "Sous 48 h, un devis ajusté à votre budget, aux allergies et aux régimes de chacun.",
  },
  {
    numeral: "III",
    title: "Nous servons",
    text: "Le jour venu, nous livrons, dressons la table et, selon la formule, assurons le service.",
  },
];

export default function Home() {
  // Menu dont la photo est affichée à côté de la carte (survol ou focus clavier)
  const [active, setActive] = useState(0);

  return (
    <>
      {/* ---------- Ouverture ---------- */}
      <section className="hero">
        <div className="hero__panel">
          <h1 className="hero__title">
            Les Tables
            <br />
            de Giovanni
          </h1>
          <span className="hero__rule" aria-hidden="true" />
          <p className="hero__lead">
            Traiteur italien à Arles depuis {SITE.founded}. La cuisine de famille des Pouilles pour vos mariages,
            réceptions et repas d'entreprise, de 4 à 200 invités.
          </p>
          <div className="actions">
            <Link to="/contact" className="btn btn--light">
              Demander un devis
            </Link>
            <Link to="/menus" className="btn btn--outline-light">
              Découvrir les menus
            </Link>
          </div>
        </div>
        <figure className="hero__media">
          <img src="/images/hero-fond.jpg" alt="Table italienne vue du dessus : spaghetti aux palourdes, spritz et vin blanc" />
        </figure>
      </section>

      {/* ---------- Giovanni ---------- */}
      <section className="section" id="histoire">
        <div className="container recit">
          <figure className="recit__media">
            <img src="/images/cuisine-giovanni.jpg" alt="Giovanni présente un risotto aux crevettes" loading="lazy" />
          </figure>
          <div className="recit__body">
            <h2 className="h2">Une cuisine de famille, servie avec soin.</h2>
            <p className="lead">
              Giovanni a grandi à Bari, dans une famille où l'on cuisinait pour vingt. Arrivé à Arles en {SITE.founded}{" "}
              avec les carnets de sa grand-mère, il cuisine pour vos tables comme pour la sienne.
            </p>
            <p>
              Les pâtes sont roulées le matin même, la focaccia sort du four avant le départ, les sauces mijotent depuis
              l'aube. Les légumes viennent du marché d'Arles, l'huile d'olive des Alpilles.
            </p>
            <dl className="facts">
              <div>
                <dt>Invités</dt>
                <dd>de 4 à 200</dd>
              </div>
              <div>
                <dt>Livraison</dt>
                <dd>{SITE.zone}</dd>
              </div>
              <div>
                <dt>Devis</dt>
                <dd>gratuit, sous 48 h</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ---------- La carte, présentée comme un menu imprimé ---------- */}
      <section className="section section--alt" id="carte" aria-labelledby="carte-title">
        <div className="container">
          <header className="section__head section__head--center">
            <h2 id="carte-title" className="h2">
              La carte
            </h2>
            <p className="lead">{MENUS.length} menus, du plateau-repas au dîner de gala. Tous s'adaptent à vos invités.</p>
          </header>

          <div className="selection">
            <figure className="selection__preview" aria-hidden="true">
              {MENUS.map((m, i) => (
                <img
                  key={m.slug}
                  src={m.image}
                  alt=""
                  loading="lazy"
                  className={i === active ? "is-active" : undefined}
                />
              ))}
              <figcaption>{MENUS[active].tagline}</figcaption>
            </figure>

            <ul className="selection__list">
              {MENUS.map((m, i) => (
                <li key={m.slug}>
                  <Link
                    to={`/menus/${m.slug}`}
                    className={`dish${i === active ? " is-active" : ""}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                  >
                    <img className="dish__thumb" src={m.image} alt="" loading="lazy" />
                    <span className="dish__line">
                      <span className="dish__name">{m.name}</span>
                      <span className="dish__leader" aria-hidden="true" />
                      <span className="dish__price">{euro(m.pricePerPerson)}</span>
                    </span>
                    <span className="dish__desc">
                      {m.category}
                      {m.diet !== "Classique" && `, ${m.diet.toLowerCase()}`}. Dès {m.minGuests} personnes.
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p className="selection__foot">
            Prix par personne, TTC.{" "}
            <Link to="/menus" className="link">
              Comparer et filtrer les menus
            </Link>
          </p>
        </div>
      </section>

      {/* ---------- Déroulé d'une commande ---------- */}
      <section className="section" id="etapes">
        <div className="container">
          <header className="section__head section__head--center">
            <h2 className="h2">Comment se passe une commande</h2>
          </header>
          <ol className="steps">
            {STEPS.map((s) => (
              <li key={s.title} className="step">
                <span className="step__n" aria-hidden="true">
                  {s.numeral}
                </span>
                <h3 className="h3">{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Avis (raccourci du menu : /#avis) ---------- */}
      <section className="section section--dark" id="avis" aria-labelledby="avis-title">
        <div className="container">
          <header className="section__head section__head--center">
            <h2 id="avis-title" className="h2">
              Ils nous ont reçus à leur table
            </h2>
          </header>
          <div className="reviews">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="review">
                <blockquote>{t.text}</blockquote>
                <figcaption>
                  {t.name}, {t.event}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Appel final ---------- */}
      <section className="section" id="devis">
        <div className="container final">
          <h2 className="h2">Parlons de votre réception</h2>
          <p className="lead">Giovanni vous répond au téléphone ou par écrit. Le devis est gratuit et vous parvient sous 48 h.</p>
          <div className="actions actions--center">
            <Link to="/contact" className="btn btn--primary">
              Demander un devis
            </Link>
            <a href={SITE.phoneHref} className="btn btn--outline">
              Appeler le {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

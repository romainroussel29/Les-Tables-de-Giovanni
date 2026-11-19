import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { MENUS, TESTIMONIALS } from "../data/menus";
import { SITE } from "../data/site";
import { euro } from "../utils";

const WORDMARK = ["Les Tables", "de Giovanni"];

const STORY =
  "Giovanni a grandi à Bari, dans une famille où l'on cuisinait pour vingt. Arrivé à Arles en 2012 avec les carnets de sa grand-mère, il cuisine pour vos tables comme pour la sienne : pâtes roulées le matin, focaccia sortie du four, sauces qui mijotent depuis l'aube.";

const STEPS = [
  {
    title: "Vous appelez",
    text: "On parle de la date, du lieu, du nombre d'invités et de vos envies.",
    image: "/images/hero-table-italienne.jpg",
  },
  {
    title: "On compose",
    text: "Sous 48 h, un devis ajusté à votre budget, aux allergies et aux régimes.",
    image: "/images/menus/buffet-riviera.jpg",
  },
  {
    title: "On sert",
    text: "Le jour J, on livre à Arles, en Camargue ou dans les Alpilles, on dresse et, selon la formule, on assure le service.",
    image: "/images/hero-traiteur.jpg",
  },
];

/** Paragraphe qui se « remplit » mot à mot pendant la lecture */
function FillText({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <p className="fill" data-scroll="read" style={{ "--n": words.length } as CSSProperties}>
      {words.map((w, i) => (
        <span key={i} className="fill__w" style={{ "--i": i } as CSSProperties}>
          {w}{" "}
        </span>
      ))}
    </p>
  );
}

export default function Home() {
  return (
    <>
      {/* ---------- Hero : la photo grandit jusqu'à remplir l'écran ---------- */}
      <section className="hero" data-scroll="sticky">
        <div className="hero__sticky">
          <h1 className="hero__wordmark" aria-label={SITE.name}>
            {WORDMARK.map((line, i) => (
              <span key={line} className="hero__line" aria-hidden="true">
                <span style={{ animationDelay: `${0.15 + i * 0.12}s` }}>{line}</span>
              </span>
            ))}
          </h1>

          <div className="hero__intro">
            <p className="lead">
              Traiteur italien à Arles. La cuisine de famille des Pouilles pour vos mariages, réceptions et repas
              d'entreprise, de 4 à 200 invités.
            </p>
            <div className="hero__actions">
              <Link to="/contact" className="btn btn--primary" data-magnetic>
                Demander un devis
              </Link>
              <Link to="/menus" className="btn btn--outline">
                Voir les menus
              </Link>
            </div>
          </div>

          <div className="hero__media">
            <img src="/images/hero-fond.jpg" alt="Table italienne vue du dessus : spaghetti aux palourdes, spritz et vin blanc" />
            <div className="hero__veil" aria-hidden="true" />
          </div>

          <p className="hero__outro" aria-hidden="true">
            Fait à Arles,
            <br />
            servi à votre table.
          </p>
        </div>
      </section>

      {/* ---------- Le récit ---------- */}
      <section className="section" id="histoire">
        <div className="container recit">
          <figure className="recit__media parallax" data-scroll>
            <img src="/images/cuisine-giovanni.jpg" alt="Giovanni présente un risotto aux crevettes" loading="lazy" />
          </figure>
          <div className="recit__body">
            <h2 className="h2">Pas juste un traiteur.</h2>
            <FillText text={STORY} />
          </div>
        </div>
      </section>

      {/* ---------- La tavolata : les menus défilent comme le long d'une table ---------- */}
      <section className="tavola" id="carte" data-scroll="x" aria-labelledby="tavola-title">
        <div className="tavola__sticky">
          <div className="container tavola__head">
            <h2 id="tavola-title" className="display">
              La carte
            </h2>
            <p className="lead">
              {MENUS.length} menus, du plateau-repas au dîner de gala. Longez la table pour les découvrir.
            </p>
          </div>

          <ul className="tavola__track" data-track>
            {MENUS.map((m) => (
              <li key={m.slug} className="tavola__item">
                <Link to={`/menus/${m.slug}`} className="plate">
                  <span className="plate__media">
                    <img src={m.image} alt={m.imageAlt} loading="lazy" />
                  </span>
                  <span className="plate__name">{m.name}</span>
                  <span className="plate__meta">
                    <span>{m.category}</span>
                    <span>{euro(m.pricePerPerson)} / pers.</span>
                  </span>
                </Link>
              </li>
            ))}
            <li className="tavola__item tavola__end">
              <p className="h2">Envie de comparer ?</p>
              <Link to="/menus" className="btn btn--light" data-magnetic>
                Filtrer les menus
              </Link>
            </li>
          </ul>

          <div className="container">
            <div className="tavola__progress" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ---------- Étapes ---------- */}
      <section className="section" id="etapes">
        <div className="container">
          <h2 className="h2 section__lead">Une commande en trois temps.</h2>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className="step">
                <figure className="step__media parallax" data-scroll>
                  <img src={s.image} alt="" loading="lazy" />
                </figure>
                <span className="step__n" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="h3">{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Avis (raccourci du menu : /#avis) ---------- */}
      <section className="section section--alt" id="avis">
        <div className="container">
          <h2 className="h2 section__lead">Ils ont passé commande.</h2>
          <div className="reviews">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="review">
                <blockquote>{t.text}</blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  <span>{t.event}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Appel final ---------- */}
      <section className="section" id="devis">
        <div className="container">
          <div className="final">
            <h2 className="display">Un événement en vue ?</h2>
            <div className="final__side">
              <p className="lead">Appelez Giovanni ou décrivez-nous votre projet. Le devis est gratuit et arrive sous 48 h.</p>
              <div className="hero__actions">
                <Link to="/contact" className="btn btn--light" data-magnetic>
                  Demander un devis
                </Link>
                <a href={SITE.phoneHref} className="btn btn--outline">
                  {SITE.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

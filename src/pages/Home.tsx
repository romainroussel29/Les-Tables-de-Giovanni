import { Link } from "react-router-dom";
import { MENUS, TESTIMONIALS } from "../data/menus";
import { SITE } from "../data/site";
import MenuList from "../components/MenuList";

const WORDMARK = ["Les Tables", "de Giovanni"];

/** Sections « révélation » : titre à gauche, assiette au centre, texte à droite */
const REVEALS = [
  {
    title: "Pas juste un traiteur.",
    image: "/images/cuisine-giovanni.jpg",
    alt: "Le chef présente un risotto aux crevettes",
    text: "Giovanni a grandi à Bari, dans une famille où l'on cuisinait pour vingt. Arrivé à Arles en 2012 avec les carnets de sa grand-mère, il cuisine pour vos tables comme pour la sienne.",
  },
  {
    title: "Tout est fait à la main.",
    image: "/images/menus/buffet-riviera.jpg",
    alt: "Focaccia dorée au romarin",
    text: "Pâtes roulées le matin, focaccia sortie du four, sauces qui mijotent depuis l'aube. Rien n'arrive tout prêt dans notre atelier, à deux pas des arènes.",
  },
  {
    title: "Livré, dressé, servi.",
    image: "/images/menus/cocktail-dinatoire.jpg",
    alt: "Plateau de canapés pour un cocktail",
    text: "On livre à Arles, en Camargue et dans les Alpilles, on dresse la table et, selon la formule, on reste pour le service. Vous profitez de vos invités.",
  },
];

const STEPS = [
  { title: "Vous appelez", text: "On parle de la date, du lieu, du nombre d'invités et de vos envies." },
  { title: "On compose", text: "Sous 48 h, un devis ajusté à votre budget, aux allergies et aux régimes." },
  { title: "On sert", text: "Le jour J, on livre, on dresse et, selon la formule, on assure le service." },
];

export default function Home() {
  return (
    <>
      {/* ---------- Hero : photo vue du dessus, nom en très grand ---------- */}
      <section className="hero">
        <img className="hero__bg" src="/images/hero-fond.jpg" alt="Table italienne vue du dessus : spaghetti aux palourdes, spritz et vin blanc" />
        <div className="hero__veil" aria-hidden="true" />

        <div className="hero__lockup">
          <p className="hero__tagline">Fait à Arles, servi à votre table.</p>
          <h1 className="hero__wordmark" aria-label="Les Tables de Giovanni">
            {WORDMARK.map((line, i) => (
              <span key={line} className="hero__line" aria-hidden="true">
                <span style={{ animationDelay: `${0.3 + i * 0.15}s` }}>{line}</span>
              </span>
            ))}
          </h1>
        </div>

        <p className="hero__side" aria-hidden="true">
          Giovanni · Cucina di casa · Arles {SITE.founded}
        </p>

        <div className="hero__card">
          <p className="hero__card-title">Traiteur italien, cuisine de famille des Pouilles.</p>
          <hr className="dash" />
          <p>Mariages, réceptions, repas d'entreprise et dîners, de 4 à 200 invités. Devis gratuit sous 48 h.</p>
        </div>

        <Link to="/menus" className="hero__thumb">
          <img src="/images/menus/trattoria-della-nonna.jpg" alt="" />
          <span className="hero__thumb-label">
            Voir la carte
            <span className="hero__play" aria-hidden="true" />
          </span>
        </Link>
      </section>

      {/* ---------- Révélations : l'assiette flotte dans le noir ---------- */}
      {REVEALS.map((r) => (
        <section key={r.title} className="reveal">
          <h2 className="reveal__title" data-reveal>
            {r.title}
          </h2>
          <figure className="reveal__object">
            <img src={r.image} alt={r.alt} loading="lazy" />
          </figure>
          <p className="reveal__text body-xl" data-reveal>
            {r.text}
          </p>
        </section>
      ))}

      {/* ---------- La carte ---------- */}
      <section className="section">
        <div className="section__head" data-reveal>
          <h2 className="heading">La carte</h2>
          <p className="label-muted">{MENUS.length} menus, survolez pour voir l'assiette</p>
        </div>
        <MenuList menus={MENUS} />
        <div className="section__foot">
          <Link to="/menus" className="btn btn--ghost">
            Filtrer les menus
          </Link>
        </div>
      </section>

      {/* ---------- Étapes (une vraie suite) ---------- */}
      <section className="section">
        <hr className="dash" />
        <div className="steps">
          <h2 className="heading" data-reveal>
            Une commande en trois temps.
          </h2>
          <ol className="steps__list">
            {STEPS.map((s, i) => (
              <li key={s.title} className="step" data-reveal>
                <span className="step__n">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="step__title">{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Avis (raccourci du menu : /#avis) ---------- */}
      <section className="section" id="avis">
        <hr className="dash" />
        <h2 className="heading" data-reveal>
          Ils ont passé commande.
        </h2>
        <div className="reviews">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="review" data-reveal>
              <blockquote className="body-xl">{t.text}</blockquote>
              <figcaption className="credit">
                {t.name}, {t.event}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------- Appel final : le seul bouton plein du site ---------- */}
      <section className="final">
        <hr className="dash" />
        <div className="final__inner" data-reveal>
          <h2 className="display">Un événement en vue ?</h2>
          <p className="body-xl">Appelez Giovanni ou décrivez-nous votre projet. Le devis est gratuit et arrive sous 48 h.</p>
          <div className="final__actions">
            <Link to="/contact" className="btn btn--filled">
              Demander un devis
            </Link>
            <a href={SITE.phoneHref} className="btn btn--ghost">
              {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

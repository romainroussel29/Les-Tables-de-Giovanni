import { Link } from "react-router-dom";
import { MENUS, TESTIMONIALS } from "../data/menus";
import { SITE } from "../data/site";
import MenuCard from "../components/MenuCard";
import { PhoneIcon } from "../components/Icons";

/** Mots semés sur la bande verte : taille (px max), rotation (deg), position (%) */
const OCCASIONS: { word: string; size: number; rotate: number; x: number; y: number; circled?: boolean }[] = [
  { word: "Mariages", size: 112, rotate: -4, x: 8, y: 12, circled: true },
  { word: "Cocktails", size: 72, rotate: 5, x: 60, y: 6 },
  { word: "Séminaires", size: 58, rotate: -2, x: 70, y: 46 },
  { word: "Anniversaires", size: 80, rotate: 3, x: 4, y: 58 },
  { word: "Brunchs", size: 54, rotate: -6, x: 44, y: 38 },
  { word: "Pique-niques", size: 50, rotate: 4, x: 52, y: 80 },
  { word: "Repas d'équipe", size: 46, rotate: -3, x: 18, y: 86 },
];

const HERO_TITLE = "La cuisine de Giovanni, servie à votre table.";

const TICKER = [
  "Fait maison",
  "Livré en Camargue",
  "Devis sous 48 h",
  "Pâtes roulées à la main",
  "De 4 à 200 invités",
  "Recettes des Pouilles",
];

const STEPS = [
  { title: "Vous nous appelez", text: "On parle de la date, du lieu, du nombre d'invités et de ce qui vous ferait plaisir." },
  { title: "On compose votre menu", text: "Sous 48 h, un devis ajusté à votre budget, aux allergies et aux régimes de chacun." },
  { title: "On livre et on sert", text: "Le jour J, on apporte tout, on dresse la table et, selon la formule, on reste pour le service." },
];

export default function Home() {
  const featured = MENUS.filter((m) => m.featured);

  return (
    <>
      {/* ---------- Plaque photo pleine page, titre en bas à gauche ---------- */}
      <section className="hero">
        <img
          className="hero__bg"
          src="/images/hero-fond.jpg"
          alt="Table italienne avec spaghetti aux palourdes, spritz et vin blanc"
        />
        <div className="hero__veil" aria-hidden="true" />
        <div className="hero__content">
          <h1 className="hero__title" aria-label={HERO_TITLE}>
            {HERO_TITLE.split(" ").map((word, i) => (
              <span key={i} className="hero__word" style={{ animationDelay: `${0.5 + i * 0.08}s` }} aria-hidden="true">
                {word}{" "}
              </span>
            ))}
          </h1>
          <div className="hero__actions">
            <Link to="/menus" className="btn btn--cta">
              Voir les menus
            </Link>
            <a href={SITE.phoneHref} className="btn btn--ghost">
              <PhoneIcon size={16} /> {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Bandeau défilant ---------- */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {[0, 1].map((k) => (
            <span key={k} className="ticker__group">
              {TICKER.map((t) => (
                <span key={t} className="ticker__item">
                  {t}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ---------- Bande moutarde éditoriale ---------- */}
      <section className="band band--mustard">
        <div className="band__inner" data-reveal>
          <p className="badge">Traiteur italien à Arles</p>
          <h2 className="display-lg">Fait maison, depuis {SITE.founded}.</h2>
          <p className="band__text">
            Des pâtes roulées à la main, des sauces qui mijotent depuis le matin et des desserts de famille. On cuisine
            pour six comme pour deux cents, et on livre d'Arles aux Alpilles.
          </p>
          <Link to="/contact" className="btn btn--ghost">
            Demander un devis
          </Link>
        </div>
      </section>

      {/* ---------- Histoire : texte et photo côte à côte ---------- */}
      <section className="split split--peach">
        <div className="split__text" data-reveal>
          <p className="badge">La maison</p>
          <h2 className="display-md">De Bari aux quais du Rhône</h2>
          <p>
            Giovanni a grandi à Bari, dans une famille où l'on cuisinait pour vingt. Arrivé à Arles en {SITE.founded}{" "}
            avec les carnets de recettes de sa grand-mère, il a ouvert un petit atelier à deux pas des arènes.
          </p>
          <p>
            Aujourd'hui, avec son équipe, il prépare vos mariages, vos dîners et vos réceptions comme on le fait en
            Italie : avec générosité, sans jamais rien presser.
          </p>
        </div>
        <figure className="split__media" data-reveal>
          <img src="/images/cuisine-giovanni.jpg" alt="Le chef présentant un risotto aux crevettes" loading="lazy" />
        </figure>
      </section>

      {/* ---------- Menus coups de cœur ---------- */}
      <section className="section">
        <div className="section__head" data-reveal>
          <h2 className="display-md">Les menus qu'on nous demande le plus</h2>
          <Link to="/menus" className="arrow-link">
            Voir les {MENUS.length} menus →
          </Link>
        </div>
        <div className="menu-grid menu-grid--featured">
          {featured.map((m) => (
            <div key={m.slug} data-reveal>
              <MenuCard menu={m} />
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Bande verte : les occasions, semées ---------- */}
      <section className="band band--green">
        <p className="badge" data-reveal>
          Pour toutes vos tablées
        </p>
        <div
          className="scatter"
          data-reveal
          aria-label="Mariages, cocktails, séminaires, anniversaires, brunchs, pique-niques, repas d'équipe"
        >
          {OCCASIONS.map((o, i) => (
            <span
              key={o.word}
              className={`scatter__word${o.circled ? " scatter__word--circled" : ""}`}
              style={{
                left: `${o.x}%`,
                top: `${o.y}%`,
                fontSize: `clamp(${Math.round(o.size * 0.45)}px, ${(o.size / 14).toFixed(2)}vw, ${o.size}px)`,
                ["--r" as string]: `${o.rotate}deg`,
                ["--d" as string]: `${(i * 0.7) % 3}s`,
              }}
              aria-hidden="true"
            >
              {o.word}
              {/* Ovale tracé à la main, qui se dessine à l'apparition */}
              {o.circled && (
                <svg className="scatter__oval" viewBox="0 0 200 100" preserveAspectRatio="none">
                  <path d="M12 55 C 10 18, 180 8, 192 45 C 200 80, 40 98, 14 70 C 4 58, 30 30, 70 22" pathLength={1} />
                </svg>
              )}
            </span>
          ))}
        </div>
      </section>

      {/* ---------- Étapes (une vraie suite, donc numérotée) ---------- */}
      <section className="section">
        <h2 className="display-md" data-reveal>
          Comment se passe une commande
        </h2>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.title} className="step" data-reveal>
              <span className="step__n" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- Avis (raccourci du menu : /#avis) ---------- */}
      <section className="band band--peach" id="avis">
        <div className="band__inner band__inner--wide">
          <p className="badge" data-reveal>
            Ils ont passé commande
          </p>
          <div className="reviews">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="review" data-reveal>
                <blockquote>« {t.text} »</blockquote>
                <figcaption>
                  {t.name}, {t.event}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Appel final : moutarde, texte et photo ---------- */}
      <section className="split split--mustard">
        <div className="split__text" data-reveal>
          <h2 className="display-lg">Un événement en vue ?</h2>
          <p>Appelez Giovanni ou décrivez-nous votre projet. Le devis est gratuit et arrive sous 48 h.</p>
          <div className="hero__actions">
            <a href={SITE.phoneHref} className="btn btn--cta">
              <PhoneIcon size={16} /> {SITE.phone}
            </a>
            <Link to="/contact" className="btn btn--ghost">
              Écrire un message
            </Link>
          </div>
        </div>
        <figure className="split__media" data-reveal>
          <img src="/images/menus/cocktail-dinatoire.jpg" alt="Plateau de canapés pour un cocktail" loading="lazy" />
        </figure>
      </section>
    </>
  );
}

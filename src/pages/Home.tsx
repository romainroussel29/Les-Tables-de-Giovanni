import { Link } from "react-router-dom";
import { MENUS, TESTIMONIALS } from "../data/menus";
import { SITE } from "../data/site";
import MenuCard from "../components/MenuCard";
import { ArrowIcon, ChefIcon, LeafIcon, PhoneIcon, Stars, TruckIcon } from "../components/Icons";

const STEPS = [
  { n: "01", title: "On échange", text: "Un appel ou un message pour parler de votre événement, du nombre d'invités et de vos envies." },
  { n: "02", title: "On compose", text: "Nous vous envoyons un devis détaillé sous 48 h, ajusté à votre budget et aux régimes de chacun." },
  { n: "03", title: "On régale", text: "Livraison, mise en place et service selon la formule choisie. Vous n'avez plus qu'à profiter." },
];

const VALUES = [
  { icon: <ChefIcon size={26} />, title: "Fait maison", text: "Pâtes fraîches, sauces et desserts préparés chaque jour dans notre atelier des Chartrons." },
  { icon: <LeafIcon size={26} />, title: "Produits locaux", text: "Maraîchers girondins, viandes du Bazadais, huîtres du Bassin et fromages importés d'Italie." },
  { icon: <TruckIcon size={26} />, title: "Livré à l'heure", text: `Livraison soignée sur ${SITE.zone}, avec vaisselle et matériel si besoin.` },
];

const EVENTS = ["Mariages", "Repas d'entreprise", "Anniversaires", "Cocktails", "Séminaires", "Repas de famille"];

export default function Home() {
  const featured = MENUS.filter((m) => m.featured);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <img className="hero__bg" src="/images/hero-traiteur.jpg" alt="" />
        <div className="hero__overlay" />
        <div className="container hero__content">
          <p className="eyebrow eyebrow--light">Traiteur à {SITE.city} depuis {SITE.founded}</p>
          <h1 className="hero__title">
            La générosité italienne,
            <br />
            <em>à la bordelaise.</em>
          </h1>
          <p className="hero__lead">
            Des tables qui rassemblent, une cuisine qui se partage. Pour vos réceptions, mariages et repas d'entreprise,
            Giovanni et son équipe cuisinent pour vous comme pour leur famille.
          </p>
          <div className="hero__actions">
            <Link to="/menus" className="btn btn--primary btn--lg">
              Découvrir nos menus <ArrowIcon size={18} />
            </Link>
            <a href={SITE.phoneHref} className="btn btn--ghost-light btn--lg">
              <PhoneIcon size={18} /> {SITE.phone}
            </a>
          </div>
        </div>
        <ul className="hero__stats container">
          <li><strong>10</strong> menus à la carte</li>
          <li><strong>+1 500</strong> événements servis</li>
          <li><strong>4,9/5</strong> d'avis clients</li>
        </ul>
      </section>

      {/* ---------- Histoire ---------- */}
      <section className="section">
        <div className="container split">
          <div className="split__media">
            <img src="/images/cuisine-giovanni.jpg" alt="Le chef présentant un risotto aux crevettes" loading="lazy" />
            <div className="split__badge">
              <span>Depuis</span>
              <strong>{SITE.founded}</strong>
            </div>
          </div>
          <div className="split__text">
            <p className="eyebrow">Notre histoire</p>
            <h2 className="section__title">De Bari aux quais de Bordeaux</h2>
            <p>
              Arrivé à Bordeaux avec les carnets de recettes de sa grand-mère, Giovanni a ouvert son atelier en{" "}
              {SITE.founded} avec une idée simple : faire découvrir la vraie cuisine de famille italienne, nourrie des
              merveilleux produits du Sud-Ouest.
            </p>
            <p>
              Aujourd'hui, une équipe de passionnés l'accompagne pour imaginer des tables qui vous ressemblent, du
              déjeuner d'affaires au mariage de 200 couverts.
            </p>
            <ul className="tags">
              {EVENTS.map((e) => (
                <li key={e} className="tag">{e}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Valeurs ---------- */}
      <section className="section section--tinted">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Notre engagement</p>
            <h2 className="section__title">Le goût des choses bien faites</h2>
          </div>
          <div className="values">
            {VALUES.map((v) => (
              <div key={v.title} className="value">
                <span className="value__icon">{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Menus phares ---------- */}
      <section className="section">
        <div className="container">
          <div className="section__head section__head--row">
            <div>
              <p className="eyebrow">À la carte</p>
              <h2 className="section__title">Nos menus coups de cœur</h2>
            </div>
            <Link to="/menus" className="link-arrow">
              Voir les {MENUS.length} menus <ArrowIcon size={16} />
            </Link>
          </div>
          <div className="menu-grid">
            {featured.map((m) => (
              <MenuCard key={m.slug} menu={m} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Étapes ---------- */}
      <section className="section section--dark">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow eyebrow--light">Comment ça marche</p>
            <h2 className="section__title">Trois étapes, zéro souci</h2>
          </div>
          <ol className="steps">
            {STEPS.map((s) => (
              <li key={s.n} className="step">
                <span className="step__n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Avis ---------- */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Ils nous ont fait confiance</p>
            <h2 className="section__title">Ce que disent nos clients</h2>
          </div>
          <div className="reviews">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="review">
                <Stars rating={t.rating} />
                <blockquote>« {t.text} »</blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  <span>{t.event}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Appel à l'action ---------- */}
      <section className="cta">
        <div className="container cta__inner">
          <div>
            <h2>Un événement en préparation ?</h2>
            <p>Parlons-en autour d'un café, au téléphone ou par message. Devis gratuit sous 48 h.</p>
          </div>
          <div className="cta__actions">
            <a href={SITE.phoneHref} className="btn btn--light btn--lg">
              <PhoneIcon size={18} /> {SITE.phone}
            </a>
            <Link to="/contact" className="btn btn--ghost-light btn--lg">
              Demander un devis
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
